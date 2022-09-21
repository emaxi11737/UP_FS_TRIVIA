export const TYPES = {
    UserService: Symbol.for("UserService"),
    QuestionCategoryService: Symbol.for("QuestionCategoryService"),
    QuestionService: Symbol.for("QuestionService"),
    AuthService: Symbol.for("AuthService"),
    IUserRepository: Symbol.for("IUserRepository"),
    IQuestionCategoryRepository: Symbol.for("IQuestionCategoryRepository"),
    IQuestionRepository: Symbol.for("IQuestionRepository"),
    IGameRepository: Symbol.for("IGameRepository"),
    GameService: Symbol.for("GameService"),
    AnswerService: Symbol.for("AnswerService"),
    IAnswerRepository: Symbol.for("IAnswerRepository"),
    LoggerMiddleware: Symbol.for("LoggerMiddleware"),
    AdminRoleMiddleware: Symbol.for("AdminRoleMiddleware"),
    ITokenRepository: Symbol.for("ITokenRepository")
};
