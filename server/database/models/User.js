const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// Vamos fingir que eu sei de-cor a regra normal de emails ???
const validateEmail = (email) => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*$/;
    return regexEmail.test(email);
}

const userSchema = new Schema({
    background: {
        type: Object,
        required: false
    },
    board: {
        type: Object,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validade: [validateEmail, 'Que tal colocar um email valido?'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*$/, 'Te contar um segredo, o seu email ta escrito errado.... Não espalha']
    },
    ground: {
        type: Object,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: Object,
        required: false
    }
});
// Se eu aprendi certo no JP
// Cria um hash de criptografia senha
userSchema.methods.hashPsw = password => bcrypt.hashSync(password, bcrypt.genSaltSync());
// Quebra a criptografia
userSchema.methods.comparePsw = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = mongoose.model('User', userSchema);