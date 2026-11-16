import type { SVGProps } from 'react'

export type IconName =
  | 'pin'
  | 'clock'
  | 'phone'
  | 'whatsapp'
  | 'sparkle'
  | 'star'
  | 'check'
  | 'arrow'
  | 'close'

const paths: Record<IconName, string> = {
  pin: 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z',
  clock:
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm-.9 2.6h1.8v4.6l3.4 2-.9 1.6-4.3-2.6V7.6Z',
  phone:
    'M6.6 3h3l1.5 3.8-2 1.5a12.4 12.4 0 0 0 6.6 6.6l1.5-2L21 14.4v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z',
  whatsapp:
    'M12 2.8a9.1 9.1 0 0 0-7.8 13.8L3 21.4l4.9-1.3A9.1 9.1 0 1 0 12 2.8Zm0 2a7.1 7.1 0 1 1-3.6 13.2l-.4-.2-2.5.6.7-2.4-.3-.4A7.1 7.1 0 0 1 12 4.8Zm-3 3.4c-.2 0-.5.1-.7.4-.3.3-.9.8-.9 2s.9 2.3 1 2.5c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.6.7 3 .6.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4l-.7-.4-1.5-.7c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.9 6.9 0 0 1-3.4-3c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.2-.3.3-.5v-.5l-.7-1.6c-.2-.4-.3-.4-.5-.4Z',
  sparkle: 'M12 2.8 14 9l6.2 2-6.2 2-2 6.2-2-6.2L3.8 11 10 9l2-6.2Z',
  star: 'M12 2.8 14.8 9l6.7.6-5 4.4 1.5 6.6-6-3.5-6 3.5L7.5 14l-5-4.4L9.2 9 12 2.8Z',
  check: 'M9.8 16.2 5.6 12l-1.4 1.4 5.6 5.6L20 8.8 18.6 7.4 9.8 16.2Z',
  arrow: 'M13.2 5.6 11.8 7l4 4H4v2h11.8l-4 4 1.4 1.4L19.6 12l-6.4-6.4Z',
  close:
    'M18.3 7.1 16.9 5.7 12 10.6 7.1 5.7 5.7 7.1 10.6 12l-4.9 4.9 1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-4.9-4.9 4.9-4.9Z',
}

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName
  size?: number
}

export function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  )
}
