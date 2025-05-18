
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, LogOut, User } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is an admin
  const isAdmin = user?.email === 'admin@example.com';

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="fitforge-container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-fitforge-red" />
          <span className="font-bold text-xl text-fitforge-black">Let's Reach Your Goal!</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/programs" className="text-fitforge-black hover:text-fitforge-red transition-colors font-medium">
            Programs
          </Link>
          <Link to="/workouts" className="text-fitforge-black hover:text-fitforge-red transition-colors font-medium">
            Workouts
          </Link>
          {user && (
            <>
              <Link to="/goals" className="text-fitforge-black hover:text-fitforge-red transition-colors font-medium">
                Goals
              </Link>
              <Link to="/progress" className="text-fitforge-black hover:text-fitforge-red transition-colors font-medium">
                Progress
              </Link>
            </>
          )}
          {isAdmin && (
            <Link to="/admin/programs" className="text-fitforge-black hover:text-fitforge-red transition-colors font-medium">
              Manage Programs
            </Link>
          )}
          {user && (
            <Link to="/subscription" className="text-fitforge-black hover:text-fitforge-red transition-colors font-medium">
              Subscription
            </Link>
          )}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User size={16} />
                  {user.email?.split('@')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="bg-fitforge-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors font-medium">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-fitforge-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 mt-2">
          <div className="fitforge-container py-2 space-y-2">
            <Link 
              to="/programs" 
              className="block text-fitforge-black hover:text-fitforge-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Programs
            </Link>
            <Link 
              to="/workouts" 
              className="block text-fitforge-black hover:text-fitforge-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Workouts
            </Link>
            {user && (
              <>
                <Link 
                  to="/goals" 
                  className="block text-fitforge-black hover:text-fitforge-red py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Goals
                </Link>
                <Link 
                  to="/progress" 
                  className="block text-fitforge-black hover:text-fitforge-red py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Progress
                </Link>
              </>
            )}
            {isAdmin && (
              <Link 
                to="/admin/programs" 
                className="block text-fitforge-black hover:text-fitforge-red py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Manage Programs
              </Link>
            )}
            {user && (
              <>
                <Link 
                  to="/subscription" 
                  className="block text-fitforge-black hover:text-fitforge-red py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Subscription
                </Link>
                <Link 
                  to="/profile" 
                  className="block text-fitforge-black hover:text-fitforge-red py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="block w-full text-left text-red-600 hover:text-red-800 py-2"
                >
                  Sign Out
                </button>
              </>
            )}
            {!user && (
              <Link 
                to="/login" 
                className="block text-fitforge-black hover:text-fitforge-red py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
