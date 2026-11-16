import { salon } from '../../data/content'
import { useBookingModal } from '../BookingModal/context'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Rose } from '../ui/Rose'
import { Section } from '../ui/Section'
import styles from './Contacts.module.scss'

const rows = [
  { icon: 'pin' as const, title: salon.address, note: 'Второй этаж, вход со двора' },
  { icon: 'clock' as const, title: salon.hoursFull, note: salon.dayOff },
  { icon: 'phone' as const, title: salon.phone, note: 'Звонки и WhatsApp' },
]

export function Contacts() {
  const { openBooking } = useBookingModal()

  return (
    <Section
      id="contacts"
      eyebrow="Как нас найти"
      title={<>Адрес и <em>запись</em></>}
      align="center"
    >
      <div className={styles.card}>
        <Rose className={styles.rose} />

        <ul className={styles.rows}>
          {rows.map((row) => (
            <li key={row.title}>
              <span className={styles.icon}>
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
          <p className={styles.hoursLabel}>Режим работы</p>
          <p className={styles.hoursValue}>{salon.hours}</p>
        </div>

        <div className={styles.actions}>
          <Button type="button" size="lg" icon="arrow" onClick={openBooking}>
            Записаться онлайн
          </Button>
          <Button href={salon.phoneHref} variant="ghost" size="lg" icon="phone" iconPosition="start">
            Позвонить
          </Button>
        </div>
      </div>
    </Section>
  )
}
