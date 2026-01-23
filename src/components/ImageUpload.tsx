'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Image as ImageIcon, Plus } from 'lucide-react';
import { useState } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [url, setUrl] = useState(value);

  const onUpload = (result: any) => {
    if (result.event !== "success") return;

    const info = result.info;
    if (info && typeof info === 'object' && 'secure_url' in info) {
      const newUrl = (info as any).secure_url;
      setUrl(newUrl);
      onChange(newUrl);
    }
  };

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "torodo_avenue";

  if (!cloudName) {
    return (
      <div className="p-4 border border-red-200 rounded text-red-600 text-sm">
        Erreur: Configuration Cloudinary manquante.
        (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
      </div>
    );
  }

  return (
    <div className="image-upload-container">
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={uploadPreset}
        options={{
          maxFiles: 1,
          sources: ['local', 'camera'],
          clientAllowedFormats: ['image'],
          maxImageFileSize: 5000000, // 5MB
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open()}
              className={`upload-box ${url ? 'has-image' : ''}`}
            >
              {url ? (
                <img src={url} alt="Product preview" className="preview-image" />
              ) : (
                <div className="upload-placeholder">
                  <div className="icon-circle">
                    <Plus size={24} />
                  </div>
                  <span>Ajouter une photo</span>
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>

      <style jsx>{`
        .image-upload-container {
          width: 100%;
          margin-bottom: 2rem;
        }

        .upload-box {
          width: 150px;
          height: 200px;
          border: 2px dashed var(--border);
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          overflow: hidden;
          background: var(--background);
        }

        .upload-box:hover {
          border-color: var(--secondary);
          background: rgba(212, 175, 55, 0.05);
        }

        .upload-box.has-image {
          border-style: solid;
          border-color: var(--secondary);
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          color: var(--muted);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.1);
          color: var(--secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default ImageUpload;
