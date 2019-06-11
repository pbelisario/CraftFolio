const passport = require('passport');
const { Router } = require('express');

const controllers = require('../controllers');

const router = new Router();

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    controllers.Text.getAllByUser(userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

router.put('/:textId', passport.authenticate('basicBearer', { session: false }), (req, res, next) => {
    const textId = req.params.textId;
    const updateData = req.body;
    controllers.Text.editText(textId, updateData)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/:textId', passport.authenticate('basicBearer', { session: false }), (req, res, next) => {
    const textId = req.params.textId;
    controllers.Text.deleteText(textId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/', passport.authenticate('basicBearer', { session: false }), (req, res, next) => {
    const userId = req.user.id;
    const newText = req.body;
    controllers.Text.createText(newText, userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
