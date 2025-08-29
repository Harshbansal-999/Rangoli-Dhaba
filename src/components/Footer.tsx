import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from "@/assets/rangolilogo.png";

const Footer = () => {
  return (
    <footer className="bg-dhaba-premium-black text-dhaba-cream">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={Logo}
                alt="Family Dhaba"
                className="w-16 h-16 rounded-full"
              />
              <h3 className="dhaba-hindi text-xl font-bold text-dhaba-gold">
                Rangoli Dhaba & Restaurant
              </h3>
            </div>
            <p className="text-dhaba-cream/80 text-sm leading-relaxed">
              Authentic Indian cuisine prepared with love and traditional recipes passed down through generations. Experience the true taste of India at Rangoli Dhaba & Restaurant.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-dhaba-gold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-dhaba-cream/80 hover:text-dhaba-gold transition-colors text-sm">
                Home
              </Link>
              <Link to="/menu" className="block text-dhaba-cream/80 hover:text-dhaba-gold transition-colors text-sm">
                Menu
              </Link>
              <Link to="/gallery" className="block text-dhaba-cream/80 hover:text-dhaba-gold transition-colors text-sm">
                Gallery
              </Link>
              <Link to="/contact" className="block text-dhaba-cream/80 hover:text-dhaba-gold transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-dhaba-gold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-dhaba-gold mt-0.5 flex-shrink-0" />
                <div className="text-sm text-dhaba-cream/80">
                  <p>Rangoli Dhaba & restaurant, near state bank chauraha,</p>
                  <p>Brij Nagar Colony, Manoharpura, Mathura, Uttar Pradesh 281001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-dhaba-gold flex-shrink-0" />
                <p className="text-sm text-dhaba-cream/80">+91 8077814773</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-dhaba-gold flex-shrink-0" />
                <p className="text-sm text-dhaba-cream/80">therangolidhaba@gmail.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-dhaba-gold mt-0.5 flex-shrink-0" />
                <div className="text-sm text-dhaba-cream/80">
                  <p>Mon - Sun: 11:00 AM - 11:00 PM</p>
                  <p>Kitchen closes at 10:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-dhaba-gold">Legal & Support</h4>
            <div className="space-y-2">
              <Link to="/privacy-policy" className="block text-dhaba-cream/80 hover:text-dhaba-gold transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="block text-dhaba-cream/80 hover:text-dhaba-gold transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dhaba-gold/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-dhaba-cream/60">
              © 2025 Rangoli Dhaba & Restaurant. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-dhaba-cream/60">
              <span>Made with ❤️ in Mathura</span>
              <span>•</span>
              <span>Authentic Since 2018</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;