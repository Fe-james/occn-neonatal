import {makeFetch} from './makeFetch'


export function deleteUser({id}){
    const query = `mutation{
        deleteUser(id:"${id}"){
          message
        }
      }`
    console.log(query)
    return makeFetch({query:query})
    .then(data => {return data})
}