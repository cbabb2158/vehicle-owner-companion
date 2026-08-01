export type VerificationStatus =
  | "researchBacklog"
  | "sourceLocated"
  | "verified";

export interface Vehicle {
  id: string;
  ownerName: string;
  nickname: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  maskedVin: string;
  displayVin: string;
  maskedPlate: string;
  displayPlate: string;
  exteriorColor: string;
  imageSrc?: string;
  imageAlt?: string;
  contentProgress: number;
  recentQuestionIds: string[];
}

export interface KnowledgeTopic {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface Question {
  id: string;
  topicId: string;
  title: string;
  eyebrow: string;
  shortAnswer: string;
  applicability: string;
  verificationStatus: VerificationStatus;
  nextResearchStep: string;
  relatedQuestionIds: string[];
  procedureSteps?: string[];
  sourceReferenceIds: string[];
  lastReviewedAt?: string;
}

export interface SourceReference {
  id: string;
  publisher: string;
  title: string;
  modelYear: number;
  market: string;
  publicationDate: string;
  section: string;
  page: string;
  url: string;
  retrievedAt: string;
}

export interface VehicleSetting {
  id: string;
  name: string;
  description: string;
  system: string;
  menuPath: string;
  keywords: string[];
  verificationStatus: VerificationStatus;
}

export type IconName =
  | "garage"
  | "vehicle"
  | "knowledge"
  | "settings"
  | "display"
  | "comfort"
  | "profile"
  | "homelink"
  | "accessory"
  | "software"
  | "safety"
  | "maintenance";

export function resolveVehicleVin(
  localVin: string | undefined,
  maskedVin: string,
  allowFullVin = true
): string {
  if (!allowFullVin) {
    return maskedVin;
  }

  const normalized = localVin?.trim().toUpperCase();
  return normalized && /^[A-HJ-NPR-Z0-9]{17}$/.test(normalized)
    ? normalized
    : maskedVin;
}

export function resolveVehiclePlate(
  localPlate: string | undefined,
  maskedPlate: string,
  allowFullPlate = true
): string {
  if (!allowFullPlate) {
    return maskedPlate;
  }

  const normalized = localPlate?.trim().toUpperCase();
  return normalized && /^[A-Z0-9]{1,8}$/.test(normalized)
    ? normalized
    : maskedPlate;
}

const chrisMaskedVin = "JM3*********02158";
const jennyMaskedVin = "JM3*********05219";
const elieMaskedVin = "VIN forthcoming";
const maskedPlate = "Plate on file";
const allowLocalVehicleDetails = import.meta.env.VITE_PUBLIC_BUILD !== "true";
const vehicleImage = (fileName: string) => `${import.meta.env.BASE_URL}vehicles/${fileName}`;

export const sampleVehicles: Vehicle[] = [
  {
    id: "cx5-chris",
    ownerName: "Chris",
    nickname: "Chris's CX-5",
    year: 2026,
    make: "Mazda",
    model: "CX-5",
    trim: "Premium Plus",
    maskedVin: chrisMaskedVin,
    displayVin: resolveVehicleVin(
      import.meta.env.VITE_CHRIS_CX5_VIN,
      chrisMaskedVin,
      allowLocalVehicleDetails
    ),
    maskedPlate,
    displayPlate: resolveVehiclePlate(
      import.meta.env.VITE_CHRIS_CX5_PLATE,
      maskedPlate,
      allowLocalVehicleDetails
    ),
    exteriorColor: "Machine Gray Metallic",
    imageSrc: vehicleImage("2026-cx5-premium-plus-machine-gray.png"),
    imageAlt: "Chris's Machine Gray Metallic 2026 Mazda CX-5 Premium Plus",
    contentProgress: 18,
    recentQuestionIds: ["odometer-location", "occupant-comfort"]
  },
  {
    id: "cx5-jenny",
    ownerName: "Jenny",
    nickname: "Jenny's CX-5",
    year: 2026,
    make: "Mazda",
    model: "CX-5",
    trim: "Premium Plus",
    maskedVin: jennyMaskedVin,
    displayVin: resolveVehicleVin(
      import.meta.env.VITE_JENNY_CX5_VIN,
      jennyMaskedVin,
      allowLocalVehicleDetails
    ),
    maskedPlate,
    displayPlate: resolveVehiclePlate(
      import.meta.env.VITE_JENNY_CX5_PLATE,
      maskedPlate,
      allowLocalVehicleDetails
    ),
    exteriorColor: "Soul Red Crystal Metallic",
    imageSrc: vehicleImage("2026-cx5-premium-plus-soul-red.png"),
    imageAlt: "Jenny's Soul Red Crystal Metallic 2026 Mazda CX-5 Premium Plus",
    contentProgress: 18,
    recentQuestionIds: ["driver-personalization", "homelink-no-remote"]
  },
  {
    id: "cx5-elie",
    ownerName: "Elie",
    nickname: "Elie's CX-5",
    year: 2026,
    make: "Mazda",
    model: "CX-5",
    trim: "2.5 S Select",
    maskedVin: elieMaskedVin,
    displayVin: resolveVehicleVin(
      import.meta.env.VITE_ELIE_CX5_VIN,
      elieMaskedVin,
      allowLocalVehicleDetails
    ),
    maskedPlate,
    displayPlate: resolveVehiclePlate(
      import.meta.env.VITE_ELIE_CX5_PLATE,
      maskedPlate,
      allowLocalVehicleDetails
    ),
    exteriorColor: "Polymetal Gray Metallic",
    imageSrc: vehicleImage("2026-cx5-select-polymetal-gray-cutout.png"),
    imageAlt: "Elie's Polymetal Gray Metallic 2026 Mazda CX-5 2.5 S Select",
    contentProgress: 13,
    recentQuestionIds: ["odometer-location"]
  }
];

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    id: "displays",
    title: "Displays & indicators",
    description: "Find information that appears in the driver and center displays.",
    icon: "display"
  },
  {
    id: "comfort",
    title: "Comfort & climate",
    description: "Understand comfort automation, seating, and climate behavior.",
    icon: "comfort"
  },
  {
    id: "personalization",
    title: "Driver personalization",
    description: "Learn what follows a driver, key, profile, or phone.",
    icon: "profile"
  },
  {
    id: "convenience",
    title: "Controls & convenience",
    description: "Set up garage access and everyday vehicle behavior.",
    icon: "homelink"
  },
  {
    id: "accessories",
    title: "Exterior & accessories",
    description: "Separate factory features from compatible accessories.",
    icon: "accessory"
  },
  {
    id: "software",
    title: "Software & updates",
    description: "Track system versions and verified update paths.",
    icon: "software"
  },
  {
    id: "safety",
    title: "Safety & assistance",
    description: "Understand alerts, availability, and driver responsibilities.",
    icon: "safety"
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description: "Keep schedules and vehicle care guidance in one place.",
    icon: "maintenance"
  }
];

