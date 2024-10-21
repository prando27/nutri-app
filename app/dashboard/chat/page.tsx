"use client";

import { useState, useEffect } from "react";
import { Send, File, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FileItem {
  id: string;
  name: string;
  uploadDate: string;
}

export default function Component() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/files");
      const data = await res.json();
      setFiles(data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, fileId: selectedFile }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const FileList = () => (
    <ScrollArea className="h-[calc(100vh-10rem)] md:h-[calc(100vh-7rem)]">
      <div className="p-4 space-y-2">
        {files.map((file) => (
          <Button
            key={file.id}
            variant="ghost"
            className={`w-full justify-start ${
              selectedFile === file.id ? "bg-secondary" : ""
            }`}
            onClick={() => {
              setSelectedFile(file.id);
              setSelectedFileName(file.name);
              setIsMobileMenuOpen(false);
            }}
          >
            <File className="mr-2 h-4 w-4" />
            {file.name}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen max-h-screen">
      <Card className="w-full md:w-64 md:h-full rounded-none border-b md:border-r">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Arquivos</CardTitle>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Files</SheetTitle>
              </SheetHeader>
              <FileList />
            </SheetContent>
          </Sheet>
        </CardHeader>
        <CardContent className="p-0 hidden md:block">
          <FileList />
        </CardContent>
        <CardFooter className="p-4"></CardFooter>
      </Card>
      <Card className="flex-1 rounded-none">
        <CardHeader>
          <CardTitle>Receitas IA: {selectedFileName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 overflow-y-auto h-[calc(100vh-12rem)] md:h-[calc(100vh-8rem)]">
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <Textarea
              placeholder="Receitas para jantar com menos carboidrato..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Processando..." : "Enviar"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
          {response && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Resposta:</h3>
              <div className="bg-secondary p-4 rounded-md">
                <p className="whitespace-pre-wrap">{response}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
