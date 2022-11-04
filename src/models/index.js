import mongoose from "mongoose";
import dotenv  from "dotenv";
import {UserSchema}  from "./schemas/user";
import {ProductSchema} from "./schemas/product";
import {OrderListSchema} from "./schemas/orderList";
import { model } from "mongoose";
const fs = require('fs')
const User = model("users", UserSchema);
const Product = model("products", ProductSchema);


dotenv.config();

const DB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://elice:W8RsZsSX2Xs1ydE4@cluster0.4gz9ij3.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL)
  .then(()=> main())
  .catch((err)=> {
    console.error("오류가 발생했습니다.". err);
  })
;
const db = mongoose.connection;
// autoIncrement.initialize(db);

async function main(){
  fs.readFile('adminAccount.json', (err, data)=> {
    if(err){
      console.log("file not found")
    }

    const user = JSON.parse(data); //user = [{...}, {...}, {...}, ...]
    
    // User.create(user)

    // for(let i = 0; i< user.length;i++){
    //   const admin = user[i].name //이름들
    //   //  if(!User.exists({name: admin})) {
    //   //     User.create(user[i])
    //   //  }
    //   console.log(!User.exists({name: admin}))
    // }
  })
}

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);


db.on("error", (error) =>
  console.error("\nMongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

// user-model.js 에서 export { ~~ } 한 모듈을 그대로 다시 export해 줌
// 이렇게 하면, 나중에 import 할 때 코드가 짧아짐
// 예시로, import userModel from '../db/models/user-model' 대신 from '../db' 가 됨
// '../db/index.js' 에서 index.js 는 생략 가능하므로, '../db' 면 됨 (index는 특별한 용어)
export * from "./user-model";
export * from "./product-model";

exports.Product = Product;
exports.User = User;
exports.OrderList = mongoose.model("OrderList", OrderListSchema);