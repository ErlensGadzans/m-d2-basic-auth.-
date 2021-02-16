const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
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
