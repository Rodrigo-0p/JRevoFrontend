import { Result, Button } from 'antd';
import{ useNavigate }            from 'react-router-dom';

const AppRouter404 = () => {
  const navegation = useNavigate()
  
  const redirecionar = ()=>{
    const session = sessionStorage.getItem("session");
    if (session)navegation("/dashboard");
    else navegation("/");
  }
  
  return (
    <Result
      status="404"
      title="404"
      subTitle="Esta pagina no existe"
      extra={<>
              <Button onClick={redirecionar} type="primary">Volver a inicio</Button> 
            </>}
      />
  );
};

export default AppRouter404;