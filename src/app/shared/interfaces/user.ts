export interface User {
  id: number;
  firstname: string;
  lastname: string;
  login: string;
  password: string;
  address?: string;
  accessToken?: string;
}
