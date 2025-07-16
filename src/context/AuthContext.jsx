import * as React      from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [usuario  , setUser    ] = React.useState(null);
  const [nombre   , setNombre  ] = React.useState(null);
  const [menus    , setMenus   ] = React.useState([]);
  const [permisos , setPermisos] = React.useState({});

  // Restaurar usuario si ya inició sesión antes
  React.useEffect(() => {
    const session = sessionStorage.getItem("session");
    if (session) {
      const data = JSON.parse(session);
      setUser(data.usuario);
      setMenus(data.menus);
      setPermisos(data.permisos);
    }
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

  return (
    <AuthContext.Provider value={{ usuario, nombre, menus, permisos, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
