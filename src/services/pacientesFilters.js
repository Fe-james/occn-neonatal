import {makeFetch} from './makeFetch'



export function filterin({filters}){
    const query = `{
        pacientes(${filters}){
            edges{
                node{
                    id,
                    nombre,
                    nombreDeLaMadre,
                    municipio,
                    provincia,
                    fecha,
                    diagnosticoEgreso,
                }
            }
        }
    }`
 
    return makeFetch({query:query})
    .then(data => {
        console.log(data.data.pacientes.edges)
        return data})
}