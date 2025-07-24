// src/layouts/DashboardLayout.jsx
import { Layout, Row, Col, Card, Typography, List } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar    from '../../components/Sidebar';
import AppHeader  from '../../components/AppHeader';
import './main.css'
const { Content } = Layout;
const { Title, Text } = Typography;

export default function DashboardLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Sidebar />

      <Layout>
        {/* <AppHeader /> */}
        <AppHeader />

        <Content style={{ margin: 24, overflow: 'auto' }}>
          {/* Cards métricas */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
              <Card className="metric-card">
                <Text type="secondary" style={{ fontSize: 12, letterSpacing: 1 }}>VENTAS DEL MES</Text>
                <Title level={2} style={{ color: '#5956d8' }}>$45,230</Title>
                <Text type="success" style={{ fontSize: 12 }}>+12.5% vs mes anterior</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
              <Card className="metric-card">
                <Text type="secondary" style={{ fontSize: 12, letterSpacing: 1 }}>COMPRAS DEL MES</Text>
                <Title level={2} style={{ color: '#d84b8f' }}>$23,410</Title>
                <Text type="success" style={{ fontSize: 12 }}>+8.2% vs mes anterior</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
              <Card className="metric-card">
                <Text type="secondary" style={{ fontSize: 12, letterSpacing: 1 }}>PRODUCTOS EN STOCK</Text>
                <Title level={2} style={{ color: '#13c2c2' }}>1,247</Title>
                <Text type="success" style={{ fontSize: 12 }}>-3.1% vs mes anterior</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
              <Card className="metric-card">
                <Text type="secondary" style={{ fontSize: 12, letterSpacing: 1 }}>CLIENTES ACTIVOS</Text>
                <Title level={2} style={{ color: '#52c41a' }}>156</Title>
                <Text type="success" style={{ fontSize: 12 }}>+15.4% vs mes anterior</Text>
              </Card>
            </Col>
          </Row>

          {/* Actividad Reciente */}
          <Card className="activity-card" title="Actividad Reciente">
            <List
              dataSource={[
                'Usuario Juan creó una nueva orden.',
                'Reporte de ventas generado automáticamente.',
                'Usuario Ana actualizó perfil.'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>

          {/* Rutas hijas */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
