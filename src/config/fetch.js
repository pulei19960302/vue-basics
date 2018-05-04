'use strict'
import Vue from 'vue';
import { getStore } from '@/config/mUtils'

const checkStatus = (response , responseJson) => {
    if(response.status >=200 && response.status <300 || response.status === 304){
        return response;
    }else{
        const error = new Error(responseJson.message);
        error.responseJson = response
        throw error
    }
}

export default async (url = '', data = {}, type = 'GET') => {
    // 将类型转化成全部大写
    type = type.toUpperCase();
    if (type === 'GET' || type === 'DELETE') {
        let dataStr = ''; // 数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        });
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }
    //token , 这里将token存在seesion中，在实际中可变化，可以存在vuex等地方
    let token = null
    if(getStore('token') !== null){
        token = 'Bearer ' + token 
    }

    if (window.fetch) {
        const requestConfig = {
            method: type,
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `${token}`
            },
            cache: 'force-cache',
            mode: 'cors'
        };

        if (type === 'POST' || type === 'PUT') {
            //在requestConfig上面定义一个属性body，并设置值
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            });
        }
        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            checkStatus(response,responseJson)
            return responseJson;
        } catch (error) {
            Vue.prototype.$message.error(error.message)
            throw new Error(error);
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            // 浏览器是否支持XMLHttpRequest
            if ((window).XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject('Microsoft.XMLHTTP');
            }

            let sendData = '';
            if (type === 'POST' || type === 'PUT') {
                sendData = JSON.stringify(data);
            }
            requestObj.open(type, url, true);
            requestObj.setRequestHeader('Content-type', 'application/json; charset=utf-8')
            requestObj.setRequestHeader('accept','*')
            //自定义设置头部 token等信息
            requestObj.setRequestHeader('Authorization', `${token}`)
            requestObj.send(sendData);
            requestObj.onreadystatechange = () => {
                if (requestObj.readyState === 4) {
                    if (requestObj.status >= 200 && requestObj.status <300 || requestObj.status === 304 ) {
                        let obj = requestObj.response;
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj);
                    } else {
                        Vue.prototype.$message.error(JSON.parse(requestObj.response).message);
                        reject(requestObj);
                    }
                }else{
                    throw new Error('请求失败')
                }
            };
        });
    }
};