import { checkLogin } from "../useful-functions.js";
import * as Api from "/api.js";

const section = document.querySelector('.section')
const product = document.querySelector('.product_name')
checkLogin();
insertOrderListElement();

let userData;
async function insertOrderListElement(){
    const userData = await Api.get('/api/user');
    const {email} = userData;
    console.log(email)
    const res = await Api.get('/api/order/:email');
    const orderLists = await res.json();
    
    orderLists.forEach((product) =>{

    })
}   