import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
export const upload = multer({ storage: storage });

export const sendImageToCloudinary = (path: string) => {
  // Configuration

  cloudinary.config({
    cloud_name: "ddwkkpa5t",
    api_key: "399851127581236",
    api_secret: "NnDgstfbfWDODsrZEuCJioRkoek", // Click 'View Credentials' below to copy your API secret
  });

  // Upload an image
  cloudinary.uploader.upload(
    path,
    {
      public_id: "calcutalo",
    },
    function a(err, resu) {
      console.log("result", resu);
      console.log("err", err);
    }
  );

  // Optimize delivery by resizing and applying auto-format and auto-quality
};
