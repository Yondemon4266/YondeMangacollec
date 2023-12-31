const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const isEmail = validator.isEmail;

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 16,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: isEmail,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLength: 6,
    },
    bio: {
      type: String,
      max: 1024,
    },
    colleclist: {
      type: [],
      required: true, // La propriété colleclist est requise
    },
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    village: {
      type: String,
      default: "",
    },
    island: {
      type: String,
      default: "",
    },
    ideas: {
      type: String,
      default: "",
    },
    universe: {
      type: String,
      default: "",
    },
    marineorpirate: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    bgimg: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Mot de passe incorrect");
  }
  throw Error("Email incorrect");
};




const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
