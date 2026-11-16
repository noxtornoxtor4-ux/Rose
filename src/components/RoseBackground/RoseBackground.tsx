import { Rose } from '../ui/Rose'
import styles from './RoseBackground.module.scss'

const ROSES = [
  { top: '4%', left: '-6%', size: 300, rotate: -14 },
  { top: '22%', left: '80%', size: 240, rotate: 12 },
  { top: '48%', left: '-4%', size: 220, rotate: 8 },
  { top: '64%', left: '82%', size: 280, rotate: -10 },
  { top: '86%', left: '6%', size: 240, rotate: 16 },
]

/** Фон страницы: тёплые кремовые градиенты, лёгкое зерно и линейные розы. */
export function RoseBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.grain} />

      {ROSES.map((rose, index) => (
        <Rose
          key={index}
          className={styles.rose}
          strokeWidth={0.9}
          style={{
            top: rose.top,
            left: rose.left,
            width: rose.size,
            transform: `rotate(${rose.rotate}deg)`,
          }}
        />
      ))}
    </div>
  )
}
