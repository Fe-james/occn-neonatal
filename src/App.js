import {useState,useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import SideBar from "./scenes/global/Sidebar";
import Home from "./scenes/home";
import Team from "./scenes/controlUser";
import PacientesList from "./scenes/pacientesList";
import GraphDiagnosticoEgreso from "./scenes/pieChartDiagnoticoEgres";
import FormData from "./scenes/form";
import GraphResultadoAlta from "./scenes/pieChartResultadoAlta";
import Login from "./scenes/login";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { tokens } from "./theme";


const initialAuthState = {
  token: localStorage.getItem("token") || null,
  isAdmin: localStorage.getItem("admin") || null,
};

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  const colors = tokens(theme.palette.mode);
  const [autenticate, IsAuntenticate] = useState(initialAuthState);
  const mainRef = useRef(null);

  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    IsAuntenticate({
      token: localStorage.getItem("token") || null,
      isAdmin: localStorage.getItem("admin") || null,
    })

  }, [localStorage.getItem("token")]);
 
  const handleOnCollapsed= () => {
      setIsCollapsed(!isCollapsed);
  };

  const handleLogin = (token,admin)=> {
    IsAuntenticate({token:token,isAdmin:admin});                       
  }


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
     
        <div className="app">
          <main className="content" ref = {mainRef} style={{ overflowX: "hidden",backgroundColor: colors.blackGreenSpace[600]}}>

          {autenticate.token ?
          <>
              <SideBar isSidebar={isSidebar} isCollapsed={isCollapsed} onCollapsed = {handleOnCollapsed}/>
              <Topbar  setIsSidebar = {setIsSidebar} onCollapsed={handleOnCollapsed} onLogout = {handleLogin}/>
          </>
            : undefined
          }
          <Routes>  
              <Route path="/"  element={<Login onLogin={handleLogin} />} />
              {autenticate.token ?
                <>
                  {autenticate.isAdmin==="true"?
                      <>
                        <Route path="/controlUser" element={<Team />} />
                      
                      </>
                    :(
                      <>
                        <Route path="/controlUser"  element={<Login onLogin={handleLogin} />}/>
                      </>
                    )
                  }  
                  <Route path="/form" element={<FormData  mainRef = {mainRef}/>}/>  
                  <Route path="/home" element={<Home />}/>          
                  <Route path="/pacientesList" element={<PacientesList mainRef = {mainRef} />} />                   
                  <Route path="/graphResultadoAlta" element={<GraphResultadoAlta />} />
                  <Route path="/graphDiagEgreso"  element={<GraphDiagnosticoEgreso />} />
                </>:
                <>
                  <Route path="/form"  element={<Login onLogin={handleLogin} />} />
                  <Route path="/pacientesList" element={<Login onLogin={handleLogin} />}/>
                  <Route path="/graphResultadoAlta"  element={<Login onLogin={handleLogin} />}/>
                  <Route path="/graphDiagEgreso"  element={<Login onLogin={handleLogin} />} /> 
                </>
              }

            </Routes> 
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
