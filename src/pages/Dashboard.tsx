import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, TrendingUp, Package, AlertCircle, Edit, Trash2, Search } from "lucide-react";
import Product3D from "@/components/Product3D";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  image_url?: string;
}

const itemSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  quantity: z.number().min(0, "Quantity must be positive"),
  price: z.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
});

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    price: 0,
    category: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setItems(data || []);
      if (data && data.length > 0 && !selectedProduct) {
        setSelectedProduct(data[0].id);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Image Upload Failed",
        description: error.message,
      });
      return null;
    }
  };

  const handleAdd = async () => {
    setFormErrors({});
    
    const result = itemSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    try {
      let imageUrl = null;
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
        if (!imageUrl) return;
      }

      const { error } = await supabase.from('items').insert([
        {
          ...formData,
          user_id: user?.id,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item added successfully!",
      });

      setIsAddDialogOpen(false);
      setFormData({ name: "", quantity: 0, price: 0, category: "" });
      setSelectedImage(null);
      setImagePreview(null);
      fetchItems();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleEdit = async () => {
    if (!editingItem) return;

    setFormErrors({});
    
    const result = itemSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    try {
      let imageUrl = editingItem.image_url;
      
      if (selectedImage) {
        // Delete old image if exists
        if (editingItem.image_url) {
          const oldPath = editingItem.image_url.split('/').slice(-2).join('/');
          await supabase.storage.from('product-images').remove([oldPath]);
        }
        
        imageUrl = await uploadImage(selectedImage);
        if (!imageUrl && selectedImage) return;
      }

      const { error } = await supabase
        .from('items')
        .update({ ...formData, image_url: imageUrl })
        .eq('id', editingItem.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item updated successfully!",
      });

      setIsEditDialogOpen(false);
      setEditingItem(null);
      setFormData({ name: "", quantity: 0, price: 0, category: "" });
      setSelectedImage(null);
      setImagePreview(null);
      fetchItems();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmItem) return;

    try {
      // Delete image from storage if exists
      if (deleteConfirmItem.image_url) {
        const imagePath = deleteConfirmItem.image_url.split('/').slice(-2).join('/');
        await supabase.storage.from('product-images').remove([imagePath]);
      }

      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', deleteConfirmItem.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item deleted successfully!",
      });

      setDeleteConfirmItem(null);
      if (selectedProduct === deleteConfirmItem.id) {
        setSelectedProduct(null);
      }
      fetchItems();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const openEditDialog = (item: Item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      category: item.category,
    });
    setSelectedImage(null);
    setImagePreview(item.image_url || null);
    setFormErrors({});
    setIsEditDialogOpen(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Image must be less than 5MB",
        });
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    lowStock: items.filter((item) => item.quantity < 100).length,
    revenue: items.reduce((sum, item) => sum + item.quantity * Number(item.price), 0),
    categories: new Set(items.map((item) => item.category)).size,
  };

  const selectedItem = items.find((item) => item.id === selectedProduct);

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-6 shadow-glow">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="image">Product Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="mt-2"
                    />
                    {imagePreview && (
                      <div className="mt-3 relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2"
                    />
                    {formErrors.name && (
                      <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                      className="mt-2"
                    />
                    {formErrors.quantity && (
                      <p className="text-sm text-destructive mt-1">{formErrors.quantity}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="mt-2"
                    />
                    {formErrors.price && (
                      <p className="text-sm text-destructive mt-1">{formErrors.price}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-2"
                    />
                    {formErrors.category && (
                      <p className="text-sm text-destructive mt-1">{formErrors.category}</p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAdd}>Add Item</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
...
          </div>

          {/* 3D Product Showcase */}
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <Card className="bg-card border-border overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-[500px] bg-gradient-to-br from-primary/10 to-accent/10">
                    <Product3D
                      color={selectedItem.category === 'Premium' ? '#FFD700' : selectedItem.category === 'Fresh' ? '#A020F0' : '#FF6B35'}
                      productName={selectedItem.name}
                    />
                  </div>
                  <div className="p-8">
                    {selectedItem.image_url && (
                      <div className="mb-6 w-full h-48 rounded-xl overflow-hidden border border-border">
                        <img 
                          src={selectedItem.image_url} 
                          alt={selectedItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h2 className="text-3xl font-bold mb-4">{selectedItem.name}</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="text-xl font-semibold">{selectedItem.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stock</p>
                        <p className="text-xl font-semibold">{selectedItem.quantity} units</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-xl font-semibold">${Number(selectedItem.price).toFixed(2)}</p>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => openEditDialog(selectedItem)}
                          variant="outline"
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => setDeleteConfirmItem(selectedItem)}
                          variant="destructive"
                          className="flex-1"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Inventory Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-card border-border overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-2xl font-bold">Current Inventory</h2>
                <div className="relative w-64">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search items..."
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-12 text-center text-muted-foreground">Loading...</div>
                ) : filteredItems.length === 0 ? (
                  <div className="p-12 text-center text-muted-foreground">
                    {searchQuery ? "No items found matching your search." : "No items yet. Add your first item!"}
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Stock</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                          className={`border-b border-border hover:bg-muted/30 transition-colors cursor-pointer ${
                            selectedProduct === item.id ? 'bg-primary/5' : ''
                          }`}
                          onClick={() => setSelectedProduct(item.id)}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {item.image_url ? (
                                <img 
                                  src={item.image_url} 
                                  alt={item.name}
                                  className="w-10 h-10 rounded-lg object-cover border border-border"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                  <Package className="w-5 h-5 text-muted-foreground" />
                                </div>
                              )}
                              <span className="font-medium">{item.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">{item.category}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              item.quantity < 100 ? 'bg-orange-500/10 text-orange-400' : 'bg-primary/10 text-primary'
                            }`}>
                              {item.quantity}
                            </span>
                          </td>
                          <td className="p-4 font-medium">${Number(item.price).toFixed(2)}</td>
                          <td className="p-4">
                            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(item)}
                                className="hover:bg-primary/10"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeleteConfirmItem(item)}
                                className="hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-image">Product Image</Label>
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="mt-2"
              />
              {imagePreview && (
                <div className="mt-3 relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2"
              />
              {formErrors.name && (
                <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-quantity">Quantity</Label>
              <Input
                id="edit-quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="mt-2"
              />
              {formErrors.quantity && (
                <p className="text-sm text-destructive mt-1">{formErrors.quantity}</p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="mt-2"
              />
              {formErrors.price && (
                <p className="text-sm text-destructive mt-1">{formErrors.price}</p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-2"
              />
              {formErrors.category && (
                <p className="text-sm text-destructive mt-1">{formErrors.category}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmItem} onOpenChange={() => setDeleteConfirmItem(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteConfirmItem?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
