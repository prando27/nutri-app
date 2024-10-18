"use client";

import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      setMessage("File uploaded successfully!");
    } else {
      setMessage(`Upload failed: ${result.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Upload</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
