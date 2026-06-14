const fs = require("fs");
const path = require("path");
const {uploadToCloudinary } = require("../middleware/upload");

const cloudinary = require("../config/cloudinary");

const DB_FILE = path.join(__dirname,"../data/home.json");

// =============================
// DEFAULT DATA
// =============================
const defaultData = {
  banners: [],
  students: [],
};

// =============================
// READ DATA
// =============================
const readData = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      writeData(defaultData);
      return defaultData;
    }

    const raw =
      fs.readFileSync(
        DB_FILE,
        "utf-8"
      );

    return raw
      ? JSON.parse(raw)
      : defaultData;

  } catch (err) {
    console.log(
      "Read error:",
      err
    );

    return defaultData;
  }
};

// =============================
// WRITE DATA
// =============================
const writeData = (
  data
) => {
  const dir =
    path.dirname(DB_FILE);

  if (
    !fs.existsSync(dir)
  ) {
    fs.mkdirSync(dir, {
      recursive: true,
    });
  }

  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(
      data,
      null,
      2
    )
  );
};

// =============================
// CLOUDINARY UPLOAD
// =============================
const uploadImage =
  async (
    file,
    folder
  ) => {
    if (!file)
      return null;

    const result =
      await uploadToCloudinary(
        file.buffer,
        folder,
        file.mimetype
      );

    return {
      id:
        result.public_id,

      url:
        result.secure_url,

      type:
        result.resource_type,
    };
  };

// =============================
// GENERIC CRUD
// =============================

// CREATE
const createItem =
  async (
    req,
    res,
    type,
    folder,
    fields
  ) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({
            error:
              "Image required",
          });
      }

      const uploaded =
        await uploadImage(
          req.file,
          folder
        );

      const newItem = {
        id:
          Date.now().toString(),

        image:
          uploaded.url,

        cloudinary_id:
          uploaded.id,

        media_type:
          uploaded.type,

        ...fields(
          req.body
        ),
      };

      const data =
        readData();

      data[type].push(
        newItem
      );

      writeData(data);

      res.json(
        newItem
      );

    } catch (err) {
      res
        .status(500)
        .json({
          error:
            err.message,
        });
    }
  };

// GET
const getItems = (
  req,
  res,
  type
) => {
  try {
    const data =
      readData();

    res.json(
      data[type] || []
    );

  } catch (err) {
    res
      .status(500)
      .json({
        error:
          err.message,
      });
  }
};

// DELETE
const deleteItem =
  async (
    req,
    res,
    type
  ) => {
    try {
      const { id } =
        req.params;

      const data =
        readData();

      const item =
        data[type].find(
          (i) =>
            i.id === id
        );

      // delete from cloudinary
      if (
        item?.cloudinary_id
      ) {
        await cloudinary.uploader.destroy(
          item.cloudinary_id,
          {
            resource_type:
              item.media_type ===
              "video"
                ? "video"
                : "image",
          }
        );
      }

      data[type] =
        data[type].filter(
          (item) =>
            item.id !== id
        );

      writeData(data);

      res.json({
        message:
          `${type} deleted`,
      });

    } catch (err) {
      res
        .status(500)
        .json({
          error:
            err.message,
        });
    }
  };

// UPDATE
const updateItem =
  async (
    req,
    res,
    type,
    folder,
    fields
  ) => {
    try {
      const { id } =
        req.params;

      const data =
        readData();

      const uploaded =
        req.file
          ? await uploadImage(
              req.file,
              folder
            )
          : null;

      data[type] =
        await Promise.all(
          data[type].map(
            async (
              item
            ) => {
              if (
                item.id !==
                id
              ) {
                return item;
              }

              // delete old image
              if (
                uploaded &&
                item.cloudinary_id
              ) {
                await cloudinary.uploader.destroy(
                  item.cloudinary_id,
                  {
                    resource_type:
                      item.media_type ===
                      "video"
                        ? "video"
                        : "image",
                  }
                );
              }

              return {
                ...item,

                ...fields(
                  req.body,
                  item
                ),

                image:
                  uploaded?.url ||
                  item.image,

                cloudinary_id:
                  uploaded?.id ||
                  item.cloudinary_id,

                media_type:
                  uploaded?.type ||
                  item.media_type,
              };
            }
          )
        );

      writeData(data);

      res.json({
        message:
          `${type} updated`,
      });

    } catch (err) {
      res
        .status(500)
        .json({
          error:
            err.message,
        });
    }
  };

// =====================================
// BANNERS
// =====================================

exports.uploadBanner = (
  req,
  res
) =>
  createItem(
    req,
    res,
    "banners",
    "banners",
    (body) => ({
      title:
        body.title,

      description:
        body.description,
    })
  );

exports.getBanners = (
  req,
  res
) =>
  getItems(
    req,
    res,
    "banners"
  );

exports.deleteBanner = (
  req,
  res
) =>
  deleteItem(
    req,
    res,
    "banners"
  );

exports.updateBanner = (
  req,
  res
) =>
  updateItem(
    req,
    res,
    "banners",
    "banners",
    (
      body,
      old
    ) => ({
      title:
        body.title ||
        old.title,

      description:
        body.description ||
        old.description,
    })
  );

// =====================================
// STUDENTS
// =====================================

exports.uploadStudent = (
  req,
  res
) =>
  createItem(
    req,
    res,
    "students",
    "students",
    (body) => ({
      name:
        body.name,

      stream:
        body.stream,

      rank:
        body.rank,
    })
  );

exports.getStudents = (
  req,
  res
) =>
  getItems(
    req,
    res,
    "students"
  );

exports.deleteStudent = (
  req,
  res
) =>
  deleteItem(
    req,
    res,
    "students"
  );

exports.updateStudent = (
  req,
  res
) =>
  updateItem(
    req,
    res,
    "students",
    "students",
    (
      body,
      old
    ) => ({
      name:
        body.name ||
        old.name,

      stream:
        body.stream ||
        old.stream,

      rank:
        body.rank ||
        old.rank,
    })
  );