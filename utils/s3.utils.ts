import axios from "axios";

const uploadToS3 = async (file: File): Promise<string | null> => {
    if (!file || file.name === "") {
        throw new Error("Invalid file");
    }
    const fileType = encodeURIComponent(file.type);
    try {
        const { data } = await axios.get(`/api/media?fileType=${fileType}`);
        const { s3UploadUrl, key } = data;
        await axios.put(s3UploadUrl, file);
        return key;
    } catch (error) {
        console.error("Failed to upload file to S3:", error);
        return null;
    }
};

export default uploadToS3;