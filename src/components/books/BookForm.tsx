'use client';
import { Form, Input, Button, Card, Typography, Select } from 'antd';
import { BookOutlined, UserOutlined, TagOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { genderOptions } from '@/src/config/book-config';
import { Book } from '@/src/types/book';

export const BookForm = ({ onSubmit, loading, initialValues }: { onSubmit: (book: Book) => Promise<void>; loading: boolean; initialValues: Book | null }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = async (values: Book) => {
    await onSubmit(values);
    if (!initialValues) {
      form.resetFields();
    }
  };

  return (
    <Card className="shadow-md border-none">
      <Typography.Title level={4} className="mb-6">
        {initialValues ? 'Editar Libro' : 'Nuevo Libro'}
      </Typography.Title>

      <Form form={form} layout="vertical" onFinish={handleFinish} preserve={false}>
        <Form.Item name="id" hidden><Input /></Form.Item>

        <Form.Item label="Título" name="title" rules={[{ required: true, message: 'Título requerido' }]}>
          <Input prefix={<BookOutlined />} placeholder="Ej: Clean Code" />
        </Form.Item>

        <Form.Item label="Autor" name="author" rules={[{ required: true, message: 'Autor requerido' }]}>
          <Input prefix={<UserOutlined />} placeholder="Robert C. Martin" />
        </Form.Item>

        <Form.Item
          label="Género"
          name="gender"
          rules={[{ required: true, message: 'Selecciona un género' }]}
        >
          <Select
            placeholder="Seleccionar género"
            suffixIcon={<TagOutlined />}
            options={genderOptions}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading} className="mt-4">
          {initialValues ? 'Actualizar Cambios' : 'Guardar en Catálogo'}
        </Button>
      </Form>
    </Card>
  );
};