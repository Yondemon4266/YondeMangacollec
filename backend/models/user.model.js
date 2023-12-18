const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { determineGrade } = require("../Utils");

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
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
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
      required: true,
      default: "",
    },
    island: {
      type: String,
      required: true,
      default: "",
    },
    grade: {
      type: String,
      required: true,
      default: function () {
        return this.determineGrade();
      },
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

userSchema.methods.determineGrade = function () {
  const userLevel = this.level;
  const universe = this.universe;
  const marineorpirate = this.marineorpirate;
  const grade = determineGrade(userLevel, universe, marineorpirate);
  return grade;
};



const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
