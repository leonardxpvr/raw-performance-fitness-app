
import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

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

interface GoalFormProps {
  onClose: () => void;
  onSave: (goal: Goal) => void;
  goal: Goal;
  categories: string[];
}

const GoalForm = ({ onClose, onSave, goal, categories }: GoalFormProps) => {
  const [currentGoal, setCurrentGoal] = useState<Goal>(goal);
  
  const handleSave = () => {
    onSave(currentGoal);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-fitforge-black">
              {currentGoal.id ? 'Edit Goal' : 'New Goal'}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="goalTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Goal Title
            </label>
            <input
              id="goalTitle"
              type="text"
              className="fitforge-input"
              placeholder="e.g., Lose 5kg, Bench Press 100kg"
              value={currentGoal.title}
              onChange={(e) => setCurrentGoal({...currentGoal, title: e.target.value})}
            />
          </div>
          
          <div>
            <label htmlFor="goalDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="goalDescription"
              className="fitforge-input"
              rows={3}
              placeholder="Describe your goal and why it's important to you"
              value={currentGoal.description}
              onChange={(e) => setCurrentGoal({...currentGoal, description: e.target.value})}
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="goalCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="goalCategory"
              className="fitforge-input"
              value={currentGoal.category}
              onChange={(e) => setCurrentGoal({...currentGoal, category: e.target.value})}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="goalTargetDate" className="block text-sm font-medium text-gray-700 mb-1">
              Target Date
            </label>
            <input
              id="goalTargetDate"
              type="date"
              className="fitforge-input"
              value={currentGoal.target_date}
              onChange={(e) => setCurrentGoal({...currentGoal, target_date: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Progress: {currentGoal.progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full"
              value={currentGoal.progress}
              onChange={(e) => setCurrentGoal({...currentGoal, progress: parseInt(e.target.value)})}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="goalCompleted"
              type="checkbox"
              className="h-4 w-4 text-fitforge-red focus:ring-fitforge-red border-gray-300 rounded"
              checked={currentGoal.completed}
              onChange={(e) => setCurrentGoal({
                ...currentGoal, 
                completed: e.target.checked,
                progress: e.target.checked ? 100 : currentGoal.progress
              })}
            />
            <label htmlFor="goalCompleted" className="ml-2 block text-sm text-gray-900">
              Mark as completed
            </label>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button 
            onClick={onClose}
            className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={!currentGoal.title}
            className="flex items-center px-4 py-2 bg-fitforge-red text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalForm;
