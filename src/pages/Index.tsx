
import { Link } from 'react-router-dom';
import { Dumbbell, HeartPulse, Target, Activity } from 'lucide-react';

const Index = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-fitforge-black text-white">
        <div className="fitforge-container py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Track Your Fitness Journey With <span className="text-fitforge-red">RAW PERFORMANCE</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Log workouts, set goals, and visualize your progress all in one place. Take control of your fitness today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-fitforge-red text-white px-8 py-3 text-lg font-bold rounded-md hover:bg-red-600 transition-colors text-center"
                >
                  Get Started For Free
                </Link>
                <Link
                  to="/subscription"
                  className="border-2 border-white px-8 py-3 text-lg font-bold rounded-md hover:bg-white hover:text-fitforge-black transition-colors text-center"
                >
                  View Plans
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                className="rounded-lg shadow-2xl" alt="Fitness" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="fitforge-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Track, Analyze, Improve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              RAW PERFORMANCE gives you all the tools you need to reach your fitness goals, track your progress, and stay motivated.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="fitforge-card text-center">
              <div className="bg-fitforge-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Dumbbell className="h-8 w-8 text-fitforge-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">Log Workouts</h3>
              <p className="text-gray-600">
                Easily log your workouts with detailed exercise information, sets, reps, and weights.
              </p>
            </div>
            
            <div className="fitforge-card text-center">
              <div className="bg-fitforge-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-fitforge-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">Set Goals</h3>
              <p className="text-gray-600">
                Define your fitness goals, track your progress, and celebrate achievements along the way.
              </p>
            </div>
            
            <div className="fitforge-card text-center">
              <div className="bg-fitforge-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="h-8 w-8 text-fitforge-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Visualize your fitness journey with charts and graphs to see how far you've come.
              </p>
            </div>
            
            <div className="fitforge-card text-center">
              <div className="bg-fitforge-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartPulse className="h-8 w-8 text-fitforge-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">Stay Motivated</h3>
              <p className="text-gray-600">
                Access workout plans and track your achievements to stay motivated on your fitness journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Preview Section */}
      <div className="py-20">
        <div className="fitforge-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Find The Right Plan For You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our flexible plans designed to match your fitness level and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Beginner Plan */}
            <div className="fitforge-card border-t-4 border-gray-300">
              <h3 className="text-xl font-bold mb-2">Beginner</h3>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold">Free</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Log workouts
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Set fitness goals
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic progress tracking
                </li>
              </ul>
              <Link
                to="/register"
                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-md font-bold transition-colors"
              >
                Get Started
              </Link>
            </div>
            
            {/* Intermediate Plan */}
            <div className="fitforge-card border-t-4 border-fitforge-red shadow-lg transform scale-105 z-10">
              <div className="absolute -top-4 left-0 right-0 text-center">
                <span className="bg-fitforge-red text-white text-sm font-bold py-1 px-4 rounded-full">
                  POPULAR
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Intermediate</h3>
              <div className="flex items-end mb-6">
                <span className="text-lg mr-1">R</span>
                <span className="text-4xl font-bold">35</span>
                <span className="text-lg ml-1">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All Beginner features
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access to gym workout plans
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced progress tracking
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save custom workout templates
                </li>
              </ul>
              <Link
                to="/subscription"
                className="block text-center bg-fitforge-red hover:bg-red-600 text-white py-3 rounded-md font-bold transition-colors"
              >
                Choose Plan
              </Link>
            </div>
            
            {/* Expert Plan */}
            <div className="fitforge-card border-t-4 border-gray-300">
              <h3 className="text-xl font-bold mb-2">Expert</h3>
              <div className="flex items-end mb-6">
                <span className="text-lg mr-1">R</span>
                <span className="text-4xl font-bold">60</span>
                <span className="text-lg ml-1">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All Intermediate features
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access to home workout plans
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Personalized recommendations
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <Link
                to="/subscription"
                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-md font-bold transition-colors"
              >
                Choose Plan
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/subscription"
              className="inline-flex items-center text-fitforge-red hover:underline font-bold"
            >
              View detailed plan comparison
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-fitforge-black text-white py-20">
        <div className="fitforge-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join RAW PERFORMANCE today and take the first step towards reaching your fitness goals.
          </p>
          <Link
            to="/register"
            className="bg-fitforge-red text-white px-8 py-3 text-lg font-bold rounded-md hover:bg-red-600 transition-colors inline-block"
          >
            Sign Up Now - It's Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
