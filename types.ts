export interface FeatureDetail {
  title: string;
  description: string;
}

export interface SpecRow {
  label: string;
  value1: string;
  value2?: string;
}

export interface ProductData {
  id: string;
  title: string;
  subtitle?: string;
  images: string[];
  features: FeatureDetail[];
  specs?: {
    gpu?: {
      headers: string[];
      rows: SpecRow[];
    };
    server?: {
      title: string;
      rows: SpecRow[];
    };
  };
}