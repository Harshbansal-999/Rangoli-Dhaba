import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  color: string;
}

export const AdminTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: "",
      color: "#10b981",
    },
  });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("name");

      if (error) throw error;
      setTags(data || []);
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast({
        title: "Error",
        description: "Failed to fetch tags",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const tagData = {
        name: data.name,
        color: data.color,
      };

      if (editingTag) {
        const { error } = await supabase
          .from("tags")
          .update(tagData)
          .eq("id", editingTag.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("tags")
          .insert(tagData);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Tag ${editingTag ? "updated" : "created"} successfully`,
      });

      setIsDialogOpen(false);
      setEditingTag(null);
      form.reset();
      fetchTags();
    } catch (error: any) {
      console.error("Error saving tag:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save tag",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    form.reset({
      name: tag.name,
      color: tag.color,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (tagId: string) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;

    try {
      const { error } = await supabase
        .from("tags")
        .delete()
        .eq("id", tagId);
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Tag deleted successfully",
      });
      fetchTags();
    } catch (error: any) {
      console.error("Error deleting tag:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete tag",
        variant: "destructive",
      });
    }
  };

  const predefinedColors = [
    "#10b981", // green
    "#ef4444", // red
    "#f59e0b", // yellow
    "#06b6d4", // cyan
    "#8b5cf6", // purple
    "#f97316", // orange
    "#ec4899", // pink
    "#6366f1", // indigo
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading tags...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tags</h1>
            <p className="text-muted-foreground">Manage dish tags and filters</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingTag(null);
                form.reset();
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Tag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTag ? "Edit Tag" : "Add New Tag"}</DialogTitle>
                <DialogDescription>
                  {editingTag ? "Update the tag details" : "Create a new tag for filtering dishes"}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tag Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Veg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <Input type="color" {...field} className="w-20 h-10" />
                            <div className="flex flex-wrap gap-2">
                              {predefinedColors.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                                  style={{ backgroundColor: color }}
                                  onClick={() => field.onChange(color)}
                                />
                              ))}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        setEditingTag(null);
                        form.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingTag ? "Update" : "Create"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tags.map((tag) => (
            <Card key={tag.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="secondary"
                      style={{ backgroundColor: tag.color + '20', color: tag.color }}
                    >
                      {tag.name}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(tag)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(tag.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Color:</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <div 
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="text-xs font-mono">{tag.color}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};