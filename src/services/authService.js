const { generateToken } = require("../helpers/jwtHelper");
let _userService = null;

class AuthServce {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async signUp(user) {
    const { username } = user;
    const userExist = await _userService.getUserByUserName(username);
    if (userExist) {
      const error = new Error();
      error.status = 400;
      error.message = "User Already exists";
      throw error;
    }

    return await _userService.create(user);
  }

  async signIn(user) {
    const { username, password } = user;
    const userExist = await _userService.getUserByUserName(username);
    if (!userExist) {
      const error = new Error();
      error.status = 404;
      error.message = "User does not exists";
      throw error;
    }

    const valiPassword = userExist.comparePassword(password);
    if (!valiPassword) {
      const error = new Error();
      error.status = 400;
      error.message = "Invalid password";
      throw error;
    }

    const userToEncode = {
      username: userExist.username,
      id: userExist._id
    };

    const token = generateToken(userToEncode);
    return { token, user: userExist };
  }
}

module.exports = AuthServce;
