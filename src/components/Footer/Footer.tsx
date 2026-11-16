import { navLinks, salon } from '../../data/content'
import styles from './Footer.module.scss'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top">
          <span className={styles.mark}>
            {salon.name.slice(0, 1)}
          </span>
          <span className={styles.brandText}>
            <strong>{salon.name}</strong>
            <small>{salon.address}</small>
          </span>
        </a>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <p className={styles.legal}>
          © {currentYear} {salon.name}. Все права защищены.
          <span>Имеются противопоказания, необходима консультация специалиста.</span>
        </p>
      </div>
    </footer>
  )
}
