export interface Product {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  groupId: string;
}
