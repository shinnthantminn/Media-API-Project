module.exports = {
  saveImage: (req, res, next) => {
    if (req.files && req.files.file) {
      const file = req.files.file;
      const name = new Date().valueOf() + "" + file.name;
      file.mv(`./upload/User/${name}`);
      req.body.image = name;
      next();
    } else next();
  },
  saveImages: (req, res, next) => {
    if (req.files && req.files.files) {
      const file = req.files.files;
      const obj = [];
      file.map((i) => {
        const name = new Date().valueOf() + "" + i.name;
        i.mv(`./upload/User/${name}`);
        obj.push(name);
      });
      const fileName = obj.join(",");
      req.body.image = fileName;
      next();
    } else next();
  },
};
