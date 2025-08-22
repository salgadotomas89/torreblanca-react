import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Heart,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Escuela Torreblanca</h3>
              </div>
            </div>
            <p className="text-muted-foreground">Escuela de lenguaje en San Javier, Región del Maule.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-primary" />
              Colegio
            </h4>
            <ul className="space-y-2">
              <li>
                <Badge variant="secondary" className="cursor-pointer">
                  Misión
                </Badge>
              </li>
              <li>
                <Badge variant="secondary" className="cursor-pointer">
                  Visión
                </Badge>
              </li>
              <li>
                <Badge variant="secondary" className="cursor-pointer">
                  Valores
                </Badge>
              </li>
              <li>
                <Badge variant="secondary" className="cursor-pointer">
                  Directiva
                </Badge>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center">
              <Heart className="w-4 h-4 mr-2 text-accent" />
              Ayuda
            </h4>
            <ul className="space-y-2">
              <li>
                <Badge variant="outline" className="cursor-pointer">
                  Admisión
                </Badge>
              </li>
              <li>
                <Badge variant="outline" className="cursor-pointer">
                  Noticias
                </Badge>
              </li>
              <li>
                <Badge variant="outline" className="cursor-pointer">
                  Fotos
                </Badge>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-secondary" />
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span>San Javier, Región del Maule</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
                <span>contacto@torreblanca.cl</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
                <span>+56 9 1234 5678</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Escuela de Lenguaje Torreblanca. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
