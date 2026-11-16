import type { ReactNode } from 'react'
import styles from './Section.module.scss'

type SectionProps = {
  id: string
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'start' | 'center'
  children: ReactNode
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  align = 'start',
  children,
}: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.inner}>
        <header className={`${styles.head} ${align === 'center' ? styles.center : ''}`}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </header>

        <div className={styles.body}>{children}</div>
      </div>
    </section>
  )
}
