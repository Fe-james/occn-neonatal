import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import GraphDiagnosticoEgreso from "../pieChartDiagnoticoEgres"
import GraphResuladoAlta from "../pieChartResultadoAlta";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./index.css"
import { useEffect, useRef } from "react";
import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';


const Home = () => {
  const isNonMobile = useMediaQuery("(min-width:750px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const boxGraphicOver = useRef(null); 
  const [boxActive1,setBoxActive1] = useState(false);
  const [boxActive2,setBoxActive2] = useState(false);
  const navigate = useNavigate()
  const [allPatiens,setAllPatiens]= useState(0)
  const [mortalityRate,setMortalityRate]= useState(0)


  const getPatiens = (total) => {
      setAllPatiens(total);
  }

  const getMortalityRate = (rate) => {
      setMortalityRate(rate);
  }



  return (
    <Box
      m="10px"  
      display={"flex"}
      gap={"10px"}
      position={"relative"}
      flexWrap={"wrap"}
      height={"87vh"}
      alignItems={"center"}
      justifyContent={"center"}
      alignContent={"center"}
  
    >
      <Box
        display="flex"
        width={"100%"}
        height={"100%"}
        maxWidth={"1400px"}
        gap={"10px"}
        flexDirection={"column"}
        position={"relative"}
      
      >

        <Box  width={"100%"} position={"relative"} top={"0px"} left={"0px"}>
          <Header title="HOME" />
        </Box>
        <Box className='fondo_desenfocado'></Box>
        <Box
          width={"100%"}
          height={"50%"}
          display={"flex"}
          flexDirection={isNonMobile?"row":"column"}
          gap={"10px"}
          position={"relative"}
      

        >
          <Box
            width={isNonMobile?"50%":"100%"}
            height={isNonMobile?"100%":"48%"}
            boxShadow={`0px 0px 2px 0px ${colors.greenSpace[100]}`}
            position={"relative"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"8px"}
            boxSizing={"border-box"}   
            maxWidth={"695px"}
            zIndex={1}
            >
              <h5 style={{position:"absolute", top:"-10px",fontFamily:"Merriweather Sans"}}>Análisis según Diagnóstico de Egreso</h5>
              <GraphDiagnosticoEgreso getAllPatiens={getPatiens} isDashboard={true}/>
              
            </Box>

          <Box
            width={isNonMobile?"50%":"100%"}
            height={isNonMobile?"100%":"48%"}
            boxShadow={`0px 0px 2px 0px ${colors.greenSpace[100]}`}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
            borderRadius={"8px"}
            boxSizing={"border-box"}
            maxWidth={"695px"}
          >
            <h5 style={{position:"absolute", top:"-10px",fontFamily:"Merriweather Sans"}}>Análisis según relustado del alta</h5>
              <GraphResuladoAlta mortalityRate={getMortalityRate} isDashboard={true}/>
          </Box>
        </Box>

        {/* {Caja que esta por encima de las graficas} */}
        <Box
          width={"100%"}
          height={"50%"}
          display={"flex"}
          flexDirection={isNonMobile?"row":"column"}
          gap={"10px"}
          position={"absolute"}
          top={"48px"} 
        >
          <Box
            ref = {boxGraphicOver}
            width={isNonMobile?"50%":"100%"}
            height={isNonMobile?"100%":"48%"}            
            position={"relative"}
            display={"flex"}
            flexDirection={"column"}
            borderRadius={"8px"}
            boxSizing={"border-box"}   
            sx={{cursor:"pointer",":hover":{bgcolor:`rgb(55, 61, 63,0.8)`}}} 
            zIndex={2} 
            maxWidth={"695px"}
            textAlign={"center"}
            justifyContent={"center"}
            alignItems={"center"}  
            onClick={()=>{
              navigate("/graphDiagEgreso")
            }}
            onMouseEnter={()=>{
              setBoxActive1(true)

            }}

            onMouseLeave={() => setBoxActive1(false)}
          >
            {boxActive1 &&
              <>
                <h2 style={{fontFamily:"Merriweather Sans", color:colors.greenAccent[300]}} >Ver Grafico</h2>
                <PieChartOutlineIcon style={{color:colors.greenAccent[300]}}  fontSize="large"/>
              </>
            }
          </Box>
          <Box
            ref = {boxGraphicOver}
            width={isNonMobile?"50%":"100%"}
            height={isNonMobile?"100%":"48.5%"}            
            position={"relative"}
            display={"flex"}
            flexDirection={"column"}
            borderRadius={"8px"}
            boxSizing={"border-box"}   
            sx={{cursor:"pointer",":hover":{bgcolor:`rgb(55, 61, 63,0.8)`}}}
            textAlign={"center"}
            justifyContent={"center"}
            alignItems={"center"}  
            zIndex={2} 
            maxWidth={"695px"}
            onClick={()=>{
              navigate("/graphResultadoAlta")
            }}

            onMouseEnter={()=>{
              setBoxActive2(true)

            }}

            onMouseLeave={() => setBoxActive2(false)}
          >
             {boxActive2 &&
                <>
                  <h2 style={{fontFamily:"Merriweather Sans", color:colors.greenAccent[300]}} >Ver Grafico</h2>
                  <PieChartOutlineIcon  style={{color:colors.greenAccent[300]}}  fontSize="large"/>
                </>
              }
          </Box>

        </Box>
        {/* {--------} */}
          
        <Box
            width={"100%"}
            height={"50%"}
            display={"flex"}
            flexDirection={isNonMobile?"row":"column"}
            gap={"10px"}
            sx={{msUserSelect:"none"}}
          >
            <Box
              width={isNonMobile?"70%":"100%"}
              height={isNonMobile?"100%":"50%"}
              sx={{msUserSelect:"none"}}
              boxShadow={`0px 0px 2px 0px ${colors.greenSpace[100]}`}
              position={"relative"}
              borderRadius={"8px"}
            >
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              width={isNonMobile?"30%":"100%"}
              height={isNonMobile?"100%":"50%"}
              gap={"8px"}
              borderRadius={"8px"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                width={"100%"}
                height={"49%"}
                boxShadow={`0px 0px 2px 0px ${colors.greenSpace[100]}`}
                borderRadius={"8px"}
                padding={'0px 0px 0px 35px'}
                position={"relative"}
                flexWrap={"wrap"}
                gap={"10px"}
              
              >    
                <h2 style={{fontFamily:"Merriweather Sans",fontSize:isNonMobile?"15px":"8px",margin:isNonMobile?"20px 0px 0px 0px":"2px 0px 0px 0px"}}>Total de pacientes </h2>
                <p style={{fontFamily:"Merriweather Sans",fontSize:isNonMobile?"30px":"18px",display:"block",margin:"0px"}}>{allPatiens}</p>
                <Box
                  position= {"absolute"}
                  top={"37%"}
                  right={"30px"}
                ><ContactsOutlinedIcon fontSize="large" /></Box>
                
              </Box>

              <Box
                display={"flex"}
                flexDirection={"column"}
                width={"100%"}
                height={"49%"}
                boxShadow={`0px 0px 2px 0px ${colors.greenSpace[100]}`}
                borderRadius={"8px"}
                padding={'0px 0px 0px 35px'}
                position={"relative"}
                flexWrap={"wrap"}
                gap={"10px"}
                
            
              >
                <h2 style={{fontFamily:"Merriweather Sans",fontSize:isNonMobile?"15px":"8px",margin:isNonMobile?"20px 0px 0px 0px":"2px 0px 0px 0px"}}  >Taza de mortalidad</h2>
                <p style={{fontFamily:"Merriweather Sans",fontSize:isNonMobile?"30px":"18px",display:"block",margin:"0px"}}>{`${Math.round((mortalityRate + Number.EPSILON) * 100) / 100}%`}</p>

                <Box
                  position= {"absolute"}
                  top={"37%"}
                  right={"30px"}
                  
                ><HeartBrokenIcon fontSize="large"  /></Box>
                

              </Box>


            </Box>
        </Box>

      </Box>
      

    </Box>

  );
};

export default Home;
