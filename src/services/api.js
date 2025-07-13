import axios from "axios";

const login = async (email, password) => {
  const res = await axios.post('/auth/login', { email, password });
  return res.data;
}

export const Request  = async(url, method, data ) =>{
    try {
        return await axios({
            method: method,
            url: process.env.REACT_APP_BASEURL + url,
            data: data,
            headers:{
                     'auth_token': sessionStorage.getItem("token"),
                     'auth-user' : sessionStorage.getItem("usuario"),
                     'hash'      : sessionStorage.getItem("hash"),
                    },
        }).then( response =>{
            return response;
        })    
    } catch (error) {
        console.log(error);
        return {data:[]};
    }
    
}