import axios from "axios";
import { ChangeEvent, Fragment, useState } from "react";

const uploadToS3 = async (event: ChangeEvent<HTMLFormElement>) => {
  const formData = new FormData(event.target);
  const file = formData.get("file");
  if (!file) return null;
  // @ts-ignore
  const fileType = encodeURIComponent(file.type);
  const { data } = await axios.get(`/api/media?fileType=${fileType}`);
  const { s3UploadUrl, key } = data;
  await axios.put(s3UploadUrl, file);
  return key;
};

export default function Home() {
  const [key, setKey] = useState<string | null>(null);
  const handleUploadMedia = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = await uploadToS3(event);
    setKey(key);
  };
  return (
    <Fragment>
      <div>
        <p>Upload the Media here</p>
        <form onSubmit={handleUploadMedia}>
          <input
            type="file"
            accept="image/jpg image/jpeg image/png"
            name="file"
          />
          <button type="submit">Upload</button>
        </form>
        {key && <p>{key}</p>}
      </div>
    </Fragment>
  );
}
