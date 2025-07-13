import * as React from 'react';
import { Button, Typography } from "antd";
import { useAuth } from "../../context/AuthContext";

const Dashboard = React.memo(() => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 32 }}>
      <Typography.Title level={2}>Bienvenido, {user}</Typography.Title>
      <Typography.Paragraph>Este es tu panel principal del sistema ERP.</Typography.Paragraph>
      <Button danger onClick={logout}>Cerrar sesión</Button>
    </div>
  );
});

export default Dashboard;