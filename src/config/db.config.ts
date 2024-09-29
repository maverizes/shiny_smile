export default () => ({
    db: {
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME
    }
})