const BaseRepository = require("./baseRepository");
let _comment = null;

class CommentRepository extends BaseRepository {
  constructor(Comment) {
    super(Comment);
    _comment = Comment;
  }
}

module.exports = CommentRepository;
