const database = require('../database');

class MediaController {
    constructor() {
        this.models = database.models;
    }

    createMedia(newMedia, userId) {
        return new Promise((resolve, reject) => {
            const mediaData = newMedia;
            mediaData.user = userId;
            const media = new this.models.Media(mediaData);

            media.save((err) => {
                if (err) {
                    reject({ status: 409, msg: 'Nossos gnomos são alergicos à esse arquivo #FKDIK', err });
                } else {
                    resolve(mediaData);
                }
            });
        });
    }

    getAllByUser(userId) {
        return new Promise((resolve, reject) => {
            this.models.Media.find({ user: userId })
                .exec((err, medias) => {
                    if (err) {
                        reject({ status: 500, msg: 'Erro Interno, não deu para pegar o que vc pediu (É um 404 de media rapaz)', err });
                    } else {
                        resolve(medias);
                    }
                });
        });
    }

    editMedia(mediaId, newData) {
        const options = { runValidators: true };
        return new Promise((resolve, reject) => {
            this.models.Media.findOneAndUpdate({ _id: mediaId }, newData, options)
                .exec((err, media) => {
                    if (err || !media) {
                        reject({ status: 500, msg: 'Sem chance de atualizar', err });
                    }
                    resolve(media);
                });
        });
    }

    deleteMedia(mediaId) {
        return new Promise((resolve, reject) => {
            this.models.Media.findByIdAndDelete(mediaId)
                .exec((err) => {
                    if (err) {
                        reject({ status: 500, msg: 'Da para deletar isso nao', err });
                    }
                    resolve();
                });
        });
    }
}

module.exports = new MediaController();
