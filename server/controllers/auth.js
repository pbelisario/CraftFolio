const jwt = require('jsonwebtoken');

const database = require('../database');

class AuthController {
    constructor() {
        this.models = database.models;
        this.jwtSecret = process.env.JWT_SECRET || 'super-craft';
    }

    searchUsers(param) {
        const searchParam = `${param}`;
        return new Promise((resolve, reject) => {
            this.models.User.find({ name: { $regex: searchParam, $options: 'i' } }).select({ _id: 1, name: 1 })
                .exec((err, data) => {
                    if (err) {
                        reject({ status: 500, msg: 'Erro Interno, Nao Achei ele nao', err });
                    } else {
                        resolve(data);
                    }
                });
        });
    }

    getName(userId) {
        return new Promise((resolve, reject) => {
            this.models.User.findById(userId).select({ name: 1 })
                .exec((err, data) => {
                    if (err) {
                        reject({ status: 500, msg: 'Erro Interno, não achei esse usuario nao', err });
                    } else {
                        resolve(data);
                    }
                });
        });
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            // Tem usuário que já esqueci a senha, melhor impedir genios como eu
            if (user.password === undefined) {
                reject({ status: 409, msg: 'Que tal escrever uma senha?', err: null });
            }
            // Checa por duplicata no BD
            this.models.User.findOne({ email: user.email.toString() }, (err, data) => {
                if (data) {
                    reject({ status: 409, msg: 'Email ja salvo, rapaz', err: null });
                } else {
                    const newUser = new this.models.User(user);
                    newUser.password = newUser.hashPsw(user.password);
                    // Salva no usuário no DB
                    newUser.save((er) => {
                        // Error no Mongoose
                        if (er) {
                            reject({ status: 409, msg: 'Deu para criar o usuário nao', err });
                        } else {
                            
                            resolve();
                        }
                    });
                }
                // Erro interno, não achou a query
                if (err) {
                    reject({ status: 500, msg: 'Esse usuário nao da para criar nao', err });
                }
            });
        });
    }

    signInUser(err, user, info) {
        return new Promise((resolve, reject) => {
            if (err) {
                reject({ status: 500, msg: 'Erro Interno', err });
            }
            if (!user) {
                reject({ status: 401, msg: info.message, err: null });
            }
            const payload = {
                id: user.id,
            };
            const options = {
                expiresIn: '7 days',
            };
            let token = 'bearer ';
            token += jwt.sign(payload, this.jwtSecret, options);
            resolve({ result: 'Success', token, userId: user._id });
        });
    }

    checkToken(user) {
        return new Promise((resolve, reject) => {
            if (user) {
                const resJSON = {
                    result: 'Success',
                    userId: user.id,
                };
                resolve(resJSON);
            }
            reject({ status: 401, msg: '', err: null });
        });
    }
}

module.exports = new AuthController();
