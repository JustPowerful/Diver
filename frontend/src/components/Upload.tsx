import { FC } from "react";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Icons } from "./Icons";

interface UploadProps {}

const Upload: FC<UploadProps> = ({}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [finished, setFinished] = useState(false);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  function handleUpload() {
    setUploading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    }
    setUploading(false);
    setFinished(true);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full mt-2">
          <Button className="w-full flex gap-1">
            <Icons.upload className="w-4 h-4" /> upload a document{" "}
            <span className="text-xs flex gap-0.5 ml-1">
              {/* the supported formats */}
              <span className="text-red-500">pdf</span>,{" "}
              <span className="text-blue-500">docx</span>,{" "}
              <span className="text-blue-500">txt</span>,{" "}
              <span className="text-green-500">xlsx</span>,{" "}
              <span className="text-orange-500">pptx</span>,{" "}
              <span className="text-gray-400">png</span>,{" "}
              <span className="text-gray-400">jpg</span>,{" "}
              <span className="text-gray-400">jpeg</span>
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a document</DialogTitle>
            <DialogDescription>
              You are about to upload a document. Please select a document from
              your device.
            </DialogDescription>
          </DialogHeader>
          <input
            type="file"
            ref={fileInput}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            className="bg-white border-2 text-slate-700 border-slate-700 hover:text-white flex gap-1"
            onClick={() => {
              fileInput.current?.click();
            }}
          >
            {file ? (
              "selected " + file.name
            ) : (
              <>
                <Icons.paperclip className="w-4 h-4" /> select a file
              </>
            )}
          </Button>

          <Button onClick={handleUpload} disabled={!file}>
            {uploading ? (
              <Icons.loading className="w-4 h-4" />
            ) : finished ? (
              "uploaded successfully!"
            ) : (
              "upload"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Upload;
