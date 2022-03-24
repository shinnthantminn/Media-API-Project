const router = require("express").Router();
const controller = require("../controllers/category");
const { validBody, validParam } = require("../ultis/validation");
const { schemaBody, schemaParam } = require("../ultis/joiSchema");
const { saveImage, saveImages } = require("../ultis/imgTra");

router
  .route("/")
  .get(controller.all)
  .post(
    saveImage,
    saveImages,
    validBody(schemaBody.category.body),
    controller.add
  );

router
  .route("/:id")
  .get(validParam(schemaParam.id, "id"), controller.get)
  .patch(
    saveImages,
    saveImage,
    validParam(schemaParam.id, "id"),
    validBody(schemaBody.category.patch),
    controller.patch
  )
  .delete(validParam(schemaParam.id, "id"), controller.drop);

module.exports = router;
