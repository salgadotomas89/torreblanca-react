"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Users,
  Music,
  Palette,
  Calculator,
  Globe,
  Trophy,
  Lightbulb,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
} from "lucide-react"
import heroImage from '../assets/hero.JPG'
import { usePrimaryColegio } from '@/hooks/useColegio'

interface HomePageProps {
  onShowEvents: () => void
}

export default function HomePage({ onShowEvents }: HomePageProps) {
  const { colegio, loading, error } = usePrimaryColegio();

  const activities = [
    {
      icon: Palette,
      title: "Arte y Creatividad",
      description: "Pintura, dibujo y manualidades para expresar la creatividad de cada niño",
    },
    {
      icon: Music,
      title: "Música y Canto",
      description: "Desarrollo musical con instrumentos y coros infantiles para estimular el oído",
    },
    {
      icon: Calculator,
      title: "Matemáticas Divertidas",
      description: "Aprendizaje de números y operaciones a través de juegos educativos",
    },
    {
      icon: Globe,
      title: "Idiomas",
      description: "Inglés y otros idiomas de manera natural y divertida para los pequeños",
    },
    {
      icon: Trophy,
      title: "Deportes y Recreación",
      description: "Actividades físicas que promueven el trabajo en equipo y la vida saludable",
    },
    {
      icon: Lightbulb,
      title: "Ciencias Exploratorias",
      description: "Experimentos y descubrimientos que despiertan la curiosidad científica",
    },
  ]

  const teachers = [
    { name: "María González", role: "Educadora Diferencial", experience: "8 años", subjects: "3 asignaturas" },
    { name: "Carmen Silva", role: "Fonoaudióloga", experience: "6 años", subjects: "2 asignaturas" },
    { name: "Ana Martínez", role: "Psicopedagoga", experience: "5 años", subjects: "4 asignaturas" },
  ]

  const faqs = [
    {
      question: "¿Cuál es la edad de ingreso a la escuela?",
      answer:
        "Recibimos niños y niñas desde los 3 hasta los 6 años de edad, enfocándonos en el desarrollo del lenguaje en estas etapas cruciales.",
    },
    {
      question: "¿Qué metodología utilizan para la enseñanza?",
      answer:
        "Utilizamos metodologías lúdicas y participativas, adaptadas a las necesidades específicas de cada niño, con énfasis en el desarrollo del lenguaje oral y escrito.",
    },
    {
      question: "¿Cuáles son los horarios de atención?",
      answer:
        "Nuestros horarios son de lunes a viernes de 8:00 AM a 4:00 PM, con jornadas completas y medias jornadas disponibles según las necesidades de las familias.",
    },
    {
      question: "¿Cómo es el proceso de admisión?",
      answer:
        "El proceso incluye una entrevista inicial con los padres, evaluación del niño por nuestro equipo profesional y posterior matrícula. Contáctanos para más detalles.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        {/* Background with hero image and overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Animated bubbles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-white/20 rounded-full animate-bubble"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 1.3}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-12 bg-white/20 rounded mb-6"></div>
                <div className="h-6 bg-white/20 rounded mb-8 max-w-2xl mx-auto"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6 text-red-400 mr-2" />
                <span className="text-white">Error cargando información del colegio</span>
              </div>
            ) : (
              <>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                  <span className="text-white animate-float">Bienvenidos</span> <span className="text-white/90">a</span>
                  <br />
                  <span className="text-white">{colegio?.nombre || 'Escuela Torreblanca'}</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
                  Educación de calidad en {colegio?.direccion || 'San Javier'} para el desarrollo del lenguaje en niños y niñas
                </p>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow">
                Conoce Más
              </Button>
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6"
                onClick={onShowEvents}
              >
                Ver Eventos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nueva Sección con fondo blanco */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegirnos?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Somos más que una escuela, somos una comunidad comprometida con el desarrollo integral de cada niño
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Educación Personalizada</h3>
              <p className="text-muted-foreground">
                Atención individualizada para cada estudiante, respetando sus ritmos y necesidades
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excelencia Académica</h3>
              <p className="text-muted-foreground">
                Programas educativos de alta calidad con énfasis en el desarrollo integral
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovación Constante</h3>
              <p className="text-muted-foreground">
                Metodologías modernas y actualizadas para un aprendizaje efectivo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Actividades</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Aprendizaje divertido a través de actividades creativas y educativas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <activity.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">{activity.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Communications Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              {colegio?.logo_url ? (
                <img
                  src={colegio.logo_url}
                  alt={`Logo de ${colegio.nombre}`}
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
              ) : (
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Niños aprendiendo"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
              )}
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Comunicados</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Explore los comunicados más recientes del colegio, abarcando temas esenciales en diversas áreas
                académicas y administrativas. Manténgase informado con las últimas actualizaciones y anuncios
                importantes.
              </p>
              <Button size="lg" variant="default">
                Ver todos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      {colegio && !loading && (
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Información de Contacto</h2>
              <p className="text-xl text-muted-foreground">
                Mantente en contacto con nuestra institución educativa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">Teléfono</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg font-medium">
                    {colegio.telefono}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg font-medium">
                    <a 
                      href={`mailto:${colegio.email}`}
                      className="text-primary hover:underline"
                    >
                      {colegio.email}
                    </a>
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">Dirección</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg font-medium">
                    {colegio.direccion}
                    {colegio.region && (
                      <>
                        <br />
                        <span className="text-sm text-muted-foreground">
                          {colegio.region}, {colegio.pais}
                        </span>
                      </>
                    )}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {colegio.horario && (
              <div className="text-center mt-8">
                <Card className="max-w-md mx-auto">
                  <CardHeader>
                    <CardTitle className="text-xl">Horario de Atención</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg font-medium">
                      {colegio.horario}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Teachers Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Educadoras</h2>
            <p className="text-xl text-muted-foreground">
              Profesionales comprometidas con el desarrollo integral de cada niño
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{teacher.name}</CardTitle>
                  <CardDescription className="text-lg font-medium text-secondary">{teacher.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-primary">{teacher.experience}</div>
                      <div className="text-muted-foreground">Experiencia</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-accent">{teacher.subjects}</div>
                      <div className="text-muted-foreground">Asignaturas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline">
              Ver todas las educadoras
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Preguntas Frecuentes</h2>
              <p className="text-xl text-muted-foreground">
                Encuentra respuestas a las consultas más comunes de nuestra comunidad educativa
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">¿No encontraste la respuesta que buscabas?</p>
              <Button variant="outline">Contáctanos</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
