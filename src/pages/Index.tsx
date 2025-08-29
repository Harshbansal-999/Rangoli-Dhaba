import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChefHat,
  Star,
  Clock,
  Heart,
  MapPin,
  Phone,
  Calendar,
  Utensils,
  Award,
  Users,
  Quote,
  ThumbsUp,
  X
} from "lucide-react";
import dalMakhaniImg from "@/assets/dal-makhani.jpg";
import tandoorRotiImg from "@/assets/tandoor-roti.jpg";
import rajasthaniThaliImg from "@/assets/rajasthani-thali.jpg";
import customerPriyaImg from "@/assets/customer-priya.jpg";
import customerRahulImg from "@/assets/customer-rahul.jpg";
import customerAnitaImg from "@/assets/customer-anita.jpg";
import customerVikasImg from "@/assets/customer-vikas.jpg";
import { Badge } from "@/components/ui/badge";

// Import feature images
import traditionalRecipesImg from "@/assets/traditional-recipes.jpg";
import freshDailyImg from "@/assets/fresh-daily.jpg";
import madeWithLoveImg from "@/assets/made-with-love.jpg";
import awardWinningImg from "@/assets/award-winning.jpg";

// Import story gallery images
import dhabaExteriorImg from "@/assets/dhaba-exterior.jpg";
import familyCookingImg from "@/assets/family-cooking.jpg";
import spicesCollectionImg from "@/assets/spices-collection.jpg";
import tandoorCookingImg from "@/assets/tandoor-cooking.jpg";
import chefHandsImg from "@/assets/chef-hands.jpg";
import happyCustomersImg from "@/assets/happy-customers.jpg";
import spicesBackgroundImg from "@/assets/spices-background.jpg";
import VideoReviewCard from "@/components/VideoReviewCard";


