export default () => ({
    app: {
        port: parseInt(process.env.PORT),
        host: process.env.HOST,
    }
})