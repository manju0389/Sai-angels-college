const express = require("express");

const router = express.Router();


const { upload } = require("../middleware/upload");


const {

uploadGallery,

getGallery,

updateCaption,

deleteGalleryById


} = require("../controllers/galleryController");




// upload multiple images
router.post(
"/upload",
upload.array("files"),
uploadGallery
);



// get gallery
router.get(
"/",
getGallery
);



// update caption
router.put(
"/:id",
updateCaption
);



// delete image
router.delete(
"/:id",
deleteGalleryById
);



module.exports = router;
