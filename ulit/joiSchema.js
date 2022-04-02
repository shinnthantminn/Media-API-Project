const joi = require("joi");

module.exports = {
  schemaBody: {
    category: {
      body: joi.object({
        user: joi.optional(),
        title: joi.string().min(3).required(),
        description: joi.string().min(3).required(),
      }),
      patch: joi.object({
        user: joi.optional(),
        title: joi.string().min(3),
        description: joi.string().min(3),
      }),
    },
    user: {
      body: joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().min(3).max(8).required(),
        image: joi.string().required(),
      }),
      patch: joi.object({
        name: joi.string().min(3),
        email: joi.string().email(),
        password: joi.string().min(3).max(8),
        image: joi.string(),
      }),
    },
    post: {
      body: joi.object({
        user: joi.optional(),
        category: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        tag: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        title: joi.string().required(),
        content: joi.string().required(),
        image: joi.string().required(),
      }),
      patch: joi.object({
        user: joi.optional(),
        category: joi.string().regex(/^[0-9a-fA-F]{24}$/),
        tag: joi.string().regex(/^[0-9a-fA-F]{24}$/),
        title: joi.string(),
        content: joi.string(),
        image: joi.string(),
      }),
    },
    tag: {
      body: joi.object({
        user: joi.optional(),
        title: joi.string().min(3).required(),
        image: joi.string().required(),
      }),
      patch: joi.object({
        user: joi.optional(),
        title: joi.string().min(3),
        image: joi.string(),
      }),
    },
    comment: {
      body: joi.object({
        user: joi.optional(),
        post: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        comment: joi.string().min(3).required(),
      }),
      patch: joi.object({
        user: joi.optional(),
        post: joi.string().regex(/^[0-9a-fA-F]{24}$/),
        comment: joi.string().min(3),
      }),
    },
  },
  schemaParams: {
    id: joi.object({
      id: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    page: joi.object({
      page: joi.number().required(),
    }),
  },
};
