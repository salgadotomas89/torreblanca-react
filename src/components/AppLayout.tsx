import type { ReactNode } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
      
      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg animate-pulse-glow"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
