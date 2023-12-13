import {makeFetch} from './makeFetch'
const query = `{
    users{
      edges{
        node{
          id,
          username,
          email,
          isStaff
        }
      }
    }
  }
  `

export function getUser(){
    return makeFetch({query:query})
    .then(data => {return data})
}