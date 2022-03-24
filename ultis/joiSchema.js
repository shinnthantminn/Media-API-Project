const Joi = require("joi");
module.exports = {
  schemaBody: {
    category: {
      body: Joi.object({
        title: Joi.string().min(3).required(),
        image: Joi.string().required(),
      }),
      patch: Joi.object({
        title: Joi.string().min(3),
        image: Joi.string(),
      }),
    },
    user: {
      body: Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        image: Joi.string().required(),
        password: Joi.string().min(5).required(),
      }),
      patch: Joi.object({
        name: Joi.string().min(3),
        email: Joi.string().email(),
        image: Joi.string(),
        password: Joi.string().min(5),
      }),
    },
    post: {
      body: Joi.object({
        user: Joi.optional(),
        category: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
        image: Joi.string(),
      }),
      patch: Joi.object({
        user: Joi.optional(),
        category: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        title: Joi.string(),
        content: Joi.string(),
        image: Joi.string(),
      }),
    },
  },
  schemaParam: {
    id: Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    category: Joi.object({
      category: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};
