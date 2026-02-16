import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "View Access",
    price: "Free",
    description: "Perfect for learners who want to observe",
    features: [
      { text: "Watch live sessions", included: true },
      { text: "Observe discussions", included: true },
      { text: "Browse content", included: true },
      { text: "Speak in discussions", included: false },
      { text: "Create sessions", included: false },
      { text: "Post freelance tasks", included: false },
    ],
    gradient: "from-slate-500 to-slate-600",
    popular: false,
  },
  {
    name: "Talk Access",
    price: "$9.99",
    period: "/month",
    description: "Join the conversation and participate",
    features: [
      { text: "Everything in View Access", included: true },
      { text: "Join live sessions", included: true },
      { text: "Speak in discussions", included: true },
      { text: "Participate actively", included: true },
      { text: "Create sessions", included: false },
      { text: "Post freelance tasks", included: false },
    ],
    gradient: "from-orange-400 to-orange-500",
    popular: false,
  },
  {
    name: "Create & Contribute",
    price: "$19.99",
    period: "/month",
    description: "Full access to create and earn",
    features: [
      { text: "Everything in Talk Access", included: true },
      { text: "Create live sessions", included: true },
      { text: "Create discussion rooms", included: true },
      { text: "Post freelance tasks", included: true },
      { text: "Earn money from content", included: true },
      { text: "Priority support", included: true },
    ],
    gradient: "from-pink-500 to-orange-500",
    popular: true,
  },
];

export default function Subscription() {
  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden py-20 px-4">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050B2E] via-[#0f172a] to-[#1a1230]" />

      <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}} />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Access Level
            </span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto">
            Start free and upgrade as you grow. No hidden fees.
          </p>
        </div>

        {/* PRICING CARDS */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative animate-fade-in backdrop-blur-xl bg-white/5 border rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "border-orange-400 shadow-2xl shadow-orange-500/20"
                  : "border-white/10 hover:border-white/20"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* POPULAR BADGE */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-black text-sm font-bold rounded-full shadow-lg">
                  MOST POPULAR
                </div>
              )}

              {/* PLAN HEADER */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/60 text-lg">{plan.period}</span>}
                </div>

                <Button
                  className={`w-full py-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.gradient} text-black hover:shadow-lg hover:shadow-orange-500/50`
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  }`}
                >
                  {plan.price === "Free" ? "Start Free" : "Buy Now"}
                </Button>
              </div>

              {/* FEATURES LIST */}
              <div className="space-y-4 mt-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        feature.included
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-white/5 text-white/30"
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        feature.included ? "text-white" : "text-white/40"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="text-center mt-16 text-white/60">
          <p>All plans include 24/7 support and regular updates</p>
          <p className="text-sm mt-2">Cancel anytime. No questions asked.</p>
        </div>
      </div>
    </div>
  );
}
