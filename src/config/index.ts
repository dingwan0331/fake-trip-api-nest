import * as dotenv from 'dotenv';

dotenv.config();

export const { SECRET_KEY, JWT_EXPIRE_IN } = process.env;
