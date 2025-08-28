import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/AdminLayout";

interface Stats {
  totalDishes: number;
  totalCategories: number;
  totalTags: number;
  specialDishes: number;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalDishes: 0,
    totalCategories: 0,
    totalTags: 0,
    specialDishes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [dishesResult, categoriesResult, tagsResult, specialsResult] = await Promise.all([
        supabase.from("dishes").select("id", { count: "exact" }),
        supabase.from("categories").select("id", { count: "exact" }),
        supabase.from("tags").select("id", { count: "exact" }),
        supabase.from("dishes").select("id", { count: "exact" }).eq("is_special", true),
      ]);

      setStats({
        totalDishes: dishesResult.count || 0,
        totalCategories: categoriesResult.count || 0,
        totalTags: tagsResult.count || 0,
        specialDishes: specialsResult.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base">Welcome to Rangoli Dhaba Admin Panel</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Dishes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDishes}</div>
                <p className="text-xs text-muted-foreground">All menu items</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCategories}</div>
                <p className="text-xs text-muted-foreground">Menu categories</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTags}</div>
                <p className="text-xs text-muted-foreground">Available tags</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Today's Specials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.specialDishes}</div>
                <p className="text-xs text-muted-foreground">Special dishes</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
              <CardDescription className="text-sm">Common admin tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Card className="p-3 md:p-4 cursor-pointer hover:bg-accent transition-colors">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl mb-2">🍽️</div>
                    <div className="text-xs md:text-sm font-medium">Add Dish</div>
                  </div>
                </Card>
                <Card className="p-3 md:p-4 cursor-pointer hover:bg-accent transition-colors">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl mb-2">📂</div>
                    <div className="text-xs md:text-sm font-medium">Manage Categories</div>
                  </div>
                </Card>
                <Card className="p-3 md:p-4 cursor-pointer hover:bg-accent transition-colors">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl mb-2">⭐</div>
                    <div className="text-xs md:text-sm font-medium">Set Special</div>
                  </div>
                </Card>
                <Card className="p-3 md:p-4 cursor-pointer hover:bg-accent transition-colors">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl mb-2">🏷️</div>
                    <div className="text-xs md:text-sm font-medium">Manage Tags</div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">System Status</CardTitle>
              <CardDescription className="text-sm">Current system information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Connected</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Available</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Authentication</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};