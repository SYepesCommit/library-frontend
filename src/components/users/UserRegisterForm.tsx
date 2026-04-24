'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserAddOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { client } from '@/src/lib/graphql-client';
import { CREATE_USER } from '@/src/graphql/users';
import toast from 'react-hot-toast';
import { User } from '@/src/types/user';

const { Title, Text } = Typography;

interface UserRegisterFormProps {
  onSuccess: () => void;
}

export const UserRegisterForm = ({ onSuccess }: UserRegisterFormProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: User) => {
    setLoading(true);
    try {
      await client.request(CREATE_USER, { input: values });
      toast.success('Usuario registrado exitosamente');
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      const errorMsg = error.response?.errors[0]?.message || 'Error al registrar';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-md border-none sticky top-4">
      <div className="text-center mb-6">
        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <UserAddOutlined className="text-blue-600 text-xl" />
        </div>
        <Title level={4}>Nuevo Lector</Title>
        <Text type="secondary">Ingresa los datos del nuevo miembro</Text>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          label="Nombre Completo"
          name="name"
          rules={[{ required: true, message: 'El nombre es obligatorio' }]}
        >
          <Input prefix={<UserOutlined className="text-slate-400" />} placeholder="Santiago Yepes" />
        </Form.Item>

        <Form.Item
          label="Correo Electrónico"
          name="email"
          rules={[
            { required: true, message: 'El email es obligatorio' },
            { type: 'email', message: 'Formato inválido' }
          ]}
        >
          <Input prefix={<MailOutlined className="text-slate-400" />} placeholder="ejemplo@correo.com" />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            loading={loading} 
            className="bg-blue-600 h-10 font-medium"
          >
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};