const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.userInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Id non reconnu : " + req.params.id);
    try {
        await UserModel.findById(req.params.id)
        .select("-password")
        .then((docs) => {
            if (!docs) {
                return res.status(404).send("Utilisateur non trouvé pour l'ID: " + req.params.id);
            }
            console.log(docs);
            res.status(200).send(docs);
            
        })
    } catch (err) {
        return res.status(404).send("Utilisateur non trouvé pour l'ID: " + req.params.id);
    }
};