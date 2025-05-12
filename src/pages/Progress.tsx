
import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';

// Mock data for our charts
const workoutData = [
  { name: 'Jan', workouts: 12 },
  { name: 'Feb', workouts: 19 },
  { name: 'Mar', workouts: 15 },
  { name: 'Apr', workouts: 22 },
  { name: 'May', workouts: 25 },
  { name: 'Jun', workouts: 18 },
];

const weightData = [
  { date: '2023-01-01', weight: 85 },
  { date: '2023-02-01', weight: 84 },
  { date: '2023-03-01', weight: 82.5 },
  { date: '2023-04-01', weight: 81.2 },
  { date: '2023-05-01', weight: 80 },
  { date: '2023-06-01', weight: 79.5 },
];

const strengthData = [
  { name: 'Week 1', bench: 80, squat: 120, deadlift: 150 },
  { name: 'Week 2', bench: 82.5, squat: 125, deadlift: 155 },
  { name: 'Week 3', bench: 85, squat: 127.5, deadlift: 160 },
  { name: 'Week 4', bench: 87.5, squat: 130, deadlift: 165 },
  { name: 'Week 5', bench: 90, squat: 135, deadlift: 170 },
  { name: 'Week 6', bench: 92.5, squat: 140, deadlift: 175 },
];

const Progress = () => {
  const [timeRange, setTimeRange] = useState('6m'); // 1m, 3m, 6m, 1y, all
  
  const getTimeRangeLabel = () => {
    switch(timeRange) {
      case '1m': return 'Last Month';
      case '3m': return 'Last 3 Months';
      case '6m': return 'Last 6 Months';
      case '1y': return 'Last Year';
      case 'all': return 'All Time';
      default: return 'Last 6 Months';
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="fitforge-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-fitforge-black">My Progress</h1>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-1 flex">
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === '1m' ? 'bg-fitforge-red text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setTimeRange('1m')}
            >
              1M
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === '3m' ? 'bg-fitforge-red text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setTimeRange('3m')}
            >
              3M
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === '6m' ? 'bg-fitforge-red text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setTimeRange('6m')}
            >
              6M
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === '1y' ? 'bg-fitforge-red text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setTimeRange('1y')}
            >
              1Y
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === 'all' ? 'bg-fitforge-red text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setTimeRange('all')}
            >
              All
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-xl text-gray-700">
            <Calendar className="h-5 w-5 inline mr-2" />
            Showing data for: <span className="font-bold">{getTimeRangeLabel()}</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Workout Frequency Chart */}
          <div className="fitforge-card">
            <h3 className="text-xl font-bold mb-4">Workout Frequency</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workoutData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="workouts" name="Workouts" fill="#EA384C" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Weight Tracking Chart */}
          <div className="fitforge-card">
            <h3 className="text-xl font-bold mb-4">Weight Tracking</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                <Legend />
                <Line type="monotone" dataKey="weight" name="Weight (kg)" stroke="#EA384C" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Strength Progress Chart */}
        <div className="fitforge-card mb-8">
          <h3 className="text-xl font-bold mb-4">Strength Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={strengthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bench" name="Bench Press (kg)" stroke="#EA384C" strokeWidth={2} />
              <Line type="monotone" dataKey="squat" name="Squat (kg)" stroke="#222222" strokeWidth={2} />
              <Line type="monotone" dataKey="deadlift" name="Deadlift (kg)" stroke="#8E9196" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="fitforge-card text-center">
            <TrendingUp className="h-12 w-12 mx-auto text-fitforge-red mb-4" />
            <h4 className="text-2xl font-bold mb-1">25%</h4>
            <p className="text-gray-600">Increase in Strength</p>
          </div>
          
          <div className="fitforge-card text-center">
            <TrendingUp className="h-12 w-12 mx-auto text-fitforge-red mb-4" />
            <h4 className="text-2xl font-bold mb-1">18</h4>
            <p className="text-gray-600">Workouts This Month</p>
          </div>
          
          <div className="fitforge-card text-center">
            <TrendingUp className="h-12 w-12 mx-auto text-fitforge-red mb-4" />
            <h4 className="text-2xl font-bold mb-1">5.5kg</h4>
            <p className="text-gray-600">Weight Lost</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
