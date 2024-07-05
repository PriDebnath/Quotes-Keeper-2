export interface User {
  id?: number;
  text?: string;
  user?: {
    id: 2;
    username: 'pritam';
    first_name: '';
    last_name: '';
    email: 'debnathpritam0802@gmail.com';
  };
  categories: [
    {
      id: 10;
      category: {
        id: 3;
        name: 'Coding';
      };
      quote: 7;
    },
    {
      id: 11;
      category: {
        id: 4;
        name: 'Programming';
      };
      quote: 7;
    }
  ];
}
