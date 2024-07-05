import { User } from './user.model';

export interface Quote {
  id?: number;
  text?: string;
  user?: User;
  categories?: Category[];
}

export interface Category {
  id?: number;
  name?: string;
}
