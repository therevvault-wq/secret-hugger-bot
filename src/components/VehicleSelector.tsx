import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Car } from "lucide-react";

const brands = [
  "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Kia", "Honda", "Toyota", 
  "Renault", "Nissan", "Volkswagen", "Skoda", "Ford", "MG", "Jeep", 
  "BMW", "Mercedes-Benz", "Audi", "Volvo", "Land Rover", "Jaguar", 
  "Porsche", "Lamborghini", "Ferrari", "Rolls-Royce", "Bentley", "Lexus",
  "Citroen", "BYD", "Force", "Isuzu"
];

const models: Record<string, string[]> = {
  "Maruti Suzuki": ["Alto", "Swift", "Baleno", "Dzire", "WagonR", "Vitara Brezza", "Ertiga", "S-Cross", "Ciaz", "XL6", "Celerio", "Ignis", "S-Presso", "Eeco", "Grand Vitara", "Fronx", "Jimny"],
  "Hyundai": ["i10", "i20", "Venue", "Creta", "Verna", "Aura", "Alcazar", "Tucson", "Elantra", "Kona Electric", "Ioniq 5"],
  "Tata": ["Tiago", "Tigor", "Altroz", "Nexon", "Harrier", "Safari", "Punch", "Tiago EV", "Tigor EV", "Nexon EV", "Nano"],
  "Mahindra": ["Thar", "Scorpio", "Scorpio-N", "XUV300", "XUV400", "XUV500", "XUV700", "Bolero", "Bolero Neo", "Marazzo", "Alturas G4"],
  "Kia": ["Sonet", "Seltos", "Carens", "Carnival", "EV6"],
  "Honda": ["Amaze", "City", "Elevate", "CR-V", "Civic", "Jazz", "WR-V", "City e:HEV"],
  "Toyota": ["Glanza", "Urban Cruiser Hyryder", "Fortuner", "Innova Crysta", "Innova Hycross", "Hilux", "Camry", "Vellfire", "Land Cruiser"],
  "Renault": ["Kwid", "Triber", "Kiger", "Duster"],
  "Nissan": ["Magnite", "Kicks", "GT-R"],
  "Volkswagen": ["Polo", "Vento", "Taigun", "Virtus", "Tiguan"],
  "Skoda": ["Kushaq", "Slavia", "Kodiaq", "Superb", "Octavia"],
  "Ford": ["EcoSport", "Endeavour", "Figo", "Aspire", "Mustang"],
  "MG": ["Hector", "Hector Plus", "Astor", "ZS EV", "Gloster", "Comet EV"],
  "Jeep": ["Compass", "Meridian", "Wrangler", "Grand Cherokee"],
  "BMW": ["2 Series", "3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "M2", "M3", "M4", "M5", "Z4", "iX", "i4", "i7"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "GLS", "EQB", "EQC", "EQS", "AMG GT", "G-Class", "Maybach"],
  "Audi": ["A4", "A6", "A8", "Q3", "Q5", "Q7", "Q8", "e-tron", "e-tron GT", "RS5", "RS7"],
  "Volvo": ["XC40", "XC60", "XC90", "S60", "S90", "C40 Recharge"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Sport", "Range Rover Evoque", "Range Rover Velar"],
  "Jaguar": ["F-Pace", "E-Pace", "I-Pace", "XE", "XF", "F-Type"],
  "Porsche": ["Macan", "Cayenne", "Panamera", "911", "Taycan", "718 Cayman", "718 Boxster"],
  "Lamborghini": ["Urus", "Huracan", "Aventador"],
  "Ferrari": ["Roma", "Portofino", "F8 Tributo", "SF90 Stradale", "812 GTS"],
  "Rolls-Royce": ["Ghost", "Phantom", "Cullinan", "Wraith", "Dawn"],
  "Bentley": ["Bentayga", "Flying Spur", "Continental GT"],
  "Lexus": ["ES", "LS", "NX", "RX", "LX", "LC"],
  "Citroen": ["C3", "C5 Aircross", "eC3"],
  "BYD": ["e6", "Atto 3"],
  "Force": ["Gurkha", "Traveller"],
  "Isuzu": ["D-Max V-Cross", "MU-X"]
};

const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010"];

const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "LPG"];

export const VehicleSelector = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("");

  const availableModels = selectedBrand ? models[selectedBrand] || [] : [];

  const handleSearch = () => {
    // Build search params from selections
    const params = new URLSearchParams();
    
    if (selectedBrand) params.set("make", selectedBrand);
    if (selectedModel) params.set("model", selectedModel);
    if (selectedYear) params.set("year", selectedYear);
    if (selectedFuelType) params.set("fuelType", selectedFuelType);
    
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container-rev">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 md:mb-4">
            FIND YOUR <span className="text-primary">PARTS</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Select your vehicle to discover compatible aesthetic and performance upgrades
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl text-foreground">SELECT YOUR VEHICLE</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Choose make, model, year and fuel type</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Select value={selectedBrand} onValueChange={(v) => { setSelectedBrand(v); setSelectedModel(""); }}>
                <SelectTrigger className="h-12 sm:h-14 bg-secondary border-border text-sm sm:text-base">
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedBrand}>
                <SelectTrigger className="h-12 sm:h-14 bg-secondary border-border text-sm sm:text-base">
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear} disabled={!selectedModel}>
                <SelectTrigger className="h-12 sm:h-14 bg-secondary border-border text-sm sm:text-base">
                  <SelectValue placeholder="Year of manufacture" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedFuelType} onValueChange={setSelectedFuelType} disabled={!selectedYear}>
                <SelectTrigger className="h-12 sm:h-14 bg-secondary border-border text-sm sm:text-base">
                  <SelectValue placeholder="Fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((fuel) => (
                    <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full h-12 sm:h-14 btn-primary text-base sm:text-lg"
              disabled={!selectedFuelType}
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Search Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
