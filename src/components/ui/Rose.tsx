import type { SVGProps } from 'react'

/**
 * Линейная роза в редакционном стиле: спиральный бутон, раскрытые лепестки и стебель.
 * Рисуется обводкой цвета currentColor, поэтому тон задаётся через CSS `color`.
 */
export function Rose({ strokeWidth = 1.2, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {/* сердцевина-спираль */}
      <path d="M60 44c4-1 7 2 6 6-1 5-8 7-12 3-4-5 0-13 7-14 9-1 15 7 13 15-2 9-13 14-22 9" />
      {/* внутренние лепестки */}
      <path d="M44 48c-2 11 4 21 16 23 12 2 22-6 22-18" />
      <path d="M48 36c4-8 15-11 23-6 6 4 9 11 8 17" />
      {/* внешние лепестки */}
      <path d="M38 42c-9 6-12 18-6 28 6 11 20 15 31 12" />
      <path d="M82 40c9 5 13 16 9 27-4 10-14 15-25 15" />
      <path d="M40 34c2-12 14-20 26-18 11 2 19 10 20 20" />
      <path d="M33 60c-5 11-1 24 10 29 8 4 18 3 24-2" />
      <path d="M88 58c4 12-1 24-12 28" />
      {/* чашелистик и стебель */}
      <path d="M50 88c4 3 7 4 10 4s7-1 11-4" />
      <path d="M60 92c-1 18 1 38 2 62" />
      {/* листья */}
      <path d="M61 116c-10-8-22-9-30-3 9 6 21 8 30 3Z" />
      <path d="M61 132c9-9 21-12 30-6-8 7-20 10-30 6Z" />
    </svg>
  )
}
