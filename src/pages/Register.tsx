import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Eye, EyeOff, Lock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt:", formData);
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({ 
            ...formData, 
            location: `${position.coords.latitude}, ${position.coords.longitude}` 
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/60" />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="gradient-orange rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              Create Your Account
            </h1>
            <p className="text-primary-foreground/80">
              Join the conversation, learn, share & grow
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-primary-foreground">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-foreground">
                Email Id
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-primary-foreground">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-primary-foreground">
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Your location"
                  value={formData.location}
                  onChange={handleChange}
                  className="pl-10 pr-28 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-white"
                />
                <button
                  type="button"
                  onClick={handleUseLocation}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-white/30 hover:bg-white/40 text-primary-foreground px-3 py-1 rounded-full transition-colors"
                >
                  Use My Location
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold py-6 mt-4"
            >
              Pay Now
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link 
              to="/subscription" 
              className="text-sm text-primary-foreground/80 hover:text-primary-foreground underline"
            >
              Click here to know more about Subscription plans
            </Link>
          </div>

          <div className="mt-4 text-center">
            <p className="text-primary-foreground/80">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-primary-foreground font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-foreground hover:text-primary transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
