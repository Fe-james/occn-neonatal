import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";


export default function LoadingButton({loading,success}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
  const timer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Box sx={{ display:'flex',alignItems:'center',width:"100%",}}>
     
      <Box sx={{position:'relative', width:"100%",borderRadius:"10px !important",}}>
        <Button
          fullWidth
          variant={!success?"contained":"outlined"}
          sx={{
            bgcolor: colors.greenAccent[700],
            '&:hover': {
              bgcolor: colors.greenAccent[800], 
            },
            borderRadius:"8px" 
          }}
          disabled={loading}
          color='secondary'
          type='submit'
          
        >
          Accept
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
}
