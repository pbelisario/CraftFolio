const ENV = process.env.NODE_ENV || 'test';

// So' pq o mongoDB e' gratuito,
// recomendo, recomendar para os alunos
module.exports = (moongoose) => {
    if (ENV === 'test') {
        moongoose.connect('mongodb+srv://pbelisario:EuTbrJWnJXLYCmly@craftfolio-mn9o7.mongodb.net/test?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true });
        moongoose.connection.on('error', () => { throw new Error ('MongoDb, deu pau e não conectou'); });
        moongoose.connection.once('open', () => {
            console.log('MongoDB conectou');
        });
    }
    else if (ENV === 'prod') {
        moongoose.connect(process.env.MONGO, {useCreateIndex: true, useNewUrlParser: true});
        moongoose.connection.on('error', () => { throw new Error ('MongoDb, deu pau e não conectou'); });
        moongoose.connection.once('open', () => {
            console.log('MongoDB conectou');
        });
    }
};