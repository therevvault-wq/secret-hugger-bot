// Vehicle data with smart filtering
// Each model has specific fuel types and year ranges available

export interface ModelData {
    fuelTypes: string[];
    yearStart: number;
    yearEnd?: number; // undefined means still in production
}

export interface VehicleData {
    [make: string]: {
        [model: string]: ModelData;
    };
}

export const vehicleData: VehicleData = {
    "Maruti Suzuki": {
        "Alto": { fuelTypes: ["Petrol", "CNG"], yearStart: 2000, yearEnd: undefined },
        "Alto K10": { fuelTypes: ["Petrol", "CNG"], yearStart: 2014, yearEnd: undefined },
        "Swift": { fuelTypes: ["Petrol", "CNG"], yearStart: 2005, yearEnd: undefined },
        "Baleno": { fuelTypes: ["Petrol", "CNG"], yearStart: 2015, yearEnd: undefined },
        "Dzire": { fuelTypes: ["Petrol", "CNG"], yearStart: 2008, yearEnd: undefined },
        "WagonR": { fuelTypes: ["Petrol", "CNG"], yearStart: 1999, yearEnd: undefined },
        "Vitara Brezza": { fuelTypes: ["Petrol", "CNG"], yearStart: 2016, yearEnd: undefined },
        "Ertiga": { fuelTypes: ["Petrol", "CNG"], yearStart: 2012, yearEnd: undefined },
        "S-Cross": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2015, yearEnd: 2022 },
        "Ciaz": { fuelTypes: ["Petrol", "Diesel", "CNG"], yearStart: 2014, yearEnd: undefined },
        "XL6": { fuelTypes: ["Petrol", "CNG"], yearStart: 2019, yearEnd: undefined },
        "Celerio": { fuelTypes: ["Petrol", "CNG"], yearStart: 2014, yearEnd: undefined },
        "Ignis": { fuelTypes: ["Petrol"], yearStart: 2017, yearEnd: undefined },
        "S-Presso": { fuelTypes: ["Petrol", "CNG"], yearStart: 2019, yearEnd: undefined },
        "Eeco": { fuelTypes: ["Petrol", "CNG"], yearStart: 2010, yearEnd: undefined },
        "Grand Vitara": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2022, yearEnd: undefined },
        "Fronx": { fuelTypes: ["Petrol", "CNG"], yearStart: 2023, yearEnd: undefined },
        "Jimny": { fuelTypes: ["Petrol"], yearStart: 2023, yearEnd: undefined },
        "Invicto": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2023, yearEnd: undefined },
    },
    "Hyundai": {
        "i10": { fuelTypes: ["Petrol", "CNG"], yearStart: 2007, yearEnd: 2017 },
        "Grand i10": { fuelTypes: ["Petrol", "Diesel", "CNG"], yearStart: 2013, yearEnd: undefined },
        "Grand i10 Nios": { fuelTypes: ["Petrol", "CNG"], yearStart: 2019, yearEnd: undefined },
        "i20": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2008, yearEnd: undefined },
        "i20 N Line": { fuelTypes: ["Petrol"], yearStart: 2021, yearEnd: undefined },
        "Venue": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2019, yearEnd: undefined },
        "Venue N Line": { fuelTypes: ["Petrol"], yearStart: 2022, yearEnd: undefined },
        "Creta": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2015, yearEnd: undefined },
        "Verna": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2006, yearEnd: undefined },
        "Aura": { fuelTypes: ["Petrol", "CNG"], yearStart: 2020, yearEnd: undefined },
        "Alcazar": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2021, yearEnd: undefined },
        "Tucson": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2016, yearEnd: undefined },
        "Elantra": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2012, yearEnd: 2020 },
        "Kona Electric": { fuelTypes: ["Electric"], yearStart: 2019, yearEnd: undefined },
        "Ioniq 5": { fuelTypes: ["Electric"], yearStart: 2022, yearEnd: undefined },
        "Ioniq 6": { fuelTypes: ["Electric"], yearStart: 2023, yearEnd: undefined },
    },
    "Tata": {
        "Tiago": { fuelTypes: ["Petrol", "CNG"], yearStart: 2016, yearEnd: undefined },
        "Tiago EV": { fuelTypes: ["Electric"], yearStart: 2022, yearEnd: undefined },
        "Tigor": { fuelTypes: ["Petrol", "CNG"], yearStart: 2017, yearEnd: undefined },
        "Tigor EV": { fuelTypes: ["Electric"], yearStart: 2019, yearEnd: undefined },
        "Altroz": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2020, yearEnd: undefined },
        "Nexon": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2017, yearEnd: undefined },
        "Nexon EV": { fuelTypes: ["Electric"], yearStart: 2020, yearEnd: undefined },
        "Harrier": { fuelTypes: ["Diesel"], yearStart: 2019, yearEnd: undefined },
        "Safari": { fuelTypes: ["Diesel"], yearStart: 2021, yearEnd: undefined },
        "Punch": { fuelTypes: ["Petrol", "CNG"], yearStart: 2021, yearEnd: undefined },
        "Punch EV": { fuelTypes: ["Electric"], yearStart: 2024, yearEnd: undefined },
        "Curvv": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2024, yearEnd: undefined },
        "Curvv EV": { fuelTypes: ["Electric"], yearStart: 2024, yearEnd: undefined },
    },
    "Mahindra": {
        "Thar": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: undefined },
        "Thar Roxx": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2024, yearEnd: undefined },
        "Scorpio": { fuelTypes: ["Diesel"], yearStart: 2002, yearEnd: 2022 },
        "Scorpio Classic": { fuelTypes: ["Diesel"], yearStart: 2022, yearEnd: undefined },
        "Scorpio-N": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2022, yearEnd: undefined },
        "XUV300": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2019, yearEnd: undefined },
        "XUV400": { fuelTypes: ["Electric"], yearStart: 2023, yearEnd: undefined },
        "XUV500": { fuelTypes: ["Diesel"], yearStart: 2011, yearEnd: 2021 },
        "XUV700": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2021, yearEnd: undefined },
        "Bolero": { fuelTypes: ["Diesel"], yearStart: 2000, yearEnd: undefined },
        "Bolero Neo": { fuelTypes: ["Diesel"], yearStart: 2021, yearEnd: undefined },
        "Marazzo": { fuelTypes: ["Diesel"], yearStart: 2018, yearEnd: undefined },
        "Alturas G4": { fuelTypes: ["Diesel"], yearStart: 2018, yearEnd: 2023 },
        "XUV 3XO": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2024, yearEnd: undefined },
        "BE 6": { fuelTypes: ["Electric"], yearStart: 2025, yearEnd: undefined },
        "XEV 9e": { fuelTypes: ["Electric"], yearStart: 2025, yearEnd: undefined },
    },
    "Kia": {
        "Sonet": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2020, yearEnd: undefined },
        "Seltos": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2019, yearEnd: undefined },
        "Carens": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2022, yearEnd: undefined },
        "Carnival": { fuelTypes: ["Diesel"], yearStart: 2020, yearEnd: undefined },
        "EV6": { fuelTypes: ["Electric"], yearStart: 2022, yearEnd: undefined },
        "EV9": { fuelTypes: ["Electric"], yearStart: 2024, yearEnd: undefined },
    },
    "Honda": {
        "Amaze": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2013, yearEnd: undefined },
        "City": { fuelTypes: ["Petrol", "Diesel"], yearStart: 1998, yearEnd: undefined },
        "City e:HEV": { fuelTypes: ["Hybrid"], yearStart: 2023, yearEnd: undefined },
        "Elevate": { fuelTypes: ["Petrol"], yearStart: 2023, yearEnd: undefined },
        "CR-V": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2004, yearEnd: 2020 },
        "Civic": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2006, yearEnd: 2020 },
        "Jazz": { fuelTypes: ["Petrol"], yearStart: 2009, yearEnd: 2020 },
        "WR-V": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2017, yearEnd: 2023 },
    },
    "Toyota": {
        "Glanza": { fuelTypes: ["Petrol", "CNG"], yearStart: 2019, yearEnd: undefined },
        "Urban Cruiser Hyryder": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2022, yearEnd: undefined },
        "Urban Cruiser Taisor": { fuelTypes: ["Petrol", "CNG"], yearStart: 2024, yearEnd: undefined },
        "Fortuner": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2009, yearEnd: undefined },
        "Fortuner Legender": { fuelTypes: ["Diesel"], yearStart: 2021, yearEnd: undefined },
        "Innova Crysta": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2016, yearEnd: undefined },
        "Innova Hycross": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2023, yearEnd: undefined },
        "Hilux": { fuelTypes: ["Diesel"], yearStart: 2022, yearEnd: undefined },
        "Camry": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2002, yearEnd: undefined },
        "Vellfire": { fuelTypes: ["Hybrid"], yearStart: 2020, yearEnd: undefined },
        "Land Cruiser": { fuelTypes: ["Diesel"], yearStart: 2010, yearEnd: undefined },
        "Rumion": { fuelTypes: ["Petrol", "CNG"], yearStart: 2023, yearEnd: undefined },
    },
    "Renault": {
        "Kwid": { fuelTypes: ["Petrol"], yearStart: 2015, yearEnd: undefined },
        "Triber": { fuelTypes: ["Petrol"], yearStart: 2019, yearEnd: undefined },
        "Kiger": { fuelTypes: ["Petrol"], yearStart: 2021, yearEnd: undefined },
        "Duster": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2012, yearEnd: 2022 },
    },
    "Nissan": {
        "Magnite": { fuelTypes: ["Petrol"], yearStart: 2020, yearEnd: undefined },
        "Kicks": { fuelTypes: ["Petrol"], yearStart: 2019, yearEnd: 2022 },
        "X-Trail": { fuelTypes: ["Petrol"], yearStart: 2024, yearEnd: undefined },
    },
    "Volkswagen": {
        "Polo": { fuelTypes: ["Petrol"], yearStart: 2009, yearEnd: 2022 },
        "Vento": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: 2022 },
        "Taigun": { fuelTypes: ["Petrol"], yearStart: 2021, yearEnd: undefined },
        "Virtus": { fuelTypes: ["Petrol"], yearStart: 2022, yearEnd: undefined },
        "Tiguan": { fuelTypes: ["Petrol"], yearStart: 2017, yearEnd: undefined },
    },
    "Skoda": {
        "Kushaq": { fuelTypes: ["Petrol"], yearStart: 2021, yearEnd: undefined },
        "Slavia": { fuelTypes: ["Petrol"], yearStart: 2022, yearEnd: undefined },
        "Kodiaq": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2017, yearEnd: undefined },
        "Superb": { fuelTypes: ["Petrol"], yearStart: 2004, yearEnd: undefined },
        "Octavia": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2001, yearEnd: undefined },
        "Kylaq": { fuelTypes: ["Petrol"], yearStart: 2024, yearEnd: undefined },
    },
    "MG": {
        "Hector": { fuelTypes: ["Petrol", "Diesel", "Hybrid"], yearStart: 2019, yearEnd: undefined },
        "Hector Plus": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2020, yearEnd: undefined },
        "Astor": { fuelTypes: ["Petrol"], yearStart: 2021, yearEnd: undefined },
        "ZS EV": { fuelTypes: ["Electric"], yearStart: 2020, yearEnd: undefined },
        "Gloster": { fuelTypes: ["Diesel"], yearStart: 2020, yearEnd: undefined },
        "Comet EV": { fuelTypes: ["Electric"], yearStart: 2023, yearEnd: undefined },
        "Windsor EV": { fuelTypes: ["Electric"], yearStart: 2024, yearEnd: undefined },
    },
    "Jeep": {
        "Compass": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2017, yearEnd: undefined },
        "Meridian": { fuelTypes: ["Diesel"], yearStart: 2022, yearEnd: undefined },
        "Wrangler": { fuelTypes: ["Petrol"], yearStart: 2016, yearEnd: undefined },
        "Grand Cherokee": { fuelTypes: ["Petrol"], yearStart: 2022, yearEnd: undefined },
    },
    "BMW": {
        "2 Series": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2015, yearEnd: undefined },
        "3 Series": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2012, yearEnd: undefined },
        "5 Series": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: undefined },
        "7 Series": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: undefined },
        "X1": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2012, yearEnd: undefined },
        "X3": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2011, yearEnd: undefined },
        "X5": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: undefined },
        "X7": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2019, yearEnd: undefined },
        "M2": { fuelTypes: ["Petrol"], yearStart: 2023, yearEnd: undefined },
        "M3": { fuelTypes: ["Petrol"], yearStart: 2021, yearEnd: undefined },
        "M4": { fuelTypes: ["Petrol"], yearStart: 2021, yearEnd: undefined },
        "M5": { fuelTypes: ["Petrol"], yearStart: 2018, yearEnd: undefined },
        "Z4": { fuelTypes: ["Petrol"], yearStart: 2019, yearEnd: undefined },
        "iX": { fuelTypes: ["Electric"], yearStart: 2021, yearEnd: undefined },
        "i4": { fuelTypes: ["Electric"], yearStart: 2022, yearEnd: undefined },
        "i5": { fuelTypes: ["Electric"], yearStart: 2024, yearEnd: undefined },
        "i7": { fuelTypes: ["Electric"], yearStart: 2023, yearEnd: undefined },
        "iX1": { fuelTypes: ["Electric"], yearStart: 2023, yearEnd: undefined },
    },
    "Mercedes-Benz": {
        "A-Class": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2015, yearEnd: undefined },
        "A-Class Limousine": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2021, yearEnd: undefined },
        "C-Class": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: undefined },
        "E-Class": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: undefined },
        "S-Class": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: undefined },
        "GLA": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2014, yearEnd: undefined },
        "GLB": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2022, yearEnd: undefined },
        "GLC": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2016, yearEnd: undefined },
        "GLE": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2015, yearEnd: undefined },
        "GLS": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2016, yearEnd: undefined },
        "EQA": { fuelTypes: ["Electric"], yearStart: 2023, yearEnd: undefined },
        "EQB": { fuelTypes: ["Electric"], yearStart: 2022, yearEnd: undefined },
        "EQC": { fuelTypes: ["Electric"], yearStart: 2020, yearEnd: 2023 },
        "EQE": { fuelTypes: ["Electric"], yearStart: 2023, yearEnd: undefined },
        "EQS": { fuelTypes: ["Electric"], yearStart: 2022, yearEnd: undefined },
        "AMG GT": { fuelTypes: ["Petrol"], yearStart: 2015, yearEnd: undefined },
        "G-Class": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: undefined },
        "Maybach S-Class": { fuelTypes: ["Petrol"], yearStart: 2015, yearEnd: undefined },
        "Maybach GLS": { fuelTypes: ["Petrol"], yearStart: 2021, yearEnd: undefined },
    },
    "Audi": {
        "A4": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2008, yearEnd: undefined },
        "A6": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2008, yearEnd: undefined },
        "A8": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: undefined },
        "Q3": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2012, yearEnd: undefined },
        "Q3 Sportback": { fuelTypes: ["Petrol"], yearStart: 2023, yearEnd: undefined },
        "Q5": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2009, yearEnd: undefined },
        "Q7": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2006, yearEnd: undefined },
        "Q8": { fuelTypes: ["Petrol"], yearStart: 2020, yearEnd: undefined },
        "e-tron": { fuelTypes: ["Electric"], yearStart: 2019, yearEnd: 2023 },
        "e-tron GT": { fuelTypes: ["Electric"], yearStart: 2021, yearEnd: undefined },
        "Q8 e-tron": { fuelTypes: ["Electric"], yearStart: 2023, yearEnd: undefined },
        "RS5": { fuelTypes: ["Petrol"], yearStart: 2018, yearEnd: undefined },
        "RS7": { fuelTypes: ["Petrol"], yearStart: 2020, yearEnd: undefined },
        "RS Q8": { fuelTypes: ["Petrol"], yearStart: 2020, yearEnd: undefined },
    },
    "Volvo": {
        "XC40": { fuelTypes: ["Petrol"], yearStart: 2018, yearEnd: undefined },
        "XC40 Recharge": { fuelTypes: ["Electric"], yearStart: 2021, yearEnd: undefined },
        "XC60": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2017, yearEnd: undefined },
        "XC90": { fuelTypes: ["Petrol", "Diesel", "Hybrid"], yearStart: 2015, yearEnd: undefined },
        "S60": { fuelTypes: ["Petrol"], yearStart: 2019, yearEnd: undefined },
        "S90": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2016, yearEnd: undefined },
        "C40 Recharge": { fuelTypes: ["Electric"], yearStart: 2022, yearEnd: undefined },
    },
    "Land Rover": {
        "Defender": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2020, yearEnd: undefined },
        "Discovery": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2017, yearEnd: undefined },
        "Discovery Sport": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2015, yearEnd: undefined },
        "Range Rover": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: undefined },
        "Range Rover Sport": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2010, yearEnd: undefined },
        "Range Rover Evoque": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2011, yearEnd: undefined },
        "Range Rover Velar": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2017, yearEnd: undefined },
    },
    "Jaguar": {
        "F-Pace": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2016, yearEnd: undefined },
        "E-Pace": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2018, yearEnd: undefined },
        "I-Pace": { fuelTypes: ["Electric"], yearStart: 2019, yearEnd: undefined },
        "XE": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2015, yearEnd: 2023 },
        "XF": { fuelTypes: ["Petrol", "Diesel"], yearStart: 2008, yearEnd: undefined },
        "F-Type": { fuelTypes: ["Petrol"], yearStart: 2013, yearEnd: undefined },
    },
    "Porsche": {
        "Macan": { fuelTypes: ["Petrol"], yearStart: 2014, yearEnd: undefined },
        "Macan Electric": { fuelTypes: ["Electric"], yearStart: 2024, yearEnd: undefined },
        "Cayenne": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2010, yearEnd: undefined },
        "Panamera": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2010, yearEnd: undefined },
        "911": { fuelTypes: ["Petrol"], yearStart: 2010, yearEnd: undefined },
        "Taycan": { fuelTypes: ["Electric"], yearStart: 2020, yearEnd: undefined },
        "718 Cayman": { fuelTypes: ["Petrol"], yearStart: 2016, yearEnd: undefined },
        "718 Boxster": { fuelTypes: ["Petrol"], yearStart: 2016, yearEnd: undefined },
    },
    "Citroen": {
        "C3": { fuelTypes: ["Petrol"], yearStart: 2022, yearEnd: undefined },
        "C3 Aircross": { fuelTypes: ["Petrol"], yearStart: 2023, yearEnd: undefined },
        "eC3": { fuelTypes: ["Electric"], yearStart: 2023, yearEnd: undefined },
        "Basalt": { fuelTypes: ["Petrol"], yearStart: 2024, yearEnd: undefined },
    },
    "BYD": {
        "e6": { fuelTypes: ["Electric"], yearStart: 2021, yearEnd: undefined },
        "Atto 3": { fuelTypes: ["Electric"], yearStart: 2022, yearEnd: undefined },
        "Seal": { fuelTypes: ["Electric"], yearStart: 2023, yearEnd: undefined },
        "eMAX 7": { fuelTypes: ["Electric"], yearStart: 2024, yearEnd: undefined },
    },
    "Force": {
        "Gurkha": { fuelTypes: ["Diesel"], yearStart: 2008, yearEnd: undefined },
        "Traveller": { fuelTypes: ["Diesel"], yearStart: 2005, yearEnd: undefined },
    },
    "Isuzu": {
        "D-Max V-Cross": { fuelTypes: ["Diesel"], yearStart: 2016, yearEnd: undefined },
        "MU-X": { fuelTypes: ["Diesel"], yearStart: 2017, yearEnd: undefined },
    },
    "Lexus": {
        "ES": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2017, yearEnd: undefined },
        "LS": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2018, yearEnd: undefined },
        "NX": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2017, yearEnd: undefined },
        "RX": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2017, yearEnd: undefined },
        "LX": { fuelTypes: ["Diesel"], yearStart: 2017, yearEnd: undefined },
        "LC": { fuelTypes: ["Petrol", "Hybrid"], yearStart: 2020, yearEnd: undefined },
    },
};

// Helper functions
export const getMakes = (): string[] => {
    return Object.keys(vehicleData).sort();
};

export const getModels = (make: string): string[] => {
    if (!vehicleData[make]) return [];
    return Object.keys(vehicleData[make]).sort();
};

export const getYearRange = (make: string, model: string): number[] => {
    if (!vehicleData[make] || !vehicleData[make][model]) return [];

    const modelData = vehicleData[make][model];
    const currentYear = new Date().getFullYear();
    const endYear = modelData.yearEnd || currentYear;
    const startYear = modelData.yearStart;

    const years: number[] = [];
    for (let year = endYear; year >= startYear && year >= 2010; year--) {
        years.push(year);
    }
    return years;
};

export const getFuelTypes = (make: string, model: string): string[] => {
    if (!vehicleData[make] || !vehicleData[make][model]) return [];
    return vehicleData[make][model].fuelTypes;
};
