const router = require("express").Router();
const controller = require("../controllers/post");
const {
  validateToken,
  validateBody,
  validateParam,
  validatePermission,
} = require("../ulit/validation");
const { schemaBody, schemaParams } = require("../ulit/joiSchema");
const { saveImages, saveImage } = require("../ulit/imgTransfer");
const DB = require("../models/post");

router
  .route("/")
  .get(controller.all)
  .post(
    validateToken,
    saveImages,
    saveImage,
    validateBody(schemaBody.post.body),
    controller.add
  );

router.get("/:id", [validateParam(schemaParams.id, "id"), controller.get]);

router.get("/byCategory/:id", [
  validateParam(schemaParams.id, "id"),
  controller.byCategory,
]);

router.get(
  "/like/:id/:page",
  [validateParam(schemaParams.id, "id")],
  controller.toggle
);

router.get("/byTag/:id", [
  validateParam(schemaParams.id, "id"),
  controller.byTag,
]);

router.get("/byUser/:id", [
  validateParam(schemaParams.id, "id"),
  controller.byUser,
]);

router.patch("/:id", [
  validateToken,
  validateParam(schemaParams.id, "id"),
  validatePermission(DB),
  saveImages,
  saveImage,
  validateBody(schemaBody.post.patch),
  controller.patch,
]);

router.delete("/:id", [
  validateToken,
  validateParam(schemaParams.id, "id"),
  validatePermission(DB),
  controller.drop,
]);

router.get(
  "/paginate/:page",
  validateParam(schemaParams.page, "page"),
  controller.paginate
);

module.exports = router;
