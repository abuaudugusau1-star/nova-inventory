import { motion } from "framer-motion";
import { Brain, Users, Box, Shield, Zap, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Forecasting",
      description: "Predictive analytics and demand forecasting using advanced machine learning algorithms to optimize inventory levels.",
      color: "text-purple-400"
    },
    {
      icon: Users,
      title: "Real-Time Collaboration",
      description: "Multi-user sync with live updates, team permissions, and instant notifications across all devices.",
      color: "text-blue-400"
    },
    {
      icon: Box,
      title: "3D Visualization",
      description: "Interactive 3D product models and immersive warehouse layouts for enhanced spatial understanding.",
      color: "text-pink-400"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption, blockchain audit trails, and compliance with international security standards.",
      color: "text-green-400"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with edge computing, smart caching, and real-time data processing.",
      color: "text-yellow-400"
    },
    {
      icon: Globe,
      title: "Multi-Warehouse",
      description: "Manage inventory across multiple locations with automated reordering and inter-warehouse transfers.",
      color: "text-cyan-400"
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
            className="text-center mb-20 space-y-6"
          >
            <h1 className="text-6xl font-bold">Powerful Features</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to master your inventory, from AI-powered insights to real-time collaboration
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                  <feature.icon className={`w-12 h-12 mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 bg-gradient-purple-blue rounded-3xl p-12 text-center space-y-6"
          >
            <h2 className="text-4xl font-bold">Ready to Transform Your Inventory?</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Join hundreds of enterprises using ISMS to streamline operations and boost efficiency
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-8 py-4 rounded-full font-semibold shadow-subtle hover:shadow-glow transition-all duration-300"
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Features;
