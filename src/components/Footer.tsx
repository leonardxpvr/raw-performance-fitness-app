
import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-fitforge-black text-white py-8 mt-12">
      <div className="fitforge-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Dumbbell className="h-6 w-6 text-fitforge-red" />
              <span className="ml-2 text-xl font-bold">RAW PERFORMANCE</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Track your workouts, set goals, and forge your fitness journey.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/workouts" className="hover:text-fitforge-red">Workout Logging</Link></li>
              <li><Link to="/goals" className="hover:text-fitforge-red">Goal Setting</Link></li>
              <li><Link to="/progress" className="hover:text-fitforge-red">Progress Tracking</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscription</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/subscription" className="hover:text-fitforge-red">Beginner</Link></li>
              <li><Link to="/subscription" className="hover:text-fitforge-red">Intermediate</Link></li>
              <li><Link to="/subscription" className="hover:text-fitforge-red">Expert</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/login" className="hover:text-fitforge-red">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-fitforge-red">Register</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} RAW PERFORMANCE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
