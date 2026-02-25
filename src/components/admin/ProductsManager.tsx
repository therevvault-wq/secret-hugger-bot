import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Edit, Package, X, Image as ImageIcon, Upload, ChevronDown } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { vehicleData, getMakes, getModels } from '@/data/vehicleData';
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
  delivery_timeline: string | null;
  compatible_vehicles: string | null;
  stock_status: string | null;
  shipping_cost: number | null;
  shipping_note: string | null;
  warranty_info: string | null;
  whatsapp_enabled: boolean;
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
    delivery_timeline: '',
    compatible_vehicles: '',
    stock_status: 'in_stock',
    shipping_cost: '',
    shipping_note: '',
    warranty_info: '',
    whatsapp_enabled: false,
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

    // Validate file size (max 5MB per image to prevent upload failures)
    const MAX_SIZE = 5 * 1024 * 1024;
    const oversizedFiles = Array.from(files).filter(file => file.size > MAX_SIZE);

    if (oversizedFiles.length > 0) {
      toast.error(`Some files are too large. Max size is 5MB. (${oversizedFiles[0].name})`);
      return;
    }

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
        toast.success(`${uploadedUrls.length} images added to gallery`);
      } else {
        setFormData(prev => ({ ...prev, image_url: uploadedUrls[0] }));
        toast.success('Main image updated');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images. Please try smaller files.');
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
      delivery_timeline: '',
      compatible_vehicles: '',
      stock_status: 'in_stock',
      shipping_cost: '',
      shipping_note: '',
      warranty_info: '',
      whatsapp_enabled: false,
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
      delivery_timeline: product.delivery_timeline || '',
      compatible_vehicles: product.compatible_vehicles || '',
      stock_status: product.stock_status || 'in_stock',
      shipping_cost: product.shipping_cost?.toString() || '',
      shipping_note: product.shipping_note || '',
      warranty_info: (product as any).warranty_info || '',
      whatsapp_enabled: (product as any).whatsapp_enabled ?? false,
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
        delivery_timeline: formData.delivery_timeline || null,
        compatible_vehicles: formData.compatible_vehicles || null,
        stock_status: formData.stock_status || 'in_stock',
        shipping_cost: formData.shipping_cost ? parseFloat(formData.shipping_cost) : null,
        shipping_note: formData.shipping_note || null,
        warranty_info: formData.warranty_info || null,
        whatsapp_enabled: formData.whatsapp_enabled,
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
              <div className="flex items-center justify-between mb-2">
                <Label>Primary Image</Label>
                <span className="text-[10px] text-muted-foreground italic">Recommended: 1000x1000px, Max 5MB</span>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="cursor-pointer"
                />
                {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
              </div>
              {formData.image_url && (
                <div className="mt-2 relative group w-full aspect-square max-h-[200px] border border-border rounded-lg overflow-hidden bg-white">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-full object-contain p-2"
                  />
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                    className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
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

            <div>
              <Label>Delivery Timeline</Label>
              <Input
                value={formData.delivery_timeline}
                onChange={(e) => setFormData({ ...formData, delivery_timeline: e.target.value })}
                placeholder="Example: 7-14 business days"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Shown on product page</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Stock Status</Label>
                <Select
                  value={formData.stock_status}
                  onValueChange={(value) => setFormData({ ...formData, stock_status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_stock">In Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    <SelectItem value="pre_order">Pre-Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Shipping Cost (₹)</Label>
                <Input
                  type="number"
                  value={formData.shipping_cost}
                  onChange={(e) => setFormData({ ...formData, shipping_cost: e.target.value })}
                  placeholder="0 = Free"
                />
                <p className="text-[10px] text-muted-foreground mt-1">Leave empty for free shipping</p>
              </div>
            </div>

            <div>
              <Label>Shipping Note</Label>
              <Input
                value={formData.shipping_note}
                onChange={(e) => setFormData({ ...formData, shipping_note: e.target.value })}
                placeholder="e.g. Additional packing charges apply"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Displayed to customers on product page</p>
            </div>

            <div>
              <Label>Warranty Info</Label>
              <Input
                value={formData.warranty_info}
                onChange={(e) => setFormData({ ...formData, warranty_info: e.target.value })}
                placeholder="e.g. 6 months manufacturer warranty"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Leave empty to hide warranty section on product page</p>
            </div>

            <div>
              <Label>Compatible Vehicles</Label>
              <div className="flex gap-2 mt-1">
                <Select
                  onValueChange={(value) => {
                    const current = formData.compatible_vehicles
                      ? formData.compatible_vehicles.split(',').map(v => v.trim()).filter(Boolean)
                      : [];
                    if (!current.includes(value)) {
                      setFormData({
                        ...formData,
                        compatible_vehicles: [...current, value].join(', ')
                      });
                    }
                  }}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Add vehicle..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {getMakes().map((make) => (
                      <div key={make}>
                        <SelectItem value={make} className="font-semibold text-primary">
                          {make} (All models)
                        </SelectItem>
                        {getModels(make).map((model) => (
                          <SelectItem key={`${make}-${model}`} value={model} className="pl-6">
                            {model}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.compatible_vehicles && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.compatible_vehicles.split(',').map((v, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-white"
                      onClick={() => {
                        const vehicles = formData.compatible_vehicles.split(',').map(veh => veh.trim()).filter(Boolean);
                        vehicles.splice(i, 1);
                        setFormData({ ...formData, compatible_vehicles: vehicles.join(', ') });
                      }}
                    >
                      {v.trim()} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1">Click badge to remove. Leave empty for universal fit.</p>
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

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.whatsapp_enabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, whatsapp_enabled: checked })
                }
              />
              <Label>Enable WhatsApp Ordering</Label>
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
    </div >
  );
}
