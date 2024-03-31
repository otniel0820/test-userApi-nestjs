

export const EnvConfig =()=>({
    enviroment: process.env.NODE_ENV || 'dev',
    postgresdbHost: process.env.DB_HOST,
    port: +process.env.DB_PORT || 3000,
    dbname: process.env.DB_NAME,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
})