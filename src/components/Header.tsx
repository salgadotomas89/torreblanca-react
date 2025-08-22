"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">
                <span className="text-primary">Escuela</span> <span className="text-secondary">de</span>{" "}
                <span className="text-accent">Lenguaje</span> <span className="text-primary">Torreblanca</span>
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
