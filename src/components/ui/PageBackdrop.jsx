'use client'
import { useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'

/**
 * Fond photo fixe de la page d'accueil, en deux calques de profondeur.
 *  - hero-far.webp  : ciel + ville (le premier plan y est effacé)
 *  - hero-near.webp : main + balance, détourées (canal alpha)
 *
 * Le fond reste collé à l'écran pendant que le contenu défile par-dessus. Sur
 * toute la hauteur de la page, les deux calques dérivent lentement en sens
 * inverse et le premier plan grossit : c'est cet écart qui donne le relief.
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

// Ressorts sur-amortis (aucun rebond). Plus `stiffness` est bas, plus le
// mouvement est lent et coulé.
const SCROLL_SPRING = { stiffness: 90, damping: 26, mass: 0.6, restDelta: 0.0002 }
const POINTER_SPRING = { stiffness: 45, damping: 18, mass: 0.8 }

// Distance de scroll (px) sur laquelle le voile passe de "hero" à "lecture"
const VEIL_DISTANCE = 620

export default function PageBackdrop() {
  const reduce = useReducedMotion()

  // Progression sur toute la page : 0 en haut, 1 tout en bas
  const { scrollY, scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING)
  const progress = useTransform(smooth, (v) => (reduce ? 0 : v))

  const farY = useTransform(progress, [0, 1], ['0%', '4%'])
  const farScale = useTransform(progress, [0, 1], [1.04, 1.1])
  const nearY = useTransform(progress, [0, 1], ['0%', '-3.5%'])
  const nearScale = useTransform(progress, [0, 1], [1.04, 1.18])

  // Le voile s'épaissit dès qu'on quitte le hero, pour que les sections de
  // texte restent lisibles. Ce n'est pas un mouvement : il reste actif même
  // avec "réduire les animations".
  const veilTarget = useTransform(scrollY, [0, VEIL_DISTANCE], [0, 0.56], { clamp: true })
  const veil = useSpring(veilTarget, { stiffness: 120, damping: 28, mass: 0.5, restDelta: 0.001 })

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
    if (reduce) return
    // Uniquement avec une vraie souris : rien au doigt
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    const onLeave = () => { mx.set(0); my.set(0) }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce, mx, my])

  return (
    <div className="page-backdrop" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}
      >
        {/* Lointain : ciel + ville */}
        <motion.div
          className="absolute -inset-[6%] will-change-transform"
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
          className="absolute -inset-[6%] will-change-transform"
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

      {/* Voile de base, puis voile de lecture piloté par le scroll */}
      <div className="absolute inset-0 bg-[#0B1322]/50" />
      <motion.div className="absolute inset-0 bg-[#0B1322]" style={{ opacity: veil }} />
    </div>
  )
}
