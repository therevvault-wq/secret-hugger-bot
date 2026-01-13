import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Car } from "lucide-react";
import { getMakes, getModels, getYearRange, getFuelTypes } from "@/data/vehicleData";

export const VehicleSelector = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("");

  // Smart filtering based on selections
  const brands = getMakes();
  const availableModels = selectedBrand ? getModels(selectedBrand) : [];
  const availableYears = selectedBrand && selectedModel
    ? getYearRange(selectedBrand, selectedModel).map(String)
    : [];
  const availableFuelTypes = selectedBrand && selectedModel
    ? getFuelTypes(selectedBrand, selectedModel)
    : [];

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSelectedModel("");
    setSelectedYear("");
    setSelectedFuelType("");
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    setSelectedYear("");
    setSelectedFuelType("");
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    // Keep fuel type if still valid, otherwise reset
    if (availableFuelTypes.length > 0 && !availableFuelTypes.includes(selectedFuelType)) {
      setSelectedFuelType("");
    }
  };

  const handleSearch = () => {
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
              <Select value={selectedBrand} onValueChange={handleBrandChange}>
                <SelectTrigger className="h-12 sm:h-14 bg-secondary border-border text-sm sm:text-base">
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedModel} onValueChange={handleModelChange} disabled={!selectedBrand}>
                <SelectTrigger className="h-12 sm:h-14 bg-secondary border-border text-sm sm:text-base">
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={handleYearChange} disabled={!selectedModel}>
                <SelectTrigger className="h-12 sm:h-14 bg-secondary border-border text-sm sm:text-base">
                  <SelectValue placeholder="Year of manufacture" />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedFuelType} onValueChange={setSelectedFuelType} disabled={!selectedModel}>
                <SelectTrigger className="h-12 sm:h-14 bg-secondary border-border text-sm sm:text-base">
                  <SelectValue placeholder="Fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {availableFuelTypes.map((fuel) => (
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
