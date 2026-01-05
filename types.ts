export interface FeatureDetail {
  title: string;
  description: string;
}

export interface SpecRow {
  label: string;
  value1: string;
  value2?: string;
}

export interface GPUModelSpecs {
  headers: string[];
  rows: SpecRow[];
}

export interface ServerSpecs {
  title: string;
  rows: SpecRow[];
}

export interface ProductSpecs {
  gpu?: GPUModelSpecs;
  server?: ServerSpecs;
}

export interface ProductData {
  id: string;
  images: string[];
  // Text fields are now retrieved via i18n, but we might merge them for usage
  title?: string;
  subtitle?: string;
  features?: FeatureDetail[];
  specs?: ProductSpecs;
}

export interface ProductConfig {
  id: string;
}