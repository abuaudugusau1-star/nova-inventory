import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navigation />

      {/* Wavy Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1200 800">
          <path
            d="M 0 400 Q 300 200, 600 400 T 1200 400"
            stroke="url(#contactGradient)"
            strokeWidth="3"
            fill="none"
          />
          <defs>
            <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(280, 88%, 53%)" />
              <stop offset="100%" stopColor="hsl(220, 100%, 55%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <main className="relative pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-4"
          >
            <h1 className="text-6xl font-bold">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card border border-border rounded-3xl p-8"
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Tell us more..."
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 rounded-full py-6 text-lg font-semibold">
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-gradient-purple-blue rounded-3xl p-8 space-y-6">
                <h2 className="text-3xl font-bold">Contact Information</h2>
                <p className="opacity-90">
                  Reach out to us through any of these channels and we'll get back to you within 24 hours.
                </p>

                <div className="space-y-6 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p className="opacity-90">support@isms.dev</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <p className="opacity-90">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Location</p>
                      <p className="opacity-90">
                        Iconic University Campus<br />
                        Innovation Center, Building A
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-card border border-border rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
