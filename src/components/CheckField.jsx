import { Box, Typography } from "@mui/material";
import {Chip} from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import {useMediaQuery} from "@mui/material";

const CheckField = ({
  title,
  value,
  cantElments = [],
  checkedAll,
  onChange = [],
  validation,
  checkBoxNames = [],
}) => {
  const isNonMobile = useMediaQuery("(min-width:1010px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  return (
    <Box
      display={"flex"}
      alignItems="center"
      gridColumn={"span 4"}
      flexWrap={"wrap"}
      flexDirection={"column"}
      paddingBottom={"15px"}
      paddingTop={"15px"}
      boxShadow={` 0px 0px 1px 0px ${colors.greenSpace[300]}`}
      gap="10px"
      position="relative"
    
    >
      <Typography
        display={"flex"}
        style={{ flexBasis: "", alignItems: "center", gap: "10px",fontSize: "1em", fontFamily:"Merriweather Sans"}}
      >
                  {title}

      </Typography>
      {validation === true ? (
          <p
            style={{
              color: "red",
              display: value === "" ? "inline-block" : "none",
              fontSize: "0.8em",
              fontWeight: "bold",
              fontFamily:"Merriweather Sans"
            }}
          >
            campo obligatorio
          </p>
        ) : undefined}
      <Box
        display={"flex"}
        flexDirection={(!isNonMobile && checkedAll===true)?"column":"row"}
        gap="1em"
      >
        {cantElments.map((dato, index) => (
          <Box alignItems={"center"} key={index} textAlign={"center"}      
              >
          
            <Chip
              label={`${checkBoxNames.length > 0 ? checkBoxNames[index] : dato}`}
              variant={`${(checkedAll ===true? String(value).includes(dato): value === dato)?"filled":"outlined"}`}
              onClick={onChange[index]}
              color={"success"}
              style={{fontSize:"1.2em",fontFamily:"Merriweather Sans"}}
            />
          </Box>
        ))}

      </Box>
      
     

    </Box>
  );
};

export default CheckField;
