import { useState } from "react";
import { getAllInfo } from "../services/getAllInfo";
import { useEffect } from "react";
import Form from "./Form";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const AllData=({mainRef,id,activateAdvice,desactivateAllData})=>{
  console.log(id);
  const [paciente, setPaciente] = useState([])
  const [loading, setLoading] = useState(true)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    useEffect(() => {
    setLoading(true);
    getAllInfo({id:id})
    .then(data => {
      setPaciente(data.data.paciente)
      console.log(data.data.paciente)
      setLoading(false)
    })
  },[id])
 
  return(
    <>
       {loading && <Box
          width={"100vw"}
          height={"100vh"}
          padding={"20px"}
       >
          
          <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem'}} width={"60%"}/>
          <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} width={"20%"}/>
          <Skeleton animation="wave" variant="rounded" width={"100%"} height={500} />
          <Box 
            display={"flex"} 
            alignItems={"center"} 
            padding={"10px"}
            justifyContent={"center"} 
            width={"100%"}

          >
            <CircularProgress size={"2em"}/>
          </Box>
          
        </Box> }
      {!loading &&
          <Form       
          onSubmit={"updatePaciente"}
          initialValues={paciente}
          title={`Informacion del paciente: ${paciente.nombre} ${paciente.apellidos}`}  
          subtitle={"Todos los datos del paciente"}
          id = {id}
          mainRef={mainRef}
          activateAdvice={activateAdvice}
          desactivateAllData={desactivateAllData}
          />
       
      }
    
     </>

  )

}



export default AllData;