import Main from '../util/Main'; 
import {Route, Routes } from 'react-router-dom';

// Rutas no definidas
import NotFound       from './AppIndex404';
import Login          from '../pages/login/Login'
// Modulos
import BS             from './routes/BS';
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  const route = Main._.union(BS);
  return (
      <Routes>
        <Route path="/" element={<Login />} />
          {route.map((ruta, indice) => {
            const isPrivate = ruta.private ?? true; // Por defecto todas privadas
            const element = isPrivate
              ? <ProtectedRoute>
                  <ruta.component />
                </ProtectedRoute>
              : <ruta.component />;
            return <Route key={indice} path={ruta.path} element={element} />;
          })}        
        <Route path="*"      element={<NotFound />} />        
      </Routes>
  )
};

export default AppRouter;