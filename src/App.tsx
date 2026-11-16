import { BookingModalProvider } from './components/BookingModal/BookingModalProvider'
import { Contacts } from './components/Contacts/Contacts'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { MobileCta } from './components/MobileCta/MobileCta'
import { RoseBackground } from './components/RoseBackground/RoseBackground'
import styles from './App.module.scss'

function App() {
  return (
    <BookingModalProvider>
      <div className={styles.page}>
        <RoseBackground />

        <div className={styles.content}>
          <Header />

          <main>
            <Hero />
            <Contacts />
          </main>

          <Footer />
          <MobileCta />
        </div>
      </div>
    </BookingModalProvider>
  )
}

export default App
