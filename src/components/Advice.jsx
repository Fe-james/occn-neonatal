import { Box,Typography,Alert } from "@mui/material";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';




const Advice = ({title,type}) => {

  return(
      <Box sx={{ width: 500 }}>
        
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
        open={true}
        message="I love snacks"
        key={"left" + "top"} 
        autoHideDuration={3000}
      >
        <Alert variant="filled" color={type} severity={type} sx={{ width: '100%' }}>
            {title}
        </Alert>
      </Snackbar>
    </Box>
    )
};

export default Advice;