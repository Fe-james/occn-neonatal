import React, { useState, } from 'react';
import { Box } from '@mui/material';
import { tokens } from '../../theme';
import {useTheme,TextField,Typography,Modal} from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { authenticate } from '../../services/authentication';
import {currentUser} from '../../services/currentUser';
import LoadingButton from '../../components/LoadingButton';
import logo from "../../img/OCCN2.svg";
import "./index.css"
import {useMediaQuery} from '@mui/material';


const checkoutSchema = yup.object().shape({
  password: yup.string().required("required"),
  username: yup.string().required("required"),
 
});

export default function Login({onLogin}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const formData = {
      username:"",
      password:""
    };
    const isNonMobile = useMediaQuery("(min-width:1080px)");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
      
   
      // Manejador de envío del formulario
      const HandleSubmit = (values) => {
        setSuccess(false);
        setLoading(true);  
        authenticate({user:values.username, pass:values.password})
        .then((response) => {
          console.log(response.data)
          if(response.data.tokenAuth.token){
            localStorage.setItem('token', response.data.tokenAuth.token);
            currentUser().then((data)=>{
                localStorage.setItem('admin', data.data.me.isStaff);
                console.log(data.data.me.isStaff)
                onLogin(response.data.tokenAuth.token,data.data.me.isStaff);
                setSuccess(true);
                setLoading(false);      
            })
            navigate("/home")
          }
          else{
            alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            setLoading(false); 
          }
           
        })
          .catch(error => {

        }) 

      };
    return (
        <Modal
            open={true}
        >
          <Box bgcolor={colors.blackGreenSpace[600]}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            width={"100%"}
            height={"100%"}
            position = {"relative"} 
          >
            <Box
              display={"flex"}
              width={"65%"}
              height={isNonMobile?"65%":"80%"}
              bgcolor={`${colors.greenSpace[500]}`}
              borderRadius={isNonMobile?"15px 8px 8px 15px":"15px 15px 8px 8px"}
              flexWrap={"wrap"}
              overflow={"hidden"}
              minWidth={"210px"}
              
            >
             <Box
              display={"flex"}
              width={isNonMobile?"35%":"100%"}
              height={isNonMobile?"100%":"60%"}
              bgcolor={`#172A2B`}
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={ isNonMobile?"8px 0px 40px 8px":"8px 8px 0px 0px" }
              flexDirection={"column"}
              
             >
              {
                !isNonMobile && <Typography fontFamily= "Merriweather Sans"  variant = "h1" color={colors.greenAccent[200]}>Sign in</Typography>
              }
              {
                isNonMobile && 
                <Box width="150px" height="150px">
                <div
                  style={{
                    backgroundImage: `url(${logo})`,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    backgroundSize: "50%",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "50px",
                    backgroundPosition: "center",        
                  }}
                  
                ></div>
              </Box>
              }
              
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
              })  => (
                  <form  onSubmit={handleSubmit}>
                      <Box
                        display ="flex"
                        gap = "15px"
                        flexDirection = "column"
                        padding = "10px"
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{
                            "& .MuiFormLabel-root":{
                              opacity:"0.5 !important",
                              color:`${colors.greenAccent[600]} !important`,
                              fontFamily:"Merriweather Sans"
                            },
                            "& .Mui-focused":{
                              opacity:"0.8 !important",
                              color:`${colors.greenAccent[500]} !important`,
                            },

                            "& .MuiInputBase-input":{
                              opacity:"1 !important",
                              color:`${colors.greenAccent[100]} !important`,
                              fontFamily:"Merriweather Sans"
                            },
                            
                            "& .MuiOutlinedInput-notchedOutline":{
                              border: `3px solid ${colors.greenAccent[700]} !important`,
                              borderRadius:"15px !important",
                            },
                            "& .MuiInputBase-root:hover > .MuiOutlinedInput-notchedOutline":{
                              borderColor: `${colors.greenAccent[600]} !important`,
                             
                            },


                      
                        }}

                      >
                      
                     
                      <TextField
                      id='LoginUsername'
                        fullWidth
                        label="User"
                        type="text"
                        value={values.username}
                        name="username"
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        autoComplete='undefined'
                      />
                      <TextField
                        id='loginPassword'
                        fullWidth
                        label="Password"
                        type="password"
                        value={values.password}
                        name="password"
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        autoComplete='undefined'
                         
                      />
                      <LoadingButton
                        loading={loading}
                        success={success}
                        handleOnClick={handleSubmit}
                      />
                    </Box>
                  </form>
                )}
                </Formik>
             </Box>
             <Box
              display={"flex"}
              width={isNonMobile?"65%":"100%"}
              height={isNonMobile?"100%":"40%"}
              alignItems={"center"}
              justifyContent={"center"}
              
              gap={"30px"}
             >
              <Box width="100%" height="100%" 
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              position={"relative"}
           
              >
                <div className='div_con_fondo_desenfocado'></div>
                <Box
                  position={"absolute"}
                >
                  <Typography sx={{display:"inline"}} fontFamily={"Merriweather Sans Bold"} variant = "h1" fontSize={isNonMobile?"10vh":"5vh"} color={colors.greenAccent[600]} >O</Typography>
                  <Typography sx={{display:"inline"}} fontFamily={"Merriweather Sans Bold"} variant = "h1" fontSize={isNonMobile?"7vh":"2em"} color={colors.greenAccent[100]} >bservatorio</Typography><br></br>
                  <Typography sx={{display:"inline"}} fontFamily={"Merriweather Sans Bold"} variant = "h1" fontSize={isNonMobile?"10vh":"5vh"} color={colors.greenAccent[600]} >C</Typography>
                  <Typography sx={{display:"inline"}} fontFamily={"Merriweather Sans Bold"} variant = "h1" fontSize={isNonMobile?"7vh":"2em"} color={colors.greenAccent[100]} >entral de</Typography><br></br>
                  <Typography sx={{display:"inline"}} fontFamily={"Merriweather Sans Bold"} variant = "h1" fontSize={isNonMobile?"10vh":"5vh"} color={colors.greenAccent[600]} >C</Typography>
                  <Typography sx={{display:"inline"}} fontFamily={"Merriweather Sans Bold"} variant = "h1" fontSize={isNonMobile?"7vh":"2em"} color={colors.greenAccent[100]} >irugía</Typography><br></br>
                  <Typography sx={{display:"inline"}} fontFamily={"Merriweather Sans Bold"} variant = "h1" fontSize={isNonMobile?"10vh":"5vh"} color={colors.greenAccent[600]} >N</Typography>
                  <Typography sx={{display:"inline"}} fontFamily={"Merriweather Sans Bold"} variant = "h1" fontSize={isNonMobile?"7vh":"2em"} color={colors.greenAccent[100]} >eonatal</Typography>

                </Box>
              </Box>   
                      
              <Box
                display={"flex"}
                flexDirection={"column"}
                flexShrink={"2"}
              >
              </Box>
             </Box>    
            </Box>
        </Box>
        </Modal>
        


    );
}



