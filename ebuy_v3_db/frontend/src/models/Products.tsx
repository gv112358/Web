export interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

/**
 * Interfaccia che identifica la struttura di ogni singolo prodotto 
 * che ritorna dalla chiamata 'get-categories'
    export interface Product {
        id: number,
        title: string,
        price: number,
        category: string,
        images: string
    }
 */
