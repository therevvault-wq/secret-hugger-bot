import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Edit, Package, X, Image as ImageIcon, Upload } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  images: string[] | null;
  category: string | null;
  product_type: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

const aestheticsItems = ["Body Kits", "Spoilers & Wings", "Carbon Fiber Parts", "Grilles", "Side Skirts", "Diffusers", "Mirror Caps", "Exhaust Tips"];
const performanceItems = ["Air Intakes", "Exhaust Systems", "ECU Tuning", "Suspension", "Brake Kits", "Turbo Kits", "Intercoolers", "Performance Filters"];

const productCategories = [
  ...aestheticsItems,
  ...performanceItems,
  "Wheels",
  "Tires",
  "Lighting",
  "Interior",
  "Exterior",
  "Maintenance",
  "Merchandise",
  "Other"
].sort();

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    compare_at_price: '',
    image_url: '',
    images: [] as string[],
    category: '',
    product_type: '',
    is_active: true,
    sort_order: 0,
  });

  // Form persistence
  useEffect(() => {
    const savedForm = localStorage.getItem('product_form_draft');
    if (savedForm && !editingProduct && dialogOpen) {
      try {
        const parsed = JSON.parse(savedForm);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to parse saved form');
      }
    }
  }, [dialogOpen, editingProduct]);

  useEffect(() => {
    if (dialogOpen && !editingProduct) {
      localStorage.setItem('product_form_draft', JSON.stringify(formData));
    }
  }, [formData, dialogOpen, editingProduct]);

  const clearDraft = () => localStorage.removeItem('product_form_draft');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setProducts((data as any) || []);
    } catch (error: any) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMultiple: boolean = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        return urlData.publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      if (isMultiple) {
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), ...uploadedUrls]
        }));
        toast.success(`${uploadedUrls.length} images uploaded`);
      } else {
        setFormData(prev => ({ ...prev, image_url: uploadedUrls[0] }));
        toast.success('Primary image updated');
      }
    } catch (error: any) {
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      compare_at_price: '',
      image_url: '',
      images: [],
      category: '',
      product_type: '',
      is_active: true,
      sort_order: products.length,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      compare_at_price: product.compare_at_price?.toString() || '',
      image_url: product.image_url || '',
      images: product.images || [],
      category: product.category || '',
      product_type: product.product_type || '',
      is_active: product.is_active ?? true,
      sort_order: product.sort_order ?? 0,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.price) {
      toast.error('Title and price are required');
      return;
    }

    setSaving(true);
    try {
      const productData = {
        title: formData.title,
        description: formData.description || null,
        price: parseFloat(formData.price),
        compare_at_price: formData.compare_at_price ? parseFloat(formData.compare_at_price) : null,
        image_url: formData.image_url || null,
        images: formData.images,
        category: formData.category || null,
        product_type: formData.product_type || null,
        is_active: formData.is_active,
        sort_order: formData.sort_order,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast.success('Product updated');
      } else {
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;
        toast.success('Product created');
      }

      setDialogOpen(false);
      clearDraft();
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      toast.success('Product deleted');
      fetchProducts();
    } catch (error: any) {
      toast.error('Failed to delete product');
    }
  };

  const toggleActive = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !product.is_active })
        .eq('id', product.id);

      if (error) throw error;
      toast.success(product.is_active ? 'Product hidden' : 'Product visible');
      fetchProducts();
    } catch (error: any) {
      toast.error('Failed to update product');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display text-foreground">Products</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          New Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No products yet. Create your first product!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="relative aspect-square bg-secondary/20">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <Badge
                  className="absolute top-2 right-2"
                  variant={product.is_active ? 'default' : 'secondary'}
                >
                  {product.is_active ? 'Active' : 'Hidden'}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground truncate">{product.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {product.product_type && (
                    <Badge variant="outline" className="text-xs">
                      {product.product_type}
                    </Badge>
                  )}
                  {product.category && (
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-primary">₹{product.price}</span>
                  {product.compare_at_price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.compare_at_price}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => openEditDialog(product)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(product)}
                  >
                    {product.is_active ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Product title"
              />
            </div>

            <div>
              <Label>Description</Label>
              <div className="mt-1 quill-editor">
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={(content) => setFormData({ ...formData, description: content })}
                  placeholder="Product description"
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                      ['clean']
                    ],
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price (₹) *</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label>Compare at Price (₹)</Label>
                <Input
                  type="number"
                  value={formData.compare_at_price}
                  onChange={(e) => setFormData({ ...formData, compare_at_price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <Label>Product Type</Label>
              <Select
                value={formData.product_type}
                onValueChange={(value) => setFormData({ ...formData, product_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Product Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aesthetics">Aesthetics</SelectItem>
                  <SelectItem value="Performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Image</Label>
              <div className="flex gap-2 items-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
              </div>
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="mt-2 w-full aspect-square object-cover rounded-lg"
                />
              )}
            </div>

            <div>
              <Label>Gallery Images</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images?.map((url, index) => (
                  <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border group">
                    <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground mt-1">Add More</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, true)}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <div>
              <Label>Sort Order</Label>
              <Input
                type="number"
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
              <Label>Active (visible on site)</Label>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingProduct ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
