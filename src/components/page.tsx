import { useState } from "react"
import Layout from "./AppLayout"
import HomePage from "./HomePage"
import EventsPage from "./EventsPage"

export default function EscuelaTorreblancaLanding() {
  const [currentPage, setCurrentPage] = useState<'home' | 'events'>('home')

  const handleShowEvents = () => {
    setCurrentPage('events')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  return (
    <Layout>
      {currentPage === 'home' && <HomePage onShowEvents={handleShowEvents} />}
      {currentPage === 'events' && <EventsPage onBack={handleBackToHome} />}
    </Layout>
  )
}
