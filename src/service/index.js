// 基础封装，可自定义修改

import axios from 'axios';
import { Message } from 'element-ui';
const baseUrl = process.env.VUE_APP_API_BASE;
let pending = []
const cancelToken = axios.CancelToken;
const removePending = (config)=>{
    for(let p in pending){
        const item = +p;
        const list = pending[p];
        const isPend = list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params)&& JSON.stringify(list.data) === JSON.stringify(config.data)
        if(isPend){
            list.cancel("操作太频繁，请稍后再试")
            pending.splice(item,1);
        }
    }
}
// 封装axios请求
class httpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || ''
    }
    getInsideConfig() {
        let config = {
            baseURL: baseUrl,
            timeout: 50 * 1000,
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            }
        }
        return config;
    }
    interceptors(instance, url) {
        instance.interceptors.request.use((config) => {
            // 这里写执行自己的请求拦截
            removePending(config);
            config.cancelToken = new cancelToken((c)=>{
                pending.push({url:config.url,method:config.method,params:config.params,data:config.data,cancel:c})
            })
            return config
        },(error) => {
            return Promise.reject(error)
        })
        instance.interceptors.response.use((resp) => {
            // 这里写执行自己的响应处理
            return resp;
        },(error) => {
            Message.warning(error.toString())
            return Promise.reject(error);
        })
    }
    request(options) {
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, options.url);
        return instance(options)
    }
}
let _https = new httpRequest(baseUrl);
// 封装常用的请求get-post
const get = (url,params,oConfig) => {
    return _https.request({
        url,
        method:'get',
        params,
        ...oConfig
    })
}
const post = (url,data,oConfig) => {
    return _https.request({
        url,
        method:'post',
        data,
        ...oConfig
    })
}

// 导出
export default {get, post}


