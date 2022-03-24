const router = require("express").Router();
const controller = require("../controllers/post");
const { validParam, validBody, validToken } = require("../ultis/validation");
const { schemaParam, schemaBody } = require("../ultis/joiSchema");
const { saveImages, saveImage } = require("../ultis/imgTra");

router
  .route("/")
  .get(controller.all)
  .post(
    saveImage,
    saveImages,
    validToken,
    validBody(schemaBody.post.body),
    controller.add
  );

router
  .route("/:id")
  .get([validParam(schemaParam.id, "id"), controller.get])
  .patch(
    saveImages,
    saveImage,
    validToken,
    validParam(schemaParam.id, "id"),
    validBody(schemaBody.post.patch),
    controller.patch
  )
  .delete(validToken, validParam(schemaParam.id, "id"), controller.drop);

router.get("/category/:category", [
  validParam(schemaParam.category, "category"),
  controller.getByCategory,
]);

router.get(
  "/user/:id",
  validParam(schemaParam.id, "id"),
  controller.getByUserId
);
module.exports = router;
