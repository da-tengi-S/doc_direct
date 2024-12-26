import {v2 as clodinary } from 'cloudinary'

const connectClodinary = async ()=> {
    clodinary.config({
        cloud_name:process.env.CLODINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLODINARY_SECRETKEY
    })
}

export default connectClodinary