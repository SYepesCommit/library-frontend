'use client';
import { Row, Col, Card, Button, Tag, Typography, Tooltip } from 'antd';
import { SendOutlined, StopOutlined } from '@ant-design/icons';
import { BookListProps } from '@/src/types/book';

const { Text } = Typography;

export const BookList = ({ books, onReserve }: Readonly<BookListProps>) => {
  return (
    <Row gutter={[20, 20]}>
      {books.map((book) => {
        const isAvailable = book.isAvailable;
        const gradientClass = isAvailable 
          ? "from-blue-500 to-blue-600" 
          : "from-gray-400 to-gray-500";
        const tagColor = isAvailable ? "processing" : "error";
        const statusText = isAvailable ? "Disponible" : "Reservado";

        return (
          <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
            <Card
              hoverable={isAvailable}
              className={`h-full flex flex-col shadow-sm transition-all duration-300 border-none ${
                isAvailable ? 'hover:shadow-md bg-slate-50' : 'bg-gray-100 opacity-80'
              }`}
              cover={
                <div className={`h-32 bg-gradient-to-br ${gradientClass} p-2 flex justify-center items-center text-5xl rounded-t-lg shadow-inner`}>
                  {isAvailable ? '📖' : '📕'}
                </div>
              }
              actions={[
                isAvailable ? (
                  <Button 
                    type="primary" 
                    icon={<SendOutlined />} 
                    className="w-[90%] font-semibold bg-blue-600 border-none hover:bg-blue-700"
                    onClick={() => onReserve(book)}
                  >
                    Reservar
                  </Button>
                ) : (
                  <Tooltip title="Este libro no se encuentra disponible actualmente">
                    <Button 
                      disabled 
                      icon={<StopOutlined />} 
                      className="w-[90%] font-semibold"
                    >
                      No Disponible
                    </Button>
                  </Tooltip>
                )
              ]}
            >
              <Card.Meta
                title={
                  <div className="flex justify-between items-start gap-2">
                    <span className={`text-lg font-bold leading-tight ${isAvailable ? 'text-gray-800' : 'text-gray-500'}`}>
                      {book.title}
                    </span>
                  </div>
                }
                description={
                  <div className="flex flex-col gap-3 mt-2">
                    <div className="flex flex-col">
                      <Text type="secondary" className="text-xs uppercase tracking-wider">Autor</Text>
                      <Text strong className={isAvailable ? 'text-gray-700' : 'text-gray-500'}>
                        {book.author}
                      </Text>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Tag color="blue" className="w-fit border-none px-3 py-0.5 rounded-full uppercase text-[10px] font-bold">
                        {book.gender}
                      </Tag>
                      <Tag color={tagColor} className="border-none px-3 py-0.5 rounded-full uppercase text-[10px] font-black">
                        {statusText}
                      </Tag>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};