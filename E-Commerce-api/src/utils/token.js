import jwt from "jsonwebtoken";

export const createToken = ({ secretKey, payload }) => {
    const token = jwt.sign(payload, secretKey, {
        expiresIn: "1d"
    });

    return token;
};

export const verifyToken = ({ token, secretKey }) => {
    return jwt.verify(token, secretKey);
}
