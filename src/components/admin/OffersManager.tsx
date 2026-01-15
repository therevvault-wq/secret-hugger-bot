import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Edit, GripVertical } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Offer {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export default function OffersManager() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    link: '/shop',
    is_active: true,
    sort_order: 0,
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setOffers(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch offers');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('offer-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('offer-images')
        .getPublicUrl(fileName);

      setFormData({ ...formData, image_url: urlData.publicUrl });
      toast.success('Image uploaded');
    } catch (error: any) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingOffer(null);
    setFormData({
      title: '',
      subtitle: '',
      image_url: '',
      link: '/shop',
      is_active: true,
      sort_order: offers.length,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      subtitle: offer.subtitle || '',
      image_url: offer.image_url,
      link: offer.link || '/shop',
      is_active: offer.is_active ?? true,
      sort_order: offer.sort_order ?? 0,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image_url) {
      toast.error('Title and image are required');
      return;
    }

    setSaving(true);
    try {
      const offerData = {
        title: formData.title,
        subtitle: formData.subtitle || null,
        image_url: formData.image_url,
        link: formData.link || '/shop',
        is_active: formData.is_active,
        sort_order: formData.sort_order,
      };

      if (editingOffer) {
        const { error } = await supabase
          .from('offers')
          .update(offerData)
          .eq('id', editingOffer.id);

        if (error) throw error;
        toast.success('Offer updated');
      } else {
        const { error } = await supabase
          .from('offers')
          .insert(offerData);

        if (error) throw error;
        toast.success('Offer created');
      }

      setDialogOpen(false);
      fetchOffers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save offer');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;

    try {
      const { error } = await supabase.from('offers').delete().eq('id', id);
      if (error) throw error;
      toast.success('Offer deleted');
      fetchOffers();
    } catch (error: any) {
      toast.error('Failed to delete offer');
    }
  };

  const toggleActive = async (offer: Offer) => {
    try {
      const { error } = await supabase
        .from('offers')
        .update({ is_active: !offer.is_active })
        .eq('id', offer.id);

      if (error) throw error;
      toast.success(offer.is_active ? 'Offer deactivated' : 'Offer activated');
      fetchOffers();
    } catch (error: any) {
      toast.error('Failed to update offer');
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
        <h2 className="text-2xl font-display text-foreground">Offers</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          New Offer
        </Button>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">No offers yet. Create your first offer!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={offer.image_url}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className="absolute top-2 right-2"
                  variant={offer.is_active ? 'default' : 'secondary'}
                >
                  {offer.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{offer.title}</h3>
                {offer.subtitle && (
                  <p className="text-sm text-muted-foreground">{offer.subtitle}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Order: {offer.sort_order}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => openEditDialog(offer)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(offer)}
                  >
                    {offer.is_active ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(offer.id)}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingOffer ? 'Edit Offer' : 'Create New Offer'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Offer title"
              />
            </div>

            <div>
              <Label>Subtitle</Label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Optional subtitle"
              />
            </div>

            <div>
              <Label>Image *</Label>
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
                  className="mt-2 w-full aspect-[16/9] object-cover rounded-lg"
                />
              )}
            </div>

            <div>
              <Label>Product Link</Label>
              <Input
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="/shop"
              />
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
              <Label>Active</Label>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingOffer ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
