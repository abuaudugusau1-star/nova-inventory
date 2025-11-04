import { motion } from "framer-motion";
import WavyLines from "@/components/WavyLines";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">

      {/* Gradient Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-glow opacity-50 blur-3xl" />

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-7xl lg:text-8xl font-bold tracking-tighter">
                Welcome.
              </h1>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative max-w-lg"
              >
                <input
                  type="text"
                  placeholder="Search for features, guides, or products..."
                  className="w-full bg-muted/50 backdrop-blur-sm border border-border rounded-full px-6 py-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 rounded-full px-8 shadow-subtle hover:scale-105 transition-all duration-300"
                  >
                    Free Trial
                  </Button>
                </Link>
                <Link to="/features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 border-foreground/20 hover:bg-foreground/5 hover:scale-105 transition-all duration-300"
                  >
                    See More
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50"
              >
                <div>
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Enterprises</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Wavy Lines */}
            <div className="relative h-[600px] hidden lg:block">
              <WavyLines />
            </div>
          </div>
        </div>
      </main>

      {/* Features Preview */}
      <section className="relative py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Built for Excellence</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Enterprise-grade inventory management with AI-powered insights, real-time analytics, and seamless integration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Intelligent Analytics",
                description: "AI-powered forecasting and demand prediction to optimize your inventory levels.",
                icon: "📊"
              },
              {
                title: "Real-Time Sync",
                description: "Multi-user collaboration with instant updates across all devices and locations.",
                icon: "🔄"
              },
              {
                title: "3D Visualization",
                description: "Interactive 3D product models and immersive warehouse management.",
                icon: "🎨"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
