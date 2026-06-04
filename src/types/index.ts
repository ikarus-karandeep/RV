export type TrailerFeature = {
  id: string;
  name: string;
  icon?: string;
};

export type BestSuitedItem = {
  id: string;
  name: string;
  icon: string; // emoji
};

export type TrailerType = {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  image: string;
  features: TrailerFeature[];
  color: string;
  bestSuitedFor?: BestSuitedItem[];
  equipmentList?: string[];
};

export type SizeOption = {
  id: string;
  size: string;
  description: string;
  price: number;
  image: string;
  features: string[];
};

export type ConfiguratorStep = {
  id: string;
  label: string;
};

export interface ConfiguratorState {
  currentStepId: string;
  selectedTrailerTypeId: string | null;
  selectedSizeId: string | null;
}
