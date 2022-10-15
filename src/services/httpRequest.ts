import axios from "axios";
import environmentsVariables from '../environments';

interface IAPIREQUEST {
    url: string;
    data: any;
    method: "GET" | "POST" | "PUT" | "DELETE";
}
const BASE_URL = environmentsVariables.apiURL;

const HttpRequest = (req:IAPIREQUEST) => {
    return new Promise((resolve, reject) => {
        axios({
            method:req.method,
            url: `${BASE_URL}${req.url}`,
            data: req.data,
          })
          .then((res) => {
            resolve(res.data);
          }).catch((err) => {
            reject(err);
          });
    });
  };
  export default HttpRequest;