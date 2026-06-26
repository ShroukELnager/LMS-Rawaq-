'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

type Props = {
  onFileSelect: (file: File | null) => void;
};

const MAX_SIZE = 500 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function FileUploader({ onFileSelect }: Props) {
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setError('');

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      onFileSelect(null);
      setPreview(null);
      setError('Only JPG, PNG, and WEBP images are allowed.');
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      onFileSelect(null);
      setPreview(null);
      setError('File size must not exceed 500KB.');
      return;
    }

    onFileSelect(selectedFile);

    setPreview(URL.createObjectURL(selectedFile));
  }

  return (
    <div className="mt-5">
      <label className="mb-2 block text-label-md text-gray-700">
        Profile Photo
      </label>

      <label
        className="
          flex
          cursor-pointer
          items-center
          gap-3
          rounded-xl
          border-2
          border-dashed
          border-[#C9D7FF]
          bg-surface-container
          p-4
          transition
          hover:border-primary
          hover:bg-[#F7FAFF]
        "
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        <div>
          <p className="text-sm font-semibold text-primary">
            Upload Avatar (Optional)
          </p>

          <p className="mt-1 text-xs text-text">JPG, PNG or WEBP • Max 500KB</p>
        </div>
      </label>

      {preview && (
        <div className="mt-4 flex items-center gap-3">
          <Image
            src={preview}
            alt="Preview"
            width={90}
            height={90}
            className="
              h-[90px]
              w-[90px]
              rounded-full
              object-cover
              border-4
              border-white
              shadow-md
              ring-2
              ring-[#C9D7FF]
            "
          />

          <div>
            <p className="text-sm font-medium text-gray-700">Image selected</p>

            <p className="text-xs text-gray-400">
              Ready to upload with your account
            </p>
          </div>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
