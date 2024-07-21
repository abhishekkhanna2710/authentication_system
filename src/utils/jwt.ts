import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessToken = (user: any) => {
    return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION });
};

const generateRefreshToken = (user: any) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
};

export { generateAccessToken, generateRefreshToken };
