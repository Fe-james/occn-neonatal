import {makeFetch} from './makeFetch'


export function changeUserPassword({oldPassword,newPassword1,newPassword2}){
    const query = `mutation{
        passwordChange(oldPassword:"${oldPassword}",newPassword1:"${newPassword1}",newPassword2:"${newPassword2}"){
            success,
            token,
        }
      }`
    return makeFetch({query:query})
    .then(data => {return data})
}

