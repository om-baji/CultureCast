import { Character } from "@/types/rpg";

export const characters: Character[] = [
  {
    id: "diplomat",
    name: "Namiko",
    role: "Diplomat",
    description:
      "A skilled negotiator from Kyoto, versed in ancient Japanese etiquette and modern diplomacy.",
    avatarUrl:
      "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg",
  },
  {
    id: "warrior",
    name: "Ravi",
    role: "Warrior",
    description:
      "A Kshatriya from North India, trained in martial arts and battle strategy.",
    avatarUrl:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
  },
  {
    id: "sage",
    name: "Elena",
    role: "Sage",
    description:
      "A Balkan mystic who draws on Slavic folklore and spiritual insight to guide others.",
    avatarUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    id: "merchant",
    name: "Omar",
    role: "Merchant",
    description:
      "A skilled negotiator from Marrakech who blends business with deep cultural wisdom.",
    avatarUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    id: "healer",
    name: "Amina",
    role: "Healer",
    description:
      "An herbalist from the Sahel who practices ancient African healing traditions.",
    avatarUrl:
      "https://images.pexels.com/photos/1181317/pexels-photo-1181317.jpeg",
  },
  {
    id: "storyteller",
    name: "Kofi",
    role: "Storyteller",
    description:
      "A Griot from West Africa, keeper of oral traditions and cultural memory.",
    avatarUrl:
      "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
  },
  {
    id: "explorer",
    name: "Anika",
    role: "Explorer",
    description:
      "A South Indian anthropologist uncovering tribal stories and forgotten wisdom.",
    avatarUrl:
      "https://images.pexels.com/photos/935985/pexels-photo-935985.jpeg",
  },
  {
    id: "artisan",
    name: "Miguel",
    role: "Artisan",
    description:
      "A Quechua artisan from the Andes, preserving culture through vivid weavings and architecture.",
    avatarUrl:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
  },
  {
    id: "shaman",
    name: "Hoku",
    role: "Shaman",
    description:
      "A Polynesian spiritual guide who reads the stars and communes with ancestors.",
    avatarUrl: "https://images.pexels.com/photos/54324/pexels-photo-54324.jpeg",
  },
  {
    id: "poet",
    name: "Meera",
    role: "Poet",
    description:
      "A wandering bard from Rajasthan who crafts verses that challenge social norms and celebrate love.",
    avatarUrl:
      "https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg",
  },
  {
    id: "monk",
    name: "Haruto",
    role: "Monk",
    description:
      "A Zen practitioner from Nara who teaches the way of harmony through silence and ritual.",
    avatarUrl:
      "https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg",
  },
  {
    id: "dancer",
    name: "Raji",
    role: "Dancer",
    description:
      "A classical Bharatanatyam performer who channels mythology through motion.",
    avatarUrl:
      "https://images.pexels.com/photos/1126784/pexels-photo-1126784.jpeg",
  },
];

export const characterInfo: Record<
  string,
  {
    role: string;
    culture: string;
    era: string;
    tone: string;
  }
> = {
  diplomat: {
    role: "Diplomat",
    culture: "Japanese",
    era: "Modern",
    tone: "formal",
  },
  warrior: {
    role: "Warrior",
    culture: "Indian",
    era: "Medieval",
    tone: "brave",
  },
  sage: { role: "Sage", culture: "Balkan", era: "Ancient", tone: "wise" },
  merchant: {
    role: "Merchant",
    culture: "Moroccan",
    era: "Renaissance",
    tone: "persuasive",
  },
  healer: {
    role: "Healer",
    culture: "African",
    era: "Traditional",
    tone: "compassionate",
  },
  storyteller: {
    role: "Griot",
    culture: "West African",
    era: "Traditional",
    tone: "engaging",
  },
  explorer: {
    role: "Anthropologist",
    culture: "South Indian",
    era: "Contemporary",
    tone: "curious",
  },
  artisan: {
    role: "Artisan",
    culture: "Quechua",
    era: "Colonial",
    tone: "expressive",
  },
  shaman: {
    role: "Shaman",
    culture: "Polynesian",
    era: "Ancient",
    tone: "mystical",
  },
  poet: {
    role: "Poet",
    culture: "Rajasthani",
    era: "Classical",
    tone: "lyrical",
  },
  monk: { role: "Monk", culture: "Japanese", era: "Feudal", tone: "serene" },
  dancer: {
    role: "Dancer",
    culture: "Indian",
    era: "Classical",
    tone: "rhythmic",
  },
};

export const characterMap: Record<
  string,
  {
    role: string;
    culture: string;
    era: string;
    tone: string;
    language: string;
  }
> = {
  diplomat: {
    role: "Diplomat",
    culture: "Japanese",
    era: "Modern",
    tone: "formal",
    language: "English",
  },
  warrior: {
    role: "Warrior",
    culture: "Indian",
    era: "Medieval",
    tone: "brave",
    language: "English",
  },
  sage: {
    role: "Sage",
    culture: "Balkan",
    era: "Ancient",
    tone: "wise",
    language: "English",
  },
  merchant: {
    role: "Merchant",
    culture: "Moroccan",
    era: "Renaissance",
    tone: "persuasive",
    language: "English",
  },
  healer: {
    role: "Healer",
    culture: "African",
    era: "Traditional",
    tone: "compassionate",
    language: "English",
  },
  storyteller: {
    role: "Griot",
    culture: "West African",
    era: "Traditional",
    tone: "engaging",
    language: "English",
  },
  explorer: {
    role: "Anthropologist",
    culture: "South Indian",
    era: "Contemporary",
    tone: "curious",
    language: "English",
  },
  artisan: {
    role: "Artisan",
    culture: "Quechua",
    era: "Colonial",
    tone: "expressive",
    language: "English",
  },
  shaman: {
    role: "Shaman",
    culture: "Polynesian",
    era: "Ancient",
    tone: "mystical",
    language: "English",
  },
  poet: {
    role: "Poet",
    culture: "Rajasthani",
    era: "Classical",
    tone: "lyrical",
    language: "English",
  },
  monk: {
    role: "Monk",
    culture: "Japanese",
    era: "Feudal",
    tone: "serene",
    language: "English",
  },
  dancer: {
    role: "Dancer",
    culture: "Indian",
    era: "Classical",
    tone: "rhythmic",
    language: "English",
  },
};
