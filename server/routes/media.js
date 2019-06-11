const passport = require('passport');
const { Router } = require('express');

const controllers = require('../controllers');

const router = new Router();

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    controllers.Media.getAllByUser(userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

router.put('/:mediaId', passport.authenticate('basicBearer', { session: false }), (req, res, next) => {
    const mediaId = req.params.mediaId;
    const updateData = req.body;
    controllers.Media.editMedia(mediaId, updateData)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/:mediaId', passport.authenticate('basicBearer', { session: false }), (req, res, next) => {
    const mediaId = req.params.mediaId;
    controllers.Media.deleteMedia(mediaId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/', passport.authenticate('basicBearer', { session: false }), (req, res, next) => {
    const userId = req.user.id;
    const newMedia = req.body;
    controllers.Media.createMedia(newMedia, userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
