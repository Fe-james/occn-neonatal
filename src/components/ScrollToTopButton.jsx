import React, { useState,useEffect} from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab,Box } from '@mui/material';


const ScrollToTopButton = ({onClick,boxRef}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (boxRef.current) {
      if (boxRef.current.scrollTop > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (boxRef.current) {
        boxRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []); // Asegúrate de pasar un arreglo de dependencias vacío si solo quieres que esto se ejecute una vez.
  

  return (
    <>
    
    {isVisible &&  <Box 
        position="absolute" 
        zIndex={"10"} bottom="10%" right="5%">
            <Fab variant="circular" color={"success"}  size='small' onClick={onClick}>
              <KeyboardArrowUpIcon/>
            </Fab>
        </Box>}
    
    </>
 
  );
};

export default ScrollToTopButton;