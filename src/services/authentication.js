import {makeAuthenticate} from './makeFetch'


export function authenticate({user,pass}){
    const query = `mutation{
        tokenAuth(username:"${user}", password:"${pass}"){
        token
            }
        }`
        console.log(query);
    return makeAuthenticate({query:query})
    .then(data => {return data})
   
}


