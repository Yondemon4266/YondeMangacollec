const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send({ message: "Pas pu récupérer allusers" });
  }
};

module.exports.userInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu : " + req.params.id);
  try {
    await UserModel.findById(req.params.id)
      .select("-password")
      .then((docs) => {
        if (!docs) {
          return res
            .status(404)
            .send("Utilisateur non trouvé pour l'ID: " + req.params.id);
        }

        res.status(200).send(docs);
      });
  } catch (err) {
    return res
      .status(404)
      .send({ message: "Utilisateur non trouvé pour l'ID: " + req.params.id });
  }
};

module.exports.userColleclistPatch = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu : " + req.params.id);
  try {
    const updates = req.body.colleclist;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $push: { colleclist: updates } },
      { new: true }
    ).select("-password -picture -updatedAt -email -createdAt -pseudo");
    if (!updatedUser)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).send(updatedUser);
  } catch (err) {
    return res
      .status(404)
      .send(err + "Utilisateur non trouvé pour l'ID: " + req.params.id);
  }
};

module.exports.userColleclistDelete = async (req, res) => {
  console.log(req.params.malid);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu : " + req.params.id);
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    user.colleclist = user.colleclist.filter(
      (element) => element.mal_id != req.params.malid
    );
    await user.save();
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'élément " });
  }
};

module.exports.userBookMarkPatch = async (req, res) => {
  console.log(req.body.bookMarkValue);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu : " + req.params.id);
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    const index = user.colleclist.findIndex(
      (element) => element.mal_id == req.params.malid
    );

    if (index === -1)
      return res
        .status(404)
        .json({ message: "Élément non trouvé dans colleclist" });

    const updatedObject = {
      ...user.colleclist[index],
      bookMarkValue: req.body.bookMarkValue,
    };
    user.colleclist[index] = updatedObject;

    await user.save();

    return res.status(200).json({
      message:
        "Donnée ajoutée avec succès à l'élément spécifique de colleclist",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports.userPopularityPatch = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu : " + req.params.id);
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    const index = user.colleclist.findIndex(
      (element) => element.mal_id == req.params.malid
    );

    if (index === -1)
      return res
        .status(404)
        .json({ message: "Élément non trouvé dans colleclist" });

    const updatedObject = {
      ...user.colleclist[index],
      popularityValue: req.body.popularityValue,
    };
    user.colleclist[index] = updatedObject;

    await user.save();

    return res.status(200).json({
      message:
        "Donnée ajoutée avec succès à l'élément spécifique de colleclist",
      data: updatedObject,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports.userLevelAddPatch = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu : " + req.params.id);
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    let levelBefore = user.level;
    user.level += 0.25;

    await user.save();
    if (Number.isInteger(user.level) && user.level > levelBefore) {
      return res.status(200).json({
        message: "Niveau augmenté !",
        data: user.level,
      });
    } else {
      return res.status(200).json({
        message: "Expérience ajoutée avec succès",
        data: user.level,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
module.exports.userLevelRemovePatch = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu : " + req.params.id);
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    let levelBefore = user.level;
    user.level -= 0.25;

    await user.save();
    if (user.level < Math.floor(levelBefore)) {
      return res.status(200).json({
        message: "Niveau enlevé !",
        data: user.level,
      });
    } else {
      return res.status(200).json({
        message: "Expérience enlevée avec succès",
        data: user.level,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// USER CHANGES

module.exports.userEmailChange = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu : " + req.params.id);
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "Adresse email déjà utilisée par un autre utilisateur",
        });
    } else {
      user.email = req.body.email;
      await user.save();
      return res
        .status(200)
        .json({
          message: "Adresse email mise à jour avec succès",
          mail: user.email,
        });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur", err });
  }
};

module.exports.userPseudoChange = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu : " + req.params.id);
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    const existingUser = await UserModel.findOne({ pseudo: req.body.pseudo });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Pseudo déjà utilisé par un autre utilisateur" });
    } else {
      user.pseudo = req.body.pseudo;
      await user.save();
      return res
        .status(200)
        .json({
          message: "Pseudo mis à jour avec succès",
          pseudo: user.pseudo,
        });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur", err });
  }
};

module.exports.userPasswordChange = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Id non reconnu : " + req.params.id);
  }

  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier que le nouveau mot de passe est différent de l'ancien
    if (await bcrypt.compare(req.body.password, user.password)) {
      return res.status(400).json({
        message: "Le nouveau mot de passe doit être différent de l'ancien",
      });
    }
    if (await bcrypt.compare(req.body.oldpassword, user.password)) {
      // Hasher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Mettre à jour le mot de passe haché dans la base de données
      user.password = hashedPassword;
      await user.save();

      return res
        .status(200)
        .json({ message: "Mot de passe mis à jour avec succès" });
    } else {
      return res
        .status(400)
        .json({ message: "L'ancien mot de passe n'est pas valide" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur", err });
  }
};

// USER CHANGE END

module.exports.userSendIdea = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu : " + req.params.id);
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    user.ideas += req.body.idea;
    await user.save();
    return res
      .status(200)
      .json({ message: "Idée reçue avec succès", idee: user.ideas });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur", err });
  }
};
