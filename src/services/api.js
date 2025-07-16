import axios     from "axios";
import {message} from 'antd'

export const Request  = async(url, method, data ) =>{
    try {
        return await axios({
            method : method,
            url    : process.env.REACT_APP_BASEURL + url,
            data   : data,
            headers:{ 'auth_token': sessionStorage.getItem("token")},
        }).then( response =>{
            return response;
        })    
    } catch (error) {
        if([404,401].includes(error.status)){
          message.error (`${error.response.data.message}`)
        }else{
          return {data:[]};
        }        
    }
    
}