import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle, error, clearError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = validateEmail(formData.email) && formData.password.length >= 6;

  // Handle email login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!isFormValid) {
      return;
    }

    try {
      setLoading(true);
      await loginWithEmail(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    clearError();

    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearError();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden py-20 px-4 flex items-center justify-center">
      {/* BACKGROUND GRADIENTS */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050B2E] via-[#0f172a] to-[#1a1230]" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">Login to your Lyfex account</p>
        </div>

        {/* LOGIN CARD */}
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8">
          {/* ERROR MESSAGE */}
          {error && (
            <Alert className="mb-6 bg-red-500/10 border-red-500/30">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          {/* EMAIL LOGIN FORM */}
          <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
            {/* EMAIL INPUT */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              {formData.email && !validateEmail(formData.email) && (
                <p className="text-sm text-red-400 mt-1">Invalid email format</p>
              )}
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              {formData.password && formData.password.length < 6 && (
                <p className="text-sm text-red-400 mt-1">Password must be at least 6 characters</p>
              )}
            </div>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* DIVIDER */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/5 text-white/60">Or continue with</span>
            </div>
          </div>

          {/* GOOGLE LOGIN */}
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/20"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </Button>

          {/* SIGNUP LINK */}
          <div className="mt-6 text-center">
            <p className="text-white/60">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
