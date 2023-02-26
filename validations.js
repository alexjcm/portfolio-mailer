const { check } = require('express-validator');

exports.bodyEmailValidation = [
    check('name', 'name is required').not().isEmpty(),
    check('to', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('message', 'message is required').not().isEmpty()
    //check('to', 'Username Must Be an Email Address').isEmail().trim().escape().normalizeEmail(),
]