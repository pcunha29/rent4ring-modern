export const FLEET_SLUGS = [
  "mini-cooper-s",
  "toyota-gr-yaris",
  "toyota-gr-supra",
  "porsche-taycan-turbo-gt",
  "porsche-spyder-rs",
  "porsche-911-gt3-rs-992",
  "ferrari-296-gtb",
] as const;

export type FleetSlug = (typeof FLEET_SLUGS)[number];

export type PricingPackage = {
  nameKey: string;
  firstLap: number;
  additionalLap: number;
  descriptionKey: string;
  featured?: boolean;
};

export type FleetVehicle = {
  priceFrom: number;
  spec0_100: string;
  specPower: string;
  specTopSpeed: string;
  imagePath: string;
  carId: number;
  type: string;
  engine: string;
  transmission: string;
  weight: string;
  descriptionKey: string;
  featuresKeys: string[];
  packages: PricingPackage[];
};

export const FLEET_DATA: Record<FleetSlug, FleetVehicle> = {
  "mini-cooper-s": {
    priceFrom: 179,
    spec0_100: "6.2s",
    specPower: "192 HP",
    specTopSpeed: "242 km/h",
    imagePath: "/vehicles/r4r-mini-cooper.jpg",
    carId: 19,
    type: "FF",
    engine: "2.0L 4-Cylinder Turbo",
    transmission: "7-speed DCT",
    weight: "1,150 kg",
    descriptionKey: "description",
    featuresKeys: [
      "feature1",
      "feature2",
      "feature3",
      "feature4",
      "feature5",
      "feature6",
      "feature7",
    ],
    packages: [
      {
        nameKey: "arriveDrive",
        firstLap: 229,
        additionalLap: 129,
        descriptionKey: "arriveDriveDesc",
        featured: true,
      },
      {
        nameKey: "basic",
        firstLap: 179,
        additionalLap: 79,
        descriptionKey: "basicDesc",
      },
    ],
  },
  "toyota-gr-yaris": {
    priceFrom: 219,
    spec0_100: "5.5s",
    specPower: "280 HP",
    specTopSpeed: "230 km/h",
    imagePath: "/vehicles/r4r-yaris.jpg",
    carId: 10,
    type: "AWD",
    engine: "1.6L 3-Cylinder Turbo",
    transmission: "8-speed DST",
    weight: "1,280 kg",
    descriptionKey: "description",
    featuresKeys: [
      "feature1",
      "feature2",
      "feature3",
      "feature4",
      "feature5",
      "feature6",
      "feature7",
    ],
    packages: [
      {
        nameKey: "arriveDrive",
        firstLap: 269,
        additionalLap: 169,
        descriptionKey: "arriveDriveDesc",
        featured: true,
      },
      {
        nameKey: "basic",
        firstLap: 219,
        additionalLap: 119,
        descriptionKey: "basicDesc",
      },
    ],
  },
  "toyota-gr-supra": {
    priceFrom: 249,
    spec0_100: "5.2s",
    specPower: "258 HP",
    specTopSpeed: "250 km/h",
    imagePath: "/vehicles/r4r-supra.jpg",
    carId: 20,
    type: "FR",
    engine: "2.0L Inline-4 Turbo",
    transmission: "8-speed Automatic",
    weight: "1,480 kg",
    descriptionKey: "description",
    featuresKeys: [
      "feature1",
      "feature2",
      "feature3",
      "feature4",
      "feature5",
      "feature6",
      "feature7",
    ],
    packages: [
      {
        nameKey: "arriveDrive",
        firstLap: 299,
        additionalLap: 199,
        descriptionKey: "arriveDriveDesc",
        featured: true,
      },
      {
        nameKey: "basic",
        firstLap: 249,
        additionalLap: 149,
        descriptionKey: "basicDesc",
      },
    ],
  },
  "porsche-taycan-turbo-gt": {
    priceFrom: 299,
    spec0_100: "2.6s",
    specPower: "1,093 HP",
    specTopSpeed: "305 km/h",
    imagePath: "/vehicles/r4r-taycan.jpg",
    carId: 24,
    type: "AWD",
    engine: "Dual Electric Motors",
    transmission: "2-speed Automatic",
    weight: "2,295 kg",
    descriptionKey: "description",
    featuresKeys: ["feature1", "feature2", "feature3", "feature4", "feature5"],
    packages: [
      {
        nameKey: "arriveDrive",
        firstLap: 299,
        additionalLap: 299,
        descriptionKey: "arriveDriveDesc",
        featured: true,
      },
    ],
  },
  "porsche-spyder-rs": {
    priceFrom: 399,
    spec0_100: "3.2s",
    specPower: "500 HP",
    specTopSpeed: "296 km/h",
    imagePath: "/vehicles/r4r-spyderRS.jpg",
    carId: 22,
    type: "MR",
    engine: "4.0L Flat-6 NA",
    transmission: "7-speed PDK",
    weight: "1,410 kg",
    descriptionKey: "description",
    featuresKeys: ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6", "feature7"],
    packages: [
      {
        nameKey: "arriveDrive",
        firstLap: 399,
        additionalLap: 399,
        descriptionKey: "arriveDriveDesc",
        featured: true,
      },
    ],
  },
  "porsche-911-gt3-rs-992": {
    priceFrom: 699,
    spec0_100: "3.2s",
    specPower: "525 HP",
    specTopSpeed: "296 km/h",
    imagePath: "/vehicles/r4r-gt3rs.jpg",
    carId: 21,
    type: "RR",
    engine: "4.0L Flat-6 NA",
    transmission: "7-speed PDK",
    weight: "1,450 kg",
    descriptionKey: "description",
    featuresKeys: ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"],
    packages: [
      {
        nameKey: "arriveDrive",
        firstLap: 699,
        additionalLap: 699,
        descriptionKey: "arriveDriveDesc",
        featured: true,
      },
    ],
  },
  "ferrari-296-gtb": {
    priceFrom: 699,
    spec0_100: "2.9s",
    specPower: "830 HP",
    specTopSpeed: "330 km/h",
    imagePath: "/vehicles/r4r-296.jpg",
    carId: 23,
    type: "MR",
    engine: "3.0L V6 Turbo + E-Motor",
    transmission: "8-speed DCT",
    weight: "1,470 kg",
    descriptionKey: "description",
    featuresKeys: ["feature1", "feature2", "feature3", "feature4", "feature5"],
    packages: [
      {
        nameKey: "arriveDrive",
        firstLap: 699,
        additionalLap: 699,
        descriptionKey: "arriveDriveDesc",
        featured: true,
      },
    ],
  },
};

export function getVehicleBySlug(slug: string): FleetVehicle | undefined {
  return FLEET_DATA[slug as FleetSlug];
}
