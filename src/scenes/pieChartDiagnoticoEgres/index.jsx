import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import {graphicDiagEgreso} from "../../services/graphicDiagEgreso"
import { useState,useEffect} from "react";


const datos = [
  {
    id: "Defectos de la Pared",
    label: "Defectos de la Pared",
    value: 0,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "Artresia Esofágica",
    label: "Artresia Esofágica",
    value: 0,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "Artresias y estenosis instestinales",
    label: "Artresias y estenosis instestinales",
    value: 0,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "Defectos diafragmáticos",
    label: "Defectos diafragmáticos",
    value: 0,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "Otros",
    label: "Otros",
    value: 0,
    color: "hsl(344, 70%, 50%)",
  },
];


const GraphDiagnosticoEgreso = ({isDashboard,getAllPatiens}) => {
  const [graphicData,setGraphicData] = useState(datos)
  useEffect(()=>{
    graphicDiagEgreso().then((data)=>{
      let datosCopy = [...graphicData]
      datosCopy[0].value=data.data.graphicDiagnosticoEgreso.pacientes_defectos_pared
      datosCopy[1].value=data.data.graphicDiagnosticoEgreso.pacientes_atresia_esofagica
      datosCopy[2].value=data.data.graphicDiagnosticoEgreso.pacientes_atresias_y_estenosis_intestinales
      datosCopy[3].value=data.data.graphicDiagnosticoEgreso.pacientes_defectos_diafragmaticos
      datosCopy[4].value=data.data.graphicDiagnosticoEgreso.pacientes_otros
      getAllPatiens(data.data.graphicDiagnosticoEgreso.total_pacientes);
      setGraphicData(datosCopy);
    })

 
    },[])
  return (
    <>
       { !isDashboard ?
        <Box m="20px">
          <Header title="ANÁLISIS SEGÚN DIAGNÓSTICO DE EGRESO"/>
          <Box height={"78vh"}>
            <PieChart datos={graphicData} />
          </Box>
        </Box>:
         <PieChart datos={graphicData} isDashboard={isDashboard} />
      }
    </>

  );
};

export default GraphDiagnosticoEgreso;