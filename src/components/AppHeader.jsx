// src/components/AppHeader.jsx
import { Layout, Row, Col, Breadcrumb, Select, Badge, Avatar, Typography, Dropdown, Space } from 'antd';
import { useAuth } from '../context/AuthContext';
import {
  HomeFilled,
  BellOutlined,
  DownOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;
const { Option } = Select;

export default function AppHeader() {
  const { logout, usuario } = useAuth();

  const items_session = [
    {
      key: 'logout',
      label: (
        <span onClick={logout} style={{ cursor: 'pointer' }}>
          Cerrar Sesión
        </span>
      ),
    }
  ];

  return (
    <Header
      style={{
        background: '#fff',
        padding: '0 24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        height: 64
      }}
    >
      <Row justify="space-between" align="middle" style={{ width: '100%' }}>
        <Col>
          <Breadcrumb separator=" ">
            <Breadcrumb.Item>
              <HomeFilled style={{ color: '#5956d8' }} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Text>Dashboard</Text>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        <Col>
          <Space size="large">
            <Select
              defaultValue="Mi Empresa S.A. - Sucursal Centro"
              suffixIcon={<DownOutlined />}
              bordered={false}
              style={{ width: 260 }}
            >
              <Option value="suc1">Mi Empresa S.A. - Sucursal Centro</Option>
              <Option value="suc2">Mi Empresa S.A. - Sucursal Norte</Option>
            </Select>

            <Badge count={3} size="small" offset={[0, 5]}>
              <BellOutlined style={{ fontSize: 20, color: '#555' }} />
            </Badge>

            <Dropdown menu={{ items: items_session }} placement="bottomLeft" arrow>
              <Space wrap size={10} style={{ cursor: 'pointer' }}>
                <Avatar style={{ backgroundColor: '#7265e6' }}>
                  {usuario ? usuario.substring(0, 2).toUpperCase() : ''}
                </Avatar>
                <Text strong>{usuario}</Text>
              </Space>
            </Dropdown>
          </Space>
        </Col>
      </Row>
    </Header>
  );
}