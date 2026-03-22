export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  base_price: number;
  image_url: string | null;
  stock_quantity: number;
}

export interface Additive {
  id: string;
  name: string;
  price: number;
  stock_quantity: number;
}

export interface CartItem {
  menuItem: MenuItem;
  selectedAdditives: Additive[];
  totalPrice: number;
  quantity: number;
}
