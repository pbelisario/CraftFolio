const {Strategy} = require('passport-local');
const User = require('../../database').models.User;

const configPassportLocalStrategy = (passport) => {
    passport.use('local', new Strategy((username, password, done) => {
       User.findOne({email: username}, (err, user) => {
           if (err) return done(err);
           if (!user) return done(null, false, {message: `Ja' pensou em criar esse usua'rio, para poder acessar o site`});
           if (user.comparePsw(password, user.password)) return done(null, user);
           return done(null, false, {message: `Não e' essa senha não, Tente Novamente`});
       }); 
    }));
};

module.exports = configPassportLocalStrategy;