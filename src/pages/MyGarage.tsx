import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Car, Plus, Trash2, Loader2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { getMakes, getModels, getYearRange, getFuelTypes } from '@/data/vehicleData';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  fuel_type: string;
  nickname?: string | null;
  variant?: string | null;
}

export default function MyGarage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [nickname, setNickname] = useState('');

  // Smart filtering based on selections
  const brands = getMakes();
  const availableModels = make ? getModels(make) : [];
  const availableYears = make && model ? getYearRange(make, model).map(String) : [];
  const availableFuelTypes = make && model ? getFuelTypes(make, model) : [];

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to view your garage');
      navigate('/auth');
      return;
    }
    fetchVehicles();
  }, [user, navigate]);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('user_vehicles')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch vehicles', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMakeChange = (value: string) => {
    setMake(value);
    setModel('');
    setYear('');
    setFuelType('');
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    setYear('');
    setFuelType('');
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    // Keep fuel type if still valid, otherwise reset
    if (availableFuelTypes.length > 0 && !availableFuelTypes.includes(fuelType)) {
      setFuelType('');
    }
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!make || !model || !year || !fuelType) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSaving(true);
    try {
      if (editingVehicle) {
        const { error } = await supabase
          .from('user_vehicles')
          .update({
            make,
            model,
            year: parseInt(year),
            fuel_type: fuelType,
            nickname: nickname || null,
          })
          .eq('id', editingVehicle.id);

        if (error) throw error;
        toast.success('Vehicle updated successfully!');
      } else {
        const { error } = await supabase
          .from('user_vehicles')
          .insert({
            user_id: user?.id as string,
            make,
            model,
            year: parseInt(year),
            fuel_type: fuelType,
            nickname: nickname || null,
          });

        if (error) throw error;
        toast.success('Vehicle added to your garage!');
      }

      setDialogOpen(false);
      resetForm();
      fetchVehicles();
    } catch (error: any) {
      toast.error('Failed to save vehicle', {
        description: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    try {
      const { error } = await supabase
        .from('user_vehicles')
        .delete()
        .eq('id', vehicleId);

      if (error) throw error;

      toast.success('Vehicle removed from garage');
      fetchVehicles();
    } catch (error: any) {
      toast.error('Failed to delete vehicle', {
        description: error.message,
      });
    }
  };

  const resetForm = () => {
    setMake('');
    setModel('');
    setYear('');
    setFuelType('');
    setNickname('');
    setEditingVehicle(null);
  };

  const openEditDialog = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setMake(vehicle.make);
    setModel(vehicle.model);
    setYear(vehicle.year.toString());
    setFuelType(vehicle.fuel_type);
    setNickname(vehicle.nickname || '');
    setDialogOpen(true);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container-rev pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-4xl md:text-5xl mb-4">
                My Garage
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your vehicles for personalized product recommendations
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingVehicle ? 'Edit Vehicle' : 'Add Vehicle to Garage'}</DialogTitle>
                  <DialogDescription>
                    {editingVehicle
                      ? 'Update your vehicle details'
                      : 'Add your vehicle details to get personalized product recommendations'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddVehicle} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make *</Label>
                    <Select value={make} onValueChange={handleMakeChange} required>
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model *</Label>
                    <Select value={model} onValueChange={handleModelChange} disabled={!make} required>
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableModels.map((m) => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Select value={year} onValueChange={handleYearChange} disabled={!model} required>
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableYears.map((y) => (
                          <SelectItem key={y} value={y}>{y}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type *</Label>
                    <Select value={fuelType} onValueChange={setFuelType} disabled={!model} required>
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableFuelTypes.map((fuel) => (
                          <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nickname">Nickname (Optional)</Label>
                    <Input
                      id="nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="e.g., My Daily Driver"
                      className="bg-secondary/50"
                    />
                  </div>

                  <Button type="submit" className="w-full btn-primary" disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      editingVehicle ? 'Update Vehicle' : 'Add Vehicle'
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : vehicles.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Car className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your garage is empty</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Add your vehicles to get personalized product recommendations
                </p>
                <Button className="btn-primary" onClick={() => setDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Vehicle
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <Car className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{vehicle.make}</CardTitle>
                          <CardDescription>{vehicle.model}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-primary"
                          onClick={() => openEditDialog(vehicle)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {vehicle.nickname && (
                      <p className="text-sm font-medium text-foreground">{vehicle.nickname}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{vehicle.year}</span>
                      <span>•</span>
                      <span>{vehicle.fuel_type}</span>
                    </div>
                    <Button
                      className="w-full btn-primary mt-2"
                      onClick={() => navigate(`/shop?make=${encodeURIComponent(vehicle.make)}&model=${encodeURIComponent(vehicle.model)}&year=${vehicle.year}&fuelType=${encodeURIComponent(vehicle.fuel_type)}`)}
                    >
                      Shop for this Vehicle
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
