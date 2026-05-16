import { motion, useReducedMotion } from 'framer-motion'

// Minimalist "map" — a faint graticule grid with the five cities
// plotted at their approximate relative geographic positions.
const GRID_V = [80, 160, 240, 320]
const GRID_H = [90, 180, 270, 360]

// DOM order = light-up order
const CITIES = [
  { name: 'SINGAPORE', x: 138, y: 276, lx: 150, ly: 277, anchor: 'start' },
  { name: 'KUALA LUMPUR', x: 102, y: 252, lx: 114, ly: 252, anchor: 'start' },
  { name: 'BANGKOK', x: 82, y: 111, lx: 94, ly: 111, anchor: 'start' },
  { name: 'BALI', x: 328, y: 404, lx: 340, ly: 404, anchor: 'start' },
]

const DA_NANG = { x: 212, y: 80 }

const cityVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

function MapAsia() {
  const reduce = useReducedMotion()

  return (
    <svg
      viewBox="0 0 400 470"
      className="h-auto w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="dn-glow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <g stroke="#A09080" strokeOpacity="0.1" strokeWidth="1">
        {GRID_V.map((x) => (
          <line key={`v${x}`} x1={x} y1="20" x2={x} y2="450" />
        ))}
        {GRID_H.map((y) => (
          <line key={`h${y}`} x1="24" y1={y} x2="376" y2={y} />
        ))}
      </g>

      <motion.g
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        variants={{
          visible: { transition: { staggerChildren: reduce ? 0 : 0.25 } },
        }}
      >
        {CITIES.map((c) => (
          <motion.g
            key={c.name}
            variants={cityVariants}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <circle cx={c.x} cy={c.y} r="4.5" fill="#F0EAE0" />
            <text
              x={c.lx}
              y={c.ly}
              textAnchor={c.anchor}
              dominantBaseline="middle"
              fontFamily="'Space Grotesk', sans-serif"
              fontSize="11"
              fontWeight="500"
              letterSpacing="1"
              fill="#A09080"
            >
              {c.name}
            </text>
          </motion.g>
        ))}
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1, ease: 'easeOut' }}
      >
        <motion.circle
          cx={DA_NANG.x}
          cy={DA_NANG.y}
          fill="#F2C94C"
          filter="url(#dn-glow)"
          initial={{ opacity: 0.3, r: 14 }}
          animate={
            reduce
              ? { opacity: 0.3, r: 15 }
              : { opacity: [0.2, 0.5, 0.2], r: [13, 20, 13] }
          }
          transition={{
            duration: reduce ? 0 : 2.6,
            repeat: reduce ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        />
        <circle cx={DA_NANG.x} cy={DA_NANG.y} r="7" fill="#F2C94C" />
        <text
          x={DA_NANG.x + 17}
          y={DA_NANG.y}
          textAnchor="start"
          dominantBaseline="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#F2C94C"
        >
          DA NANG
        </text>
      </motion.g>
    </svg>
  )
}

export default MapAsia
