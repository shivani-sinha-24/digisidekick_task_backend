import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const mongo_url = process.env.MONGOOSE_CONNECTION_LINK;

const conf = async()=> {
    await mongoose.connect(mongo_url)
    .then(()=>console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err))
}

export default conf;
    

