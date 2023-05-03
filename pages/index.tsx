import axios from "axios";
import { ChangeEvent, Fragment, useRef, useState } from "react";

const uploadToS3 = async (event: ChangeEvent<HTMLFormElement>) => {
  const formData = new FormData(event.target);
  const file = formData.get("file") as File;
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

export default function Home() {
  const [key, setKey] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleUploadMedia = async (event: ChangeEvent<HTMLFormElement>) => {
    setError(false);
    setKey(null);
    event.preventDefault();
    const key = await uploadToS3(event);
    if (!key) setError(true);
    setKey(key);
    fileRef.current!.value = "";
  };
  return (
    <Fragment>
      <div className="m-5 flex flex-col">
        <p className="text-lg mb-5">Upload the Media here</p>
        <form onSubmit={handleUploadMedia} className="flex flex-col gap-10">
          <input
            type="file"
            accept="image/jpg,image/jpeg,image/png"
            name="file"
            className="border border-gray-300 rounded-md p-2 cursor-pointer"
            ref={fileRef}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
          >
            Upload
          </button>
        </form>
        {key && !error && (
          <p className="mt-5 text-green-500 font-bold">
            Media uploaded successfully with key: {key}
          </p>
        )}
        {!key && error && (
          <p className="mt-5 text-red-500 font-bold">
            Media cannot be uploaded
          </p>
        )}
      </div>
    </Fragment>
  );
}
