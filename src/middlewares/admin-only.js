import jwt from "jsonwebtoken";

function adminOnly(req, res, next){

    // authorization bearer으로 토큰을 받음.
    const userToken = req.headers["authorization"]?.split(" ")[1];

    if(!userToken || userToken === "null") {
        console.log("서비스 사용 요청이 있지만 Authorization 토큰: 없음");
        res.status(401).json({
            result: "forbidden-approach",
            reason: "로그인한 유저만 사용할 수 있는 서비스 입니다.",
        });
        return;
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);

        const role = jwtDecoded.role;

        if(role != "admin") {
            console.log("서비스 사용 요청이 있지만 관리자가 아닙니다.");
            res.status(403).json({
                result: "forbidden-approach",
                reason: "관리자만 사용할 수 있는 서비스입니다."
            });
            return;
        }
        next();
    }catch(err) {
        next(err);

        return;
    }
}

export {adminOnly};