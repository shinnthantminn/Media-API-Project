const router = require("express").Router();
const controller = require("../controllers/category");
const {
  validateBody,
  validateUnique,
  validateParam,
  validateToken,
  validatePermission,
} = require("../ulit/validation");
const { schemaBody, schemaParams } = require("../ulit/joiSchema");
const DB = require("../models/category");

router
  .route("/")
  .get(controller.all)
  .post(
    validateToken,
    validateBody(schemaBody.category.body),
    validateUnique(DB, "title"),
    controller.add
  );

router
  .route("/:id")
  .get(validateParam(schemaParams.id, "id"), controller.get)
  .patch(
    validateToken,
    validatePermission(DB),
    validateParam(schemaParams.id, "id"),
    validateBody(schemaBody.category.patch),
    controller.patch
  )
  .delete(
    validateToken,
    validatePermission(DB),
    validateParam(schemaParams.id, "id"),
    controller.drop
  );

module.exports = router;
