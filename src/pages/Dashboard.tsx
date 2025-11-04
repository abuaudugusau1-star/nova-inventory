import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Package, AlertCircle } from "lucide-react";
import Product3D from "@/components/Product3D";
import { useState } from "react";

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(1);
  
  const inventoryItems = [
    { id: 1, name: "Golden Apple", stock: 245, category: "Premium", trend: "+12%", color: "#FFD700" },
    { id: 2, name: "Purple Grape", stock: 189, category: "Fresh", trend: "+8%", color: "#A020F0" },
    { id: 3, name: "Crystal Berry", stock: 56, category: "Exotic", trend: "-3%", color: "#FF1493" },
    { id: 4, name: "Solar Orange", stock: 320, category: "Citrus", trend: "+15%", color: "#FF6B35" },
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

          {/* 3D Product Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <Card className="bg-card border-border overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* 3D Viewer */}
                <div className="relative h-[500px] bg-gradient-to-br from-primary/10 to-accent/10">
                  {selectedProduct && (
                    <Product3D
                      color={inventoryItems.find(i => i.id === selectedProduct)?.color}
                      productName={inventoryItems.find(i => i.id === selectedProduct)?.name}
                    />
                  )}
                </div>

                {/* Product Selector */}
                <div className="p-8 space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">3D Product Viewer</h2>
                    <p className="text-muted-foreground">
                      Interactive 3D visualization of your inventory items
                    </p>
                  </div>

                  <div className="space-y-3">
                    {inventoryItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedProduct(item.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedProduct === item.id
                            ? "border-primary bg-primary/10 shadow-glow"
                            : "border-border hover:border-primary/50 bg-card"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Stock: {item.stock}</p>
                            <p className={`text-sm ${item.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                              {item.trend}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Inventory Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => setSelectedProduct(item.id)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
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
