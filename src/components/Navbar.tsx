
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-fitforge-black py-4 shadow-md">
      <div className="fitforge-container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Dumbbell className="h-8 w-8 text-fitforge-red" />
          <span className="ml-2 text-white text-xl font-bold">FitForge</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/workouts" className="text-white hover:text-fitforge-red transition-colors">
            Workouts
          </Link>
          <Link to="/goals" className="text-white hover:text-fitforge-red transition-colors">
            Goals
          </Link>
          <Link to="/progress" className="text-white hover:text-fitforge-red transition-colors">
            Progress
          </Link>
          <Link to="/subscription" className="text-white hover:text-fitforge-red transition-colors">
            Subscription
          </Link>
          <Link to="/login" className="bg-fitforge-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
            Sign In
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
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
        <div className="md:hidden bg-fitforge-black border-t border-gray-800 mt-2">
          <div className="fitforge-container py-2 space-y-2">
            <Link 
              to="/workouts" 
              className="block text-white hover:text-fitforge-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Workouts
            </Link>
            <Link 
              to="/goals" 
              className="block text-white hover:text-fitforge-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Goals
            </Link>
            <Link 
              to="/progress" 
              className="block text-white hover:text-fitforge-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Progress
            </Link>
            <Link 
              to="/subscription" 
              className="block text-white hover:text-fitforge-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Subscription
            </Link>
            <Link 
              to="/login" 
              className="block text-white hover:text-fitforge-red py-2"
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
