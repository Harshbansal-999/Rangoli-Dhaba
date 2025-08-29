import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Phone, MapPin, Calendar, Star, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackgroundImage from "@/assets/hero-background.jpg";
import heroFoodImage from "@/assets/hero-food-image.jpg";
import tandoorCooking from "@/assets/tandoor-cooking.jpg";
import spicesCollection from "@/assets/spices-collection.jpg";
import chefHands from "@/assets/chef-hands.jpg";
import madeWithLove from "@/assets/made-with-love.jpg";



const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slideshowImages = [
    heroFoodImage,
    tandoorCooking,
    spicesCollection,
    chefHands,
    madeWithLove
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 60,
      });

      gsap.set(slideshowRef.current, {
        opacity: 0,
        x: 100,
        scale: 0.8,
      });

      // Hero animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      })
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }, "-=0.8")
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.6")
        .to(slideshowRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }, "-=1.2");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Automatic slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-dhaba-premium-black/75" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 pt-20 pb-8 md:pt-8 lg:py-0">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[90vh] lg:min-h-[80vh]">

            {/* Left Content */}
            <div className="text-center md:text-left">
              {/* Rating */}
              <div ref={titleRef} className="mb-6">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                  <div className="flex text-dhaba-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                    ))}
                  </div>
                  <span className="text-dhaba-cream text-base sm:text-lg">4.8/5 Rating</span>
                </div>

                {/* Main Title */}
                <h1 className="dhaba-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-dhaba-cream mb-4 drop-shadow-2xl leading-tight">
                  Rangoli Dhaba
                </h1>
                <p className="dhaba-hindi text-xl sm:text-2xl lg:text-3xl text-dhaba-gold-light font-medium">
                  स्वाद जो घर की याद दिला दे...
                </p>
              </div>

              {/* Subtitle */}
              <div ref={subtitleRef} className="mb-8">
                <p className="text-lg sm:text-xl lg:text-2xl text-dhaba-cream/90 leading-relaxed">
                  Authentic home-style flavors, crafted from timeless family recipes. Experience the warmth of dining that feels just like home
                </p>
                <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-8 mt-6 text-dhaba-cream/80">
                  <div className="flex items-center space-x-2">
                    <ChefHat className="w-5 h-5" />
                    <span className="text-base">Traditional Recipes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span className="text-base">Premium Quality</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div ref={ctaRef} className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
                <Button
                  variant="premium"
                  onClick={() => window.location.href = "/contact"}
                  className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base space-x-2 sm:space-x-3 group"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  <span>Call Now</span>
                </Button>


                <Button
                  variant="premium"
                  onClick={() => window.location.href = "/contact"}
                  className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base space-x-2 sm:space-x-3 group"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  <span>Find Us</span>
                </Button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="dhaba-card bg-dhaba-charcoal-light/60 border-dhaba-gold/40 backdrop-blur-md text-center p-4">
                  <div className="text-dhaba-gold text-xl lg:text-2xl font-bold">25+</div>
                  <div className="text-dhaba-cream text-xs lg:text-sm mt-1">Years Experience</div>
                </div>
                <div className="dhaba-card bg-dhaba-charcoal-light/60 border-dhaba-gold/40 backdrop-blur-md text-center p-4">
                  <div className="text-dhaba-gold text-xl lg:text-2xl font-bold">100+</div>
                  <div className="text-dhaba-cream text-xs lg:text-sm mt-1">Authentic Dishes</div>
                </div>
                <div className="dhaba-card bg-dhaba-charcoal-light/60 border-dhaba-gold/40 backdrop-blur-md text-center p-4">
                  <div className="text-dhaba-gold text-xl lg:text-2xl font-bold">24/7</div>
                  <div className="text-dhaba-cream text-xs lg:text-sm mt-1">Home Delivery</div>
                </div>
              </div>
            </div>

            {/* Right Slideshow - Hidden on mobile, visible on tablet+ */}
            <div className="hidden md:flex justify-center lg:justify-end">
              <div
                ref={slideshowRef}
                className="relative w-[90%] max-w-lg h-[28rem] sm:h-[32rem] lg:h-[36rem] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-2xl"
              >
                {slideshowImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`Food ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Slideshow indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {slideshowImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-dhaba-gold w-6' : 'bg-white/50'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 lg:w-6 lg:h-10 border-2 border-dhaba-gold rounded-full flex justify-center">
          <div className="w-1 h-2 lg:h-3 bg-dhaba-gold rounded-full mt-1 lg:mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;