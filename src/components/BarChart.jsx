import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import {useMediaQuery} from "@mui/material";
import { graphicDiagEgreso } from "../services/graphicDiagEgreso";
import { useState,useEffect } from "react";

  const data = [
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

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const [graphicData,setGraphicData] = useState(data)

  useEffect(()=>{
    graphicDiagEgreso().then((data)=>{
      let datosCopy = [...graphicData]
      datosCopy[0].value=data.data.graphicDiagnosticoEgreso.pacientes_defectos_pared
      datosCopy[1].value=data.data.graphicDiagnosticoEgreso.pacientes_atresia_esofagica
      datosCopy[2].value=data.data.graphicDiagnosticoEgreso.pacientes_atresias_y_estenosis_intestinales
      datosCopy[3].value=data.data.graphicDiagnosticoEgreso.pacientes_defectos_diafragmaticos
      datosCopy[4].value=data.data.graphicDiagnosticoEgreso.pacientes_otros
      setGraphicData(datosCopy);
    })

  },[])
  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
       
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
              fontFamily:" Merriweather Sans",
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
              fontFamily:" Merriweather Sans",
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
            fontFamily:" Merriweather Sans",
          },
        },
      }}
      // isInteractive={false}
      keys={["value"]}
      indexBy="id"
      margin={{ top: 30, right: 95,  bottom: !isNonMobile && isDashboard ? 20 : 60, left: !isNonMobile && isDashboard ? 40: 60 }}
      padding={0.5}
      animate={true}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={(!isNonMobile && isDashboard) ? null:{ 
        tickSize: 4,
        tickPadding: 5,
        tickRotation: isDashboard ? 38 : 0 && isNonMobile ? 0 : 38,
        legend: isDashboard ? undefined : "Resultado del alta",
        legendPosition: isNonMobile? "middle":"left",
        legendOffset: isNonMobile?35:43,
        
      }}
      axisLeft={(!isNonMobile && isDashboard) ?null: {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in municipio: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;