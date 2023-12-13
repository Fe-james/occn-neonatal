import {makeFetch} from './makeFetch'
const query = `{
    graphicResultadoAlta
  }
  `

export function graphicResultadoAlta(){
    return makeFetch({query:query})
    .then(data => {
            console.log(data)
        return data})
}