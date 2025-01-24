import axios from "axios";
import { IErrorResponse } from "../interfaces/IErrorResponse";
import { toast } from "react-toastify";

export function processApiCallErrors(error:unknown){
  if(axios.isAxiosError(error)){
    if( (error.response?.data as IErrorResponse).message instanceof Array){
        (error.response?.data as IErrorResponse).message.forEach(message => {
            toast(message, {type:"error"})
         })  
    }else{
        toast(error.message, {type:"error"})
    }
  }else if(error instanceof Error){
    console.log(error.message);
  }else{
    console.log(error);
  }
}