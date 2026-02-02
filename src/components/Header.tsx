import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">L</span>
          </div>
          <span className="text-2xl font-bold text-foreground">Lyfex</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Live
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Community
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Register
          </Button>
          <Button className="gradient-orange text-primary-foreground hover:opacity-90">
            Login
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/50 py-4 px-4 animate-fade-in">
          <nav className="flex flex-col gap-4 mb-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Live
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Community
            </a>
          </nav>
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full">
              Register
            </Button>
            <Button className="gradient-orange text-primary-foreground hover:opacity-90 w-full">
              Login
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
