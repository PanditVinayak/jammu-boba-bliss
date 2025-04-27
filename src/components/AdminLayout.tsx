
import { ReactNode, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/toaster";
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/admin" className="font-pacifico text-2xl text-boba-primary">
                Admin Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-boba-primary">
                View Website
              </Link>
              <Button 
                variant="outline" 
                className="border-boba-primary text-boba-primary hover:bg-boba-primary/10"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64">
            <nav className="bg-white shadow rounded-lg p-4">
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/admin" 
                    className="block px-4 py-2 rounded-md hover:bg-boba-light hover:text-boba-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/orders" 
                    className="block px-4 py-2 rounded-md hover:bg-boba-light hover:text-boba-primary transition-colors"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/menu" 
                    className="block px-4 py-2 rounded-md hover:bg-boba-light hover:text-boba-primary transition-colors"
                  >
                    Menu Management
                  </Link>
                </li>
              </ul>
              <Separator className="my-4" />
              <div className="px-4 py-2">
                <p className="text-sm text-gray-500">Logged in as Admin</p>
              </div>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white shadow rounded-lg p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default AdminLayout;
