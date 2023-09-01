module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: ''}
    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo déjà pris ou inférieur à 3 caractères";

    if (err.message.includes('email'))
        errors.email = 'Email déjà pris';

    if (err.message.includes('password'))
        errors.password = "Le mot de passe doit faire 6 caractères minimum";
    
    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''};
    
    console.log(err);
    if (err.message.includes("Email")) 
        errors.email = "Email inconnu";
    
    if (err.message.includes('Mot de passe'))
        errors.password = "Le mot de passe ne correspond pas";

    return errors;
}