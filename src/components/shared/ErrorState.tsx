'use client';
import { Button, Result } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { ErrorStateProps } from '@/src/types/errorState';

export const ErrorState = ({ 
  message = "Hubo un problema al conectar con el servidor.", 
  onRetry 
}: Readonly<ErrorStateProps>) => {
  return (
    <div className="flex justify-center items-center h-[50vh] w-full">
      <Result
        status="error"
        title="Error de Conexión"
        subTitle={message}
        extra={
          onRetry && (
            <Button 
              type="primary" 
              icon={<ReloadOutlined />} 
              onClick={onRetry}
              className="bg-blue-600"
            >
              Reintentar
            </Button>
          )
        }
      />
    </div>
  );
};