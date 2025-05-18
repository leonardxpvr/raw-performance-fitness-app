
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useGoals } from '@/hooks/useGoals';
import GoalCard from '@/components/goals/GoalCard';
import GoalForm from '@/components/goals/GoalForm';
import EmptyGoalState from '@/components/goals/EmptyGoalState';

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

const Goals = () => {
  const [showModal, setShowModal] = useState(false);
  const { goals, loading, saveGoal, deleteGoal } = useGoals();
  
  const [currentGoal, setCurrentGoal] = useState<Goal>({
    id: '',
    user_id: '',
    title: '',
    description: '',
    target_date: '',
    category: '',
    completed: false,
    progress: 0
  });

  const categories = [
    'Strength', 'Endurance', 'Weight Loss', 'Muscle Gain', 
    'Flexibility', 'General Fitness', 'Other'
  ];

  const handleEditGoal = (goal: Goal) => {
    setCurrentGoal(goal);
    setShowModal(true);
  };

  const handleSaveGoal = async (goal: Goal) => {
    const success = await saveGoal(goal);
    if (success) {
      setShowModal(false);
      resetCurrentGoal();
    }
  };

  const resetCurrentGoal = () => {
    setCurrentGoal({
      id: '',
      user_id: '',
      title: '',
      description: '',
      target_date: '',
      category: '',
      completed: false,
      progress: 0
    });
  };

  if (loading) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="fitforge-container text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="fitforge-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-fitforge-black">My Fitness Goals</h1>
          <button
            onClick={() => {
              resetCurrentGoal();
              setShowModal(true);
            }}
            className="flex items-center bg-fitforge-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Goal
          </button>
        </div>

        {goals.length === 0 ? (
          <EmptyGoalState onCreateClick={() => setShowModal(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(goal => (
              <GoalCard 
                key={goal.id} 
                goal={goal} 
                onEdit={handleEditGoal} 
                onDelete={deleteGoal} 
              />
            ))}
          </div>
        )}
        
        {showModal && (
          <GoalForm 
            onClose={() => setShowModal(false)} 
            onSave={handleSaveGoal}
            goal={currentGoal}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default Goals;
