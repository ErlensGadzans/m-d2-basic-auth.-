const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
});

UserSchema.statics.findByCredentials = async function (
  username,
  palinPassword
) {
  const user = await this.findOne({ username }); //FIRST LOOKING FOR USERNAME IN LIST. "THIS" IS SEARCHING FROM SCHEMA

  if (user) {
    //IF THERE IS A USER, THEN ARE LOOKIN FOR PASWORD TO MATCH
    const isMatch = await bcrypt.compare(palinPassword, user.password);
    if (isMatch) return user;
    else return null;
  } else return null;
};

UserSchema.pre("save", async function (next) {
  //pre saving users data
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12); // modifying pasword of user
  }
  next();
});

module.exports = model("User", UserSchema);
