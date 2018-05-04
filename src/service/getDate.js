import fetch from '@/config/fetch'
import { WSAEALREADY } from 'constants';
let Base_Url = process.env.BASE_URL;


export const userAuth = (data , methods) => fetch(`${Base_Url}/smc/auth` , data , methods);

export const getPolicy = (data, methods) => fetch(`${Base_Url}/grain/policy` ,data, methods);