export const questions: Question[] = [
  {
    id: "odometer-location",
    topicId: "displays",
    title: "Where is the odometer?",
    eyebrow: "Displays & indicators",
    shortAnswer:
      "In the 2026 CX-5, the odometer and trip meter are shown on the Mazda Connect screen rather than in the instrument cluster. Open the Efficiency area from the Mazda Connect home screen, then choose Efficiency in its navigation bar to view them.",
    applicability: "2026 Mazda CX-5 · U.S. market · all trims covered by Mazda's owner manual",
    verificationStatus: "verified",
    nextResearchStep:
      "Confirm the exact on-screen icon labels on each owner vehicle during a parked walkthrough.",
    relatedQuestionIds: ["software-updates", "hidden-settings"],
    procedureSteps: [
      "With Mazda Connect at its home screen, open Efficiency.",
      "Select Efficiency in the navigation bar.",
      "Read the Odometer/Tripmeter information shown there."
    ],
    sourceReferenceIds: ["2026-cx5-owners-manual-odometer"],
    lastReviewedAt: "2026-08-01"
  },
  {
    id: "occupant-comfort",
    topicId: "comfort",
    title: "What does Occupant Comfort control?",
    eyebrow: "Comfort & climate",
    shortAnswer:
      "The feature scope and dependencies are still being researched. The verified answer will identify every affected comfort system and explain when automatic behavior occurs.",
    applicability: "Pending trim and software confirmation",
    verificationStatus: "researchBacklog",
    nextResearchStep:
      "Confirm Mazda's terminology and capture the applicable settings screens.",
    relatedQuestionIds: ["driver-personalization", "hidden-settings"],
    sourceReferenceIds: []
  },
  {
    id: "driver-personalization",
    topicId: "personalization",
    title: "What follows my driver profile?",
    eyebrow: "Driver personalization",
    shortAnswer:
      "Profile behavior is not yet verified. The finished guide will distinguish settings tied to the vehicle, driver profile, key, and connected phone.",
    applicability: "Pending equipment and profile-behavior confirmation",
    verificationStatus: "researchBacklog",
    nextResearchStep:
      "Test profile creation and switching with both sample owner scenarios.",
    relatedQuestionIds: ["occupant-comfort", "hidden-settings"],
    sourceReferenceIds: []
  },
  {
    id: "homelink-no-remote",
    topicId: "convenience",
    title: "Can I program HomeLink without a remote?",
    eyebrow: "Controls & convenience",
    shortAnswer:
      "The correct procedure depends on the installed opener and must be verified before publication. The final guide will branch by opener type and list prerequisites first.",
    applicability: "Pending opener type and installed-equipment confirmation",
    verificationStatus: "researchBacklog",
    nextResearchStep:
      "Verify the official HomeLink procedure and rolling-code branch.",
    relatedQuestionIds: ["trim-differences"],
    sourceReferenceIds: []
  },
  {
    id: "trim-differences",
    topicId: "accessories",
    title: "Why do matching trims have different equipment?",
    eyebrow: "Exterior & accessories",
    shortAnswer:
      "The research will separate standard equipment, packages, market differences, production changes, and installed accessories using evidence from the vehicle and official records.",
    applicability: "2026 CX-5 comparison workflow",
    verificationStatus: "researchBacklog",
    nextResearchStep:
      "Collect official equipment lists and compare two real vehicle configurations.",
    relatedQuestionIds: ["illuminated-sills"],
    sourceReferenceIds: []
  },
  {
    id: "illuminated-sills",
    topicId: "accessories",
    title: "Are illuminated sill plates included?",
    eyebrow: "Exterior & accessories",
    shortAnswer:
      "Availability and fitment are not yet verified. The published answer will distinguish standard, optional, dealer-installed, and aftermarket equipment.",
    applicability: "Pending part-number and market verification",
    verificationStatus: "researchBacklog",
    nextResearchStep:
      "Locate the official accessory catalog and installation documentation.",
    relatedQuestionIds: ["trim-differences"],
    sourceReferenceIds: []
  },
  {
    id: "software-updates",
    topicId: "software",
    title: "How do I check for software updates?",
    eyebrow: "Software & updates",
    shortAnswer:
      "The vehicle may contain independently versioned systems. The finished guide will identify each system and use only verified owner or dealer update paths.",
    applicability: "Pending system and version confirmation",
    verificationStatus: "researchBacklog",
    nextResearchStep:
      "Inventory version screens and locate official update documentation.",
    relatedQuestionIds: ["hidden-settings", "odometer-location"],
    sourceReferenceIds: []
  },
  {
    id: "hidden-settings",
    topicId: "displays",
    title: "Which useful settings are easy to miss?",
    eyebrow: "Displays & indicators",
    shortAnswer:
      "This will become a verified index of settings that are conditional, profile-linked, or located outside the central display. No setting behavior is assumed in the prototype.",
    applicability: "Pending vehicle walkthrough",
    verificationStatus: "researchBacklog",
    nextResearchStep:
      "Document every settings surface and note conditions that change availability.",
    relatedQuestionIds: ["occupant-comfort", "driver-personalization"],
    sourceReferenceIds: []
  }
];

