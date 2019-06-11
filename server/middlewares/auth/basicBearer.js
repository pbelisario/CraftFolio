const jwt = require('jsonwebtoken');
const { Strategy } = require('passport-http-bearer');

const User = require('../../database').models.User;

const chaveJWT = process.env.JWT_SECRET || 'super-craft';

const configBearerStrategy = (passport) => {
    passport.use(`BasicBearer`, new Strategy((token, done) => {
        jwt.verify(token, chaveJWT, (err, decoded) => {
            if (err) {
                return done({status: 401, msg: 'Unauthorized', err});
            }
            return User.findById(decoded.id)
                .then((result) => {
                    const reqUser = {
                        id: result.id
                    };
                    return done(null, reqUser);
                })
                .catch(erro => done({status: 401, msg: 'Unauthorized', erro}))
        });
    }));
};

module.exports = configBearerStrategy;