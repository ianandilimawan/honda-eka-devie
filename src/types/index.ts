export interface Product {
  id: string;
  name: string;
  category: 'Sport' | 'Scooter' | 'Matic' | 'Bebek';
  price: number;
  image: string;
  description: string;
  specs: {
    engine: string;
    power: string;
    transmission: string;
    fuelCapacity: string;
    weight: string;
  };
  features: string[];
  isFeatured: boolean;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  footer: {
    contactEmail: string;
    contactPhone: string;
    address: string;
    socialFacebook: string;
    socialInstagram: string;
    socialYoutube: string;
  };
}