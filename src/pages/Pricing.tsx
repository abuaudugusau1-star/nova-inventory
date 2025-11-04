import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Student",
      price: "Free",
      description: "Perfect for Iconic University students",
      features: [
        "Basic inventory management",
        "Up to 100 items",
        "Email support",
        "Access to LMS modules",
        "Educational resources"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Unlimited items",
        "AI-powered forecasting",
        "Real-time analytics",
        "3D visualization",
        "Priority support",
        "Multi-warehouse",
        "Custom reports"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security",
        "SLA guarantee",
        "White-label options",
        "Blockchain audit trail"
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      <main className="pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-4"
          >
            <h1 className="text-6xl font-bold">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing designed to scale with your business, from students to enterprises
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative rounded-3xl p-8 ${
                  plan.highlighted
                    ? "bg-gradient-purple-blue shadow-glow scale-105"
                    : "bg-card border border-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className={`text-sm ${plan.highlighted ? "opacity-90" : "text-muted-foreground"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>

                  <Button
                    className={`w-full rounded-full ${
                      plan.highlighted
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    Get Started
                  </Button>

                  <div className="pt-6 space-y-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? "text-white" : "text-primary"
                        }`} />
                        <span className={`text-sm ${
                          plan.highlighted ? "opacity-90" : "text-muted-foreground"
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Questions?</h2>
            <p className="text-muted-foreground mb-8">
              Our team is here to help you choose the right plan
            </p>
            <Button variant="outline" className="rounded-full px-8 border-foreground/20">
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
