import { Box, Typography, useTheme,Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import Header from "../../components/Header";
import { useState,useEffect } from "react";
import CreateUser from "../../components/CreateUser";
import CircularProgress from '@mui/material/CircularProgress';
import { getUser } from "../../services/getUser";
import { deleteUser } from "../../services/deleteUser";
import {useMediaQuery} from "@mui/material";
import ConfirmationAdv from "../../components/ConfirmationAdvice";
import { useRef } from "react";
import Advice from "../../components/Advice";


const ControlUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [createUsers,activeCreateUser] = useState(false);
  const [userData,setUserData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [popoverIsVisible,showPopover] = useState(false);
  const deleteRef = useRef(null);
  const [adviceStatus,setAdviceStatus]= useState(false)
  
  const handleOnAdviceStatus = () => {
    setTimeout(()=>setAdviceStatus(true),300) ;
    setTimeout(()=>setAdviceStatus(false),2500)
  }

  const handleOnDataChange=()=>{
    setLoading(true)
    getUser()
    .then(data => {
      setLoading(true)
      setUserData(data.data.users.edges)
      setLoading(false)
    })
  }

    useEffect(() => {
      handleOnDataChange();
    },[])




  const handleOnClick = () => {
    activeCreateUser(!createUsers);
  };


  const columns = [

    {
      field: "username",
      headerName: "Nombre",
      flex: 0.5,
      minWidth:100,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Correo",
      flex: 1,
      minWidth:100,
      cellClassName: "name-column--cell",
    },

    {
      field: "isStaff",
      headerName: "Nivel de Acceso",
      minWidth:120,
      flex: 1,
      renderCell: ({ row: { isStaff } }) => {
        return (
          <Box
            width="100px"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isStaff
                ? colors.greenSpace[900]
                : colors.greenSpace[600]
            }
            borderRadius="4px"
          >
            {isStaff && <AdminPanelSettingsOutlinedIcon />}
            {!isStaff  && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {isStaff?"Admin":"User"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      flex: 1,
      minWidth:120,
      renderCell: (params) => {
        return (
          <Box
            width="60px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.blackGreenSpace[400]}
            borderRadius="4px"
            sx={{"& :hover":{backgroundColor:colors.blackGreenSpace[500]}}}
          >
            <Button fullWidth
           
            onClick={()=>{
                showPopover(true)
              }}>
              <DeleteOutlineOutlined color="secondary" />
              {popoverIsVisible && (
                        <ConfirmationAdv
                          popoverIsVisivle={popoverIsVisible}
                          togglePopover={() => showPopover(!popoverIsVisible)}
                          delete={() => {
                            deleteUser({ id: params.row.id }).then(() =>{
                              handleOnDataChange();
                              handleOnAdviceStatus()
                            })
                          }}
                          anchorElement={deleteRef.current}

                        />
                      )}
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="10px" position="relative">
      <Header title="CONTROL DE USUARIOS" />
      <Box
      ref={deleteRef}
        m="10px 0 0 0"
        height="72vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            boxShadow:`0px  0px 1px 0px ${colors.greenSpace[100]}`,
            fontFamily:"Merriweather Sans"
          },
               
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenSpace[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.greenSpace[500],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenSpace[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >  
       {loading && <div className = "loader-container"><CircularProgress color="success"/></div>}
          <Box display="flex" 
            position={isNonMobile?"absolute":"flex"} 
            bottom="-50px" right="0px"
            alignItems={"center"} 
            alignSelf={"flex-start"}
            justifyContent={"center"}
            borderRadius={"5px"}
            padding={"5px"}
            >   
            <Button color="secondary" variant="outlined" style={{display:"flex", gap:"10px",border:"none"}} 
            onClick={handleOnClick}>
            <Typography fontFamily="Merriweather Sans" color={colors.greenAccent[400]}>Create User</Typography>          
            </Button>
          </Box>
          <DataGrid 
          disableRowSelectionOnClick
          rows={userData.map(user => user.node)} columns={columns} />
      </Box>
      {
        createUsers && <CreateUser onCreate={handleOnDataChange} onClick={handleOnClick} activeAdvice={handleOnAdviceStatus}/>
      }
      {
        adviceStatus && <Advice title={"Acción completada"} type={"success"}/>
      }
    </Box>
  );
};

export default ControlUser;