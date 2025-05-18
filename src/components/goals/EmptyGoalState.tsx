
import { Target } from 'lucide-react';

interface EmptyGoalStateProps {
  onCreateClick: () => void;
}

const EmptyGoalState = ({ onCreateClick }: EmptyGoalStateProps) => {
  return (
    <div className="fitforge-card text-center py-16">
      <Target className="h-16 w-16 mx-auto text-gray-300" />
      <h3 className="text-xl font-semibold mt-4 text-gray-600">No Goals Set Yet</h3>
      <p className="text-gray-500 mt-2 mb-6">Define your fitness objectives to stay motivated</p>
      <button
        onClick={onCreateClick}
        className="bg-fitforge-red text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
      >
        Set Your First Goal
      </button>
    </div>
  );
};

export default EmptyGoalState;
