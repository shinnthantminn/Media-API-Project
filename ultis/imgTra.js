module.exports = {
  saveImage: async (req, res, next) => {
    if (req.files && req.files.file) {
      let file = req.files.file;
      const name = new Date().valueOf() + "" + file.name;
      await file.mv(`./upload/${name}`);
      req.body.image = name;
      next();
    } else next();
  },
  saveImages: async (req, res, next) => {
    if (req.files && req.files.files) {
      let file = req.files.files;
      let obj = [];
      file.forEach((i) => {
        let name = new Date().valueOf() + "" + i.name;
        obj.push(name);
        i.mv(`./upload/${name}`);
      });
      let fileName = obj.join(",");
      req.body.image = fileName;
      next();
    } else next();
  },
};
