import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const brands = [
  "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Kia", "Honda", "Toyota", 
  "Renault", "Nissan", "Volkswagen", "Skoda", "Ford", "MG", "Jeep", 
  "BMW", "Mercedes-Benz", "Audi", "Volvo", "Land Rover", "Jaguar", 
  "Porsche", "Lamborghini", "Ferrari"
];

const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];
const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "LPG"];

export const GaragePromptPopup = () => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [fuelType, setFuelType] = useState('');

  useEffect(() => {
    if (!user) return;

    // Check if user has vehicles or dismissed this popup
    const checkGarageStatus = async () => {
      const dismissed = localStorage.getItem('garagePromptDismissed');
      if (dismissed) return;

      // Check if user already has vehicles
      const { data, error } = await supabase
        .from('user_vehicles')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);

      if (error || (data && data.length > 0)) return;

      // Show popup 30 seconds after login
      const timer = setTimeout(() => {
        setOpen(true);
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    };

    checkGarageStatus();
  }, [user]);

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!make || !model || !year || !fuelType) {
      toast.error('Please fill in all fields');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_vehicles')
        .insert({
          user_id: user?.id,
          make,
          model,
          year,
          fuel_type: fuelType,
        });

      if (error) throw error;

      toast.success('Vehicle added to your garage!');
      setOpen(false);
      localStorage.setItem('garagePromptDismissed', 'true');
    } catch (error: any) {
      toast.error('Failed to add vehicle', {
        description: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDismiss = () => {
    setOpen(false);
    localStorage.setItem('garagePromptDismissed', 'true');
  };

  const handleViewGarage = () => {
    setOpen(false);
    navigate('/garage');
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={handleDismiss}
        >
          <X className="w-4 h-4" />
        </Button>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="font-display text-2xl">
                Add Your Vehicle
              </DialogTitle>
            </div>
          </div>
          <DialogDescription>
            Get personalized product recommendations by adding your vehicle to the garage
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleAddVehicle} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="make">Make</Label>
            <Select value={make} onValueChange={setMake} required>
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
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g., Swift, Creta"
              className="bg-secondary/50"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select value={year} onValueChange={setYear} required>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelType">Fuel</Label>
              <Select value={fuelType} onValueChange={setFuelType} required>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue placeholder="Fuel" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((fuel) => (
                    <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Button type="submit" className="w-full btn-primary" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Vehicle'
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleViewGarage}
            >
              View My Garage
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
