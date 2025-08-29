import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Calendar,
  Navigation,
  Star,
  Send,
  Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import welcome from "@/assets/wellcomee-Photoroom.png";
import Maps from "@/assets//Rangolidhava-map.png";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "feedback"
  });
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const contactInfo = [
    {
      icon: Phone,
      title: "फोन नंबर",
      title_en: "Phone Number",
      value: "+91 80778 14773",
      action: "Call Now",
      link: "tel:+918077814773",
      color: "text-dhaba-gold"
    },
    {
      icon: Mail,
      title: "ईमेल",
      title_en: "Email Address",
      value: "therangolidhaba@gmail.com",
      action: "Send Email",
      link: "mailto:therangolidhaba@gmail.com",
      color: "text-dhaba-copper"
    },
    // {
    //   icon: MapPin,
    //   title: "पता",
    //   title_en: "Address",
    //   value: "Brij Nagar Colony, Manoharpura, Mathura, Uttar Pradesh 281001",
    //   action: "Get Directions",
    //   link: "https://maps.app.goo.gl/JGe981pHEQFMjq3L8",
    //   color: "text-dhaba-amber"
    // },
    // {
    //   icon: Clock,
    //   title: "समय",
    //   title_en: "Opening Hours",
    //   value: "8:00 AM - 11:00 PM (All Days)",
    //   action: "View Hours",
    //   link: "#", 
    //   color: "text-dhaba-spice-red"
    // }
  ];


  const quickActions = [
    {
      icon: MessageSquare,
      text: "WhatsApp",
      color: "bg-green-600",
      link: "https://wa.me/918077814773"
    },
    {
      icon: Instagram,
      text: "Instagram",
      color: "bg-red-500",
      link: "https://www.instagram.com/rangolidhaba?igsh=dTU0azU4YmRma3pv"
    },
    {
      icon: Star,
      text: "Rate Us",
      color: "bg-dhaba-amber",
      link: "https://maps.app.goo.gl/JGe981pHEQFMjq3L8"
    }
  ];


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate contact cards
      gsap.fromTo(
        ".contact-card",
        {
          opacity: 0,
          y: 40,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate form
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          x: 50
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent! संदेश भेजा गया!",
      description: "We'll get back to you soon. हम जल्द ही आपसे संपर्क करेंगे।"
    });
    setFormData({ name: "", email: "", phone: "", message: "", type: "feedback" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-16 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: 'url(/lovable-uploads/b614fee2-e099-4a31-a9ad-8c81cea09204.png)' }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-dhaba-premium-black/70 backdrop-blur-[1px]"></div>

      {/* All content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Header */}
        <section className="py-8 sm:py-16 md:py-12 px-4 overflow-hidden relative">
          <div className="absolute inset-0 steam-effect spice-particles opacity-20" />
          <div className="container mx-auto text-center relative z-10">
            <h1 className="dhaba-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-dhaba-cream mb-4">
              संपर्क करें
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-dhaba-gold font-semibold mb-4 md:mb-6">
              Contact Us
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-dhaba-cream/80 max-w-2xl mx-auto">
              We'd love to hear from you! Get in touch for reservations, feedback, or any questions.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-4 md:py-8 lg:py-2">
          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12 md:mb-16">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => window.open(action.link, "_blank")}
                  className="flex items-center space-x-2 sm:space-x-3 h-14 sm:h-16 px-6 sm:px-8 md:px-10 
             bg-dhaba-charcoal/40 border-dhaba-gold/20 text-dhaba-cream 
             hover:bg-dhaba-gold hover:text-dhaba-charcoal 
             text-sm sm:text-base md:text-lg font-semibold rounded-xl"
                >
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${action.color} 
                  rounded-full flex items-center justify-center`}>
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span>{action.text}</span>
                </Button>
              );
            })}
          </div>


          {/* Contact Information Grid */}
          <div className="contact-grid grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 
                justify-items-center mx-auto max-w-3xl mb-12 md:mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="contact-card dhaba-card text-center group hover:shadow-warm 
                   bg-dhaba-charcoal/60 border-dhaba-gold/30 hover:border-dhaba-gold/60
                   w-full sm:w-[22rem]"   // <- card ka fixed max width
                >
                  <div className={`w-16 h-16 ${info.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${info.color}`} />
                  </div>
                  <h3 className="dhaba-hindi font-semibold text-lg text-dhaba-cream mb-1">{info.title}</h3>
                  <h4 className="font-medium text-dhaba-gold mb-3">{info.title_en}</h4>
                  <p className="text-dhaba-cream/70 mb-4 leading-relaxed">{info.value}</p>
                  <Button
                    variant="dhaba"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(info.link, "_blank")}
                  >
                    {info.action}
                  </Button>
                </div>
              );
            })}
          </div>



          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Contact Card (अब form की जगह image) */}
            <div className="dhaba-card bg-dhaba-charcoal/60 border-dhaba-gold/30 flex flex-col items-center justify-center">
              <h3 className="dhaba-heading text-xl md:text-2xl text-dhaba-cream mb-2">
                We humbly invite you to give us a chance to serve you
              </h3>
              <p className="dhaba-hindi text-dhaba-gold mb-4 md:mb-6 text-sm md:text-base">
                एक बार सेवा का मौका अवश्य दें
              </p>


              <img
                src={welcome}
                alt="Welcome Character"
                className="w-full max-w-sm md:max-w-md h-[540px] rounded-xl shadow-lg object-contain"
              />
            </div>


            {/* Map and Additional Info */}
            <div className="space-y-6">
              {/* Map Card with Image */}
              <div className="dhaba-card p-0 overflow-hidden bg-dhaba-charcoal/60 border-dhaba-gold/30">
                {/* Map Image */}
                <div className="h-64 relative">
                  <img
                    src={Maps}
                    alt="Map Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay text */}
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
                    <MapPin className="w-10 h-10 text-dhaba-gold mb-2" />
                    <p className="text-dhaba-cream font-medium">Rangoli Dhaba & restaurant, Mathura</p>
                  </div>
                </div>

                {/* Button */}
                <div className="p-6">
                  <Button
                    variant="dhaba"
                    className="w-full space-x-2"
                    onClick={() => window.open("https://maps.app.goo.gl/JGe981pHEQFMjq3L8", "_blank")}
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </Button>
                </div>
              </div>


              {/* Additional Information */}
              <div className="dhaba-card bg-dhaba-charcoal/60 border-dhaba-gold/30">
                <h4 className="dhaba-heading text-xl text-dhaba-cream mb-4">
                  Visit Our Dhaba
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-dhaba-gold mt-1" />
                    <div>
                      <p className="font-medium text-dhaba-cream">Operating Hours</p>
                      <p className="text-sm text-dhaba-cream/70">
                        Monday - Sunday: 8:00 AM - 11:00 PM<br />
                        Kitchen closes at 10:30 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Badge className="bg-dhaba-gold text-dhaba-charcoal">
                      ✓ Home Delivery
                    </Badge>
                    <Badge className="bg-dhaba-gold text-dhaba-charcoal">
                      ✓ Catering Available
                    </Badge>
                  </div>

                  <div className="pt-4 border-t border-dhaba-gold/20">
                    <p className="dhaba-hindi text-dhaba-gold font-medium mb-2">
                      पार्किंग की सुविधा उपलब्ध
                    </p>
                    <p className="text-sm text-dhaba-cream/70">
                      Free parking available • Family-friendly atmosphere •
                      Private dining rooms available for events
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;