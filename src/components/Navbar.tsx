
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="fitforge-container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/eb192825-20ed-4427-8738-b57ed0a90ca3.png" 
            alt="RAW PERFORMANCE" 
            className="h-16 md:h-20" // Increased from h-10 to h-16/h-20
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/workouts" className="text-fitforge-black hover:text-fitforge-red transition-colors font-medium">
            Workouts
          </Link>
          <Link to="/goals" className="text-fitforge-black hover:text-fitforge-red transition-colors font-medium">
            Goals
          </Link>
          <Link to="/progress" className="text-fitforge-black hover:text-fitforge-red transition-colors font-medium">
            Progress
          </Link>
          <Link to="/subscription" className="text-fitforge-black hover:text-fitforge-red transition-colors font-medium">
            Subscription
          </Link>
          <Link to="/login" className="bg-fitforge-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors font-medium">
            Sign In
          </Link>
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
              to="/workouts" 
              className="block text-fitforge-black hover:text-fitforge-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Workouts
            </Link>
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
            <Link 
              to="/subscription" 
              className="block text-fitforge-black hover:text-fitforge-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Subscription
            </Link>
            <Link 
              to="/login" 
              className="block text-fitforge-black hover:text-fitforge-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
