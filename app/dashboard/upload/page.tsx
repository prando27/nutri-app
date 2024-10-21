"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, X } from "lucide-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleSubmit = async () => {
    if (!files.length) {
      setMessage("Por favor, selecione um arquivo");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      setMessage(
        `Arquivo${files.length > 0 ? "s" : ""} carregado com sucesso!`
      );
      setFiles([]);
    } else {
      setMessage(`Upload failed: ${result.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Carregar arquivos</CardTitle>
          <CardDescription>
            Arraste e solte os arquivos aqui ou clique para selecionar os
            arquivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
              isDragActive ? "border-primary" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive
                ? "Solte os arquivos aqui"
                : "Arraste e solte alguns arquivos aqui ou clique para selecionar os arquivos"}
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Arquivos selecionados:
              </h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded"
                  >
                    <div className="flex items-center">
                      <File className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remover arquivo</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <Label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Ou selecione os arquivos
            </Label>
            <div className="mt-1 flex items-center">
              <Input
                id="file-upload"
                name="file-upload"
                type="file"
                multiple
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles((prev) => [
                      ...prev,
                      ...Array.from(e.target.files as FileList),
                    ]);
                  }
                }}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
              >
                <span>Selecione os arquivos</span>
              </label>
            </div>
          </div>

          <Button className="mt-6 w-full" onClick={handleSubmit}>
            Carregar Arquivos
          </Button>
          {message && <p>{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
