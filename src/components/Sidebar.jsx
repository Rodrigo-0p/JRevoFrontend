import * as React from 'react';
import { Menu, Typography,Layout } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ClusterOutlined,
  LineChartOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  UserOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import { initializeAnimation  }   from '../components/hook/Animacion';
import { useAuth  } from '../context/AuthContext';

const { Title, Text } = Typography;
const { Sider }       = Layout;


const iconMap = {
  UserOutlined         : <UserOutlined />,
  DatabaseOutlined     : <DatabaseOutlined />,
  TeamOutlined         : <TeamOutlined />,
  HomeOutlined         : <HomeOutlined />,
  FileTextOutlined     : <FileTextOutlined />,
  LineChartOutlined    : <LineChartOutlined />,
  ShoppingCartOutlined : <ShoppingCartOutlined />,
  AppstoreOutlined     : <AppstoreOutlined />,
  ClusterOutlined      : <ClusterOutlined/>
};

// const items = [
//   { key: '/dashboard', icon: <HomeOutlined />, label: 'Dashboard' },
//   { key: '/empresas', icon: <AppstoreOutlined />, label: 'Empresas & Sucursales' },
//   { key: '/usuarios', icon: <TeamOutlined />, label: 'Usuarios & Permisos' },
//   { key: '/inventario', icon: <ClusterOutlined />, label: 'Inventario & Stock' },
//   { key: '/ventas', icon: <LineChartOutlined />, label: 'Ventas' },
//   { key: '/compras', icon: <ShoppingCartOutlined />, label: 'Compras' },
//   { key: '/reportes', icon: <FileTextOutlined />, label: 'Reportes' },
// ];

export default function Sidebar() {

  const { menus }   = useAuth();
  const location    = useLocation();
  const selectedKey = `/${location.pathname.split('/')[1]}` || '/dashboard';
  const [itemsMenu, setItemsMenu] = React.useState([]);

  React.useEffect(()=>{
    initializeAnimation(`sider`)
    setItemsMenu(menus || []);
  },[])


  return (
    <Sider 
      width={250} 
      breakpoint="lg"
      // style={{ background: '#001529' }}
      >
      <canvas className="sider-canvas"  id="network-canvas_sider"/>

      <div className="sider-content" >
        <div style={{ padding: 24, textAlign: 'left' }}>
          <Title level={2} style={{ color: '#fff', margin: 0 }}>
            <div className="logo-container-dashboard">
              <div className="logo-icon-dashboard">
                <span className="logo-j-dashboard">J</span>
              </div>
              <span className="logo-text-dashboard">Revo</span>
            </div>
            {/* JRevo */}
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.65)' }}>Sistema de Gestión Empresarial</Text>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ flex: 1, borderRight: 0 }}
        >
         {/* Dashboard fijo */}
          <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Menu.Item>

          {/* Menús dinámicos */}
          {itemsMenu.map((item) => (
            <Menu.Item key={`/${item.nombre.toLowerCase()}`} icon={iconMap[item.icono]}>
              <NavLink to={`/${item.nombre.toLowerCase()}`}>{item.nombre}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Sider>
  );
}
