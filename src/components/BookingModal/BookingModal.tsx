import { useEffect, useId, useRef, useState, type FormEvent, type MouseEvent } from 'react'
import { consentText, salon } from '../../data/content'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Rose } from '../ui/Rose'
import styles from './BookingModal.module.scss'

type Visitor = 'new' | 'returning'
type Step = 'choose' | 'form' | 'success'

type FormState = {
  fullName: string
  phone: string
  birthDate: string
  request: string
  consent: boolean
}

type FormErrors = Partial<Record<'fullName' | 'phone' | 'birthDate' | 'request' | 'consent', string>>

const EMPTY_FORM: FormState = {
  fullName: '',
  phone: '',
  birthDate: '',
  request: '',
  consent: false,
}

const MIN_BIRTH_DATE = '1920-01-01'
const today = new Date().toISOString().slice(0, 10)

const VISITORS: Record<Visitor, { title: string; accent: string; lead: string; intro: string }> = {
  new: {
    title: 'Давайте',
    accent: 'познакомимся',
    lead: 'Заполните короткую анкету — мастер подготовится к вашему первому визиту.',
    intro: 'Я у вас впервые.',
  },
  returning: {
    title: 'Рады видеть',
    accent: 'снова',
    lead: 'Напомните, как вас зовут, и что хотите сделать — остальное мы уже знаем.',
    intro: 'Я уже ваш клиент.',
  },
}

function validate(form: FormState, visitor: Visitor): FormErrors {
  const errors: FormErrors = {}

  if (form.fullName.trim().split(/\s+/).filter(Boolean).length < 2) {
    errors.fullName = 'Укажите фамилию и имя'
  }

  if (visitor === 'new') {
    if (form.phone.replace(/\D/g, '').length < 9) {
      errors.phone = 'Укажите номер, чтобы мы могли подтвердить запись'
    }

    if (!form.birthDate) {
      errors.birthDate = 'Укажите дату рождения'
    } else if (form.birthDate < MIN_BIRTH_DATE || form.birthDate > today) {
      errors.birthDate = 'Проверьте дату рождения'
    }
  }

  if (form.request.trim().length < 3) {
    errors.request = 'Напишите, что хотите сделать'
  }

  if (!form.consent) {
    errors.consent = 'Без согласия мы не сможем обработать заявку'
  }

  return errors
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-')

  return `${day}.${month}.${year}`
}

function buildMessage(form: FormState, visitor: Visitor): string {
  const lines = [
    `Здравствуйте! Хочу записаться в салон ${salon.name}. ${VISITORS[visitor].intro}`,
    `ФИО: ${form.fullName.trim()}`,
  ]

  if (visitor === 'new') {
    lines.push(`Телефон: ${form.phone.trim()}`, `Дата рождения: ${formatDate(form.birthDate)}`)
  }

  lines.push(`Что хочу сделать: ${form.request.trim()}`)

  return lines.join('\n')
}

