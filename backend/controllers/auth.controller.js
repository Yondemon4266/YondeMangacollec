const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

// 3 jours de durée pour le jwtoken
const maxAge = 3 * 24 * 60 * 60 * 1000; 
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body;

    try {
        const user = await UserModel.create({pseudo,email, password});
        res.status(201).json({message: "Utilisateur : " + user.pseudo + " inscrit avec succès" , user: user._id});
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(400).send({errors});
    }
};

module.exports.signIn = async (req, res) => {
    const {email,password } = req.body;
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge, sameSite: "None", secure: true});
        res.status(200).json({ message: "Utilisateur : " + user.pseudo + " connecté avec succès", user: user._id});
    } catch (err) {
        const errors = signInErrors(err);
        res.status(400).json({errors} + err);
    }
};

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1, sameSite: "None", secure: true});
    console.log('déconnecté');
    res.redirect('/');
};

