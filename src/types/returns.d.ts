import { User } from "./user";

export interface UserSelectorProps {
  users: User[];
  loading: boolean;
  onSelect: (id: number | undefined) => void;
}
