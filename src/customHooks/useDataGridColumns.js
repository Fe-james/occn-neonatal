
import {useTheme,} from "@mui/material";
import {Typography, Button} from "@mui/material";
import { tokens } from "../theme";
import { formatDate } from '../utils/formatDate';
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";
import {Box} from "@mui/material";



export function useDataGridColumns({activateAllData,setID,deletePatient}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

 

    const columns = [
        { field: "nombre", 
          headerName: "Nombre del neonato",
          minWidth:100,
          flex: 0.7
        },
        {
          field: "nombreDeLaMadre",
          headerName: "Nombre de la madre",
          flex: 1,
          minWidth:120,
          cellClassName: "name-column--cell",
        },
        {
          field: "municipio",
          headerName: "Municipio",
          minWidth:100,
          flex: 0.8,
        },
        {
          field: "provincia",
          headerName: "Provincia",
          minWidth:100,
          flex: 1,
        },
        {
          field:"fecha",
          headerName: "Fecha",
          minWidth:100,
          flex: 0.6,
          renderCell: (params) => (
            <Typography variant="subtitle2" color="secondary">
              {formatDate(params.row.fecha)}
            </Typography>
          ),
        },
        {
          field: "diagnosticoEgreso",
          headerName: "Diagnóstico al egreso",
          minWidth:100,
          flex: 1,
        },
        {
          field: "id",
          headerName: "Todo la info",
          type: "button",
          minWidth:100,
          flex: 0.5,
          filterable: false,
          renderCell: (params) => (
            <Box
              bgcolor={colors.greenAccent[700]}
              borderRadius={"4px"}
              sx={{"& :hover":{backgroundColor:colors.greenAccent[800]}}}
            >
              <Button fullWidth
                onClick={() => {
                  setID(params.row.id);
                  activateAllData()}}
                >
                  <Visibility color="primary"/>
              </Button>
            </Box>

            ) 
        },
        {
          field: "eliminar",
          headerName: "Eliminar",
          type: "button",
          minWidth:100,
          flex: 0.5,
          filterable: false,
          renderCell: (params) => (
            <Box
              bgcolor={colors.blackGreenSpace[400]}
              borderRadius={"4px"}
              sx={{"& :hover":{backgroundColor:colors.blackGreenSpace[500]}}}
            >
                <Button fullWidth  
                onClick={() => {
                  deletePatient(params.row.id);
                }}
                >
                <DeleteOutlineOutlined color="success"/>
              </Button>
            </Box>

            ) 
        },
    ];
    
    return {columns}
}