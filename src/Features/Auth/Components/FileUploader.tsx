"use client";

import { ChangeEvent, useState } from "react";
import { AuthService } from "../AuthService";

type UploadStatus = "idle" | "uploading" | "success" | "error";

type Props = {
  onUploadSuccess: (url: string) => void;
};

const MAX_SIZE = 500 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function FileUploader({ onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string>("");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setError("");

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setFile(null);
      setError("Only JPG, PNG, and WEBP images are allowed.");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      setFile(null);
      setError("File size must not exceed 500KB.");
      return;
    }

    setFile(selectedFile);
  }

  async function uploadFile() {
    if (!file) return;

    try {
      setStatus("uploading");

      const fileUrl = await AuthService.uploadAvatar(file);

      setStatus("success");
      onUploadSuccess(fileUrl);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div className="mt-5">
      <label className="mb-2 block text-label-md text-gray-700">
        Profile Photo
      </label>

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#C9D7FF] bg-surface-container p-4 transition hover:border-primary">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        <div>
          <p className="text-sm font-medium text-primary">
            Upload Avatar (Optional)
          </p>
          <p className="text-xs text-gray-500">
            JPG, PNG or WEBP. Max 500KB.
          </p>
        </div>
      </label>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {file && status !== "uploading" && !error && (
        <button
          type="button"
          onClick={uploadFile}
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 active:scale-[0.98]"
        >
          Upload Image
        </button>
      )}

      {status === "uploading" && (
        <p className="mt-2 text-sm text-gray-500">
          Uploading...
        </p>
      )}

      {status === "success" && (
        <p className="mt-2 text-sm text-green-600">
          Image uploaded successfully
        </p>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">
          Upload failed
        </p>
      )}
    </div>
  );
}