export const sourceReferences: SourceReference[] = [
  {
    id: "2026-cx5-owners-manual-odometer",
    publisher: "Mazda North American Operations",
    title: "2026 Mazda CX-5 Owner's Manual",
    modelYear: 2026,
    market: "U.S.",
    publicationDate: "Publication date not stated in Mazda's web manual",
    section: "Instrument Cluster > Odometer/Trip Meter",
    page: "5-23 in the PDF owner's manual",
    url: "https://www.mazdausa.com/static/manuals/2026/cx-5/contents/3813829899.html",
    retrievedAt: "2026-08-01"
  }
];

export const vehicleSettings: VehicleSetting[] = [
  {
    id: "driver-personalization-setting",
    name: "Driver personalization",
    description:
      "Understand which preferences may be associated with a driver profile.",
    system: "Profiles",
    menuPath: "Settings > Profiles · path pending verification",
    keywords: ["profile", "driver", "key", "phone", "seat", "mirror"],
    verificationStatus: "researchBacklog"
  },
  {
    id: "occupant-comfort-setting",
    name: "Occupant Comfort",
    description:
      "Review automatic comfort behavior and the systems it may coordinate.",
    system: "Comfort",
    menuPath: "Settings > Comfort · path pending verification",
    keywords: ["climate", "seat", "steering", "automatic", "comfort"],
    verificationStatus: "researchBacklog"
  },
  {
    id: "walk-away-locking-setting",
    name: "Walk-away locking",
    description:
      "Explore automatic door-lock behavior and the conditions required for it.",
    system: "Doors & access",
    menuPath: "Settings > Vehicle > Doors · path pending verification",
    keywords: ["doors", "lock", "key", "walk away", "access"],
    verificationStatus: "researchBacklog"
  },
  {
    id: "software-version-setting",
    name: "Software version",
    description:
      "Find the version information for each independently updated system.",
    system: "System",
    menuPath: "Settings > System information · path pending verification",
    keywords: ["update", "version", "firmware", "system", "software"],
    verificationStatus: "researchBacklog"
  },
  {
    id: "lighting-setting",
    name: "Exterior lighting behavior",
    description:
      "Locate timing and convenience settings associated with exterior lights.",
    system: "Lighting",
    menuPath: "Settings > Vehicle > Lighting · path pending verification",
    keywords: ["lights", "headlights", "exterior", "timer", "welcome"],
    verificationStatus: "researchBacklog"
  }
];

export function getVehicleById(id: string): Vehicle | undefined {
  return sampleVehicles.find((vehicle) => vehicle.id === id);
}

export function getQuestionById(id: string): Question | undefined {
  return questions.find((question) => question.id === id);
}

export function getSourceReferenceById(id: string): SourceReference | undefined {
  return sourceReferences.find((source) => source.id === id);
}

export function getQuestionsForTopic(topicId: string): Question[] {
  return questions.filter((question) => question.topicId === topicId);
}

export function supports2026Guidance(
  vehicle: Pick<Vehicle, "year" | "make" | "model">
): boolean {
  return vehicle.year === 2026 && vehicle.make === "Mazda" && vehicle.model === "CX-5";
}

export function searchSettings(query: string): VehicleSetting[] {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) {
    return vehicleSettings;
  }

  return vehicleSettings.filter((setting) =>
    [
      setting.name,
      setting.description,
      setting.system,
      setting.menuPath,
      ...setting.keywords
    ]
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalized)
  );
}
