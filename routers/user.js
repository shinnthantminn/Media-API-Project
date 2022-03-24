const router = require("express").Router();
const controller = require("../controllers/user");
const { schemaBody, schemaParam } = require("../ultis/joiSchema");
const { validParam, validBody } = require("../ultis/validation");
const { saveImage, saveImages } = require("../ultis/imgTra");

router.route("/").get(controller.all);

router.post("/", [controller.login]);

router.post(
  "/register",
  saveImage,
  saveImages,
  validBody(schemaBody.user.body),
  controller.register
);

router
  .route("/:id")
  .get(validParam(schemaParam.id, "id"), controller.get)
  .patch(
    saveImage,
    saveImages,
    validBody(schemaBody.user.patch),
    validParam(schemaParam.id, "id"),
    controller.patch
  )
  .delete(validParam(schemaParam.id, "id"), controller.drop);

module.exports = router;
