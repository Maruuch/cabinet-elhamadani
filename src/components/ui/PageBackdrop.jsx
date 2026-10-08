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
 * Fond photo fixe d'une page, en deux calques de profondeur.
 *
 * Le fond reste collé à l'écran pendant que le contenu défile par-dessus. Sur
 * toute la hauteur de la page, les deux calques dérivent lentement en sens
 * inverse et le premier plan grossit : c'est cet écart qui donne le relief.
 *
 *   <PageBackdrop variant="home" />   accueil : main + balance devant la ville
 *   <PageBackdrop variant="casa" />   autres pages : panorama de Casablanca
 *
 * IMPORTANT : le JSX ne doit jamais dépendre de useReducedMotion(). Le serveur
 * ne connaît pas ce réglage ; un rendu différent côté navigateur provoque une
 * erreur d'hydratation, React reconstruit alors toute la page et les attributs
 * lang/dir de <html> (posés par le script du layout) sont perdus : la page
 * arabe passe en gauche-à-droite. On fige donc les valeurs, pas le balisage.
 */
const VARIANTS = {
  // Deux images : le lointain (ciel + ville, premier plan effacé) et le
  // premier plan détouré (main + balance, canal alpha).
  home: {
    far: '/images/hero-far.webp',
    near: '/images/hero-near.webp',
    nearMask: null,
    focus: '53% 50%', // centre de la balance
    farOrigin: '50% 50%',
    farY: ['0%', '4%'],
    farScale: [1.04, 1.1],
    nearY: ['0%', '-3.5%'],
    nearScale: [1.04, 1.18],
    baseVeil: 0.5, // voile en haut de page (hero)
    readVeil: 0.56, // voile ajouté une fois le hero quitté
    veilDistance: 620, // px de scroll pour passer de l'un à l'autre
  },
  // Une seule image. Le "premier plan" est la même photo, visible seulement
  // dans sa partie basse (la corniche) grâce à un masque en dégradé ; la zone
  // de transition tombe sur la mer, où le léger dédoublement ne se voit pas.
  casa: {
    far: '/images/casa.webp',
    near: '/images/casa.webp',
    nearMask: 'linear-gradient(to top, #000 0%, #000 26%, transparent 46%)',
    focus: '70% 50%', // garde la mosquée Hassan II dans le cadre sur mobile
    farOrigin: '70% 100%',
    farY: ['0%', '2.5%'],
    farScale: [1.04, 1.08],
    nearY: ['0%', '-1.5%'],
    nearScale: [1.04, 1.12],
    baseVeil: 0.72, // pas de grand hero ici : le texte commence dès le premier écran
    readVeil: 0.36,
    veilDistance: 360,
  },
}

// Ressorts sur-amortis (aucun rebond). Plus `stiffness` est bas, plus le
// mouvement est lent et coulé.
const SCROLL_SPRING = { stiffness: 90, damping: 26, mass: 0.6, restDelta: 0.0002 }
const POINTER_SPRING = { stiffness: 45, damping: 18, mass: 0.8 }

export default function PageBackdrop({ variant = 'home' }) {
  const cfg = VARIANTS[variant] || VARIANTS.home
  const reduce = useReducedMotion()

  // Progression sur toute la page : 0 en haut, 1 tout en bas
  const { scrollY, scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING)
  const progress = useTransform(smooth, (v) => (reduce ? 0 : v))

  const farY = useTransform(progress, [0, 1], cfg.farY)
  const farScale = useTransform(progress, [0, 1], cfg.farScale)
  const nearY = useTransform(progress, [0, 1], cfg.nearY)
  const nearScale = useTransform(progress, [0, 1], cfg.nearScale)

  // Le voile s'épaissit dès qu'on quitte le haut de page, pour que les
  // sections de texte restent lisibles. Ce n'est pas un mouvement : il reste
  // actif même avec "réduire les animations".
  const veilTarget = useTransform(scrollY, [0, cfg.veilDistance], [0, cfg.readVeil], { clamp: true })
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

  const maskStyle = cfg.nearMask
    ? { WebkitMaskImage: cfg.nearMask, maskImage: cfg.nearMask }
    : null

  return (
    <div className="page-backdrop" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}
      >
        {/* Lointain */}
        <motion.div
          className="absolute -inset-[6%] will-change-transform"
          style={{ y: farY, scale: farScale, transformOrigin: cfg.farOrigin }}
        >
          <motion.img
            src={cfg.far}
            alt=""
            fetchPriority="high"
            decoding="async"
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{ objectPosition: cfg.focus, x: farMX, y: farMY }}
          />
        </motion.div>

        {/* Premier plan */}
        <motion.div
          className="absolute -inset-[6%] will-change-transform"
          style={{ y: nearY, scale: nearScale, transformOrigin: `${cfg.focus.split(' ')[0]} 100%` }}
        >
          <motion.img
            src={cfg.near}
            alt=""
            decoding="async"
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.15, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{ objectPosition: cfg.focus, x: nearMX, y: nearMY, ...maskStyle }}
          />
        </motion.div>
      </motion.div>

      {/* Voile de base, puis voile de lecture piloté par le scroll */}
      <div className="absolute inset-0 bg-[#0B1322]" style={{ opacity: cfg.baseVeil }} />
      <motion.div className="absolute inset-0 bg-[#0B1322]" style={{ opacity: veil }} />
    </div>
  )
}
