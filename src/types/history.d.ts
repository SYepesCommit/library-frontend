import dayjs from 'dayjs';

export interface HistoryFiltersProps {
  mode: 'user' | 'book';
  data: { label: string; value: number }[];
  onEntityChange: (value: number) => void;
  onDateChange: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => void;
  loading: boolean;
  entityId?: number;
  dateValues: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
}

export interface HistoryTableProps {
  data: any[];
  mode: 'user' | 'book';
  loading: boolean;
  entityId?: number;
}