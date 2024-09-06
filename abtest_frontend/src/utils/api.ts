import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ListExpsData } from "@/types/api/Get/GetListExpsData";
import { ExpsData } from "@/types/api/Get/GetExpData";
import { ExpDetailsData } from "@/types/api/Get/GetExpDetailsData";
import { AllDimensionData } from "@/types/api/Get/GetAllDimensionData";
import { ListMetricsData } from "@/types/api/Get/GetListMetricsData";
import { AllMetricsData } from "@/types/api/Get/GetAllMetricsData";
import { ListFeatureLags } from "@/types/api/Get/GetListFeatureLagData";
import { ListEventTypeData } from "@/types/api/Get/GetListEventTypeData";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'



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
            const session = getServerSession(authOptions)
            if(error.response.status === 401) {

            }
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

    public login = async (email: string, password: string): Promise<any> => {

        let payload = {
            data: {
                email: email,
                password:password
            }
        }

        return this.Request('post', `${this.baseURL}/api/user/token`, payload);
       
    };

    public getExps = async (): Promise<ExpsData[]> => 
    {
        return this.Request('get', `${this.baseURL}/api/ab_test/get_exps`)
    };

    public getListExps = async (): Promise<ListExpsData[]> => 
    {
        return this.Request('get', `${this.baseURL}/api/ab_test/get_list_exps`)
    };

    public getExpDetails = async (exp_id: string): Promise<ExpDetailsData> => 
    {
        return this.Request('get', `${this.baseURL}/api/ab_test/get_exp_details/${exp_id}`)
    };

    public getListMetrics = async (): Promise<ListMetricsData[]> => 
    {
        return this.Request('get', `${this.baseURL}/api/ab_test/get_list_metrics`)
    };

    public getAllMetrics = async (): Promise<AllMetricsData[]> => 
    {
        return this.Request('get', `${this.baseURL}/api/ab_test/get_all_metrics`) 
    }

    public getListFeatureLag = async ():Promise<ListFeatureLags> => 
    {
        return this.Request('get', `${this.baseURL}/api/ab_test/get_list_feature_lag`)
    };

    public getListEventType = async (): Promise<ListEventTypeData> => 
    {
        return this.Request('get', `${this.baseURL}/api/ab_test/get_list_event_type`)
    };

    public getAllDimentions = async (): Promise<AllDimensionData[]> => 
    {
        return this.Request('get', `${this.baseURL}/api/ab_test/get_all_dimensions`)
    };
  
}

const api = new API();
export default api




