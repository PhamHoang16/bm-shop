export interface User {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  balance?: number;
  totalOrder?: number;
  createdDate?: string;

  [key: string]: unknown;
}
  