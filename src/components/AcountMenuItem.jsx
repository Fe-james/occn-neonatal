import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../theme';
import { useTheme } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from '@mui/icons-material/Logout';

const AcountMenuItem= ({title,onLogout,onHandleClick})=> {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [login,setLogin] =useState(false)

  const handleClick = (event) => {
    if(localStorage.getItem("token"))
      setAnchorEl(event.currentTarget);
    else
      navigate("/") 
    };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip arrow title={title?"acount setting":"login"}>
         <Avatar  style={{
                    backgroundColor:colors.greenSpace[400],   
                    cursor:"pointer",
                    fontFamily:"Merriweather Sans"   
                    }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      {title}
      </Avatar>
      </Tooltip>
     
      <Menu
        style={{marginTop:"4px"}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem sx={{fontFamily:"Merriweather Sans"}}  onClick={()=>{onHandleClick();handleClose()}}>
          Mi cuenta
            <SettingsOutlinedIcon fontSize='small' style={{marginLeft:"10px"}}/>
        </MenuItem>
        <MenuItem sx={{fontFamily:"Merriweather Sans"}} onClick={()=>{
            handleClose();
            onLogout(localStorage.removeItem("token"),localStorage.removeItem("admin"))
            navigate("/")
        }}>
          Salir
          <LogoutIcon  fontSize='small' style={{marginLeft:"36px"}}/>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AcountMenuItem;