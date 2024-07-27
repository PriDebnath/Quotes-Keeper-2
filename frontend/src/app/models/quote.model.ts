import { User } from './user.model';

export interface Quote {
  id?: number;
  text?: string;
  user?: User;
  categories?: QuoteCategory[];
}

export interface Category {
  id?: number;
  name?: string;
}

export interface QuoteCategory {
  // Third table to maintain relation between Quote and Category
  id?: number;
  category?: Category;
}
