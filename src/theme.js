import { createContext, useState,useMemo } from "react";
import { createTheme } from "@mui/material/styles";



//colors design tokens
export const tokens = (mode) =>({

...(mode==="dark" 
? {
    grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414"
    },
    greenSpace: {
        100: "#cfd1d1",
        200: "#9fa3a3",
        300: "#6e7476",
        400: "#3e4648",
        500: "#0e181a",
        600: "#0b1315",
        700: "#080e10",
        800: "#060a0a",
        900: "#030505"
    },
    blackGreenSpace: {
        100: "#cdcfcf",
        200: "#9b9e9f",
        300: "#696e6f",
        400: "#373d3f",
        500: "#050d0f",
        600: "#040a0c",
        700: "#030809",
        800: "#020506",
        900: "#010303"
    },
    primary: {
        100: "#d0d1d5",
        200: "#a1a4ab",
        300: "#727681",
        400: "#434957",
        500: "#141b2d",
        600: "#101624",
        700: "#0c101b",
        800: "#080b12",
        900: "#040509"
    },

    greenAccent: {
        100: "#dbf5ee",
        200: "#b7ebde",
        300: "#94e2cd",
        400: "#70d8bd",
        500: "#4cceac",
        600: "#3da58a",
        700: "#2e7c67",
        800: "#1e5245",
        900: "#0f2922"
    },
    redAccent: {
        100: "#f8dcdb",
        200: "#f1b9b7",
        300: "#e99592",
        400: "#e2726e",
        500: "#db4f4a",
        600: "#af3f3b",
        700: "#832f2c",
        800: "#58201e",
        900: "#2c100f"
    },
    blueAccent: {
        100: "#c3c6fd",
        200: "#e1e2fe",
        300: "#a4a9fc",
        400: "#868dfb",
        500: "#6870fa",
        600: "#535ac8",
        700: "#3e4396",
        800: "#2a2d64",
        900: "#151632"
    },
}: {
    greenSpace: {
        100: "#030505",
        200: "#060a0a",
        300: "#080e10",
        400: "#0b1315",
        500: "#0e181a",
        600: "#3e4648",
        700: "#6e7476",
        800: "#9fa3a3",
        900: "#cfd1d1",
    },
    blackGreenSpace: {
        100: "#010303",
        200: "#020506",
        300: "#030809",
        400: "#040a0c",
        500: "#050d0f",
        600: "#373d3f",
        700: "#696e6f",
        800: "#9b9e9f",
        900: "#cdcfcf",
    },
    grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0"
    },
    primary: {
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#101624",
        500: "#141b2d",
        600: "#434957",
        700: "#727681",
        800: "#a1a4ab",
        900: "#d0d1d5"
    },
    greenAccent: {
        100: "#0f2922",
        200: "#1e5245",
        300: "#2e7c67",
        400: "#3da58a",
        500: "#4cceac",
        600: "#70d8bd",
        700: "#94e2cd",
        800: "#b7ebde",
        900: "#dbf5ee"
    },
    redAccent: {
        100: "#2c100f",
        200: "#58201e",
        300: "#832f2c",
        400: "#af3f3b",
        500: "#db4f4a",
        600: "#e2726e",
        700: "#e99592",
        800: "#f1b9b7",
        900: "#f8dcdb"
    },
    blueAccent: {
        100: "#151632",
        200: "#2a2d64",
        300: "#3e4396",
        400: "#535ac8",
        500: "#6870fa",
        600: "#868dfb",
        700: "#a4a9fc",
        800: "#c3c6fd",
        900: "#e1e2fe"
    },
}
)
});


//mui theme settings
export const themeSettings = (mode)=>{
    const colors = tokens(mode);

    return {
        palette :{
            mode:mode,
        ...(mode === 'dark'
        ? 
        {
            primary:{
                main:colors.primary[500],
            },
            secondary:{
              main:colors.greenAccent[500],  
            },
            nautral:{
                dark : colors.grey[700],
                main : colors.grey[500],
                light: colors.grey[100]
            },
            background : {
                default: colors.primary[500],
            }
        } : {
                primary:{
                    main:colors.primary[100],
                },
                secondary:{
                main:colors.greenAccent[500],  
                },
                nautral:{
                    dark : colors.grey[700],
                    main : colors.grey[500],
                    light: colors.grey[100]
                },
                background : {
                    default: "#fcfcfc",
                }
            }
        
        )
        
       },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(','),
            fontSize: 12,
            h1:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(','),
                fontSize: 40,
            },
            h2:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(','),
                fontSize: 32,
            },
            h3:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(','),
                fontSize: 24,
            },
            h4:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(','),
                fontSize: 20,
            },
            h5:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(','),
                fontSize: 16,
            },
            h6:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(','),
                fontSize: 14,
            },

       }
    }
};

//context for color mode

export const ColorModeContext = createContext({
    toggleColorMode: ()=>{}
});


export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        ()=>({
            toggleColorMode: ()=>
            setMode((prev)=>(prev ==='light'? 'dark':"light")),
        }),[]
    );

    const theme = useMemo(()=> createTheme(themeSettings(mode)),[mode])
    return [theme,colorMode];
}
