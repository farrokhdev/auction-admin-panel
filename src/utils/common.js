import axios from 'axios';
import {BASE_URL} from '../utils';
import {Token} from './utils';

let refresh = true;
let timeAction = null;

 export function fetcher  (url = BASE_URL, header = {method:"GET",data:"",header:{}},auth=true)  {
    // store.dispatch(loading(true));
    // BASE_URL+url, Header(header, ext.noAuth)
    let initial={headers:{}};
    

    if(header?.data)
    initial.data=header.data
    if(header?.header)
    initial.headers=header?.header
    if(auth)
    initial.headers["Authorization"]=`Bearer ${Token()}`


    initial.method=header.method
    initial.url=url

    return axios(initial).then((response) => {
        if (response.ok) { //4xx-5xx
            console.log("LLLLLoooo",response);
            // if ((response.status === 401) && refresh) { //401
            //     timeAction = setTimeout(() => {
            //         refresh = true;
            //     }, 6000);
            //     store.dispatch(refreshOtp({"refresh": getRereshObject()}));

            //     refresh = false;
            // }
            // if ((response.status === 403) && refresh) { //401
            //     timeAction = setTimeout(() => {
            //         refresh = true;
            //     }, 6000);
            //     message.error('اجازه دسترسی ندارید');
            //     refresh = false;
            // }
            // if ((response.status === 429) && refresh) { //401
            //     timeAction = setTimeout(() => {
            //         refresh = true;
            //     }, 6000);
            //     message.error('پس از لحظاتی دوباره امتحان کنید');
            //     refresh = false;
            // }

            // if (response
            //     ?.status && (response
            //         ?.status !== 403) && (response
            //         ?.status !== 401) && (response
            //         ?.status !== 429)) {
            //     throw new Error((await response.json()).message || response.status)
            // }

        }

        // store.dispatch(loading(false));
        return response.data;
    })
    .catch(err => {
            console.log(err);
        })
    
    
    
    // .then(r => r.json()) //r["json"]() r.json()
    //     .catch(e => {
    //     // store.dispatch(loading(false));
    //     return Promise.reject(e)
    // })

}




