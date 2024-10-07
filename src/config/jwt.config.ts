export const jwtConfig = () => {
jwt: {
    accessKey: process.env.ACCESS_TOKEN_SECRET_KEY;
    accessRefreshTime: process.env.ACCESS_TOKEN_EXPIRE_TIME;
}
}