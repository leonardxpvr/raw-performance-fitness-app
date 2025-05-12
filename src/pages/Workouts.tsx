
import { useState } from 'react';
import { Plus, X, Save, Dumbbell, Clock, Target } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

interface Workout {
  id: string;
  title: string;
  date: string;
  exercises: Exercise[];
}

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState<Workout>({
    id: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    exercises: []
  });

  // Initialize with common exercises
  const exerciseOptions = [
    'Bench Press', 'Squat', 'Deadlift', 'Shoulder Press',
    'Pull-up', 'Bicep Curl', 'Tricep Extension', 'Leg Press',
    'Lat Pulldown', 'Leg Extension', 'Leg Curl', 'Calf Raise'
  ];

  const handleAddExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: 3,
      reps: 10,
      weight: 0
    };
    setCurrentWorkout({
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, newExercise]
    });
  };

  const handleRemoveExercise = (id: string) => {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.filter(ex => ex.id !== id)
    });
  };

  const handleExerciseChange = (id: string, field: keyof Exercise, value: string | number) => {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.map(ex => 
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    });
  };

  const handleSaveWorkout = () => {
    const workoutToSave = {
      ...currentWorkout,
      id: currentWorkout.id || Date.now().toString()
    };
    
    if (currentWorkout.id) {
      // Update existing workout
      setWorkouts(workouts.map(w => 
        w.id === currentWorkout.id ? workoutToSave : w
      ));
    } else {
      // Add new workout
      setWorkouts([...workouts, workoutToSave]);
    }
    
    setShowModal(false);
    setCurrentWorkout({
      id: '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      exercises: []
    });
  };

  const handleEditWorkout = (workout: Workout) => {
    setCurrentWorkout(workout);
    setShowModal(true);
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="fitforge-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-fitforge-black">My Workouts</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center bg-fitforge-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Workout
          </button>
        </div>

        {workouts.length === 0 ? (
          <div className="fitforge-card text-center py-16">
            <Dumbbell className="h-16 w-16 mx-auto text-gray-300" />
            <h3 className="text-xl font-semibold mt-4 text-gray-600">No Workouts Yet</h3>
            <p className="text-gray-500 mt-2 mb-6">Start logging your workouts to track your progress</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-fitforge-red text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
            >
              Log Your First Workout
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map(workout => (
              <div key={workout.id} className="fitforge-card">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{workout.title}</h3>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => handleEditWorkout(workout)}
                      className="text-blue-500 hover:text-blue-700 p-1"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteWorkout(workout.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{new Date(workout.date).toLocaleDateString()}</span>
                </div>
                
                <ul className="divide-y divide-gray-100">
                  {workout.exercises.map(exercise => (
                    <li key={exercise.id} className="py-3">
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {exercise.sets} sets × {exercise.reps} reps × {exercise.weight} kg
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        
        {/* New/Edit Workout Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-fitforge-black">
                    {currentWorkout.id ? 'Edit Workout' : 'New Workout'}
                  </h3>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <label htmlFor="workoutTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Workout Title
                  </label>
                  <input
                    id="workoutTitle"
                    type="text"
                    className="fitforge-input"
                    placeholder="e.g., Chest Day, Leg Workout"
                    value={currentWorkout.title}
                    onChange={(e) => setCurrentWorkout({...currentWorkout, title: e.target.value})}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="workoutDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    id="workoutDate"
                    type="date"
                    className="fitforge-input"
                    value={currentWorkout.date}
                    onChange={(e) => setCurrentWorkout({...currentWorkout, date: e.target.value})}
                  />
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-medium text-fitforge-black">Exercises</h4>
                    <button 
                      onClick={handleAddExercise}
                      className="flex items-center text-sm text-fitforge-red hover:text-red-700 font-medium"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Exercise
                    </button>
                  </div>
                  
                  {currentWorkout.exercises.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                      <Target className="h-12 w-12 mx-auto text-gray-300" />
                      <p className="text-gray-500 mt-2">No exercises added yet</p>
                      <button 
                        onClick={handleAddExercise}
                        className="mt-3 text-fitforge-red hover:text-red-700 font-medium"
                      >
                        Add Your First Exercise
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentWorkout.exercises.map(exercise => (
                        <div key={exercise.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Exercise
                            </label>
                            <button 
                              onClick={() => handleRemoveExercise(exercise.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          
                          <div className="mb-3">
                            <select
                              className="fitforge-input"
                              value={exercise.name}
                              onChange={(e) => handleExerciseChange(exercise.id, 'name', e.target.value)}
                            >
                              <option value="">Select an exercise</option>
                              {exerciseOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                              <option value="custom">Custom...</option>
                            </select>
                            
                            {exercise.name === 'custom' && (
                              <input
                                type="text"
                                className="fitforge-input mt-2"
                                placeholder="Enter custom exercise name"
                                onChange={(e) => handleExerciseChange(exercise.id, 'name', e.target.value)}
                              />
                            )}
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sets
                              </label>
                              <input
                                type="number"
                                className="fitforge-input"
                                min="1"
                                value={exercise.sets}
                                onChange={(e) => handleExerciseChange(exercise.id, 'sets', parseInt(e.target.value))}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Reps
                              </label>
                              <input
                                type="number"
                                className="fitforge-input"
                                min="1"
                                value={exercise.reps}
                                onChange={(e) => handleExerciseChange(exercise.id, 'reps', parseInt(e.target.value))}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Weight (kg)
                              </label>
                              <input
                                type="number"
                                className="fitforge-input"
                                min="0"
                                step="0.5"
                                value={exercise.weight}
                                onChange={(e) => handleExerciseChange(exercise.id, 'weight', parseFloat(e.target.value))}
                              />
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Notes (optional)
                            </label>
                            <textarea
                              className="fitforge-input"
                              rows={2}
                              value={exercise.notes || ''}
                              onChange={(e) => handleExerciseChange(exercise.id, 'notes', e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                  onClick={handleSaveWorkout}
                  disabled={!currentWorkout.title || currentWorkout.exercises.length === 0}
                  className="flex items-center px-4 py-2 bg-fitforge-red text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Workout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
