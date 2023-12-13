import React, { useState,useRef } from 'react';
import { Box, FormControlLabel } from '@mui/material';
import { tokens } from '../theme';
import {useTheme,TextField,Typography,Modal,IconButton} from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import {createUser} from "../services/createUser";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import {Checkbox} from '@mui/material';
import {useMediaQuery} from '@mui/material';




const checkoutSchema = yup.object().shape({
  password: yup.string().required("required").matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
    "La contraseña debe  contener al menos \n una mayúscula,  una  minúscula y un  \n número."),
  username: yup.string().required("required"),
  email: yup.string().required("required")
});

const CreateUser=({onClick,onCreate,activeAdvice})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, close] = useState(true);
    const isNonMobile = useMediaQuery("(min-width:700px)")

    const [formData, setFormData] = useState({
      username:"",
      email:"",
      isStaff:false,
      password:""
    });
    const navigate = useNavigate();

      const HandleSubmit = (values,{setFieldError}) => {  
        console.log(values)
        createUser({username:values.username,isStaff:values.isStaff,email:values.email, password:values.password})  
        .then(result => {
          if (result.errors) {  
            if(result.errors[0].message==="UNIQUE constraint failed: authentication_customuser.username")
             setFieldError("username","Ese nombre de usuario ya existe")
            if(result.errors[0].message==="['Enter a valid email address.']")
             setFieldError("email","Direccion invalida")
              console.log(result.errors[0].message)
            if(result.errors[0].message=="['This password is too common.']")
              setFieldError("password","Contraseña muy común")
          }
          else{
            onCreate();
            activeAdvice();
            close(!open);
          }
        });
        
      
       
      };
      

    return (
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
              gap={"5px"}
              whiteSpace={"pre-line"}
              sx={{

                "& .MuiButtonBase-root": {
                    borderRadius: "0px !important"
                },
                "& .MuiButtonBase-root:hover": {
                    bgcolor:` ${colors.greenAccent[500]} !important`
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
              <IconButton  style={{display:"flex", gap:"10px",position:"absolute",top:"0px",right:"0px"}}  onClick={onClick}>
                  <CloseRoundedIcon/>         
              </IconButton>
  
            
            <Box
              height={isNonMobile?"100%":"35%"}
              width={isNonMobile?"40%":"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}

            >
              <Typography fontFamily="Merriweather Sans" variant = "h2" color={colors.greenAccent[300]} >Create User</Typography>
              <Typography fontFamily="Merriweather Sans" variant = "h5" color={colors.greenAccent[600]}>Into the data for the new user</Typography> 
            </Box>
            <Box
              height={isNonMobile?"100%":"65%"}
              width={isNonMobile?"60%":"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              bgcolor={colors.greenSpace[500]}
              
            >
                <Formik  
                  initialValues = {formData}
                  onSubmit={HandleSubmit}         
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
                      width = "400px"
                      display ="flex"
                      gap = "15px"
                      flexDirection = "column"
                      padding = "40px"
                      bgcolor={colors.greenSpace[500]}
                      borderRadius = "15px"
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
                          },

                      }}

                      >
                    
                      <Box display="flex" justifyContent={"center"} >
                      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2.5 }} />
                        <TextField
                          fullWidth
                          label="Username"
                          type="text"
                          value={values.username}
                          name="username"
                          onChange={handleChange}
                          error={touched.username && Boolean(errors.username)}
                          helperText={touched.username && errors.username}
                          variant={"standard"}
                          style={{fontFamily:"Merriweather Sans"}}
                        />
                      </Box>

                      <Box display="flex" justifyContent={"center"} >
                        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 2.5 }} />
                        <TextField
                        fullWidth
                        label="Mail"
                        type="text"
                        value={values.email}
                        name="email"
                        onChange={handleChange}
                        error={errors.email}
                        helperText={errors.email}
                        variant = "standard"
                        style={{fontFamily:"Merriweather Sans"}}
                      />
                      </Box>

                      <Box display={"flex"}  justifyContent={"center"} >
                        <PasswordIcon sx={{ color: 'action.active', mr:1,my: 2.5 }}/>
                        <TextField
                          fullWidth
                          label="password"
                          type="password"
                          value={values.password}
                          name="password"
                          onChange={handleChange}
                          error={errors.password}
                          helperText={errors.password}
                          variant="standard"
                          style={{fontFamily:"Merriweather Sans"}}
                        />

                      </Box>

                      <Box display={"flex"} gap="20px" justifyContent={"center"} alignItems={"center"}
                        sx={{ 
                          "& .MuiButtonBase-root:hover": {
                            bgcolor:` transparent !important`
                          },
                          "& .MuiTypography-root": {
                            fontFamily:`Merriweather Sans`
                          },
                        }}
                      >
                        <FormControlLabel
                          label="Admin permissions"
                          style={{fontFamily:"Merriweather Sans"}}
                          control={    
                              <Checkbox 
                              
                                title='Admin permissions'
                                color='secondary'
                                value={values.isStaff}
                                onClick={()=>{
                                  setFieldValue("isStaff",!values.isStaff)
                                }}
                            
                            ></Checkbox>}
                        >

                        </FormControlLabel>
                    

            
                      </Box>

                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{
                            "& .MuiInputBase-root":{
                            borderRadius:"10px",
                            width:"250px",
                            bgcolor:"rgb(12 88 103)",
                            cursor:"pointer !important"
                                                     
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
                          
                          type="submit"
                          name="button"
                          style={{backgroundColor:colors.greenSpace[500]}}
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
        
    );
}

export default CreateUser;