type BookingModalProps = {
  open: boolean
  onClose: () => void
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const fieldId = useId()
  const [step, setStep] = useState<Step>('choose')
  const [visitor, setVisitor] = useState<Visitor>('new')
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [sentLink, setSentLink] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (open && !dialog.open) {
      dialog.showModal()
    }

    if (!open && dialog.open) {
      dialog.close()
    }

    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const close = () => dialogRef.current?.close()

  // Срабатывает на любое закрытие: крестик, клик по фону, Esc.
  const handleClosed = () => {
    onClose()

    if (step === 'success') {
      setStep('choose')
      setForm(EMPTY_FORM)
      setErrors({})
      setSentLink('')
    }
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      close()
    }
  }

  const chooseVisitor = (value: Visitor) => {
    setVisitor(value)
    setErrors({})
    setStep('form')
  }

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(form, visitor)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const link = `${salon.whatsapp}?text=${encodeURIComponent(buildMessage(form, visitor))}`

    setSentLink(link)
    setStep('success')
    window.open(link, '_blank', 'noopener')
  }

  const copy = VISITORS[visitor]
  const titleId = `${fieldId}-title`

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby={titleId}
      onClose={handleClosed}
      onClick={handleBackdropClick}
    >
      <div className={styles.panel}>
        <Rose className={styles.rose} />

        <div className={styles.top}>
          <div className={styles.progress} aria-hidden="true">
            <span className={styles.active} />
            <span className={step !== 'choose' ? styles.active : undefined} />
          </div>

          {step === 'form' && (
            <button type="button" className={styles.back} onClick={() => setStep('choose')}>
              <Icon name="arrow" size={16} className={styles.backIcon} />
              Назад
            </button>
          )}

          <button type="button" className={styles.close} aria-label="Закрыть" onClick={close}>
            <Icon name="close" size={20} />
          </button>
        </div>

        {step === 'choose' && (
          <div key="choose" className={styles.step}>
            <p className={styles.eyebrow}>Онлайн-запись</p>
            <h2 id={titleId} className={styles.title}>
              Добро пожаловать в <em>{salon.name}</em>
            </h2>
            <p className={styles.lead}>
              Подскажите, вы у нас впервые? Так мы спросим только то, что действительно нужно.
            </p>

            <div className={styles.choices}>
              <button type="button" className={styles.choice} onClick={() => chooseVisitor('new')}>
                <span className={styles.choiceIcon}>
                  <Icon name="sparkle" size={22} />
                </span>
                <span className={styles.choiceText}>
                  <strong>Я в первый раз</strong>
                  <small>ФИО, телефон, дата рождения и ваш запрос</small>
                </span>
                <Icon name="arrow" size={18} className={styles.choiceArrow} />
              </button>

              <button
                type="button"
                className={styles.choice}
                onClick={() => chooseVisitor('returning')}
              >
                <span className={styles.choiceIcon}>
                  <Icon name="star" size={20} />
                </span>
                <span className={styles.choiceText}>
                  <strong>Я уже ваш клиент</strong>
                  <small>Только ФИО и что хотите сделать</small>
                </span>
                <Icon name="arrow" size={18} className={styles.choiceArrow} />
              </button>
            </div>
          </div>
        )}

        {step === 'form' && (
          <form key={`form-${visitor}`} className={styles.step} onSubmit={handleSubmit} noValidate>
            <p className={styles.eyebrow}>
              {visitor === 'new' ? 'Первый визит' : 'Повторный визит'}
            </p>
            <h2 id={titleId} className={styles.title}>
              {copy.title} <em>{copy.accent}</em>
            </h2>
            <p className={styles.lead}>{copy.lead}</p>

            <div className={styles.fields}>
              <div className={`${styles.field} ${styles.wide}`}>
                <label htmlFor={`${fieldId}-name`}>ФИО</label>
                <input
                  id={`${fieldId}-name`}
                  className={errors.fullName ? styles.invalid : undefined}
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  placeholder="Иванова Айпери Маратовна"
                  value={form.fullName}
                  onChange={(event) => setField('fullName', event.target.value)}
                />
                {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
              </div>

              {visitor === 'new' && (
                <>
                  <div className={styles.field}>
                    <label htmlFor={`${fieldId}-phone`}>Телефон</label>
                    <input
                      id={`${fieldId}-phone`}
                      className={errors.phone ? styles.invalid : undefined}
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+996 700 123 456"
                      value={form.phone}
                      onChange={(event) => setField('phone', event.target.value)}
                    />
                    {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor={`${fieldId}-birth`}>Дата рождения</label>
                    <input
                      id={`${fieldId}-birth`}
                      className={errors.birthDate ? styles.invalid : undefined}
                      type="date"
                      name="birthDate"
                      autoComplete="bday"
                      min={MIN_BIRTH_DATE}
                      max={today}
                      value={form.birthDate}
                      onChange={(event) => setField('birthDate', event.target.value)}
                    />
                    {errors.birthDate && <p className={styles.error}>{errors.birthDate}</p>}
                  </div>
                </>
              )}

              <div className={`${styles.field} ${styles.wide}`}>
                <label htmlFor={`${fieldId}-request`}>Что хотите сделать</label>
                <textarea
                  id={`${fieldId}-request`}
                  className={errors.request ? styles.invalid : undefined}
                  name="request"
                  rows={4}
                  placeholder="Например: окрашивание в тёплый блонд и уход за длиной"
                  value={form.request}
                  onChange={(event) => setField('request', event.target.value)}
                />
                {errors.request && <p className={styles.error}>{errors.request}</p>}
              </div>

              <div className={`${styles.consent} ${styles.wide}`}>
                <label htmlFor={`${fieldId}-consent`}>
                  <input
                    id={`${fieldId}-consent`}
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={(event) => setField('consent', event.target.checked)}
                  />
                  <span>{consentText}</span>
                </label>
                {errors.consent && <p className={styles.error}>{errors.consent}</p>}
              </div>
            </div>

            <Button type="submit" size="lg" icon="whatsapp" iconPosition="start" className={styles.submit}>
              Отправить в WhatsApp
            </Button>
          </form>
        )}

        {step === 'success' && (
          <div key="success" className={`${styles.step} ${styles.success}`}>
            <span className={styles.successIcon}>
              <Icon name="check" size={28} />
            </span>

            <h2 id={titleId} className={styles.title}>
              Заявка <em>готова</em>
            </h2>
            <p className={styles.lead}>
              Мы открыли WhatsApp с вашим сообщением — осталось нажать «Отправить». Если окно не
              появилось, откройте его кнопкой ниже.
            </p>

            <div className={styles.successActions}>
              <Button href={sentLink} target="_blank" rel="noreferrer" icon="whatsapp" iconPosition="start">
                Открыть WhatsApp
              </Button>
              <Button type="button" variant="ghost" onClick={close}>
                Готово
              </Button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  )
}
