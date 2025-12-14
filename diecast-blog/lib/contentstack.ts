import Contentstack, { Region } from '@contentstack/delivery-sdk';

const stack = Contentstack.stack({
  apiKey: process.env.CONTENTSTACK_API_KEY!,
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.CONTENTSTACK_ENVIRONMENT!,
  region: Region.EU,
});

export interface Car {
  uid: string;
  title: string;
  slug: string;
  main_image?: {
    url: string;
    title: string;
  };
  description: string;
  year?: number;
  brand: string;
}

export async function getAllCars(): Promise<Car[]> {
  const result = await stack
    .contentType('car')
    .entry()
    .find();

  return (result.entries as unknown as Car[]) || [];
}

export async function getCarBySlug(slug: string): Promise<Car | null> {
  const result = await stack
    .contentType('car')
    .entry()
    .query()
    .where('slug', slug)
    .find();

  const entries = result.entries as unknown as Car[];
  return entries?.[0] || null;
}
