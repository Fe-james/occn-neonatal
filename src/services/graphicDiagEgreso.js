import {makeFetch} from './makeFetch'
const query = `{
    graphicDiagnosticoEgreso
  }
  `

export function graphicDiagEgreso(){
    return makeFetch({query:query})
    .then(data => {
            console.log(data)
        return data})
}