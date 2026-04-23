'use client';
import React from 'react';
import { Layout, theme } from 'antd';
import { Navbar } from './Navbar';


const { Header, Content, Footer } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', background: '#001529', padding: '0 24px' }}>
        <Logo />
        <Navbar />
      </Header>
      
      <Content style={{ padding: '24px 48px' }}>
        <main style={{ 
          background: colorBgContainer, 
          minHeight: '80vh', 
          padding: 24, 
          borderRadius: borderRadiusLG 
        }}>
          {children}
        </main>
      </Content>

      <Footer style={{ textAlign: 'center', color: '#8c8c8c' }}>
        NEX Library ©{new Date().getFullYear()} - Santiago Yepes Gonzalez
      </Footer>
    </Layout>
  );
}

// Mini-componente interno para el Logo
const Logo = () => (
  <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', marginRight: '2rem', letterSpacing: '1px' }}>
    NEX<span style={{ color: '#1677ff' }}>LIB</span>
  </div>
);