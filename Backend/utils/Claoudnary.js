import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDNIRY_CLOUD_NAME,
    api_key: process.env.CLOUDNIRY_API_KEY,
    api_secret: process.env.CLOUDNIRY_API_SECRET
});

const uploadCloudnary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        console.log('File upload successfully');
        if (response) fs.unlinkSync(localFilePath)
        return response.url
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("Error while upload file on Clodnary :: ", error);
    }
}

const destroyCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return null
        const imagePublicId = imageUrl.split("/").pop().split(".")[0];
        const destroyImage = await cloudinary.uploader.destroy(imagePublicId)
        if (destroyImage.result === "ok") {
            console.log("Image Delete Successfully");
        }
    } catch (error) {
        console.log(`Error While delete file on Cloudinary ::  `, error);
    }
}

export { uploadCloudnary, destroyCloudinary }