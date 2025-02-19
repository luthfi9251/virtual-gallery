import "server-only";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "dwsf7qb6y",
    api_key: "355985621579273",
    api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = { cloudinary };
