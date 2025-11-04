import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Package, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const inventoryItems = [
    { id: 1, name: "Golden Apple", stock: 245, category: "Premium", trend: "+12%" },
    { id: 2, name: "Purple Grape", stock: 189, category: "Fresh", trend: "+8%" },
    { id: 3, name: "Crystal Berry", stock: 56, category: "Exotic", trend: "-3%" },
    { id: 4, name: "Solar Orange", stock: 320, category: "Citrus", trend: "+15%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h1 className="text-5xl font-bold mb-2">Master Your Inventory</h1>
              <p className="text-muted-foreground text-lg">
                Real-time insights and complete control at your fingertips
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 rounded-full px-6 shadow-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Items", value: "810", icon: Package, color: "text-blue-400" },
              { label: "Low Stock", value: "12", icon: AlertCircle, color: "text-orange-400" },
              { label: "Revenue", value: "$45.2K", icon: TrendingUp, color: "text-green-400" },
              { label: "Growth", value: "+18%", icon: TrendingUp, color: "text-purple-400" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card border-border p-6 hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Inventory Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-card border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-2xl font-bold">Current Inventory</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Stock</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Trend</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryItems.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4 font-medium">{item.name}</td>
                        <td className="p-4 text-muted-foreground">{item.category}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            {item.stock}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`font-medium ${item.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {item.trend}
                          </span>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                            Edit
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
