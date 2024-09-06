import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ZendeskTicket } from "@/types/api/social";
import { UserInfo } from "@/types/api/sipherGame";
import { UserInventoryBalance } from "@/types/api/sipherGame";

interface ApiResponse<T> {
    code: number;
    title: string;
    message: string;
    data?: T;
}

class API {

    private baseURL: string 
    
    constructor()
    {
        this.baseURL = process.env.API_URL as string

        axios.interceptors.request.use(
            (config) =>
            {
                // if(!config.headers['Authorization']){
                //     const session: any = getServerSession(authOptions)
                //     config.headers["Authorization"] = `Bearer ${session?.user?.access_token}`;
                // }
                return this.ConfigRequest(config)
            },
            (error) =>
            {
                return Promise.reject(error)
            }
        )
        
      
        axios.interceptors.response.use(
          (response: AxiosResponse<ApiResponse<any>>) => 
          {
            return this.PostProcessing(response)
          },
          (error: any) => 
          {
            return this.HandleError(error)
          }
        );
    }

    private ConfigRequest = (config: any) =>
    {
        if (config.hasOwnProperty('payload') === false)
        {
            return config
        }
        else
        {
            config['data'] = {
                ...config['payload'].data
            }
        }

        return config
    }

    private PostProcessing = <T>(res: AxiosResponse<ApiResponse<T>>): T | Promise<never> | undefined => 
    {
        if (res.status < 200 || res.status >= 300) 
        {
          return Promise.reject({
            code: res.status || -1,
            title: res.statusText || 'Warning !',
            message: `invalid status ${res.status}`
          });
        }
    
        if (res.data) 
        {
            return res.data as T;
        }
 
    }

    private HandleError = (payload: any): Promise<never> => 
    {
        const response = payload.response || {};
        return Promise.reject({
          code: response.status || -3,
          title: response.statusText || 'Warning !',
          message: (response.data && response.data.error) || payload.message || 'unknown reason'
        });
    };

    private Request = <T>(method: string, url: string, payload: any = {} , responseType: 'json' = 'json'): Promise<T> => 
    {
        let config: any = {
          method,
          url,
          responseType
        };

        config['headers'] = {
            "Content-Type": "application/json",
        }

        config['payload'] = payload || {}


        return axios(config);
   
    }

    public Login = async (email: string, password: string): Promise<any> => {

        let payload = {
            data: {
                email: email,
                password:password
            }
        }

        return this.Request('post', `${this.baseURL}/api/user/token`, payload);
       
    };

    public getUserInfo = async (): Promise<UserInfo[]> => 
    {
        return this.Request('get', `${this.baseURL}/api/crm/sipher-game/user-info`)
    };

    public getUserInventoryBalance = async (): Promise<UserInventoryBalance[]> => 
        {
            return this.Request('get', `${this.baseURL}/api/crm/sipher-game/user-inventory`)
        };

    public getZendeskTickets = async (): Promise<ZendeskTicket[]> => 
    {
        return this.Request('get', `${this.baseURL}/api/crm/social/zendesk_tickets`)
    };
    

   
  
}

const api = new API();
export default api




