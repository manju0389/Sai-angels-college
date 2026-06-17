const { uploadToCloudinary } = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

const Banner = require("../models/Banner");
const Student = require("../models/Student");

// =============================
// CLOUDINARY UPLOAD
// =============================
const uploadImage = async (file, folder) => {
if (!file) return null;

const result = await uploadToCloudinary(
file.buffer,
folder,
file.mimetype
);

return {
id: result.public_id,
url: result.secure_url,
type: result.resource_type,
};
};

// =====================================
// BANNERS
// =====================================

// CREATE BANNER
exports.uploadBanner = async (req, res) => {
try {
if (!req.file) {
return res.status(400).json({
error: "Image required",
});
}

```
const uploaded = await uploadImage(
  req.file,
  "banners"
);

const banner = await Banner.create({
  title: req.body.title,
  description: req.body.description,
  image: uploaded.url,
  cloudinary_id: uploaded.id,
  media_type: uploaded.type,
});

res.json(banner);
```

} catch (err) {
res.status(500).json({
error: err.message,
});
}
};

// GET BANNERS
exports.getBanners = async (req, res) => {
try {
const banners = await Banner.find().sort({
createdAt: -1,
});

```
res.json(banners);
```

} catch (err) {
res.status(500).json({
error: err.message,
});
}
};

// UPDATE BANNER
exports.updateBanner = async (req, res) => {
try {
const banner = await Banner.findById(
req.params.id
);

```
if (!banner) {
  return res.status(404).json({
    error: "Banner not found",
  });
}

let image = banner.image;
let cloudinary_id = banner.cloudinary_id;
let media_type = banner.media_type;

if (req.file) {
  if (banner.cloudinary_id) {
    await cloudinary.uploader.destroy(
      banner.cloudinary_id,
      {
        resource_type:
          banner.media_type === "video"
            ? "video"
            : "image",
      }
    );
  }

  const uploaded = await uploadImage(
    req.file,
    "banners"
  );

  image = uploaded.url;
  cloudinary_id = uploaded.id;
  media_type = uploaded.type;
}

const updatedBanner =
  await Banner.findByIdAndUpdate(
    req.params.id,
    {
      title:
        req.body.title ||
        banner.title,

      description:
        req.body.description ||
        banner.description,

      image,
      cloudinary_id,
      media_type,
    },
    {
      new: true,
    }
  );

res.json(updatedBanner);
```

} catch (err) {
res.status(500).json({
error: err.message,
});
}
};

// DELETE BANNER
exports.deleteBanner = async (req, res) => {
try {
const banner = await Banner.findById(
req.params.id
);

```
if (!banner) {
  return res.status(404).json({
    error: "Banner not found",
  });
}

if (banner.cloudinary_id) {
  await cloudinary.uploader.destroy(
    banner.cloudinary_id,
    {
      resource_type:
        banner.media_type === "video"
          ? "video"
          : "image",
    }
  );
}

await Banner.findByIdAndDelete(
  req.params.id
);

res.json({
  message: "Banner deleted",
});
```

} catch (err) {
res.status(500).json({
error: err.message,
});
}
};

// =====================================
// STUDENTS
// =====================================

// CREATE STUDENT
exports.uploadStudent = async (
req,
res
) => {
try {
if (!req.file) {
return res.status(400).json({
error: "Image required",
});
}

```
const uploaded = await uploadImage(
  req.file,
  "students"
);

const student =
  await Student.create({
    name: req.body.name,
    stream: req.body.stream,
    rank: req.body.rank,
    image: uploaded.url,
    cloudinary_id: uploaded.id,
    media_type: uploaded.type,
  });

res.json(student);
```

} catch (err) {
res.status(500).json({
error: err.message,
});
}
};

// GET STUDENTS
exports.getStudents = async (
req,
res
) => {
try {
const students =
await Student.find().sort({
createdAt: -1,
});

```
res.json(students);
```

} catch (err) {
res.status(500).json({
error: err.message,
});
}
};

// UPDATE STUDENT
exports.updateStudent = async (
req,
res
) => {
try {
const student =
await Student.findById(
req.params.id
);

```
if (!student) {
  return res.status(404).json({
    error: "Student not found",
  });
}

let image = student.image;
let cloudinary_id =
  student.cloudinary_id;
let media_type =
  student.media_type;

if (req.file) {
  if (
    student.cloudinary_id
  ) {
    await cloudinary.uploader.destroy(
      student.cloudinary_id,
      {
        resource_type:
          student.media_type ===
          "video"
            ? "video"
            : "image",
      }
    );
  }

  const uploaded =
    await uploadImage(
      req.file,
      "students"
    );

  image = uploaded.url;
  cloudinary_id =
    uploaded.id;
  media_type =
    uploaded.type;
}

const updatedStudent =
  await Student.findByIdAndUpdate(
    req.params.id,
    {
      name:
        req.body.name ||
        student.name,

      stream:
        req.body.stream ||
        student.stream,

      rank:
        req.body.rank ||
        student.rank,

      image,
      cloudinary_id,
      media_type,
    },
    {
      new: true,
    }
  );

res.json(updatedStudent);
```

} catch (err) {
res.status(500).json({
error: err.message,
});
}
};

// DELETE STUDENT
exports.deleteStudent = async (
req,
res
) => {
try {
const student =
await Student.findById(
req.params.id
);

```
if (!student) {
  return res.status(404).json({
    error: "Student not found",
  });
}

if (
  student.cloudinary_id
) {
  await cloudinary.uploader.destroy(
    student.cloudinary_id,
    {
      resource_type:
        student.media_type ===
        "video"
          ? "video"
          : "image",
    }
  );
}

await Student.findByIdAndDelete(
  req.params.id
);

res.json({
  message:
    "Student deleted",
});
```

} catch (err) {
res.status(500).json({
error: err.message,
});
}
};
