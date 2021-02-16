const UserModel = require("../users/schema");
const atob = require("atob");

const basicAuthMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    //cheching if header exists
    const error = new Error("Please provide a basic authentication");
    error.httpStatusCode = 401;
    next(error);
  } else {
    const [username, password] = atob(
      //extract email & pasworld from authorization header
      req.headers.authorization.split(" ")[1] //with spilt ; first Basic; second is code
    ).split(":");
    // console.log(username);
    // console.log(password);

    const user = await UserModel.findByCredentials(username, password); //find user by credentials. INFO IS RECEIVED FROM SCHEMA.JS
    if (!user) {
      const error = new Error("Wrong credentials provided");
      error.httpStatusCode = 401;
      next(error);
    } else {
      req.user = user;
    }

    next();
  }
};

const adminOnlyMiddleware = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    const error = new Error("Only admin is alowed!");
    error.httpStatusCode = 403;
    next(error);
  }
};

module.exports = {
  basic: basicAuthMiddleware,
  adminOnly: adminOnlyMiddleware,
};
