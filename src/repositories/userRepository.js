const BaseRepository = require("./baseRepository");
let _user = null;

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
    _user = User;
  }

  async getUserByUserName(username) {
    return await _user.findOne({ username });
  }
}

module.exports = UserRepository;
