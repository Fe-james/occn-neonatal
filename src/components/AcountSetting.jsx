import {Box,TextField,IconButton} from "@mui/material"
import { tokens } from "../theme"
import { useTheme} from "@mui/material"
import Header from "./Header"
import { Formik } from "formik"
import * as yup from "yup";
import {Modal} from "@mui/material";
import PasswordIcon from '@mui/icons-material/Password';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { changeUserPassword } from "../services/changeUserPassword"
import {Typography} from "@mui/material"
import {useMediaQuery} from "@mui/material"
import Advice from "./Advice";
import { useState } from "react"



const AcountSetting = ({open,onClose})=>{
    const isNonMobile = useMediaQuery("(min-width:700px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const formData= {
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",
      }
    const [advice,setAdvice] = useState(false)

    const checkoutSchema = yup.object().shape({
        newPassword: yup.string().required("campo obligatorio"),
        oldPassword: yup.string().required("campo obligatorio"),
        confirmPassword: yup.string().required("campo obligatorio").matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
            "La contraseña debe  contener 8 caracteres como mínimo \n al menos una mayúscula,  \n una  minúscula y un  \n número.")
    });

    const handleOnSubmit = (values,{setFieldValue,setFieldError}) => {
        if(values.oldPassword === values.newPassword){
              setFieldError("newPassword","La nueva contraseña no puede coincidir con la anterior")
        }
        if(values.confirmPassword !== values.newPassword){
            setFieldError("newPassword","Las  contraseñas no coinciden ")
            setFieldError("confirmPassword","Las  contraseñas no coinciden ")
        }
        else{
            changeUserPassword({oldPassword: values.oldPassword,
                newPassword1: values.newPassword,
                newPassword2: values.confirmPassword}).then((resp) => {
            console.log(resp.data.passwordChange)

            if(resp.data.passwordChange.success === false)
                setFieldError("newPassword","Contraseña muy común")
            else{
                setFieldValue("oldPassword", "")
                setFieldValue("newPassword", "")
                setFieldValue("confirmPassword", "")
                setAdvice(true);
                setTimeout(() => setAdvice(false), 2000);
            }


            }).then((result)=>{
                console.log(result)
            

            })
        }

    }

    return(
       <>
           {
            localStorage.getItem('token')!==null?   
            <Modal
                open={open}
                
            >

                <Box bgcolor={colors.blackGreenSpace[700]}
                   display={"flex"}
                   alignItems={"center"}
                   flexDirection={isNonMobile?"row":"column"}
                   justifyContent={"center"}
                   width={"100%"}
                   height={"100%"}
                   position = {"relative"}
                   alignSelf="center"
                   whiteSpace={"pre-line"}
                        sx={{
                            "& .MuiButtonBase-root:hover": {
                                bgcolor: colors.greenAccent[700],
                                
                            },
                            "& .MuiButtonBase-root": {
                                borderRadius: "0px !important"
                            },
                            "& .MuiButtonBase-root": {
                                borderRadius: "0px !important"
                            },
                            "& .MuiInput-root:after":{
                              borderBottom: `2px solid ${colors.greenAccent[500]} !important`
                            },
            
                          "& .MuiFormLabel-root":{
                              opacity:"0.3",
                              fontFamily:"Merriweather Sans"
                          },
              
                          "& .Mui-focused":{
                              opacity:"1 !important",
                              color:`${colors.greenAccent[500]} !important`,
                            },
                          "& .MuiInputBase-input":{
                              color:`${colors.greenAccent[100]} !important`,
                              fontFamily:"Merriweather Sans"
              
                          },

                        }}
                >
                {
                    
                    advice && 
                    <Box position={"absolute"}>
                        <Advice title= "Contraseña cambiada con éxito"  type="success" />
                    </Box>
                  
                }
                    <IconButton style={{display:"flex",gap:"10px",position:"absolute",top:"0",right:"0"}}  onClick={()=>{
                            onClose();
                        }}
                        >
                            <CloseRoundedIcon/>         
                    </IconButton>
                    <Box  
                        width={isNonMobile?"40%":"100%"}
                        display="flex" flexDirection={"column"} 
                        alignItems={"center"} 
                        justifyContent={"center"}
                        height={isNonMobile?"100%":"40%"}
                        >   
                        
                        <Header title={"Ajustes"}  subtitle={"Protege tu cuenta con una contraseña segura"}/>
                    </Box>
                    <Box
                    display={"flex"}
                    width={isNonMobile?"60%":"100%"}
    
                    height={isNonMobile?"100%":"60%"}
                    bgcolor={`${colors.greenSpace[500]}`}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    >
                        <Box>

                            <Typography  variant="p" color={colors.greenSpace[200]}>
                                Tipo de cuenta:                         
                            </Typography>
                            <Typography  variant="p" color={colors.greenAccent[200]}>
                                {
                                    localStorage.getItem("admin") === "true"?" Admin":" User"
                                }                    
                            </Typography>
                        </Box>
 
                        <Formik  
                            initialValues = {formData}
                            onSubmit={handleOnSubmit}         
                            validateOnChange={false}
                            validateOnBlur={false}
                            validationSchema={checkoutSchema}
                        >
                        {({
                            touched,
                            errors,
                            values,
                            handleSubmit,         
                            handleChange,
                            setFieldValue,
                        
                        })  => (
                            <form  onSubmit={handleSubmit}>
                                <Box
                                width={"400px"}
                                display ="flex"
                                gap = "15px"
                                flexDirection = "column"
                                padding = "40px"
                                bgcolor={`${colors.greenSpace[500]}`}
                                borderRadius = "15px"
                                alignSelf={"flex-end"}
                                sx={{
                                    "& .MuiFormLabel-root":{
                                    opacity:"0.5"
                                    },
                                    "& .Mui-focused":{
                                    opacity:"1",
                                    color:`${colors.greenAccent[400]} !important`,
                                    },

                                    "& .MuiInputBase-input":{
                                    opacity:"1",
                                    color:`${colors.greenAccent[100]} !important`,
                                    },

                                    "& .css-9425fu-MuiOutlinedInput-notchedOutline":{
                                    border: `2px solid ${colors.greenAccent[900]}`
                                    } 
                                }}

                                >

                                <Box display={"flex"}  justifyContent={"center"} >
                                <PasswordIcon sx={{ color: 'action.active', mr:1,my: 2.5 }}/>
                                <TextField
                                    fullWidth
                                    label="Contraseña antigua"
                                    type="password"
                                    value={values.oldPassword}
                                    name="oldPassword"
                                    onChange={handleChange}
                                    error={!!errors.oldPassword}
                                    helperText={errors.oldPassword}
                                    variant="standard"
                                />

                                </Box>
                                <Box display={"flex"}  justifyContent={"center"} >
                                <PasswordIcon sx={{ color: 'action.active', mr:1,my: 2.5 }}/>
                                <TextField
                                    fullWidth
                                    label="Nueva contraseña"
                                    type="password"
                                    value={values.newPassword}
                                    name="newPassword"
                                    onChange={handleChange}
                                    error={!!errors.newPassword}
                                    helperText={errors.newPassword}
                                    variant="standard"
                                />

                                </Box>
                                <Box display={"flex"}  justifyContent={"center"} >
                                <PasswordIcon sx={{ color: 'action.active', mr:1,my: 2.5 }}/>
                                <TextField
                                    fullWidth
                                    label="Confirmar contraseña"
                                    type="password"
                                    value={values.confirmPassword}
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    variant="standard"
                                />

                                </Box>

                                <Box
                                    margin={"auto"}
                                    sx={{
                                        "& .MuiInputBase-root":{
                                        borderRadius:"10px",
                                        width:"250px",
                                        bgcolor:"rgb(12 88 103)",
                                         

                                      },
                                        "& .MuiInputBase-root:hover":{
                                            bgcolor:"rgb(8 45 53)", 
                                            
                                                                  
                                      },
            
            
                                        "&  .MuiOutlinedInput-notchedOutline":{
                                          border:"none !important",
                                         
                                      },
                                        "&  .MuiInputBase-input":{
                                          cursor:"pointer"
                                         
                                      }
                                  
                                  }}
                                >
                                   <TextField
                                    fullWidth
                                    type="submit"
                                    name="button"
                                    style={{backgroundColor:colors.greenSpace[500],}}
                                    onSubmit={handleSubmit}
                                    />
                                </Box>

                                </Box>
                
                            </form>
                            )}
                            </Formik>

                    </Box>

                </Box>
            </Modal>
            : <Box>
        </Box>
       }
       </>

    )

}

export default AcountSetting;