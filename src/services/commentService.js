const BaseService = require("./baseService");
let _commentRepository = null;
let _ideaRepository = null;

class UserService extends BaseService {
  constructor({ CommentRepository, IdeaRepository }) {
    super(CommentRepository);
    _commentRepository = CommentRepository;
    _ideaRepository = IdeaRepository;
  }

  async getIdeaComments(ideaId) {
    if (!ideaId) {
      const error = new Error();
      error.status = 400;
      error.message = "idea must be sent";
    }

    const idea = await _ideaRepository.get(ideaId);
    if (!idea) {
      const error = new Error();
      error.status = 404;
      error.message = "Idea does not exist";
      throw error;
    }
    const { comments } = idea;
    return comments;
  }

  async createdComment(comment, ideaId) {
    if (!ideaId) {
      const error = new Error();
      error.status = 400;
      error.message = "idea must be sent";
    }

    const idea = await _ideaRepository.get(ideaId);
    if (!idea) {
      const error = new Error();
      error.status = 404;
      error.message = "Idea does not exist";
      throw error;
    }

    const createdComment = await _commentRepository.create(comment);
    idea.comments.push(createdComment);
    return _ideaRepository.update(ideaId, { comments: idea.comments });
  }
}

module.exports = UserService;