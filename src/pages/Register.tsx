import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader, Check } from 'lucide-react';

type SubscriptionPlan = 'VIEW' | 'TALK' | 'CREATE';

const plans = [
  {
    id: 'VIEW' as const,
    name: 'View Access',
    price: 'Free',
    description: 'Perfect for learners who want to observe',
    features: [
      'Watch live sessions',
      'Observe discussions',
      'Browse content',
    ],
  },
  {
    id: 'TALK' as const,
    name: 'Talk Access',
    price: '$9.99',
    period: '/month',
    description: 'Join the conversation and participate',
    features: [
      'Everything in View Access',
      'Join live sessions',
      'Speak in discussions',
      'Participate actively',
    ],
  },
  {
    id: 'CREATE' as const,
    name: 'Create & Contribute',
    price: '$19.99',
    period: '/month',
    description: 'Full access to create and earn',
    features: [
      'Everything in Talk Access',
      'Create live sessions',
      'Create discussion rooms',
      'Post freelance tasks',
      'Earn money from content',
    ],
    popular: true,
  },
];

export default function Register() {
  const navigate = useNavigate();
  const { registerWithEmail, error, clearError } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('VIEW');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    interest: '',
  });

  // Validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isStep1Valid =
    formData.fullName.trim() &&
    validateEmail(formData.email) &&
    formData.password.length >= 6 &&
    formData.password === formData.confirmPassword &&
    formData.phone.trim() &&
    formData.address.trim() &&
    formData.interest.trim();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearError();
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      setLoading(true);
      await registerWithEmail(formData.email, formData.password, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        interest: formData.interest,
        subscriptionPlan: selectedPlan,
        role: selectedPlan,
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden py-20 px-4 flex items-center justify-center">
      {/* BACKGROUND GRADIENTS */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050B2E] via-[#0f172a] to-[#1a1230]" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md md:max-w-2xl">
        {/* PROGRESS INDICATOR */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/60'}`}>
            1
          </div>
          <div className={`w-8 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-white/10'}`} />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/60'}`}>
            2
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {step === 1 ? 'Create Your Account' : 'Choose Your Plan'}
          </h1>
          <p className="text-white/60">
            {step === 1 ? 'Fill in your details to get started' : 'Select the plan that works best for you'}
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <Alert className="mb-6 bg-red-500/10 border-red-500/30">
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        {/* STEP 1: PERSONAL INFO */}
        {step === 1 && (
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8">
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  required
                />
                {formData.email && !validateEmail(formData.email) && (
                  <p className="text-sm text-red-400 mt-1">Invalid email format</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Address</label>
                <Input
                  type="text"
                  name="address"
                  placeholder="123 Main St, City, State"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Password</label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                  {formData.password && formData.password.length < 6 && (
                    <p className="text-sm text-red-400 mt-1">Min 6 characters</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-400 mt-1">Passwords don't match</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Interest/Expertise</label>
                <Input
                  type="text"
                  name="interest"
                  placeholder="e.g., Technology, Design, Business"
                  value={formData.interest}
                  onChange={handleInputChange}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={!isStep1Valid}
                className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </Button>
            </form>

            <p className="text-center text-white/60 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-400 hover:text-orange-300 font-semibold">
                Login
              </Link>
            </p>
          </Card>
        )}

        {/* STEP 2: SUBSCRIPTION PLANS */}
        {step === 2 && (
          <div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`backdrop-blur-xl bg-white/5 border p-6 cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'border-orange-400 bg-orange-500/10 shadow-lg shadow-orange-500/20'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {plan.popular && (
                    <div className="mb-4 inline-block px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-semibold rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-white/60">{plan.period}</span>}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                        <Check className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedPlan === plan.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}>
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setStep(1)}
                disabled={loading}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg transition-all duration-300"
              >
                Back
              </Button>
              <Button
                onClick={handleRegister}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
