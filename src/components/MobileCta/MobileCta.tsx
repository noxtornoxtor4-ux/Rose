import { salon } from '../../data/content'
import { useBookingModal } from '../BookingModal/context'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import styles from './MobileCta.module.scss'

/** Закреплённая панель записи внизу экрана — только на мобильных. */
export function MobileCta() {
  const { openBooking } = useBookingModal()

  return (
    <div className={styles.bar}>
      <Button type="button" icon="arrow" className={styles.primary} onClick={openBooking}>
        Записаться онлайн
      </Button>

      <a className={styles.call} href={salon.phoneHref} aria-label={`Позвонить: ${salon.phone}`}>
        <Icon name="phone" size={20} />
      </a>
    </div>
  )
}
