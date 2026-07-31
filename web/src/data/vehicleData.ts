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
  exteriorColor: string;
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

export const sampleVehicles: Vehicle[] = [
  {
    id: "cx5-chris",
    ownerName: "Chris",
    nickname: "Chris's CX-5",
    year: 2026,
    make: "Mazda",
    model: "CX-5",
    trim: "Premium Plus",
    maskedVin: "JM3*********02158",
    exteriorColor: "Deep Crystal Blue",
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
    maskedVin: "JM3*********05219",
    exteriorColor: "Machine Gray",
    contentProgress: 18,
    recentQuestionIds: ["driver-personalization", "homelink-no-remote"]
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
      "This answer is awaiting verification against the official 2026 CX-5 documentation. This screen demonstrates where a concise answer, control location, and exact display steps will appear.",
    applicability: "2026 Mazda CX-5 Premium Plus · U.S. market · sample profile",
    verificationStatus: "researchBacklog",
    nextResearchStep:
      "Locate the official meter-display section and verify the steps on the target vehicle.",
    relatedQuestionIds: ["software-updates", "hidden-settings"]
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
    relatedQuestionIds: ["driver-personalization", "hidden-settings"]
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
    relatedQuestionIds: ["occupant-comfort", "hidden-settings"]
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
    relatedQuestionIds: ["trim-differences"]
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
    relatedQuestionIds: ["illuminated-sills"]
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
    relatedQuestionIds: ["trim-differences"]
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
    relatedQuestionIds: ["hidden-settings", "odometer-location"]
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
    relatedQuestionIds: ["occupant-comfort", "driver-personalization"]
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

export function getQuestionsForTopic(topicId: string): Question[] {
  return questions.filter((question) => question.topicId === topicId);
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
