const router = require("express").Router();
const controller = require("../controllers/tag");
const {
  validateToken,
  validateUnique,
  validateBody,
  validateParam,
  validatePermission,
} = require("../ulit/validation");
const DB = require("../models/tag");
const { saveImage, saveImages } = require("../ulit/imgTransfer");
const { schemaBody, schemaParams } = require("../ulit/joiSchema");

router
  .route("/")
  .get(controller.all)
  .post(
    validateToken,
    validateUnique(DB, "title"),
    saveImage,
    saveImages,
    validateBody(schemaBody.tag.body),
    controller.add
  );

router
  .route("/:id")
  .get(validateParam(schemaParams.id, "id"), controller.get)
  .patch(
    validateToken,
    validateParam(schemaParams.id, "id"),
    validatePermission(DB),
    saveImage,
    saveImages,
    controller.patch
  )
  .delete(
    validateToken,
    validateParam(schemaParams.id, "id"),
    validatePermission(DB),
    controller.drop
  );

module.exports = router;