const Index = () => {
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);
  const highlights = [
    {
      title: "स्वादिष्ट दाल मखनी",
      title_en: "Signature Dal Makhani",
      description: "Slow-cooked black lentils in rich creamy gravy",
      image: dalMakhaniImg,
      price: "₹280"
    },
    {
      title: "तंदूरी रोटी",
      title_en: "Fresh Tandoor Roti",
      description: "Hand-rolled bread baked fresh in our clay oven",
      image: tandoorRotiImg,
      price: "₹25"
    },
    {
      title: "राजस्थानी थाली",
      title_en: "Royal Rajasthani Thali",
      description: "Complete meal with dal, sabzi, roti & Delicious sweets",
      image: rajasthaniThaliImg,
      price: "₹420"
    }
  ];

  const features = [
    {
      icon: ChefHat,
      title: "Traditional Recipes",
      title_hindi: "पारंपरिक व्यंजन",
      description: "Authentic family recipes passed down through generations",
      image: traditionalRecipesImg
    },
    {
      icon: Clock,
      title: "Fresh Daily",
      title_hindi: "रोज ताज़ा",
      description: "All dishes prepared fresh daily with finest ingredients",
      image: freshDailyImg
    },
    {
      icon: Heart,
      title: "Made with Love",
      title_hindi: "प्यार से बना",
      description: "Every dish is prepared with care and attention to detail",
      image: madeWithLoveImg
    },
    {
      icon: Award,
      title: "Award Winning",
      title_hindi: "पुरस्कार प्राप्त",
      description: "Recognized for excellence in authentic Indian cuisine",
      image: awardWinningImg
    }
  ];

  const storyGallery = [
    { image: dhabaExteriorImg, title: "Our Heritage", size: "large" },
    { image: familyCookingImg, title: "Family Tradition", size: "tall" },
    { image: spicesCollectionImg, title: "Fresh Spices", size: "small" },
    { image: tandoorCookingImg, title: "Traditional Cooking", size: "medium" },
    { image: chefHandsImg, title: "Skilled Hands", size: "small" },
    { image: happyCustomersImg, title: "Happy Faces", size: "medium" }
  ];

  const testimonials = [
    {
      id: 1,
      name: "प्रिया शर्मा",
      name_en: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      date: "2 days ago",
      review: "Amazing food quality and taste! The Dal Makhani reminded me of my grandmother's cooking.",
      review_hindi: "शानदार खाने की गुणवत्ता और स्वाद! दाल मखनी ने मुझे अपनी दादी माँ के खाने की याद दिला दी।",
      dish: "Dal Makhani",
      avatar: customerPriyaImg,
      verified: true
    },
    {
      id: 2,
      name: "राहुल गुप्ता",
      name_en: "Rahul Gupta",
      location: "Mumbai",
      rating: 5,
      date: "1 week ago",
      review: "Best butter naan in the city! The ambience is perfect for family dining.",
      review_hindi: "शहर का सबसे अच्छा बटर नान! पारिवारिक भोजन के लिए एकदम सही माहौल।",
      dish: "Butter Naan",
      avatar: customerRahulImg,
      verified: true
    },
    {
      id: 3,
      name: "अनीता सिंह",
      name_en: "Anita Singh",
      location: "Pune",
      rating: 4,
      date: "3 days ago",
      review: "Authentic taste and generous portions. The thali was worth every penny.",
      review_hindi: "असली स्वाद और भरपूर मात्रा। थाली पैसे वसूल थी।",
      dish: "Rajasthani Thali",
      avatar: customerAnitaImg,
      verified: false
    },
    {
      id: 4,
      name: "विकास कुमार",
      name_en: "Vikas Kumar",
      location: "Jaipur",
      rating: 5,
      date: "5 days ago",
      review: "Rangoli Dhaba & Restaurant lives up to its name! Feels like eating at home.",
      review_hindi: "रंगोली ढाबा और रेस्टोरेंट अपने नाम को सही साबित करता है! घर जैसा महसूस होता है।",
      dish: "Mixed Platter",
      avatar: customerVikasImg,
      verified: true
    }
  ];

  const stats = [
    { icon: Star, value: "4.8", label: "Average Rating", label_hindi: "औसत रेटिंग" },
    { icon: Users, value: "5000+", label: "Happy Customers", label_hindi: "खुश ग्राहक" },
    { icon: Award, value: "50+", label: "Awards Won", label_hindi: "पुरस्कार जीते" },
    { icon: ThumbsUp, value: "99%", label: "Satisfaction Rate", label_hindi: "संतुष्टि दर" }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating
            ? "fill-dhaba-gold text-dhaba-gold"
            : "text-dhaba-cream/40"
          }`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Background wrapper for all sections after hero */}
      <div
        className="relative bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(/lovable-uploads/e1372d37-a5ad-4350-ac24-7111c7829b8e.png)' }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-dhaba-premium-black/85 backdrop-blur-sm"></div>

        {/* Signature Dishes */}
        <section className="py-12 sm:py-16 md:py-20 px-1 sm:px-4 relative z-10 overflow-hidden">
          <div className="absolute inset-0 spice-particles opacity-10" />
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="dhaba-heading text-4xl sm:text-4xl md:text-4xl lg:text-5xl text-dhaba-cream mb-4 font-kalam">
                हमारे खास व्यंजन
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl text-dhaba-gold font-semibold mb-4 md:mb-6">
                Our Signature Dishes
              </h3>
              <p className="text-dhaba-cream/70 max-w-2xl mx-auto text-sm sm:text-base">
                Discover the authentic taste of India with our most beloved dishes,
                prepared using traditional methods and finest ingredients.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {highlights.map((dish, index) => (
                <div key={index} className="dhaba-card group overflow-hidden">
                  <div className="relative mb-4 md:mb-6">
                    <img
                      src={dish.image}
                      alt={dish.title_en}
                      className="w-full h-40 sm:h-48 md:h-52 object-cover rounded-lg shadow-card group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-dhaba-gold text-dhaba-charcoal px-2 md:px-3 py-1 rounded-full font-semibold shadow-glow text-sm md:text-base">
                      {dish.price}
                    </div>
                  </div>
                  
                  <h4 className="text-base md:text-lg font-medium text-dhaba-gold mb-3">
                    {dish.title_en}
                  </h4>
                  <h3 className="dhaba-hindi text-lg md:text-xl font-semibold text-dhaba-cream mb-2">
                    {dish.title}
                  </h3>
                  <p className="text-dhaba-cream/70 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    {dish.description}
                  </p>
                  <Button variant="dhaba" className="w-full">
                    Order Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-4 sm:py-4 md:py-4 px-1 sm:px-4 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="dhaba-heading text-4xl sm:text-4xl md:text-4xl lg:text-5xl text-dhaba-cream mb-4 font-kalam">
                हमारी विशेषताएं
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl text-dhaba-gold font-semibold mb-4 md:mb-6">
                What Makes Us Special
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="dhaba-card group overflow-hidden bg-dhaba-charcoal/40 border-dhaba-gold/20 backdrop-blur-sm hover:border-dhaba-gold/50 transition-all duration-300">
                    <div className="relative mb-4 md:mb-6 overflow-hidden rounded-lg">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-36 sm:h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dhaba-charcoal/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 w-10 h-10 md:w-12 md:h-12 bg-dhaba-gold/90 rounded-full flex items-center justify-center shadow-glow">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-dhaba-charcoal" />
                      </div>
                    </div>
                    <div className="px-2">
                      
                      <h4 className="font-semibold text-dhaba-gold mb-3 text-sm md:text-base">
                        {feature.title}
                      </h4>
                      <h3 className="dhaba-hindi text-base md:text-lg font-semibold text-dhaba-cream mb-2 font-Playpen">
                        {feature.title_hindi}
                      </h3>
                      <p className="text-dhaba-cream/70 text-xs md:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 sm:py-14 md:py-14 px-1 sm:px-4 text-dhaba-cream relative z-10 overflow-hidden">
          <div className="absolute inset-0 steam-effect opacity-5" />
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="dhaba-heading text-4xl sm:text-4xl md:text-4xl lg:text-5xl mb-4 md:mb-6 font-kalam">
                  हमारी कहानी
                </h2>
                <h3 className="text-lg sm:text-xl md:text-2xl text-dhaba-gold font-semibold mb-6 md:mb-8">
                  Our Story
                </h3>
                <p className="text-dhaba-cream/80 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 md:mb-6 font-bold">
                  For over 7 years, Rangoli Dhaba & Restaurant has been serving authentic Indian cuisine
                  that brings the warmth and comfort of home to every meal. Founded by
                  Harsh Bansal, our dhaba continues the tradition of serving
                  wholesome, flavorful food that tells the story of India's rich culinary heritage.
                </p>
                <p className="dhaba-hindi text-dhaba-gold-light mb-6 md:mb-8 text-sm sm:text-base font-Playpen">
                  हमारा उद्देश्य है आपको घर जैसा स्वाद देना और आपके दिल में खुशी भरना।
                </p>
                <Button variant="premium" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/menu">Explore Our Menu</Link>
                </Button>
              </div>

              <div className="relative order-1 lg:order-2">
                {/* Redesigned Story Gallery Layout */}
                <div className="space-y-4">
                  {/* Top Row - Featured Image */}
                  <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-2xl h-48 md:h-56"
                    onClick={() => setSelectedImage({
                      url: storyGallery[0].image,
                      alt: storyGallery[0].title
                    })}>
                    <img
                      src={storyGallery[0].image}
                      alt={storyGallery[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dhaba-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-dhaba-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="font-semibold text-lg">{storyGallery[0].title}</h4>
                    </div>
                  </div>

                  {/* Middle Row - Two Images */}
                  <div className="grid grid-cols-2 gap-4">
                    {storyGallery.slice(1, 3).map((item, index) => (
                      <div key={index + 1}
                        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-xl h-32 md:h-40"
                        onClick={() => setSelectedImage({
                          url: item.image,
                          alt: item.title
                        })}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dhaba-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-2 left-2 text-dhaba-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Row - Three Images */}
                  <div className="grid grid-cols-3 gap-3">
                    {storyGallery.slice(3, 6).map((item, index) => (
                      <div key={index + 3}
                        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg h-24 md:h-32"
                        onClick={() => setSelectedImage({
                          url: item.image,
                          alt: item.title
                        })}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dhaba-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-1 left-1 text-dhaba-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h4 className="font-semibold text-xs">{item.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-4 sm:py-12 md:py-12 px-1 sm:px-4 relative z-10">
          <div className="container mx-auto">
            {/* Stats Section */}
            <div className="mb-12 md:mb-16">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="dhaba-heading text-4xl sm:text-4xl md:text-4xl lg:text-5xl text-dhaba-cream mb-4 font-kalam">
                  ग्राहक समीक्षा
                </h2>
                <h3 className="text-lg sm:text-xl md:text-2xl text-dhaba-gold font-semibold mb-4 md:mb-6">
                  Customer Reviews
                </h3>
                <p className="text-dhaba-cream/70 max-w-2xl mx-auto text-sm sm:text-base">
                  What our valued customers say about their experience at Rangoli Dhaba & Restaurant
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center dhaba-card bg-dhaba-charcoal/60 border-dhaba-gold/30 p-4 md:p-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-dhaba-gold rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-glow">
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-dhaba-charcoal" />
                      </div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-dhaba-gold mb-2">
                        {stat.value}
                      </div>
                      
                      <div className="dhaba-hindi text-dhaba-cream text-xs sm:text-sm mb-1">
                        {stat.label}
                      </div>
                      <div className="text-dhaba-cream/80 text-xs font-Playpen">
                        {stat.label_hindi}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="dhaba-card group bg-dhaba-charcoal/60 border-dhaba-gold/30 hover:border-dhaba-gold/60 transition-all duration-300">
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name_en}
                      className="w-12 h-12 rounded-full object-cover shadow-card border-2 border-dhaba-gold/30"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="dhaba-hindi font-semibold text-dhaba-cream font-Playpen">
                          {testimonial.name}
                        </h4>
                        {testimonial.verified && (
                          <Badge variant="secondary" className="bg-dhaba-gold text-dhaba-charcoal text-xs px-2 py-0">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-dhaba-cream/60 mb-1">
                        {testimonial.name_en} • {testimonial.location}
                      </p>
                      <div className="flex items-center space-x-1">
                        {renderStars(testimonial.rating)}
                        <span className="text-sm text-dhaba-cream/50 ml-2">
                          {testimonial.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-4">

                    
                    <p className="dhaba-hindi text-dhaba-cream mb-2 pl-4">
                      {testimonial.review}
                    </p>
                    <p className=" text-dhaba-cream/70 text-sm pl-4 leading-relaxed font-Playpen">
                      {testimonial.review_hindi}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-dhaba-gold border-dhaba-gold/50 bg-transparent">
                      {testimonial.dish}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Video Review Card - Centered and Full Width */}
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <VideoReviewCard />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-1 sm:px-4 relative z-10">
          <div className="container mx-auto text-center">
            <h2 className="dhaba-heading text-4xl md:text-5xl text-white mb-6 font-kalam">
              आज ही हमसे जुड़ें
            </h2>
            <h3 className="text-2xl text-dhaba-cream font-semibold mb-8">
              Visit Us Today
            </h3>
            <p className="text-dhaba-cream/90 text-lg max-w-2xl mx-auto mb-12">
              Experience the authentic taste of India in a warm, family-friendly atmosphere.
              We're open 7 days a week, ready to serve you with love and tradition.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                variant="premium"
                size="hero"
                onClick={() => window.location.href = "/contact"}
                className="space-x-3"
              >
                <Phone className="w-6 h-6" />
                <span>Call for Reservation</span>
              </Button>

             
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8 text-dhaba-cream">
              <div className="flex items-center space-x-2">
                <Utensils className="w-5 h-5" />
                <span>Dine In</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Takeaway</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Catering</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl max-h-[85vh] sm:max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-dhaba-gold transition-colors z-10 p-1"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-lg max-h-[80vh] sm:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
