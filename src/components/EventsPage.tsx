"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Loader2 } from "lucide-react"

interface Event {
  id: number
  titulo: string
  texto: string
  fecha: string
}

interface EventsPageProps {
  onBack: () => void
}

export default function EventsPage({ onBack }: EventsPageProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://escuelatorreblanca.cl/api/eventos/')
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      // Manejar diferentes estructuras de respuesta de la API
      const eventsArray = data.results || data.data || data || []
      setEvents(Array.isArray(eventsArray) ? eventsArray : [])
    } catch (err) {
      console.error('Error fetching events:', err)
      setError(err instanceof Error ? err.message : 'No se pudieron cargar los eventos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    return eventDate >= today
  }

  const upcomingEvents = events.filter(event => isUpcoming(event.fecha))
  const pastEvents = events.filter(event => !isUpcoming(event.fecha))

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Eventos Escolares
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre todos los eventos y actividades especiales de nuestra escuela
            </p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
            <h3 className="text-2xl font-semibold mb-2">Cargando eventos...</h3>
            <p className="text-muted-foreground">
              Por favor espera mientras cargamos los eventos más recientes
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h3 className="text-2xl font-semibold mb-2 text-red-600">Error al cargar eventos</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchEvents} variant="outline">
              Intentar de nuevo
            </Button>
          </div>
        ) : (
          <>
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-secondary">
              Próximos Eventos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {formatDate(event.fecha)}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {event.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {event.texto}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-muted-foreground">
              Eventos Anteriores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="group hover:shadow-md transition-all duration-300 opacity-80 hover:opacity-100">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {formatDate(event.fecha)}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-muted-foreground group-hover:text-foreground transition-colors">
                      {event.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {event.texto}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {events.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">No hay eventos programados</h3>
            <p className="text-muted-foreground">
              Mantente atento a futuras actividades y eventos escolares
            </p>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  )
}
