import {makeFetch} from './makeFetch'


export function currentUser(){
    const query = `{
        me{
          id,isStaff,username
        }
      }`
    console.log(query)
    return makeFetch({query:query})
    .then(data => {return data})
}