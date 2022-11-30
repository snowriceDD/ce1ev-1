import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { adminOnly, loginRequired } from "../middlewares";
import { userService } from "../services";

const userRouter = Router();

// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
userRouter.post("/register", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNum = req.body.phoneNum;
    const address = req.body.address;
    const role = req.body.role;
    const isMember = req.body.isMember;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      email,
      name,
      password,
      phoneNum,
      address,
      role,
      isMember
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/user/password/check", loginRequired, async(req, res, next)=> {
  try{ 
    if(is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 applicatio/json으로 설정해주세요."
      );
    }

    const userId = req.currentUserId;
    const password = req.body.password;

    const checkResult = await userService.checkUserPassword(userId, password);

    res.status(200).json(checkResult);

  } catch(err) {
    next(err);
  }
})

// 로그인 api (아래는 /login 이지만, 실제로는 /api/login로 요청해야 함.)
userRouter.post("/login", async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
    const userToken = await userService.getUserToken({ email, password });

    // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

// // 전체 유저 목록을 가져옴 (배열 형태임)
// // 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.get("/userlist", async function (req, res, next) {
  //  로그인인증미들웨어 잠시 삭제함.
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/user", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId; //loginRequired에 있음
    // console.log(userId);
    const currentUserInfo = await userService.getUserData(userId);

    res.status(200).json(currentUserInfo);
  } catch (err) {
    next(err);
  }
});

// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.patch(
  "/users/:userId",
  loginRequired,
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // params로부터 id를 가져옴
      const userId = req.params.userId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const address = req.body.address;
      const phoneNum = req.body.phoneNum;
      const role = req.body.role;

      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
      const currentPassword = req.body.currentPassword;

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
      }

      const userInfoRequired = { userId, currentPassword };

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNum && { phoneNum }),
        ...(role && { role }),
      };

      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await userService.setUser(
        userInfoRequired,
        toUpdate
      );

      // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);
 //권한 수정
userRouter.patch(
  "/users/role/:userId",
  adminOnly,
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // params로부터 id를 가져옴
      const userId = req.params.userId;

      // body data 로부터 업데이트할 사용자 권한 정보를 추출함.
      const role = req.body.role;

      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await userService.setRole(userId, role);

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);



userRouter.delete("/users/:userId", loginRequired, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const delteResult = await userService.deleteUserData(userId);

    res.status(200).json(delteResult);
  } catch (err) {
    next(err);
  }
});

//관리자 토큰 가졌는지 확인
userRouter.get("/admin/check", adminOnly, async (req, res, next) => {
  try {
    res.status(200).json({ result: "success" });
  } catch (err) {
    next(err);
  }
});

export { userRouter };
