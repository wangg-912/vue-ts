import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { DEVHOST, PROHOST, conmomPrams } from "@/config/index";
import { Message } from "element-ui";
import stroe from "@/stroe";

declare type Methods =
  | "GET"
  | "OPTIONS"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT";
declare interface Datas {
  method?: Methods;
  [key: string]: any;
}
/* import { getToken } from '@/views/utils/auth'; // token 不需要可以不要 */

const baseUrl = process.env.NODE_ENV === "development" ? DEVHOST : PROHOST;
class HttpRequest {
  public queue: any;
  public constructor() {
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      baseURL: baseUrl,
      headers: {}
    };
    return config;
  }
  destroy(url: string) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // hide loading
    }
  }
  interceptors(instance: any, url?: string) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
        }
        if (url) {
          this.queue[url] = true;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (url) {
          this.destroy(url);
        }
        const { data, status } = res;
        if (data.type == "application/octet-stream") {
          return Object.assign(
            {},
            {
              data,
              status
            },
            { header: res.headers }
          );
        } else {
          return { data, status };
        }
        return { data, status };
      },
      (error: any) => {
        if (url) {
          this.destroy(url);
        }
        if (error && error.request) {
          let status = error.request.status;
          switch (status) {
            case 404:
              Message({
                message: "服务端接口未找到！",
                type: "error",
                duration: 3000
              });
              break;
            case 500:
              Message({
                message: "服务器未启动！",
                type: "error",
                duration: 3000
              });
              break;
            default:
              Message({ message: "未知错误！", type: "error", duration: 3000 });
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }
  async request(options: AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    await this.interceptors(instance, options.url);
    return instance(options);
  }
}

const $axios = new HttpRequest();

export default $axios as any;
