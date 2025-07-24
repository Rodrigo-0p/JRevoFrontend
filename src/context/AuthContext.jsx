import * as React      from "react";
import { useLocation
      ,  useNavigate } from "react-router-dom";
import useIdleTimeout  from "../components/hook/useIdleTimeout";
const AuthContext       = React.createContext();

export const AuthProvider = ({ children }) => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const [usuario  , setUser    ] = React.useState(null);
  const [nombre   , setNombre  ] = React.useState(null);
  const [menus    , setMenus   ] = React.useState([]);
  const [permisos , setPermisos] = React.useState({});
  const [loading  , setLoading ] = React.useState(true);

  // Restaurar usuario si ya inició sesión antes
  React.useEffect(() => {
    const session = sessionStorage.getItem("session");
    if (session) {
      const data = JSON.parse(session);
      setUser(data.usuario);
      setNombre(data.nombre);
      setMenus(data.menus);
      setPermisos(data.permisos);
      if (location.pathname === '/') navigate('/dashboard', { replace: true });
    }
    setLoading(false);
  }, []);

  const login     = ({ usuario, nombre, menus, permisos }) => {
    const session =  { usuario, nombre, menus, permisos };
    sessionStorage.setItem("session", JSON.stringify(session));
    setUser(usuario);
    setNombre(nombre)
    setMenus(menus);
    setPermisos(permisos);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    setMenus([]);
    setNombre([])
    setPermisos({});
    navigate("/");
  };
  
  // Hook de inactividad: 30 min
  useIdleTimeout(logout, 30 * 60 * 1000);

  return (
    <AuthContext.Provider value={{ usuario, nombre, menus, permisos, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
