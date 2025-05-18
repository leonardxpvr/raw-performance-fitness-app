
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string;
  target_date: string;
  category: string;
  completed: boolean;
  progress: number;
  created_at?: string;
  updated_at?: string;
}

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchGoals = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setGoals(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching goals",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveGoal = async (goalToSave: Goal) => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to save goals",
          variant: "destructive"
        });
        return;
      }
      
      let response;
      
      if (goalToSave.id) {
        // Update existing goal
        response = await supabase
          .from('goals')
          .update({
            title: goalToSave.title,
            description: goalToSave.description,
            target_date: goalToSave.target_date,
            category: goalToSave.category,
            completed: goalToSave.completed,
            progress: goalToSave.progress,
            updated_at: new Date().toISOString()
          })
          .eq('id', goalToSave.id)
          .select();
      } else {
        // Add new goal
        response = await supabase
          .from('goals')
          .insert([{
            title: goalToSave.title,
            description: goalToSave.description,
            target_date: goalToSave.target_date,
            category: goalToSave.category,
            completed: goalToSave.completed,
            progress: goalToSave.progress,
            user_id: user.id
          }])
          .select();
      }
      
      if (response.error) throw response.error;
      
      toast({
        title: goalToSave.id ? "Goal updated" : "Goal created",
        description: goalToSave.id ? "Your goal has been updated successfully" : "Your new goal has been created",
      });
      
      // Refresh goals
      fetchGoals();
      return true;
    } catch (error: any) {
      toast({
        title: "Error saving goal",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Goal deleted",
        description: "Your goal has been deleted successfully",
      });
      
      // Update local state
      setGoals(goals.filter(g => g.id !== id));
      return true;
    } catch (error: any) {
      toast({
        title: "Error deleting goal",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    // Redirect to login if not authenticated
    if (user === null && !loading) {
      navigate('/login');
    }

    // Fetch goals if user is authenticated
    if (user) {
      fetchGoals();
    }
  }, [user, navigate]);

  return {
    goals,
    loading,
    fetchGoals,
    saveGoal,
    deleteGoal
  };
};
