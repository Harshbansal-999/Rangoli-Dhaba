import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ZoomIn, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dalMakhaniImg from "@/assets/dal-makhani.jpg";
import tandoorKitchenImg from "@/assets/tandoor-kitchen.jpg";
import familyDiningImg from "@/assets/family-dining.jpg";
import butterChickenImg from "@/assets/butter-chicken.jpg";
import weddingCateringImg from "@/assets/wedding-catering.jpg";
import spicesCollectionImg from "@/assets/spices-collection.jpg";
import rajasthaniThaliImg from "@/assets/rajasthani-thali.jpg";
import cozyCornerImg from "@/assets/cozy-corner.jpg";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const galleryRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", name: "All Photos", name_hindi: "सभी फोटो" },
    { id: "food", name: "Food", name_hindi: "खाना" },
    { id: "ambience", name: "Ambience", name_hindi: "माहौल" },
    { id: "kitchen", name: "Kitchen", name_hindi: "रसोई" },
    { id: "events", name: "Events", name_hindi: "कार्यक्रम" }
  ];

  const galleryImages = [
    {
      id: 1,
      url: dalMakhaniImg,
      title: "Dal Makhani",
      title_hindi: "दाल मखनी",
      category: "food",
      description: "Creamy and rich Dal Makhani"
    },
    {
      id: 2,
      url: tandoorKitchenImg,
      title: "Tandoor Kitchen",
      title_hindi: "तंदूर रसोई",
      category: "kitchen",
      description: "Our traditional tandoor in action"
    },
    {
      id: 3,
      url: familyDiningImg,
      title: "Family Dining",
      title_hindi: "पारिवारिक भोजन",
      category: "ambience",
      description: "Warm family dining area"
    },
    {
      id: 4,
      url: butterChickenImg,
      title: "Butter Chicken",
      title_hindi: "बटर चिकन",
      category: "food",
      description: "Our signature Butter Chicken"
    },
    {
      id: 5,
      url: weddingCateringImg,
      title: "Wedding Catering",
      title_hindi: "शादी का खाना",
      category: "events",
      description: "Special wedding catering setup"
    },
    {
      id: 6,
      url: spicesCollectionImg,
      title: "Spice Collection",
      title_hindi: "मसाला संग्रह",
      category: "kitchen",
      description: "Our collection of authentic spices"
    },
    {
      id: 7,
      url: rajasthaniThaliImg,
      title: "Thali Special",
      title_hindi: "थाली स्पेशल",
      category: "food",
      description: "Complete traditional thali"
    },
    {
      id: 8,
      url: cozyCornerImg,
      title: "Cozy Corner",
      title_hindi: "आरामदायक कोना",
      category: "ambience",
      description: "Perfect spot for intimate dining"
    },
    {
      id: 9,
      url: "/lovable-uploads/8d1cdd41-c307-420a-b71e-7236fe9aea12.png",
      title: "Fresh Ingredients",
      title_hindi: "ताज़ी सामग्री",
      category: "kitchen",
      description: "Fresh vegetables and spices used in our kitchen"
    }
  ];

  const filteredImages = galleryImages.filter(
    image => filter === "all" || image.category === filter
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate gallery items on scroll
      gsap.fromTo(
        ".gallery-item",
        { 
          opacity: 0, 
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, [filteredImages]);

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const selectedImageData = galleryImages.find(img => img.id === selectedImage);

  return (
    <div 
      ref={galleryRef} 
      className="min-h-screen pt-16 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: 'url(/lovable-uploads/dhaba.jpg)' }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-dhaba-premium-black/70 backdrop-blur-[1px]"></div>
      
      {/* All content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Header */}
        <section className="py-8 sm:py-16 md:py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 steam-effect spice-particles opacity-30" />
          <div className="container mx-auto text-center relative z-10">
            
            <h2 className="dhaba-heading text-5xl sm:text-5xl md:text-5xl lg:text-6xl text-dhaba-cream mb-4  ">
              Photo Gallery
            </h2>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-dhaba-gold font-semibold mb-4 md:mb-6 font-kalam">
              फोटो गैलरी
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-dhaba-cream/80 max-w-2xl mx-auto">
              Take a visual journey through our authentic dishes, warm ambience, and memorable moments
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-4 md:py-4">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={filter === category.id ? "dhaba" : "outline"}
                onClick={() => setFilter(category.id)}
                className="flex-col h-auto py-2 md:py-3 px-3 md:px-6 bg-dhaba-charcoal/40 border-dhaba-gold/20 text-dhaba-cream hover:bg-dhaba-gold hover:text-dhaba-charcoal text-xs sm:text-sm"
              >
                
                <span className="dhaba-hindi text-xs sm:text-sm ">{category.name}</span>
                <span className="text-xs font-Playpen">{category.name_hindi}</span>
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item group cursor-pointer"
                onClick={() => openLightbox(image.id)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-card group-hover:shadow-warm transition-all duration-300 bg-dhaba-charcoal/60 border border-dhaba-gold/20 hover:border-dhaba-gold/60">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dhaba-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                      
                      <p className="dhaba-hindi text-white font-semibold text-base md:text-lg mb-1 ">
                        {image.title}
                      </p>
                      <h3 className="text-dhaba-cream/80 text-xs md:text-sm font-Playpen">
                        {image.title_hindi}
                      </h3>
                    </div>
                    
                    <div className="absolute top-3 md:top-4 right-3 md:right-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-dhaba-gold/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 md:top-4 left-3 md:left-4">
                    <Badge variant="secondary" className="bg-dhaba-gold text-dhaba-charcoal text-xs">
                      {categories.find(cat => cat.id === image.category)?.name}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-dhaba-cream/70">No images found in this category</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && selectedImageData && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-dhaba-charcoal/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/10 z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImageData.url}
                alt={selectedImageData.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-deep"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dhaba-charcoal/90 to-transparent p-6 rounded-b-lg">
              <h4 className="dhaba-hindi text-white text-2xl font-semibold mb-2  ">
                  {selectedImageData.title}
                </h4>
                <h3 className="text-dhaba-gold text-xl font-medium mb-2 font-Playpen">
                  {selectedImageData.title_hindi}
                </h3>
                
                <p className="text-dhaba-cream/80">
                  {selectedImageData.description}
                </p>
                
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;