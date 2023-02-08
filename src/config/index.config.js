import * as dotenv from 'dotenv';

dotenv.config();
let config ;
const mongodb = {
    atlas: {
        strConn: process.env.MONGO_URL
    }
}
if (process.env.ENVIRONMENT === "dev") {
    config =process.env.COMPASS;
} else {
        config = mongodb.atlas.strConn;
}

export default config;
