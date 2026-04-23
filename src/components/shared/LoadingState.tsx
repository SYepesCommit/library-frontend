'use client';
import { LoadingStateProps } from '@/src/types/loadingState';
import { Spin, Typography } from 'antd';

const { Text } = Typography;

export const LoadingState = ({ message = "Cargando..." }: Readonly<LoadingStateProps>) => {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh] gap-4 w-full">
      <Spin size="large" />
      <Text type="secondary" className="animate-pulse text-lg font-medium">
        {message}
      </Text>
    </div>
  );
};