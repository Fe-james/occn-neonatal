import {Box, IconButton,useTheme,} from '@mui/material';
import { useState, } from 'react';
import {tokens } from '../../theme';
import AcountMenuItem from '../../components/AcountMenuItem';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AcountSetting from '../../components/AcountSetting';
import logo from "../../img/OCCN2.svg";
import { useNavigate } from "react-router-dom";


const Topbar=({onLogout,onCollapsed})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [activeAcountSetting,setActiveAcountSetting] = useState(false)
    const navigate = useNavigate();

    const handleOnSettingItem = () =>{
        setActiveAcountSetting(!activeAcountSetting);
    }

    return (
        <Box display= "flex" minHeight={"50px"}  p={1} position={"relative"}
            boxShadow={`0px  0px 1px 0px ${colors.greenSpace[100]}`}
            
            sx = {{
                "& .MuiBox-root":{
                gap:`10px`
            },
            }}
        >
            {/* Menu Button */}
          
                <Box   display="flex" 
                    backgroundColor={colors.greenSpace[600]}
                    borderRadius="3px"
                    height={"100%"}
                > 
                
                    <IconButton style={{borderRadius:"0px"}} type="button" onClick={()=>{onCollapsed()}}sx={{p:1}} >
                     <MenuOutlinedIcon style={{borderRadius:"none"}}/>
                    </IconButton>
                </Box>

                <Box marginLeft={"15px"} width="40px" height="40px"             
                >
                    <div 
                    onClick={()=>{
                        navigate("/home")
                    }}
                      style={{
                        backgroundImage: `url(${logo})`,
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        backgroundSize: "60%",
                        backgroundRepeat: "no-repeat",
                        cursor:"pointer",
                        backgroundPosition: "center",        
                      }}
                    
                    ></div>
                  </Box>

        
     
            
            {/* Icons */}
           <Box display='flex' 
           position={"absolute"}
            right={"6px"}
            top={"6px"}
           >
                
             <AcountMenuItem onHandleClick={handleOnSettingItem} title={localStorage.getItem("token")?(localStorage.getItem("admin")==="true"?"AD":"U"):null} onLogout={onLogout}/>
            {
                activeAcountSetting && <AcountSetting open={activeAcountSetting} onClose={handleOnSettingItem}/>
            }
                
           </Box>

        </Box>
    )
}



export default  Topbar;