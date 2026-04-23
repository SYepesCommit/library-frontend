export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserListTableProps {
  users: any[];
  loading: boolean;
}
