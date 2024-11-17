const { default: mongoose } = require("mongoose");


const connectToDB = async() => {
    const connectionUrl = process.env.MONGODB_URL;

    mongoose
    .connect(connectionUrl)
    .then(() => console.log('ujira job portal database connection was succesful'))
    .catch(error => console.log(error));
    
};

export default connectToDB;