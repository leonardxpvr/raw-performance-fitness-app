
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { Tables } from '@/integrations/supabase/types';
import { Dumbbell, Calendar, Clock, Info } from 'lucide-react';

interface Program extends Tables<'programs'> {
  id: string;
  title: string;
  description: string | null;
  is_premium: boolean | null;
  content: any | null;
  created_at: string;
}

const Programs = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userSubscription, setUserSubscription] = useState<any>(null);

  useEffect(() => {
    fetchPrograms();
    if (user) {
      fetchUserSubscription();
    }
  }, [user]);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        setPrograms(data as Program[]);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load programs"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserSubscription = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      setUserSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const handleProgramClick = (program: Program) => {
    if (program.is_premium && (!userSubscription || userSubscription.subscription_type === 'free')) {
      toast({
        title: "Premium Content",
        description: "You need a premium subscription to access this program",
        variant: "default",
      });
      navigate('/subscription');
    } else {
      // Navigate to program details page
      navigate(`/programs/${program.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="fitforge-container text-center py-16">
          <p>Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="fitforge-container">
        <h1 className="text-3xl font-bold text-fitforge-black mb-2">Workout Programs</h1>
        <p className="text-gray-600 mb-8">Choose a program that matches your fitness goals</p>
        
        {programs.length === 0 ? (
          <div className="fitforge-card text-center py-16">
            <Dumbbell className="h-16 w-16 mx-auto text-gray-300" />
            <h3 className="text-xl font-semibold mt-4 text-gray-600">No Programs Available</h3>
            <p className="text-gray-500 mt-2">Check back soon for new workout programs</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div 
                key={program.id} 
                className={`fitforge-card cursor-pointer transform hover:scale-105 transition-transform ${
                  program.is_premium ? 'border-t-4 border-yellow-500' : ''
                }`}
                onClick={() => handleProgramClick(program)}
              >
                {program.is_premium && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Premium
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{program.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mt-auto">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-3">
                    {new Date(program.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
