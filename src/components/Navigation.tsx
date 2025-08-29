import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/assets/rangolilogo.png";



const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "होम", name_en: "Home", href: "/" },
    { name: "मेनू", name_en: "Menu", href: "/menu" },
    { name: "गैलरी", name_en: "Gallery", href: "/gallery" },
    { name: "संपर्क", name_en: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-navbar backdrop-blur-xl border-b border-dhaba-gold/20 shadow-premium">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <img
              src={Logo}
              alt="Rangoli Dhaba Logo"
              className="w-12 sm:w-14 h-auto object-contain group-hover:scale-110 transition-[var(--transition-bounce)]"
            />
            <div className="flex flex-col">
              <span className="dhaba-heading text-base sm:text-lg leading-none text-dhaba-cream">
                Rangoli Dhaba & Restaurant
              </span>
              <span className="dhaba-hindi text-xs text-dhaba-gold hidden sm:block">
                स्वाद जो घर की याद दिला दे
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center space-y-1 py-2 px-2 lg:px-3 rounded-lg transition-[var(--transition-smooth)] group text-sm lg:text-base",
                  location.pathname === item.href
                    ? "bg-dhaba-gold/20 text-dhaba-gold border border-dhaba-gold/30"
                    : "text-dhaba-cream/70 hover:text-dhaba-cream hover:bg-dhaba-charcoal-light/50"
                )}
              >
                <span className="dhaba-hindi text-xs lg:text-sm group-hover:scale-110 transition-transform">
                  {item.name}
                </span>
                <span className="text-xs font-medium">{item.name_en}</span>
              </Link>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="hidden xl:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="space-x-2"
              onClick={() => window.open("https://maps.app.goo.gl/EHgGouzUh3uRBoES7", "_blank")}
            >
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </Button>

          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-3 sm:py-4 border-t border-dhaba-gold/20 bg-gradient-glass backdrop-blur-xl">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-[var(--transition-smooth)]",
                    location.pathname === item.href
                      ? "bg-dhaba-gold/20 text-dhaba-gold border border-dhaba-gold/30"
                      : "text-dhaba-cream/70 hover:text-dhaba-cream hover:bg-dhaba-charcoal-light/50"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="dhaba-hindi font-medium text-sm sm:text-base">{item.name}</span>
                    <span className="text-xs sm:text-sm">{item.name_en}</span>
                  </div>
                </Link>
              ))}

              {/* Mobile Quick Actions */}
              <div className="pt-3 sm:pt-4 border-t border-dhaba-gold/20">
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="dhaba"
                    className="w-full justify-start space-x-2 sm:space-x-3 text-sm sm:text-base"
                    onClick={() => window.open("tel:+918077814773", "_blank")}
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>कॉल करें - Call Now</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start space-x-2 sm:space-x-3 text-sm sm:text-base"
                    onClick={() => window.open("https://maps.app.goo.gl/EHgGouzUh3uRBoES7", "_blank")}
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>स्थान - Location</span>
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;