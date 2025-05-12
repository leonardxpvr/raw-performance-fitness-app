
import { Card, CardContent } from "@/components/ui/card";

interface BeforeAfterProps {
  name: string;
  age: number;
  gender: string;
  beforeImage: string;
  afterImage: string;
  testimonial: string;
  duration: string;
}

const BeforeAfterCard = ({ name, age, gender, beforeImage, afterImage, testimonial, duration }: BeforeAfterProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute top-2 left-2 bg-fitforge-black bg-opacity-70 text-white px-2 py-1 text-xs font-bold rounded">
            BEFORE
          </div>
          <img 
            src={beforeImage} 
            alt={`${name} before using RAW PERFORMANCE`}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="relative">
          <div className="absolute top-2 left-2 bg-fitforge-red bg-opacity-70 text-white px-2 py-1 text-xs font-bold rounded">
            AFTER
          </div>
          <img 
            src={afterImage} 
            alt={`${name} after using RAW PERFORMANCE`}
            className="w-full h-64 object-cover"
          />
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-1">{name}, {age}</h3>
        <p className="text-fitforge-red text-sm font-bold mb-3">
          {duration} transformation
        </p>
        <p className="text-gray-700 italic">"{testimonial}"</p>
      </CardContent>
    </Card>
  );
};

const BeforeAfterResults = () => {
  // Sample data for before and after results
  const results: BeforeAfterProps[] = [
    {
      name: "James Wilson",
      age: 34,
      gender: "male",
      beforeImage: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&h=500&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&h=500&fit=crop", 
      testimonial: "RAW PERFORMANCE completely changed my fitness journey. I've lost 15kg and gained muscle definition I never thought possible. The workout plans were exactly what I needed!",
      duration: "6 month"
    },
    {
      name: "Sarah Johnson",
      age: 29,
      gender: "female",
      beforeImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop",
      testimonial: "I tried many fitness apps before, but RAW PERFORMANCE was the only one that helped me stay consistent. The progress tracking feature kept me motivated every step of the way!",
      duration: "8 month"
    },
    {
      name: "Michael Rodriguez",
      age: 42,
      gender: "male",
      beforeImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop", 
      afterImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop",
      testimonial: "At my age, I thought getting back in shape was impossible. The Expert plan gave me home workouts that were challenging but doable. I'm in better shape now than I was at 30!",
      duration: "12 month"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="fitforge-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Real Results, Real Transformations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the incredible transformations achieved by RAW PERFORMANCE members through dedication and our proven workout systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <BeforeAfterCard key={index} {...result} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">What Our Community Says</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">"The goal setting feature helped me achieve my fitness targets one by one. Seeing my progress visually was a game changer!"</p>
              <p className="font-bold">- Emma T.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">"The workout plans are exceptional. They adjust to your level and gradually increase intensity. Worth every cent of my subscription!"</p>
              <p className="font-bold">- Jason R.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">"As someone who travels a lot, the home workout options in the Expert plan have been perfect. I never miss a workout now, no matter where I am!"</p>
              <p className="font-bold">- Rachel M.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterResults;
