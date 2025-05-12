
import { useState } from 'react';
import { Plus, X, Save, Check, Target, Calendar, Clock } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  category: string;
  completed: boolean;
  progress: number;
}

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<Goal>({
    id: '',
    title: '',
    description: '',
    targetDate: '',
    category: '',
    completed: false,
    progress: 0
  });

  const categories = [
    'Strength', 'Endurance', 'Weight Loss', 'Muscle Gain', 
    'Flexibility', 'General Fitness', 'Other'
  ];

  const handleSaveGoal = () => {
    const goalToSave = {
      ...currentGoal,
      id: currentGoal.id || Date.now().toString()
    };
    
    if (currentGoal.id) {
      // Update existing goal
      setGoals(goals.map(g => 
        g.id === currentGoal.id ? goalToSave : g
      ));
    } else {
      // Add new goal
      setGoals([...goals, goalToSave]);
    }
    
    setShowModal(false);
    setCurrentGoal({
      id: '',
      title: '',
      description: '',
      targetDate: '',
      category: '',
      completed: false,
      progress: 0
    });
  };

  const handleEditGoal = (goal: Goal) => {
    setCurrentGoal(goal);
    setShowModal(true);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, completed: !goal.completed, progress: !goal.completed ? 100 : goal.progress } 
        : goal
    ));
  };

  const handleUpdateProgress = (id: string, progress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, progress, completed: progress === 100 } 
        : goal
    ));
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="fitforge-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-fitforge-black">My Fitness Goals</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center bg-fitforge-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Goal
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="fitforge-card text-center py-16">
            <Target className="h-16 w-16 mx-auto text-gray-300" />
            <h3 className="text-xl font-semibold mt-4 text-gray-600">No Goals Set Yet</h3>
            <p className="text-gray-500 mt-2 mb-6">Define your fitness objectives to stay motivated</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-fitforge-red text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
            >
              Set Your First Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(goal => (
              <div 
                key={goal.id} 
                className={`fitforge-card ${goal.completed ? 'border-l-4 border-green-500' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <button
                      onClick={() => handleToggleComplete(goal.id)}
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
                      onClick={() => handleEditGoal(goal)}
                      className="text-blue-500 hover:text-blue-700 p-1"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{goal.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Target: {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString() : 'No date set'}</span>
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
            ))}
          </div>
        )}
        
        {/* New/Edit Goal Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-fitforge-black">
                    {currentGoal.id ? 'Edit Goal' : 'New Goal'}
                  </h3>
                  <button 
                    onClick={() => setShowModal(false)}
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
                    value={currentGoal.targetDate}
                    onChange={(e) => setCurrentGoal({...currentGoal, targetDate: e.target.value})}
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
                  onClick={() => setShowModal(false)}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveGoal}
                  disabled={!currentGoal.title}
                  className="flex items-center px-4 py-2 bg-fitforge-red text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
