import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Leaf, Flame, Star, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [dishes, setDishes] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);
  const { toast } = useToast();

  // Fetch categories from database
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Check if "All" category already exists in database
      const hasAllCategory = data?.some(cat => 
        cat.name_en?.toLowerCase() === "all" ||
        cat.name_hi === "सभी"
      );

      // Add "All" category only if it doesn't exist
      const allCategories = hasAllCategory 
        ? data || []
        : [
            { id: "all", name_en: "All", name_hi: "सभी" },
            ...(data || [])
          ];
      
      setCategories(allCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    }
  };

  // Fetch dishes with their categories and tags
  const fetchDishes = async () => {
    try {
      const { data, error } = await supabase
        .from('dishes')
        .select(`
          *,
          categories(name_en),
          dish_tags(
            tags(name, color)
          )
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDishes(data || []);
      console.log('Loaded dishes with tags:', data?.map(d => ({ 
        name: d.name_en, 
        tags: d.dish_tags?.map(dt => dt.tags?.name) 
      })));
    } catch (error) {
      console.error('Error fetching dishes:', error);
      toast({
        title: "Error",
        description: "Failed to load dishes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  
  // Fetch tags from database
  const fetchTags = async () => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      
      // Add "All" option at the beginning
      const allTags = [
        { id: "all", name: "All", color: "#10b981" },
        ...(data || [])
      ];
      setTags(allTags);
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast({
        title: "Error",
        description: "Failed to load tags",
        variant: "destructive",
      });
    }
  };

  // Fetch offers from database
  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast({
        title: "Error",
        description: "Failed to load offers",
        variant: "destructive",
      });
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchCategories();
    fetchDishes();
    fetchTags();
    fetchOffers();

    // Real-time subscription for dishes
    const dishesChannel = supabase
      .channel('dishes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dishes'
        },
        () => {
          fetchDishes();
        }
      )
      .subscribe();

    // Real-time subscription for categories
    const categoriesChannel = supabase
      .channel('categories-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'categories'
        },
        () => {
          fetchCategories();
        }
      )
      .subscribe();

    // Real-time subscription for tags
    const tagsChannel = supabase
      .channel('tags-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tags'
        },
        () => {
          fetchTags(); // Refetch tags to update filter options
          fetchDishes(); // Refetch dishes to get updated tag data
        }
      )
      .subscribe();

    // Real-time subscription for dish_tags
    const dishTagsChannel = supabase
      .channel('dish-tags-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dish_tags'
        },
        () => {
          fetchDishes(); // Refetch dishes to get updated tag associations
        }
      )
      .subscribe();

    // Real-time subscription for offers
    const offersChannel = supabase
      .channel('offers-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'offers'
        },
        () => {
          fetchOffers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(dishesChannel);
      supabase.removeChannel(categoriesChannel);
      supabase.removeChannel(tagsChannel);
      supabase.removeChannel(dishTagsChannel);
      supabase.removeChannel(offersChannel);
    };
  }, []);

  // Check if dish has veg tag
  const isVegetarian = (dish: any) => {
    return dish.dish_tags?.some((dt: any) => 
      dt.tags?.name?.toLowerCase() === 'veg'
    ) || false;
  };

  // Check if dish has spicy tag
  const isSpicy = (dish: any) => {
    return dish.dish_tags?.some((dt: any) => 
      dt.tags?.name?.toLowerCase() === 'spicy'
    ) || false;
  };

  const filteredItems = dishes.filter(item => {
    const categoryName = item.categories?.name_en;
    const matchesCategory = activeCategory === "All" || categoryName === activeCategory;
    
    // Check if item matches the selected tag filter
    const matchesFilter = activeFilter === "all" || 
      item.dish_tags?.some((dt: any) => dt.tags?.name?.toLowerCase() === activeFilter.toLowerCase());
    
    const matchesSearch = 
      item.name_hi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesFilter && matchesSearch;
  });

  const todaysSpecial = dishes.find(item => item.is_special);

  return (
    <div 
      className="min-h-screen pt-16 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: 'url(/lovable-uploads/b614fee2-e099-4a31-a9ad-8c81cea09204.png)' }}
    >
      {/* Dark overlay for readability - reduced opacity and blur */}
      <div className="absolute inset-0 bg-dhaba-premium-black/70 backdrop-blur-[1px]"></div>
      
      {/* All content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Header */}
        <section className="py-8 sm:py-16 md:py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 spice-particles opacity-20" />
          <div className="container mx-auto text-center relative z-10">
            <h1 className="dhaba-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-dhaba-cream mb-4">
              हमारा मेनू
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-dhaba-gold font-semibold mb-4 md:mb-6">
              Our Menu
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-dhaba-cream/70 max-w-2xl mx-auto">
              Authentic flavors from across India, prepared with love and traditional recipes
            </p>
          </div>
        </section>

        {/* Offer Banners - Horizontally Scrollable */}
        {offers.length > 0 && (
          <div className="py-6 px-4">
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="relative flex-shrink-0 w-96 md:w-[450px] cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setSelectedImage({ 
                      url: offer.image_url, 
                      alt: offer.title 
                    })}
                  >
                    <img
                      src={offer.image_url}
                      alt={offer.title}
                      className="w-full h-40 md:h-48 object-cover rounded-lg shadow-lg"
                    />
                    {/* Overlay with title and description */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-lg flex flex-col justify-center px-4">
                      <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                        {offer.title}
                      </h3>
                      {offer.description && (
                        <p className="text-white/90 text-sm md:text-base">
                          {offer.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 👉 HINT TEXT */}
    <p className="text-center text-l text-dhaba-cream/100 mt-2 animate-pulse">
      → Swipe to view more
    </p>
          </div>
        )}

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/*Filters */}
          <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {tags.map(tag => (
                <Button
                  key={tag.id}
                  variant={activeFilter === tag.name.toLowerCase() ? "dhaba" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(tag.name.toLowerCase())}
                  className="space-x-1 md:space-x-2 bg-dhaba-charcoal/40 border-dhaba-gold/20 text-dhaba-cream hover:bg-dhaba-gold hover:text-dhaba-charcoal text-xs md:text-sm px-2 md:px-3 py-1 md:py-2"
                  style={{
                    borderColor: activeFilter === tag.name.toLowerCase() ? tag.color : undefined,
                    backgroundColor: activeFilter === tag.name.toLowerCase() ? tag.color + '20' : undefined
                  }}
                >
                  <span>{tag.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Categories */}
          {loading ? (
            <div className="text-center py-8">
              <p className="text-dhaba-cream/70">Loading categories...</p>
            </div>
          ) : (
            <div className="sticky top-14 sm:top-16 bg-dhaba-charcoal/80 backdrop-blur-md border-b border-dhaba-gold/20 py-3 md:py-4 mb-6 md:mb-8 z-30 rounded-lg">
              <div className="flex overflow-x-auto space-x-2 md:space-x-4 pb-2 px-2 md:px-4 py-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.name_en ? "dhaba" : "ghost"}
                    size="sm"
                    onClick={() => setActiveCategory(category.name_en)}
                    className="whitespace-nowrap flex-col h-auto py-2 md:py-3 px-3 md:px-4 min-w-fit text-dhaba-cream hover:text-dhaba-charcoal text-xs md:text-sm"
                  >
                    <span className="dhaba-hindi text-xs md:text-sm">{category.name_hi}</span>
                    <span className="text-xs">{category.name_en}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Today's Special Card */}
          {todaysSpecial && (
            <div className="mb-6 md:mb-8">
              <div className="bg-gradient-to-r from-dhaba-gold/20 to-dhaba-amber/20 rounded-lg p-1">
                <div className="bg-dhaba-charcoal/80 backdrop-blur-md rounded-lg p-4 md:p-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-dhaba-gold text-dhaba-charcoal px-3 py-1 rounded-full text-xs md:text-sm font-bold mr-2">
                      Today's Special
                    </div>
                    <div className="bg-dhaba-gold text-dhaba-charcoal px-2 py-1 rounded-full text-xs font-medium">
                      आज का स्पेशल
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
                    {/* Image */}
                    <div className="md:col-span-1">
                      <img
                        src={todaysSpecial.image_url || '/placeholder.svg'}
                        alt={todaysSpecial.name_en}
                        className="w-full h-48 md:h-56 object-cover rounded-lg shadow-warm cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setSelectedImage({ 
                          url: todaysSpecial.image_url || '/placeholder.svg', 
                          alt: todaysSpecial.name_en 
                        })}
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="md:col-span-2 text-center md:text-left">
                      <h2 className="dhaba-heading text-xl sm:text-2xl md:text-3xl text-dhaba-cream mb-2">
                        {todaysSpecial.name_hi}
                      </h2>
                      <h3 className="text-lg sm:text-xl md:text-2xl text-dhaba-gold font-semibold mb-3">
                        {todaysSpecial.name_en}
                      </h3>
                      <p className="text-dhaba-cream/80 text-sm md:text-base mb-4 leading-relaxed">
                        {todaysSpecial.description}
                      </p>
                      
                      {/* Rating and Tags */}
                      <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-dhaba-gold text-dhaba-gold" />
                          <span className="font-semibold text-dhaba-cream text-sm">{todaysSpecial.rating}</span>
                        </div>
                        {isVegetarian(todaysSpecial) && (
                          <Badge className="bg-dhaba-gold text-dhaba-charcoal text-xs">
                            <Leaf className="w-3 h-3 mr-1" />
                            Veg
                          </Badge>
                        )}
                        {isSpicy(todaysSpecial) && (
                          <Badge className="bg-dhaba-spice-red text-white text-xs">
                            <Flame className="w-3 h-3 mr-1" />
                            Spicy
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-center md:justify-start space-x-4">
                        {/* Price */}
                        <div className="text-2xl sm:text-3xl font-bold text-dhaba-gold">
                          ₹{todaysSpecial.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items Grid */}
          {loading ? (
            <div className="text-center py-8">
              <p className="text-dhaba-cream/70">Loading dishes...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 max-w-6xl mx-auto justify-items-center">
              {filteredItems.map(item => {
                const isVeg = isVegetarian(item);
                const isSpicyDish = isSpicy(item);
                
                return (
                  <div key={item.id} className="menu-item group overflow-hidden dhaba-card bg-dhaba-charcoal/20 border-dhaba-gold/30 backdrop-blur-lg hover:bg-dhaba-charcoal/30 hover:border-dhaba-gold/60 transition-all duration-300 h-full flex flex-col w-full max-w-[280px]">
                    {/* Item Image */}
                    <div className="relative mb-3">
                      <img
                        src={item.image_url || '/placeholder.svg'}
                        alt={item.name_en}
                        className="w-full h-40 sm:h-44 object-cover rounded-lg shadow-warm group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setSelectedImage({ 
                          url: item.image_url || '/placeholder.svg', 
                          alt: item.name_en 
                        })}
                      />
                      {item.is_special && (
                        <div className="absolute top-2 left-2 bg-dhaba-spice-red text-white px-2 py-1 rounded-full text-xs font-bold">
                          Special
                        </div>
                      )}
                    </div>

                    {/* Content section with flex-grow */}
                    <div className="flex-1 flex flex-col">
                      {/* Title section */}
                      <div className="mb-2">
                        <h3 className="dhaba-hindi font-semibold text-base text-dhaba-cream line-clamp-1">
                          {item.name_hi}
                        </h3>
                        <h4 className="font-medium text-dhaba-gold text-sm line-clamp-1">
                          {item.name_en}
                        </h4>
                      </div>
                       
                      {/* Description */}
                      <p className="text-xs text-dhaba-cream/70 mb-3 line-clamp-2 flex-grow">
                        {item.description}
                      </p>
                       
                      {/* Price section */}
                      <div className="text-lg font-bold text-dhaba-gold mb-3">
                        ₹{item.price}
                      </div>
                      
                      {/* Bottom section with rating, tags, and button */}
                      <div className="mt-auto">
                        {/* Rating and tags row - center aligned */}
                        <div className="flex items-center justify-center flex-wrap gap-1 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-dhaba-gold text-dhaba-gold" />
                            <span className="text-xs font-medium text-dhaba-cream">{item.rating}</span>
                          </div>
                          
                          {/* Tags */}
                          {item.dish_tags?.map((dt: any, index: number) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="text-xs px-2 py-0.5"
                              style={{ 
                                backgroundColor: dt.tags.color || '#10b981',
                                color: '#ffffff'
                              }}
                            >
                              {dt.tags.name}
                            </Badge>
                          ))}
                          
                          {/* Spicy indicator */}
                          {isSpicyDish && (
                            <Flame className="w-3 h-3 text-dhaba-spice-red" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-dhaba-cream/70">
                {dishes.length === 0 ? "No dishes available. Please add dishes through the admin panel." : "No items found matching your search"}
              </p>
            </div>
          )}
        </div>

       {/* Image Modal */}
       {selectedImage && (
  <div 
    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
    onClick={() => setSelectedImage(null)}
  >
    {/* Container ko responsive max-width/height do */}
    <div className="relative w-full max-h-[85vh] sm:max-h-[90vh]">
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-dhaba-gold transition-colors z-10 p-1"
      >
        <X className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Image: responsive chhota + center + object-contain */}
      <img
        src={selectedImage.url}
        alt={selectedImage.alt}
        className="
          block mx-auto rounded-lg object-contain
          max-w-[85vw] sm:max-w-[75vw] md:max-w-[65vw] lg:max-w-[55vw] xl:max-w-[45vw]
          max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh]
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Menu;