import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Upload, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminOffers = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOffer, setEditingOffer] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    is_active: true
  });
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Fetch offers from database
  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();

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
      supabase.removeChannel(offersChannel);
    };
  }, []);

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('offer-banners')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('offer-banners')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingOffer) {
        const { error } = await supabase
          .from('offers')
          .update(formData)
          .eq('id', editingOffer.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Offer updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('offers')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Offer created successfully",
        });
      }

      resetForm();
      fetchOffers();
    } catch (error) {
      console.error('Error saving offer:', error);
      toast({
        title: "Error",
        description: "Failed to save offer",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (offer: any) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description || "",
      image_url: offer.image_url,
      is_active: offer.is_active
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this offer?")) return;

    try {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Offer deleted successfully",
      });
      
      fetchOffers();
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast({
        title: "Error",
        description: "Failed to delete offer",
        variant: "destructive",
      });
    }
  };

  const toggleStatus = async (offer: any) => {
    try {
      const { error } = await supabase
        .from('offers')
        .update({ is_active: !offer.is_active })
        .eq('id', offer.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Offer ${!offer.is_active ? 'activated' : 'deactivated'} successfully`,
      });
      
      fetchOffers();
    } catch (error) {
      console.error('Error updating offer status:', error);
      toast({
        title: "Error",
        description: "Failed to update offer status",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      is_active: true
    });
    setEditingOffer(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-6 text-center text-dhaba-cream">Loading offers...</div>;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dhaba-cream">Offer Banners</h1>
          <p className="text-dhaba-cream/70 mt-1">Manage promotional banners for menu page</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          variant="dhaba"
          className="w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Offer
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="bg-dhaba-charcoal/40 border-dhaba-gold/20">
          <CardHeader>
            <CardTitle className="text-dhaba-cream">
              {editingOffer ? "Edit Offer" : "Add New Offer"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-dhaba-cream mb-2 block">
                  Title
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Offer title"
                  required
                  className="bg-dhaba-charcoal/20 border-dhaba-gold/20 text-dhaba-cream"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-dhaba-cream mb-2 block">
                  Description (Optional)
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Offer description"
                  className="bg-dhaba-charcoal/20 border-dhaba-gold/20 text-dhaba-cream"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-dhaba-cream mb-2 block">
                  Banner Image
                </label>
                <div className="space-y-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="bg-dhaba-charcoal/20 border-dhaba-gold/20 text-dhaba-cream file:bg-dhaba-gold file:text-dhaba-charcoal file:border-0 file:rounded-md file:px-3 file:py-1"
                  />
                  {uploading && (
                    <p className="text-sm text-dhaba-cream/70">Uploading image...</p>
                  )}
                  {formData.image_url && (
                    <div className="mt-2">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-32 h-20 object-cover rounded-lg border border-dhaba-gold/20"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  type="submit" 
                  variant="dhaba" 
                  className="flex-1"
                  disabled={uploading || !formData.image_url}
                >
                  {editingOffer ? "Update Offer" : "Create Offer"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1 border-dhaba-gold/20 text-dhaba-cream hover:bg-dhaba-gold/10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Offers List */}
      <div className="grid grid-cols-1 gap-4">
        {offers.length === 0 ? (
          <Card className="bg-dhaba-charcoal/40 border-dhaba-gold/20">
            <CardContent className="text-center py-8">
              <p className="text-dhaba-cream/70">No offers found. Create your first offer banner!</p>
            </CardContent>
          </Card>
        ) : (
          offers.map((offer) => (
            <Card key={offer.id} className="bg-dhaba-charcoal/40 border-dhaba-gold/20">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Image Preview */}
                  <div className="lg:w-48 flex-shrink-0">
                    <img
                      src={offer.image_url}
                      alt={offer.title}
                      className="w-full h-24 lg:h-32 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                     <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                       <h3 className="text-lg font-semibold text-dhaba-cream">{offer.title}</h3>
                       <div className="flex items-center gap-2">
                         <Badge variant={offer.is_active ? "secondary" : "outline"}>
                           {offer.is_active ? "Active" : "Inactive"}
                         </Badge>
                       </div>
                     </div>
                    
                    {offer.description && (
                      <p className="text-dhaba-cream/70 text-sm mb-3">{offer.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => handleEdit(offer)}
                        variant="outline"
                        size="sm"
                        className="border-dhaba-gold/20 text-dhaba-cream hover:bg-dhaba-gold/10"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      
                      <Button
                        onClick={() => toggleStatus(offer)}
                        variant="outline"
                        size="sm"
                        className="border-dhaba-gold/20 text-dhaba-cream hover:bg-dhaba-gold/10"
                      >
                        {offer.is_active ? (
                          <><EyeOff className="w-4 h-4 mr-1" />Deactivate</>
                        ) : (
                          <><Eye className="w-4 h-4 mr-1" />Activate</>
                        )}
                      </Button>
                      
                      <Button
                        onClick={() => handleDelete(offer.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOffers;