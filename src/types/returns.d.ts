export interface UserSelectorProps {
  users: any[];
  loading: boolean;
  onSelect: (id: number | undefined) => void;
}
