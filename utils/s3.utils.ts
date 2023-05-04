import axios from "axios";

const uploadToS3 = async (file: File) => {
    if (!file || file.name === "") {
        return null;
    }
    // @ts-ignore
    const fileType = encodeURIComponent(file.type);
    const { data } = await axios.get(`/api/media?fileType=${fileType}`);
    const { s3UploadUrl, key } = data;
    await axios.put(s3UploadUrl, file);
    return key;
};

export default uploadToS3;