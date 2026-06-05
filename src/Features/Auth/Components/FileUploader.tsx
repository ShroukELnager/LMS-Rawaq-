"use client";

import { ChangeEvent, useState } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";
console.log(process.env.BASE_URL);
console.log(process.env.SUPABASE_KEY);
type Props = {
  onUploadSuccess: (url: string) => void;
};

export default function FileUploader({ onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  }

  async function uploadFile() {
    if (!file) return;

    try {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${process.env.BASE_URL}/storage/v1/object/uploads/users/${file.name}`,
        {
          method: "POST",
          body: formData,
          headers: {
                  apiKey: process.env.SUPABASE_KEY!,
                },
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const fileUrl = `${process.env.BASE_URL}/storage/v1/object/public/uploads/users/${file.name}`;

      setStatus("success");

      onUploadSuccess(fileUrl);
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <div className="mt-5">
      <label className="block text-label-md mb-2 text-gray-700">
        Profile Photo
      </label>

      <label className="flex items-center gap-3 border-2 border-dashed border-[#C9D7FF] bg-surface-container rounded-xl p-4 cursor-pointer hover:border-primary transition">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <div>
          <p className="text-primary text-sm font-medium">
            Upload Avatar (Optional)
          </p>
          <p className="text-xs text-gray-500">
            JPG, PNG or WEBP. Max 500KB.
          </p>
        </div>
      </label>

      {file && status !== "uploading" && (
        <button
          type="button"
          onClick={uploadFile}
          className="mt-3 text-sm text-primary"
        >
          Upload Image
        </button>
      )}

   

      {status === "success" && (
        <p className="text-sm text-green-600 mt-2">
          Image uploaded successfully
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-600 mt-2">
          Upload failed
        </p>
      )}
    </div>
  );
}