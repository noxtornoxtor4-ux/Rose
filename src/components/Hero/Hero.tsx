import { heroChips, salon } from '../../data/content'
import { useBookingModal } from '../BookingModal/context'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Rose } from '../ui/Rose'
import styles from './Hero.module.scss'

const infoRows = [
  { icon: 'pin' as const, title: salon.address, note: 'Второй этаж, вход со двора' },
  { icon: 'clock' as const, title: salon.hoursFull, note: salon.dayOff },
  { icon: 'sparkle' as const, title: 'Уход и косметика в подарок', note: 'При первом визите' },
]

export function Hero() {
  const { openBooking } = useBookingModal()

  return (
    <section className={styles.hero} id="top">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{salon.name} · {salon.tagline}</p>

          <h1 className={styles.title}>
            Красота, которая <em>расцветает</em> вместе с вами
          </h1>

          <p className={styles.text}>
            Волосы, ногти, ресницы и уход за лицом — в одном месте. Напишите в WhatsApp: подберём
            мастера и удобное время, а заявка уйдёт готовым сообщением.
          </p>

          <div className={styles.actions}>
            <Button type="button" size="lg" icon="arrow" onClick={openBooking}>
              Записаться онлайн
            </Button>
            <Button href={salon.phoneHref} variant="ghost" size="lg" icon="phone" iconPosition="start">
              {salon.phone}
            </Button>
          </div>

          <ul className={styles.chips}>
            {heroChips.map((chip) => (
              <li key={chip}>
                <Icon name="check" size={15} />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <aside className={styles.card}>
          <Rose className={styles.cardRose} />

          <p className={styles.cardLabel}>Салон красоты {salon.name}</p>
          <h2 className={styles.cardTitle}>Адрес и режим работы</h2>

          <ul className={styles.rows}>
            {infoRows.map((row) => (
              <li key={row.title}>
                <span className={styles.rowIcon}>
                  <Icon name={row.icon} size={18} />
                </span>
                <span className={styles.rowText}>
                  <strong>{row.title}</strong>
                  <small>{row.note}</small>
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.hours}>
            <p className={styles.hoursLabel}>Сегодня работаем</p>
            <p className={styles.hoursValue}>{salon.hours}</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
