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

module.exports.userColleclistPatch = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Id non reconnu : " + req.params.id);
    try {
        const updates = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id,
            { $set: updates},
            {new: true }
            ).select("-password -picture -updatedAt -email -createdAt -pseudo");
        if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
        
        res.status(200).send(updatedUser);
    } catch (err) {
        return res.status(404).send(err + "Utilisateur non trouvé pour l'ID: " + req.params.id);
    }
};

module.exports.userColleclistDelete = async (req, res) => {
    console.log(req.params.malid);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Id non reconnu : " + req.params.id);
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé"});
        user.colleclist = user.colleclist.filter((element) => element.mal_id != req.params.malid);
        await user.save();
        return res.status(204).send();
    } catch (err) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de la suppression de l'élément " });
    }
};
