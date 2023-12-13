import { GRAPHQL_API } from "../settings"

export function makeFetch({query}){
    return fetch(GRAPHQL_API,{
        method: 'POST',
        headers: {
            "Authorization":`JWT ${localStorage.getItem('token')}`,
            "Content-type":"application/json",
        },
        body: JSON.stringify({query})
    })
    .then(res => {return res.json()})
}

export function makeAuthenticate({query}){
    return fetch(GRAPHQL_API,{
        method: 'POST',
        headers: {
            "Content-type":"application/json",
        },
        body: JSON.stringify({query})
    })
    .then(res => {return res.json()})
}


