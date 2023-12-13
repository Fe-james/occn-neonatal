import { Box, Button, Popover, Stack,Modal } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";


export default function ConfirmationAdv(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)

  return (
    <div>
      
      <Modal
      open={props.popoverIsVisivle}

      >    
        <Popover
        anchorEl={props.anchorElement}
          title="Confirmar"
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={props.popoverIsVisivle}
          sx={{
            "& .MuiPaper-root":{
              boxShadow:`0px 0px 4px 0px  ${colors.greenSpace[600]} !important` ,
              bgcolor:`${colors.greenSpace[500]} !important`,
              padding:"20px"
             
            },
            "& .MuiPaper-root::after":{
              opacity:"0.5",
              filter:"blur(10px)"
            }
    
    
          }}
        > 
          <Stack direction={"row"} spacing={1} padding={2}>
            <div style={{ display: "flex", flexDirection: "column"}}>
              <p style={{fontFamily:"Merriweather Sans"}}>Esta seguro que desea Eliminar</p>
            <div style={{display:"flex",gap:"20px", justifyContent:"center", alignItems:"center"}}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(evt) => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    props.togglePopover()
                    props.delete();
                  }}
                >
                  si
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  onClick={(evt) => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    props.togglePopover();
                  }}
                >
                  no
                </Button>
              </div>
            </div>
            </Stack>
          
          

          </Popover>
      </Modal>
    </div>
  );
}
