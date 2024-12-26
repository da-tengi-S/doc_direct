import mongoose from "mongoose";

const conntDB = async () => {

    mongoose.connection.on('connected', () => console.log("dateabase connected "))
    await mongoose.connect(`${process.env.MONGODB_URI}/Doc-database`)
}
export default conntDB