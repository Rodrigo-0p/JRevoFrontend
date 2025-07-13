import AppRouter          from "./router/AppIndex";
import { ConfigProvider } from 'antd';
import esES               from 'antd/locale/es_ES';
import { AuthProvider }   from "./context/AuthContext";
import { BrowserRouter }  from "react-router-dom";
import './assets/styles/main.css';
const customTheme = {
  // token: {
  //   colorPrimary      : '#667eea',
  //   colorPrimaryHover : '#5a67d8',
  //   colorInfo         : '#667eea',
  //   borderRadius      : 8,
  //   fontFamily        : "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  // },
  // components: {
  //   Button: {
  //     borderRadius: 8,
  //     fontWeight: 600,
  //   },
  //   Input: {
  //     borderRadius: 8,
  //     paddingBlock: 12,
  //   },
  //   Form: {
  //     itemMarginBottom: 20,
  //   },
  // },
  hashed: false 
};
const App = ()=> {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ConfigProvider locale={esES} theme={customTheme}>
          <AppRouter />
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>     
  );
}

export default App;
