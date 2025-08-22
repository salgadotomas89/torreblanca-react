"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import { usePrimaryColegio } from '@/hooks/useColegio'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { colegio, loading } = usePrimaryColegio()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center overflow-hidden">
              {loading ? (
                <BookOpen className="w-6 h-6 text-primary-foreground animate-pulse" />
              ) : colegio?.logo_url ? (
                <img 
                  src={colegio.logo_url} 
                  alt={`Logo de ${colegio.nombre}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Si falla la carga de la imagen, mostrar el icono por defecto
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<svg class="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>';
                  }}
                />
              ) : (
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              )}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-5 bg-primary/20 rounded w-48"></div>
                  </div>
                ) : colegio ? (
                  <span className="text-primary">{colegio.nombre}</span>
                ) : (
                  <>
                    <span className="text-primary">Escuela</span> <span className="text-secondary">de</span>{" "}
                    <span className="text-accent">Lenguaje</span> <span className="text-primary">Torreblanca</span>
                  </>
                )}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Noticias
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Inicio
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Fotos
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Contacto
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Colegio <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="default" size="sm">
              Login
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start">
                Noticias
              </Button>
              <Button variant="ghost" className="justify-start">
                Inicio
              </Button>
              <Button variant="ghost" className="justify-start">
                Fotos
              </Button>
              <Button variant="ghost" className="justify-start">
                Contacto
              </Button>
              <Button variant="ghost" className="justify-start">
                Colegio
              </Button>
              <Button variant="default" size="sm" className="w-fit">
                Login
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
