import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import styles from './Button.module.scss'

type BaseProps = {
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'lg'
  icon?: IconName
  iconPosition?: 'start' | 'end'
  children: ReactNode
  className?: string
}

type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type ActionProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }

/** Кнопка-ссылка (с href) или обычная кнопка формы (без href). */
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'end',
  children,
  className,
  ...rest
}: LinkProps | ActionProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && iconPosition === 'start' && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {icon && iconPosition === 'end' && <Icon name={icon} size={18} />}
    </>
  )

  if ('href' in rest && rest.href) {
    const linkProps = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

    return (
      <a className={classes} {...linkProps}>
        {content}
      </a>
    )
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>

  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  )
}
