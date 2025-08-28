import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Star, StarOff } from "lucide-react";

interface Dish {
  id: string;
  name_en: string;
  name_hi: string;
  description: string;
  price: number;
  image_url?: string;
  rating: number;
  is_special: boolean;
  categories?: { name_en: string };
  dish_tags?: { tags: { name: string; color: string } }[];
}

export const AdminSpecials = () => {
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [specialDishes, setSpecialDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const { data, error } = await supabase
        .from("dishes")
        .select(`
          *,
          categories(name_en),
          dish_tags(tags(name, color))
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const dishes = data || [];
      setAllDishes(dishes);
      setSpecialDishes(dishes.filter(dish => dish.is_special));
    } catch (error) {
      console.error("Error fetching dishes:", error);
      toast({
        title: "Error",
        description: "Failed to fetch dishes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSpecial = async (dishId: string, isCurrentlySpecial: boolean) => {
    try {
      const { error } = await supabase
        .from("dishes")
        .update({ is_special: !isCurrentlySpecial })
        .eq("id", dishId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Dish ${!isCurrentlySpecial ? "added to" : "removed from"} today's specials`,
      });

      fetchDishes();
    } catch (error) {
      console.error("Error updating dish:", error);
      toast({
        title: "Error",
        description: "Failed to update dish",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading dishes...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Today's Specials</h1>
          <p className="text-muted-foreground">Manage which dishes appear as today's specials</p>
        </div>

        {/* Current Specials */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Current Specials ({specialDishes.length})</h2>
          {specialDishes.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No dishes are currently marked as today's specials.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialDishes.map((dish) => (
                <Card key={dish.id} className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-2" />
                          {dish.name_en}
                        </CardTitle>
                        <CardDescription>{dish.name_hi}</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSpecial(dish.id, dish.is_special)}
                      >
                        <StarOff className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {dish.image_url && (
                      <img
                        src={dish.image_url}
                        alt={dish.name_en}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                    )}
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {dish.description}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold">₹{dish.price}</span>
                      <span className="text-sm">⭐ {dish.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {dish.dish_tags?.map((dt, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          style={{ backgroundColor: dt.tags.color + '20', color: dt.tags.color }}
                        >
                          {dt.tags.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Category: {dish.categories?.name_en}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* All Other Dishes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">All Dishes</h2>
          <p className="text-muted-foreground">Click the star button to add/remove dishes from today's specials</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allDishes.map((dish) => (
              <Card key={dish.id} className={dish.is_special ? "border-yellow-200 bg-yellow-50" : ""}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        {dish.is_special && <Star className="h-4 w-4 text-yellow-500 mr-2" />}
                        {dish.name_en}
                      </CardTitle>
                      <CardDescription>{dish.name_hi}</CardDescription>
                    </div>
                    <Button
                      variant={dish.is_special ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSpecial(dish.id, dish.is_special)}
                    >
                      {dish.is_special ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {dish.image_url && (
                    <img
                      src={dish.image_url}
                      alt={dish.name_en}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                  )}
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">₹{dish.price}</span>
                    <span className="text-sm">⭐ {dish.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {dish.dish_tags?.map((dt, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        style={{ backgroundColor: dt.tags.color + '20', color: dt.tags.color }}
                      >
                        {dt.tags.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Category: {dish.categories?.name_en}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};