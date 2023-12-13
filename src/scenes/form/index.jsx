
import { useState } from "react";
import { useEffect } from "react";
import Form from "../../components/Form";
import { values } from "../../data/initialValues";


const FormData=({mainRef})=>{
    

  return(
    <>
      <Form 
      initialValues={values} 
      title={"INGRESAR DATOS DEL PACIENTE"} 
      mainRef = {mainRef}
      />
      
    </>

  )

}

export default FormData;