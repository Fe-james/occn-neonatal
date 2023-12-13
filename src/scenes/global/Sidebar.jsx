import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import logo from "../../img/OCCN2.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {Modal} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';

const Item = ({ title, to, icon, selected, setSelected,onItemClick,}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
          fontFamily:"Merriweather Sans"
        }}
        onClick={() => {
          setSelected(title);
          onItemClick();
          navigate(to);
        }}
        icon={icon}
      >
        <Typography fontFamily="Merriweather Sans" >{title}</Typography>
      </MenuItem>
  );
};

const SideBar = ({isCollapsed,onCollapsed,isAdmin}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Home");
 
  useEffect(()=>{

 },[isAdmin])


  
  const handleOnClickItem = () => {
    if(!isCollapsed)
      onCollapsed();
  }
  return (
    <>
      <Modal
        open={!isCollapsed}
        onClose={onCollapsed}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={!isCollapsed}>
          <Box></Box>
        </Fade>
        
      </Modal>
      <Box
        position={"fixed"}    
        left={isCollapsed?"-82px":undefined}
        zIndex={isCollapsed?50:10000}
        
        sx={{
          "& .ps-sidebar-root":{
            width:"150px",
            borderRight: "none !important",
            boxShadow:`0px 0px 1px 0px ${colors.greenSpace[100]}`,
            borderRadius:"0px 15px 15px 0px",
          
          },
            
          "& .sidebar-inner": {
            background: `${colors.grey[100]} !important`,
          },
  
          "& .ps-menu-root": {
            backgroundColor: `${colors.greenSpace[600]} !important`,
            margin:"10px",
          },

          "& .ps-menu-button": {
            height:"35px !important",

          },
          "& .ps-menu-button:hover": {
            backgroundColor: `${colors.greenSpace[500]} !important`,
            borderRadius:"8px",
            boxShadow:`0px 0px 1px 0px ${colors.blackGreenSpace[900]}`,
            
          },

          "& .icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .inner-item": {
            padding: "5px px 5px 20px !important",
          },
          "a:hover": {
            color: `${colors.greenAccent[700]} !important`,
            backgroundColor:"transparent !important",
          },

          "& .ps-active": {
            color: `${colors.greenAccent[400]} !important`,
          },
          "& .ps-sidebar-container": {
            overflowY: "hidden !important",
            backgroundColor: `${colors.greenSpace[600]} !important`,
            borderRadius:"0px 15px 15px 0px",
            
          },
          "& .css-pxpt32": {
            paddingTop: "25px",
            
          },



        }}
      >

        <Sidebar collapsed={isCollapsed} 
          width="300px"
        >
          <Menu
            iconShape="square"
            style={{ height: "97vh", }}
          >
            {/* LOGO AND MENU ICON */}
           
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                  sx={{
                    "& .MuiButtonBase-root:hover": {
                        bgcolor: colors.greenAccent[600],
                          
                    },
                    "& .MuiButtonBase-root": {
                        borderRadius: "3px !important",
                        opacity:0.4
                    }
                }}
                >
                  <Box
                    marginTop="25px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection={"column"}
                  >
                    <Box width="50px" height="50px">
                      <div
                        style={{
                          backgroundImage: `url(${logo})`,
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          backgroundSize: "60%",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",        
                        }}
                      
                      ></div>
                    </Box>
        
                  </Box>
                  <IconButton onClick={() => {onCollapsed()}}>
                    <CloseRoundedIcon fontSize="small"/>
                  </IconButton>
                </Box>
        
           

            <Box paddingTop={"40px"}>
            {  
             localStorage.getItem("token") &&
              <>
            
                <Item
                  title="Home"
                  to="/home"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  onItemClick={handleOnClickItem}
                />
              
                <Divider variant='middle' style={{marginTop:"5px",marginBottom:"5px"}}/>
                
                <Item
                  title="Datos de los Pacientes"
                  to="/pacientesList"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  onItemClick={handleOnClickItem}
                />

                <Item
                  title="Ingresar Paciente"
                  to="/form"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  onItemClick={handleOnClickItem}
                />

                  <Divider variant='middle'  style={{marginTop:"5px",marginBottom:"5px"}}/>

                <Item
                  title="Gráfico Resultado del Alta"
                  to="/graphResultadoAlta"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  onItemClick={handleOnClickItem}
                />

                <Item
                  title="Gráfico Diagnóstico Egreso" 
                  to="/graphDiagEgreso"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  onItemClick={handleOnClickItem}
                />

                <Divider variant='middle'  style={{marginTop:"5px",marginBottom:"5px"}}/>
              </> 
            }
    
            {
              localStorage.getItem("admin") === "true" 
              &&
              <>
                <Item
                  title="Control de Usuarios"
                  to="/controlUser"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  style={{ paddingLeft: "20px" }}
                  onItemClick={handleOnClickItem}
                />
              </>
            }
            </Box>
          </Menu>
        </Sidebar>
  
      </Box>
    </>
    
  );
};

export default SideBar;
