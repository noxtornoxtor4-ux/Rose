import { createContext, useContext } from 'react'

type BookingModalApi = {
  openBooking: () => void
}

export const BookingModalContext = createContext<BookingModalApi | null>(null)

/** Открывает окно онлайн-записи из любой кнопки на странице. */
export function useBookingModal(): BookingModalApi {
  const context = useContext(BookingModalContext)

  if (!context) {
    throw new Error('useBookingModal должен вызываться внутри BookingModalProvider')
  }

  return context
}
