import { useFormikContext } from 'formik';
import { useEffect,useState } from 'react';
import Advice from '../components/Advice';

const ScrollToFirstError = ({ myRef}) => {
  const { errors, isSubmitting, isValidating } = useFormikContext();
  const  [advice,setAdvice] = useState(false);
  useEffect(() => {
    if (isSubmitting && !isValidating && Object.keys(errors).length > 0) {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
      setAdvice(true);
      setTimeout(() =>{setAdvice(false)},3000);
    }
  }, [isSubmitting,errors,isValidating,myRef]);
 
  return (
    <>
      {
        advice && <Advice title="Complete los campos obligatorios" colorBox={"red"} type = "warning"/>
      }
    </>
  );
};

export default ScrollToFirstError;