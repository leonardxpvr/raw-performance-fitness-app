
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-9xl font-extrabold text-fitforge-black">404</h1>
      <div className="bg-fitforge-red px-2 text-white text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <div className="text-xl font-medium text-gray-600 mt-8 text-center">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </div>
      <Link to="/" className="mt-6 px-8 py-3 bg-fitforge-red text-white font-bold rounded-md hover:bg-red-600 transition-colors">
        Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
