
import { useState } from 'react';
import { Check, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

const GoalCard = ({ goal, onEdit, onDelete }: GoalCardProps) => {
  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({
          completed: !completed,
          progress: !completed ? 100 : goal.progress,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the goal directly
      goal.completed = !completed;
      goal.progress = !completed ? 100 : goal.progress;
      
    } catch (error: any) {
      toast({
        title: "Error updating goal",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateProgress = async (id: string, progress: number) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({
          progress,
          completed: progress === 100,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the goal directly
      goal.progress = progress;
      goal.completed = progress === 100;
      
    } catch (error: any) {
      toast({
        title: "Error updating progress",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div 
      className={`fitforge-card ${goal.completed ? 'border-l-4 border-green-500' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start">
          <button
            onClick={() => handleToggleComplete(goal.id, goal.completed)}
            className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center mr-3 ${
              goal.completed 
                ? 'bg-green-500 border-green-500' 
                : 'border-gray-300 hover:border-fitforge-red'
            }`}
          >
            {goal.completed && <Check className="h-4 w-4 text-white" />}
          </button>
          <h3 className={`text-xl font-bold ${goal.completed ? 'text-gray-500 line-through' : ''}`}>
            {goal.title}
          </h3>
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={() => onEdit(goal)}
            className="text-blue-500 hover:text-blue-700 p-1"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(goal.id)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            Delete
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{goal.description}</p>
      
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <Calendar className="h-4 w-4 mr-2" />
        <span>Target: {goal.target_date ? new Date(goal.target_date).toLocaleDateString() : 'No date set'}</span>
      </div>
      
      <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm mb-4">
        {goal.category}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{goal.progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${goal.completed ? 'bg-green-500' : 'bg-fitforge-red'}`}
            style={{ width: `${goal.progress}%` }}
          ></div>
        </div>
        
        {!goal.completed && (
          <input
            type="range"
            min="0"
            max="100"
            className="w-full mt-2"
            value={goal.progress}
            onChange={(e) => handleUpdateProgress(goal.id, parseInt(e.target.value))}
          />
        )}
      </div>
    </div>
  );
};

export default GoalCard;
