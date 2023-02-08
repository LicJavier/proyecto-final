import jwt from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';
import { userDao } from "./index.js";

dotenv.config()

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
    algorithms: ['RS256'],
    ignoreExpiration: false,
    passReqToCallback: false,
    jsonWebTokenOptions:{
        complete: false,
        maxAge: '1d',
        clockTimeStamp: '100',
    }
}

export default function issueJWT(user){
    const id = user.id;

    const payload = {
        sub: id,
        iat: Date.now()
    }

    const signedToken = jwt.sign(payload, process.env.SECRET_KEY)

    return{
        token: 'Bearer ' + signedToken
    }
}

export const JwtStrategy = new Strategy(options, async ( jwt_payload , done )=>{
    const user = userDao.read(jwt_payload.sub)
    .then((user)=>{
        if (user) {
            return done(null, user);
    }else {
        return done(null, false);
    }})
    .catch(err => done(null, err))
} );

