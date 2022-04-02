const {
  validateToken,
  validateBody,
  validateParam,
  validatePermission,
} = require("../ulit/validation");
const controller = require("../controllers/comment");
const { schemaBody, schemaParams } = require("../ulit/joiSchema");
const router = require("express").Router();
const db = require("../models/comment");

router.post("/", [
  validateToken,
  validateBody(schemaBody.comment.body),
  controller.add,
]);

router.get("/:id", [
  validateParam(schemaParams.id, "id"),
  controller.getByPost,
]);

router.delete("/:id", [validateToken, validatePermission(db), controller.drop]);

router.patch("/:id", [
  validateToken,
  validatePermission(db),
  validateParam(schemaParams.id, "id"),
  validateBody(schemaBody.comment.patch),
  controller.patch,
]);

module.exports = router;
