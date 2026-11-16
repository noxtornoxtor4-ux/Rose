import { useEffect, useState } from 'react'
import { navLinks, salon } from '../../data/content'
import { useBookingModal } from '../BookingModal/context'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import styles from './Header.module.scss'

export function Header() {
  const { openBooking } = useBookingModal()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top">
          <span className={styles.mark}>{salon.name.slice(0, 1)}</span>
          <span className={styles.brandText}>
            <strong>{salon.name}</strong>
            <small>{salon.tagline}</small>
          </span>
        </a>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a className={styles.phone} href={salon.phoneHref}>
            <Icon name="phone" size={18} />
            {salon.phone}
          </a>

          <Button type="button" icon="arrow" onClick={openBooking}>
            Записаться
          </Button>
        </div>
      </div>
    </header>
  )
}
