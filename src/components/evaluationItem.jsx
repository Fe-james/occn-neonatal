import { Box } from "@mui/material";
import { tokens } from "../theme";


const EvalualuationItem = ({evaluation}) => {
  
 return(
    <>
        {
        evaluation &&    
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            marginBottom={"20px"}
        >
             <span style={{fontFamily:"Merriweather Sans", 
                        color:`${evaluation==="E" || evaluation =="MB"?"#216B06"
                        :`${evaluation ==="B"?"#D9C205"
                        :`${evaluation==="R"?"#D97205":"#880015"}`}`}`}}   
               >Evaluacion</span>
            <Box
                width="50px"
                height="50px"
                borderRadius="50px"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}    
                fontSize="2em"
                textAlign="center"
                color = {evaluation==="E" || evaluation =="MB"?"#216B06"
                        :`${evaluation ==="B"?"#D9C205"
                        :`${evaluation==="R"?"#D97205":"#880015"}`}`}
                border={`2px solid  ${evaluation==="E" || evaluation =="MB"?"#216B06"
                :`${evaluation ==="B"?"#D9C205"
                :`${evaluation==="R"?"#D97205":"#880015"}`}`} `}
            >   
                <p style={{fontFamily:"Merriweather Sans"}}>{evaluation}</p>
            </Box>
           
        </Box>
        }
    </>
 

 )




}

export default EvalualuationItem;