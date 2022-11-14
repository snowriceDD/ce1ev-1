import { checkLogin } from "../useful-functions.js";
import * as Api from "/api.js";

const section = document.querySelector('.section')
const product = document.querySelector('.product_name')
checkLogin();
addAllEvent();

let userData;
async function addAllEvent(){
    userData = await Api.get('/api/user');
    const {email, name, role} = userData;

    product.innerHTML = `${name}`
<<<<<<< Updated upstream
=======
    product.innerHTML = `${name}`
>>>>>>> Stashed changes
}   