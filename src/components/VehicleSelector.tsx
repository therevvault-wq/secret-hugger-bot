import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Car } from "lucide-react";

const brands = ["BMW", "Mercedes-Benz", "Audi", "Porsche", "Lamborghini", "Ferrari", "McLaren", "Nissan", "Toyota", "Honda"];
const models: Record<string, string[]> = {
  "BMW": ["M3", "M4", "M5", "X5 M", "X6 M", "M2"],
  "Mercedes-Benz": ["AMG GT", "C63 AMG", "E63 AMG", "G63 AMG"],
  "Audi": ["RS3", "RS5", "RS6", "RS7", "R8"],
  "Porsche": ["911 GT3", "Cayman GT4", "Taycan", "Panamera"],
  "Lamborghini": ["Huracan", "Urus", "Aventador"],
  "Ferrari": ["488", "F8 Tributo", "SF90", "Roma"],
  "McLaren": ["720S", "765LT", "Artura"],
  "Nissan": ["GT-R", "370Z", "400Z"],
  "Toyota": ["Supra", "GR86"],
  "Honda": ["Civic Type R", "NSX"],
};
const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];

export const VehicleSelector = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const availableModels = selectedBrand ? models[selectedBrand] || [] : [];

  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container-rev">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            FIND YOUR <span className="text-primary">PARTS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select your vehicle to discover compatible aesthetic and performance upgrades
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">SELECT YOUR VEHICLE</h3>
                <p className="text-sm text-muted-foreground">Choose brand, model, and year</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select value={selectedBrand} onValueChange={(v) => { setSelectedBrand(v); setSelectedModel(""); }}>
                <SelectTrigger className="h-14 bg-secondary border-border">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedBrand}>
                <SelectTrigger className="h-14 bg-secondary border-border">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear} disabled={!selectedModel}>
                <SelectTrigger className="h-14 bg-secondary border-border">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={!selectedYear}>
                <SelectTrigger className="h-14 bg-secondary border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aesthetics">Aesthetics</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full h-14 btn-primary text-lg"
              disabled={!selectedCategory}
            >
              <Search className="w-5 h-5 mr-2" />
              Search Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
