module.exports = {
  dev:{ 
    connectionString: "https://scout-tracker.onrender.com",
    port: process.env.PORT
},
production:{
  connectionString: process.env.POSTGRES_CONNECTION_STRING + "?ssl=true",
  port: process.env.PORT
}
}