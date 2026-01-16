import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Edit, Ticket, Copy, Users } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface Coupon {
    id: string;
    code: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    min_order_amount: number | null;
    max_uses: number | null;
    used_count: number;
    is_active: boolean;
    expires_at: string | null;
    created_at: string;
}

export default function CouponsManager() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        code: '',
        discount_type: 'percentage' as 'percentage' | 'fixed',
        discount_value: '',
        min_order_amount: '',
        max_uses: '',
        is_active: true,
        expires_at: '',
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const { data, error } = await supabase
                .from('coupons')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCoupons((data as Coupon[]) || []);
        } catch (error: any) {
            toast.error('Failed to fetch coupons');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'REV';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData({ ...formData, code });
    };

    const openCreateDialog = () => {
        setEditingCoupon(null);
        setFormData({
            code: '',
            discount_type: 'percentage',
            discount_value: '',
            min_order_amount: '',
            max_uses: '',
            is_active: true,
            expires_at: '',
        });
        setDialogOpen(true);
    };

    const openEditDialog = (coupon: Coupon) => {
        setEditingCoupon(coupon);
        setFormData({
            code: coupon.code,
            discount_type: coupon.discount_type,
            discount_value: coupon.discount_value.toString(),
            min_order_amount: coupon.min_order_amount?.toString() || '',
            max_uses: coupon.max_uses?.toString() || '',
            is_active: coupon.is_active,
            expires_at: coupon.expires_at ? coupon.expires_at.split('T')[0] : '',
        });
        setDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.code || !formData.discount_value) {
            toast.error('Code and discount value are required');
            return;
        }

        setSaving(true);
        try {
            const couponData = {
                code: formData.code.toUpperCase(),
                discount_type: formData.discount_type,
                discount_value: parseFloat(formData.discount_value),
                min_order_amount: formData.min_order_amount ? parseFloat(formData.min_order_amount) : null,
                max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
                is_active: formData.is_active,
                expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
            };

            if (editingCoupon) {
                const { error } = await supabase
                    .from('coupons')
                    .update(couponData)
                    .eq('id', editingCoupon.id);

                if (error) throw error;
                toast.success('Coupon updated');
            } else {
                const { error } = await supabase
                    .from('coupons')
                    .insert({ ...couponData, used_count: 0 });

                if (error) throw error;
                toast.success('Coupon created');
            }

            setDialogOpen(false);
            fetchCoupons();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save coupon');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this coupon?')) return;

        try {
            const { error } = await supabase.from('coupons').delete().eq('id', id);
            if (error) throw error;
            toast.success('Coupon deleted');
            fetchCoupons();
        } catch (error: any) {
            toast.error('Failed to delete coupon');
        }
    };

    const toggleActive = async (coupon: Coupon) => {
        try {
            const { error } = await supabase
                .from('coupons')
                .update({ is_active: !coupon.is_active })
                .eq('id', coupon.id);

            if (error) throw error;
            toast.success(coupon.is_active ? 'Coupon deactivated' : 'Coupon activated');
            fetchCoupons();
        } catch (error: any) {
            toast.error('Failed to update coupon');
        }
    };

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success('Coupon code copied!');
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
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
                <h2 className="text-2xl font-display text-foreground">Coupons & Gifts</h2>
                <Button onClick={openCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Coupon
                </Button>
            </div>

            {coupons.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-xl">
                    <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No coupons yet. Create your first coupon!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {coupons.map((coupon) => (
                        <div
                            key={coupon.id}
                            className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <code className="text-lg font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                                        {coupon.code}
                                    </code>
                                    <Button size="sm" variant="ghost" onClick={() => copyCode(coupon.code)}>
                                        <Copy className="w-3 h-3" />
                                    </Button>
                                    <Badge variant={coupon.is_active ? 'default' : 'secondary'}>
                                        {coupon.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                                <p className="text-foreground font-semibold">
                                    {coupon.discount_type === 'percentage'
                                        ? `${coupon.discount_value}% OFF`
                                        : `₹${coupon.discount_value} OFF`}
                                    {coupon.min_order_amount && (
                                        <span className="text-muted-foreground font-normal text-sm ml-2">
                                            (Min order ₹{coupon.min_order_amount})
                                        </span>
                                    )}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {coupon.used_count} / {coupon.max_uses || '∞'} uses
                                    </span>
                                    {coupon.expires_at && (
                                        <span>Expires: {formatDate(coupon.expires_at)}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => openEditDialog(coupon)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => toggleActive(coupon)}>
                                    {coupon.is_active ? 'Deactivate' : 'Activate'}
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(coupon.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        <div>
                            <Label>Coupon Code *</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    placeholder="e.g., SAVE20"
                                    className="font-mono uppercase"
                                />
                                <Button type="button" variant="outline" onClick={generateCode}>
                                    Generate
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Discount Type</Label>
                                <Select
                                    value={formData.discount_type}
                                    onValueChange={(value: 'percentage' | 'fixed') =>
                                        setFormData({ ...formData, discount_type: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                                        <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Discount Value *</Label>
                                <Input
                                    type="number"
                                    value={formData.discount_value}
                                    onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                                    placeholder={formData.discount_type === 'percentage' ? '10' : '500'}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Min Order Amount (₹)</Label>
                                <Input
                                    type="number"
                                    value={formData.min_order_amount}
                                    onChange={(e) => setFormData({ ...formData, min_order_amount: e.target.value })}
                                    placeholder="Optional"
                                />
                            </div>
                            <div>
                                <Label>Max Uses</Label>
                                <Input
                                    type="number"
                                    value={formData.max_uses}
                                    onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                                    placeholder="Unlimited"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Expiry Date</Label>
                            <Input
                                type="date"
                                value={formData.expires_at}
                                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Switch
                                checked={formData.is_active}
                                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                            />
                            <Label>Active (can be used by customers)</Label>
                        </div>

                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={saving}>
                                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {editingCoupon ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
