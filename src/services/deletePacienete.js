import {makeFetch} from './makeFetch'


export function deletePaciente({id}){
    const query = `mutation{
        deletePaciente(id:"${id}"){
          message
        }
      }`
    console.log(query)
    return makeFetch({query:query})
    .then(data => {return data})
}