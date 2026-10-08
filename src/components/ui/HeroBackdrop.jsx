'use client'
import { useEffect } from 'react'
import {
  motion,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'

/**
 * Fond photo du hero en deux calques de profondeur.
 *  - hero-far.webp  : ciel + ville (le premier plan y est effacé)
 *  - hero-near.webp : main + balance, détourées (canal alpha)
 * Les deux calques partagent la même boîte et le même cadrage : au repos ils
 * se superposent exactement. La profondeur vient de leur décalage au scroll
 * (et au mouvement de la souris sur écran large).
 *
 * `progress`   : MotionValue 0 → 1 (0 = hero plein écran, 1 = hero sorti par le
 *                haut), déjà lissée. Elle est calculée dans HeroSection : un
 *                useScroll placé ici lirait la ref de la section avant qu'elle
 *                soit attachée et retomberait sur le scroll de toute la page.
 *                Avec "réduire les animations", HeroSection la fige à 0.
 * `sectionRef` : ref de la <section> du hero, pour suivre la souris.
 *
 * IMPORTANT : le JSX ne doit jamais dépendre de useReducedMotion(). Le serveur
 * ne connaît pas ce réglage ; un rendu différent côté navigateur provoque une
 * erreur d'hydratation, React reconstruit alors toute la page et les attributs
 * lang/dir de <html> (posés par le script du layout) sont perdus : la page
 * arabe passe en gauche-à-droite. On fige donc les valeurs, pas le balisage.
 */
const FAR = '/images/hero-far.webp'
const NEAR = '/images/hero-near.webp'
const FOCUS = '53% 50%' // centre de la balance dans la photo

// Ressort sur-amorti (aucun rebond). Plus `stiffness` est bas, plus le
// mouvement est lent et coulé.
const POINTER_SPRING = { stiffness: 45, damping: 18, mass: 0.8 }

export default function HeroBackdrop({ progress, sectionRef, isRTL }) {
  const reduce = useReducedMotion()

  // Le lointain "traîne" (il descend dans la section), le premier plan suit le
  // scroll et grossit : c'est cet écart qui donne la sensation de relief.
  const farY = useTransform(progress, [0, 1], ['0%', '5%'])
  const farScale = useTransform(progress, [0, 1], [1.03, 1.055])
  const nearY = useTransform(progress, [0, 1], ['0%', '1.2%'])
  const nearScale = useTransform(progress, [0, 1], [1.03, 1.085])
  const veil = useTransform(progress, [0, 1], [0, 0.2])

  // Souris : -0.5 → 0.5 sur chaque axe, lissé par un ressort
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, POINTER_SPRING)
  const sy = useSpring(my, POINTER_SPRING)
  const farMX = useTransform(sx, (v) => v * -12)
  const farMY = useTransform(sy, (v) => v * -8)
  const nearMX = useTransform(sx, (v) => v * 22)
  const nearMY = useTransform(sy, (v) => v * 12)
  const tiltY = useTransform(sx, (v) => v * 2)
  const tiltX = useTransform(sy, (v) => v * -1.2)

  useEffect(() => {
    const el = sectionRef?.current
    if (!el || reduce) return
    // Uniquement avec une vraie souris : rien au doigt
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      mx.set((e.clientX - r.left) / r.width - 0.5)
      my.set((e.clientY - r.top) / r.height - 0.5)
    }
    const onLeave = () => { mx.set(0); my.set(0) }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [sectionRef, reduce, mx, my])

  const textSide = isRTL ? 'to left' : 'to right'

  return (
    <div className="absolute inset-x-0 bottom-0 top-[72px] overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}
      >
        {/* Lointain : ciel + ville */}
        <motion.div
          className="absolute -inset-[2%] will-change-transform"
          style={{ y: farY, scale: farScale }}
        >
          <motion.img
            src={FAR}
            alt=""
            fetchPriority="high"
            decoding="async"
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{ objectPosition: FOCUS, x: farMX, y: farMY }}
          />
        </motion.div>

        {/* Premier plan : main + balance */}
        <motion.div
          className="absolute -inset-[2%] will-change-transform"
          style={{ y: nearY, scale: nearScale, transformOrigin: '53% 100%' }}
        >
          <motion.img
            src={NEAR}
            alt=""
            decoding="async"
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.15, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{ objectPosition: FOCUS, x: nearMX, y: nearMY }}
          />
        </motion.div>
      </motion.div>

      {/* Voiles de lisibilité, du plus général au plus ciblé */}
      <div className="absolute inset-0 bg-[#0B1322]/[0.62] lg:bg-[#0B1322]/40" />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background: `linear-gradient(${textSide}, rgba(11,19,34,0.88) 0%, rgba(11,19,34,0.7) 36%, rgba(11,19,34,0.16) 64%, rgba(11,19,34,0.34) 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(11,19,34,0.35) 0%, rgba(11,19,34,0) 20%, rgba(11,19,34,0) 64%, rgba(11,19,34,0.8) 100%)',
        }}
      />
      {/* Le fond s'assombrit à mesure que le hero quitte l'écran */}
      <motion.div className="absolute inset-0 bg-[#0B1322]" style={{ opacity: veil }} />
    </div>
  )
}
