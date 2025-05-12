
import { useState } from 'react';
import { Check } from 'lucide-react';

type PlanType = 'beginner' | 'intermediate' | 'expert';

interface Plan {
  name: string;
  price: string;
  currency: string;
  features: string[];
  tierName: string;
}

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('beginner');

  const plans: Record<PlanType, Plan> = {
    beginner: {
      name: 'Beginner',
      price: 'Free',
      currency: '',
      tierName: 'Free',
      features: [
        'Log workouts with exercise details',
        'Track basic workout progress',
        'Set fitness goals',
        'View basic statistics'
      ]
    },
    intermediate: {
      name: 'Intermediate',
      price: '35',
      currency: 'R',
      tierName: 'Premium',
      features: [
        'All Beginner features',
        'Access to gym workout plans',
        'Advanced progress tracking',
        'Customizable workout templates',
        'Export workout data'
      ]
    },
    expert: {
      name: 'Expert',
      price: '60',
      currency: 'R',
      tierName: 'Pro',
      features: [
        'All Intermediate features',
        'Access to home workout plans',
        'Personalized workout recommendations',
        'Priority support',
        'Ad-free experience'
      ]
    }
  };

  const handleSelectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = () => {
    // Here we would handle the subscription process
    // For now we'll just alert
    alert(`You selected the ${plans[selectedPlan].name} plan. Subscription functionality will be implemented with backend integration.`);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="fitforge-container">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-fitforge-black mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 mb-12">
            Select the plan that best fits your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {(Object.keys(plans) as PlanType[]).map((planKey) => {
            const plan = plans[planKey];
            const isSelected = selectedPlan === planKey;
            
            return (
              <div 
                key={planKey}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all ${
                  isSelected ? 'border-2 border-fitforge-red scale-105' : 'border border-gray-200'
                }`}
              >
                <div className={`px-6 py-8 ${isSelected ? 'bg-fitforge-red text-white' : 'bg-gray-100'}`}>
                  <h3 className="text-2xl font-bold mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-end">
                    {plan.price === 'Free' ? (
                      <span className="text-4xl font-extrabold">Free</span>
                    ) : (
                      <>
                        <span className="text-2xl font-bold">{plan.currency}</span>
                        <span className="text-4xl font-extrabold">{plan.price}</span>
                        <span className="text-lg ml-1">/mo</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${isSelected ? 'text-fitforge-red' : 'text-gray-500'}`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleSelectPlan(planKey)}
                    className={`mt-8 w-full py-3 px-4 rounded-md font-medium transition-colors ${
                      isSelected 
                        ? 'bg-fitforge-red text-white hover:bg-red-600' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleSubscribe}
            className="py-4 px-8 bg-fitforge-red text-white text-lg font-bold rounded-md hover:bg-red-600 transition-colors"
          >
            {selectedPlan === 'beginner' ? 'Get Started For Free' : `Subscribe to ${plans[selectedPlan].name}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
