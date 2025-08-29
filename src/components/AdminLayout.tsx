import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    
    const initializeAuth = async () => {
      try {
        // First check if there's a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          if (isMounted) {
            setUser(null);
            setLoading(false);
            navigate("/admin/login", { replace: true });
          }
          return;
        }

        if (session?.user) {
          if (isMounted) {
            setUser(session.user);
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setUser(null);
            setLoading(false);
            navigate("/admin/login", { replace: true });
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (isMounted) {
          setUser(null);
          setLoading(false);
          navigate("/admin/login", { replace: true });
        }
      }
    };

    // Initialize auth
    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;
        
        console.log("Auth state change:", event, session?.user?.email);
        
        if (event === 'SIGNED_OUT' || !session?.user) {
          setUser(null);
          setLoading(false);
          navigate("/admin/login", { replace: true });
        } else if (session?.user) {
          setUser(session.user);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setUser(null);
      await supabase.auth.signOut();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/admin/login", { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <div className="text-lg font-medium">Loading admin panel...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Categories", href: "/admin/categories", icon: "📂" },
    { name: "Dishes", href: "/admin/dishes", icon: "🍽️" },
    { name: "Tags", href: "/admin/tags", icon: "🏷️" },
    { name: "Today's Special", href: "/admin/specials", icon: "⭐" },
    { name: "Offer Banners", href: "/admin/offers", icon: "🎁" },
  ];

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-primary">Rangoli Dhaba</h1>
        <p className="text-sm text-muted-foreground">Admin Panel</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              navigate(item.href);
              setSidebarOpen(false);
            }}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Button>
        ))}
      </nav>
      
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p className="font-medium">{user.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-3 sm:p-4 border-b bg-background">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <h1 className="text-base sm:text-lg font-semibold">Admin Panel</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
};