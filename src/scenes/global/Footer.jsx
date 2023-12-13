import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../../theme";



const Footer =()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <Box
            display={"flex"}
            width={"100%"}
            height={"200px"}
            minWidth={"100%"}
            backgroundColor={colors.blackGreenSpace[900]}
            zIndex={1000}
    
           
        >

        </Box>
    )

}


export default Footer;