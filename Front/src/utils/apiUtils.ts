import { getKeyCloakObj, initKeyCloak } from "./keycloakUtils";

const { host } = window.location

function RemovePort(host:string)
{
    if (host.includes(":"))
    {
        return host.split(":")[0];
    }
    return host;
}

const APIURL = `http://${RemovePort(host)}:8888/api`;

/**
 * HTTP Methods.
 */
type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

/**
 * Result of API call.
 */
interface APIResult<T>{
    data?:T;
    error?:string;
}

/**
 * Create options for the fetch request.
 * @param method HTTP method.
 * @param isAuth Is user connected?
 * @param data Data to send.(If needed)
 * @returns « Init » needed to make the fetch request.
 * @example
 * await fetch(url+ "/login",createRequestOptions("POST",false,body))
         .then(async (response) => {
                user = JSON.parse(await response.text());
              })
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createRequestOptions(method:Method,isAuth:boolean,data?:any){
    //Create headers for the request.
    const header = new Headers();
    //Specify the content type in the header.
    header.append("Content-Type","application/json")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const init : any = {method:method};

    if (isAuth) {
        //Get the token with a function.
        //Adds the token to the header.
        header.append("Authorization",`Bearer ${getKeyCloakObj().token}`)
    }

    //Add the header to the init.
    init.headers = header;

    if (data !== null){
        //Add the data to the init.
        init.body = JSON.stringify(data);
    }

    return init;
}
            
/**
 * Do an API request.
 * @param endURL End of URL.
 * @param method HTTP method.
 * @param isAuth Is user connected?
 * @param body Data to send.(If needed)
 * @returns Response of the API call.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function APIRequest<T>(endURL:string,method:Method,isAuth:boolean,body?:any):Promise<APIResult<T>>{
    let data;
    let error;
    await initKeyCloak();
    try{
        await fetch(APIURL+endURL,createRequestOptions(method,isAuth,body))
        .then(response => {
            return response.text();
        })
        .then(text => {
            data = JSON.parse(text);
            //In my API if there is an error, the reveived data as no content.
            if (!data.content){
                error = data.message;
            }
            else{
                data = data.content;
            }
        })
    }
    catch(e){
        console.log("ERREUR")
        console.log(e);
        error = "The connection to the server failed.";
    }

    return {data,error}
}
