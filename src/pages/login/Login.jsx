import * as React                     from 'react';
import { Form, Input, Button
        , Typography, message }       from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { initializeAnimation }        from './Animacion';
import { useNavigate }                from 'react-router-dom';
import { useAuth }                    from '../../context/AuthContext';
import Main                           from '../../util/Main';
import './styles/login.css';
const { Text } = Typography;

const user  = [{ required : true,
                 message  : 'Por favor ingresa tu usuario',
               },{
                 type     : 'string',
                 message  : 'Por favor ingresa un usuario válido',
              }]
const pass = [{ required: true,
                message: 'Por favor ingresa tu contraseña',
              },{ min: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              }]

const Login = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [form]      = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  React.useEffect(() => {
    // Inicializar la animación de fondo
    initializeAnimation();
  }, []);

  const onFinish = async (values) => {
    try {
      const urlValida = '/public/login'
      setLoading(true);
      await Main.Request(urlValida,'POST',values).then(async(resp)=>{
        if(resp && resp.data.usuario.length > 0){
          setLoading(false);
          // Aquí puedes llamar a tu función de autenticación
          login(resp.data);
          navigate("/dashboard");     
          await new Promise(resolve => setTimeout(resolve, 1000));      
          messageApi.success('Inicio de sesión exitoso');
        }
      })      
    } catch (error) {
      messageApi.error('Error al iniciar sesión');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    messageApi.error('Por favor, completa todos los campos correctamente');
  };

  return (
    <div className="login-page">
      { contextHolder }
      <canvas id="network-canvas"></canvas>
      
      <div className="login-container">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-icon">
              <span className="logo-j">J</span>
            </div>
            <span className="logo-text">Revo</span>
          </div>
          <Text className="login-subtitle">Inicia sesión para continuar</Text>
        </div>

        <div className="login-form">
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            size="large"
          >
            <Form.Item label="Usuario" name="usuario" rules={user} >
              <Input autoFocus prefix={<UserOutlined />} placeholder="" autoComplete="usuario"/>
            </Form.Item>

            <Form.Item label="Contraseña" name="password" rules={pass}>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block className="login-button">
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="login-footer">
          <div className="login-links">
            <Button type="link" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </Button>
            <div className="register-link">
              <Text>¿No tienes cuenta? </Text>
              <Button type="link">Regístrate</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;