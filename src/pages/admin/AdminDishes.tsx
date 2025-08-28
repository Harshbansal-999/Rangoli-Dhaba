import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Upload, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Dish {
  id: string;
  name_en: string;
  name_hi: string;
  description: string;
  price: number;
  image_url?: string;
  category_id: string;
  rating: number;
  is_available: boolean;
  is_special: boolean;
  categories?: { name_en: string };
  dish_tags?: { tags: { name: string; color: string } }[];
}

interface Category {
  id: string;
  name_en: string;
  name_hi: string;
}

interface Tag {
  id: string;
  name: string;
  color: string;
}

export const AdminDishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name_en: "",
      name_hi: "",
      description: "",
      price: 0,
      category_id: "",
      rating: 4.5,
      is_available: true,
      is_special: false,
      selectedTags: [] as string[],
      image_url: "",
    },
  });

  // Common English to Hindi dish name translations
  const dishTranslations: { [key: string]: string } = {
    "butter chicken": "बटर चिकन",
    "dal makhani": "दाल मखनी", 
    "dal": "दाल",
    "tandoor chicken": "तंदूरी चिकन",
    "tandoori chicken": "तंदूरी चिकन",
    "paneer tikka": "पनीर तिक्का",
    "paneer": "पनीर",
    "rajasthani thali": "राजस्थानी थाली",
    "thali": "थाली",
    "chicken curry": "चिकन करी",
    "chicken": "चिकन",
    "curry": "करी",
    "palak paneer": "पालक पनीर",
    "palak": "पालक",
    "roti": "रोटी",
    "naan": "नान",
    "biryani": "बिरयानी",
    "rice": "चावल",
    "lassi": "लस्सी",
    "samosa": "समोसा",
    "chole bhature": "छोले भटूरे",
    "chole": "छोले",
    "masala chai": "मसाला चाय",
    "chai": "चाय",
    "masala": "मसाला",
    "aloo": "आलू",
    "gobi": "गोभी",
    "jeera": "जीरा",
    "mutton": "मटन",
    "fish": "मछली",
    "prawn": "झींगा"
  };

  // Watch for English name changes to auto-suggest Hindi name
  const englishName = form.watch("name_en");
  
  useEffect(() => {
    if (englishName && !editingDish) {
      const lowerName = englishName.toLowerCase().trim();
      
      // Try exact match first
      let hindiTranslation = dishTranslations[lowerName];
      
      // If no exact match, try to find words that match
      if (!hindiTranslation) {
        const words = lowerName.split(' ');
        const translatedWords = words.map(word => dishTranslations[word] || word);
        
        // Only use if at least one word was translated
        if (translatedWords.some(word => dishTranslations[word])) {
          hindiTranslation = translatedWords.join(' ');
        }
      }
      
      // Update the field if we found a translation and the Hindi field is empty
      if (hindiTranslation) {
        const currentHindi = form.getValues("name_hi");
        if (!currentHindi || currentHindi.trim() === "") {
          form.setValue("name_hi", hindiTranslation);
        }
      }
    }
  }, [englishName, editingDish, form, dishTranslations]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dishesResult, categoriesResult, tagsResult] = await Promise.all([
        supabase
          .from("dishes")
          .select(`
            *,
            categories(name_en),
            dish_tags(tags(name, color))
          `)
          .order("created_at", { ascending: false }),
        supabase.from("categories").select("*").order("created_at"),
        supabase.from("tags").select("*").order("name"),
      ]);

      if (dishesResult.data) setDishes(dishesResult.data);
      if (categoriesResult.data) {
        setCategories(categoriesResult.data);
        console.log('Categories loaded in AdminDishes:', categoriesResult.data);
      }
      if (tagsResult.data) setTags(tagsResult.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Upload image to Supabase storage
  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('dish-images')
        .upload(fileName, file);

      if (error) throw error;

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('dish-images')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setUploadingImage(true);
      
      let imageUrl = data.image_url;
      
      // Upload image if selected
      if (selectedImage) {
        const uploadedUrl = await handleImageUpload(selectedImage);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const dishData = {
        name_en: data.name_en,
        name_hi: data.name_hi,
        description: data.description,
        price: parseFloat(data.price),
        category_id: data.category_id,
        rating: parseFloat(data.rating),
        is_available: data.is_available,
        is_special: data.is_special,
        image_url: imageUrl,
      };

      let dishId;
      if (editingDish) {
        const { error } = await supabase
          .from("dishes")
          .update(dishData)
          .eq("id", editingDish.id);
        if (error) throw error;
        dishId = editingDish.id;
      } else {
        const { data: newDish, error } = await supabase
          .from("dishes")
          .insert(dishData)
          .select()
          .single();
        if (error) throw error;
        dishId = newDish.id;
      }

      // Update tags
      await supabase.from("dish_tags").delete().eq("dish_id", dishId);
      if (data.selectedTags.length > 0) {
        const tagInserts = data.selectedTags.map((tagId: string) => ({
          dish_id: dishId,
          tag_id: tagId,
        }));
        await supabase.from("dish_tags").insert(tagInserts);
      }

      toast({
        title: "Success",
        description: `Dish ${editingDish ? "updated" : "created"} successfully`,
      });

      setIsDialogOpen(false);
      setEditingDish(null);
      form.reset();
      setPreviewUrl("");
      setSelectedImage(null);
      fetchData();
    } catch (error) {
      console.error("Error saving dish:", error);
      toast({
        title: "Error",
        description: "Failed to save dish",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (dish: Dish) => {
    setEditingDish(dish);
    form.reset({
      name_en: dish.name_en,
      name_hi: dish.name_hi,
      description: dish.description,
      price: dish.price,
      category_id: dish.category_id,
      rating: dish.rating,
      is_available: dish.is_available,
      is_special: dish.is_special,
      selectedTags: dish.dish_tags?.map(dt => {
        // Find the tag ID by matching the tag name
        const tag = tags.find(t => t.name === dt.tags.name);
        return tag?.id;
      }).filter(Boolean) || [],
      image_url: dish.image_url || "",
    });
    setPreviewUrl(dish.image_url || "");
    setSelectedImage(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (dishId: string) => {
    if (!confirm("Are you sure you want to delete this dish?")) return;

    try {
      const { error } = await supabase.from("dishes").delete().eq("id", dishId);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Dish deleted successfully",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting dish:", error);
      toast({
        title: "Error",
        description: "Failed to delete dish",
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
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Dishes</h1>
            <p className="text-muted-foreground text-sm md:text-base">Manage your menu items</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingDish(null);
                form.reset();
                setPreviewUrl("");
                setSelectedImage(null);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Dish
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
              <DialogHeader>
                <DialogTitle>{editingDish ? "Edit Dish" : "Add New Dish"}</DialogTitle>
                <DialogDescription>
                  {editingDish ? "Update the dish details" : "Create a new dish for your menu"}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <FormField
                      control={form.control}
                      name="name_en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name (English)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Butter Chicken" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name_hi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name (Hindi)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="बटर चिकन" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Rich and creamy chicken in tomato gravy..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" min="1" max="5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                           <Select onValueChange={field.onChange} value={field.value}>
                             <FormControl>
                               <SelectTrigger className="bg-background border border-input">
                                 <SelectValue placeholder="Select category" />
                               </SelectTrigger>
                             </FormControl>
                             <SelectContent className="bg-background border border-input shadow-md z-50">
                               {categories.length === 0 ? (
                                 <SelectItem value="no-categories" disabled>
                                   No categories available
                                 </SelectItem>
                               ) : (
                                 categories
                                   .filter(cat => cat.name_en !== 'All' && cat.id !== 'all')
                                   .map((category) => (
                                     <SelectItem key={category.id} value={category.id}>
                                       {category.name_en} ({category.name_hi})
                                     </SelectItem>
                                   ))
                               )}
                             </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-4">
                    <FormLabel>Dish Image</FormLabel>
                    
                    {/* Current/Preview Image */}
                    {(previewUrl || form.getValues("image_url")) && (
                      <div className="relative">
                        <img
                          src={previewUrl || form.getValues("image_url")}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setPreviewUrl("");
                            setSelectedImage(null);
                            form.setValue("image_url", "");
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    {/* Upload Button */}
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedImage(file);
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setPreviewUrl(e.target?.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                      />
                      {uploadingImage && (
                        <span className="text-sm text-muted-foreground">Uploading...</span>
                      )}
                    </div>
                    
                    {/* Alternative: Image URL */}
                    <div className="space-y-2">
                      <FormLabel className="text-sm text-muted-foreground">Or enter image URL:</FormLabel>
                      <FormField
                        control={form.control}
                        name="image_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="https://example.com/image.jpg"
                                onChange={(e) => {
                                  field.onChange(e);
                                  if (e.target.value && !selectedImage) {
                                    setPreviewUrl(e.target.value);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormLabel>Tags</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {tags.map((tag) => (
                        <FormField
                          key={tag.id}
                          control={form.control}
                          name="selectedTags"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(tag.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, tag.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== tag.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {tag.name}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <FormField
                      control={form.control}
                      name="is_available"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Available</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="is_special"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Today's Special</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        setEditingDish(null);
                        form.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingDish ? "Update" : "Create"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <Card key={dish.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{dish.name_en}</CardTitle>
                    <CardDescription>{dish.name_hi}</CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(dish)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(dish.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
                <div className="flex items-center space-x-2 text-sm">
                  <span className={dish.is_available ? "text-green-600" : "text-red-600"}>
                    {dish.is_available ? "Available" : "Unavailable"}
                  </span>
                  {dish.is_special && (
                    <Badge variant="secondary">Special</Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Category: {dish.categories?.name_en}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};