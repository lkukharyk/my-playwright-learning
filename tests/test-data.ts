export type Product = {
  name: string;
  price: number;
  inStock: boolean;
};

export const product1: Product = {
  name: "Bottle 2 ml, plastic, semi-opaque white plastic spray cup",
  price: 1.25,
  inStock: true,
};

export const product2: Product = {
  name: "Bottle 5 ml, glass, green metallic spray cup",
  price: 2.50,
  inStock: false,
};


export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function splitName(product: Product): string[] {
  return product.name.split(", ");
}

export type Credentials= {
    email: string;
    password: string;
    role?: string;
}

export const validUser : Credentials= { email: "ValidUseR@test.com", password: "qwerty", role: "member"}
export const env: string = "staging";

export function getLoginUrl(env: string): string {
return `https://${env}.example.com/login`;
}