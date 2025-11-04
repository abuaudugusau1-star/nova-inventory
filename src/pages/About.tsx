import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            {/* Hero */}
            <div className="text-center space-y-6">
              <h1 className="text-6xl font-bold">The Story of ISMS</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Revolutionizing inventory management through innovative design, powerful AI, and an unwavering commitment to excellence.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-12">
              {[
                { year: "2024", title: "The Vision", description: "Born from a vision to transform how businesses manage their inventory with cutting-edge technology and Apple-inspired design." },
                { year: "2025", title: "Innovation Launch", description: "Introducing AI-powered forecasting, 3D visualization, and real-time multi-user collaboration to the platform." },
                { year: "Future", title: "Global Scale", description: "Expanding to serve thousands of enterprises worldwide with blockchain-verified audits and quantum-ready infrastructure." },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-12 border-l-2 border-primary"
                >
                  <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-purple-blue flex items-center justify-center text-sm font-bold shadow-glow">
                    {index + 1}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-primary font-semibold">{milestone.year}</p>
                    <h3 className="text-2xl font-bold">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Partnership with Iconic University */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-purple-blue rounded-3xl p-12 text-center space-y-6"
            >
              <h2 className="text-4xl font-bold">Built for Iconic University</h2>
              <p className="text-lg max-w-2xl mx-auto opacity-90">
                ISMS proudly powers the Senate Dev program at Iconic University, providing students with hands-on experience in enterprise-grade inventory management systems.
              </p>
              <div className="flex justify-center gap-8 pt-6">
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-sm opacity-80">Students Trained</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">98%</p>
                  <p className="text-sm opacity-80">Success Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-sm opacity-80">LMS Access</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default About;
