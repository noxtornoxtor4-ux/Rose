import { useMemo, useState, type ReactNode } from 'react'
import { BookingModal } from './BookingModal'
import { BookingModalContext } from './context'

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const api = useMemo(() => ({ openBooking: () => setIsOpen(true) }), [])

  return (
    <BookingModalContext.Provider value={api}>
      {children}
      <BookingModal open={isOpen} onClose={() => setIsOpen(false)} />
    </BookingModalContext.Provider>
  )
}
