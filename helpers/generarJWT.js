import jwt from "jsonwebtoken";

const generarJWT = (email) => {
return jwt.sign({email}, process.env.JWT_SECRET, {
    expiresIn: "30d",
 });
};

export default generarJWT;