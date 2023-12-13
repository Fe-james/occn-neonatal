import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";



const PieChart = ({datos,isDashboard = false}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  
  return (
    <ResponsivePie
      
      transitionMode="startAngle"
      data={datos?datos:[]}
      theme={{
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
      margin={{ top: isDashboard ? 40 : 15, right: 80,  bottom: isDashboard ? !isNonMobile ? 10 :60 :80, left: 40}}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={0}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={isDashboard?false:true}
      arcLabelsRadiusOffset={0.5}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      arcLinkLabel={"none"}
     
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={ isDashboard && !isNonMobile ? undefined:[
        {
          
          padding: 20,
          anchor: "bottom",
          direction:"column",
          justify: false,
          translateX:isNonMobile ? 200:0,
          translateY: isDashboard? 80: 100,
          itemsSpacing: 2,
          itemWidth: 150,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 10,
          symbolShape: "circle",
          effects: [

            {
              
              on: "hover",
              style: {
                itemTextColor: colors.greenAccent[700],
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;