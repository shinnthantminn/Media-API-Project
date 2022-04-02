const router = require("express").Router();
const controller = require("../controllers/user");
const {
  validateBody,
  validateUnique,
  validateParam,
} = require("../ulit/validation");
const { schemaParams, schemaBody } = require("../ulit/joiSchema");
const { saveImage, saveImages } = require("../ulit/imgTransfer");
const userDB = require("../models/user");

router.route("/").get(controller.all);
router.post("/register", [
  validateUnique(userDB, "name", "email"),
  saveImage,
  saveImages,
  validateBody(schemaBody.user.body),
  controller.register,
]);

router.post("/", controller.login);

router
  .route("/:id")
  .get(validateParam(schemaParams.id, "id"), controller.get)
  .patch(
    validateParam(schemaParams.id, "id"),
    saveImage,
    saveImages,
    validateBody(schemaBody.user.patch),
    controller.patch
  )
  .delete(validateParam(schemaParams.id, "id"), controller.drop);

module.exports = router;
