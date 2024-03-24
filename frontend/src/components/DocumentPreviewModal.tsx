import { FC } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/button";

interface DocumentPreviewModalProps {
  doc: any;
  numberOfTermDocuments: number;
  onClose: () => void;
}

const DocumentPreviewModal: FC<DocumentPreviewModalProps> = ({
  doc,
  numberOfTermDocuments,
  onClose,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-slate-900 bg-opacity-50 z-20 flex justify-center items-center">
      <div className="relative w-[80%] bg-white flex flex-col items-center rounded-lg p-4 box-border ">
        <button
          onClick={onClose}
          className="absolute z-[999] -top-2 -right-2 p-2 bg-slate-900 text-white rounded-lg"
        >
          <Icons.close className="w-4 h-4" />
        </button>
        <h1 className="flex items-center gap-1 mb-2 text-xl font-semibold text-slate-700">
          <Icons.paperclip className="w-4 h-4" /> {doc.document}
        </h1>
        {doc.document.endsWith(".jpg") ||
        doc.document.endsWith(".png") ||
        doc.document.endsWith(".jpeg") ||
        doc.document.endsWith(".pdf") ? (
          <iframe className="w-[40%] h-60" src={`/documents/${doc.document}`} />
        ) : (
          <div className="w-full p-6 bg-slate-300 text-center mb-4 rounded-md">
            No preview for{" "}
            <span className="font-bold">
              {doc.document.split(".")[doc.document.split(".").length - 1]}
            </span>{" "}
            files
          </div>
        )}
        <div>
          <h1 className="flex items-center gap-1 mb-2 text-xl font-semibold text-slate-700">
            Content
          </h1>
          <p className="w-[90%]">{doc.content.slice(0, 400)}...</p>
        </div>
        <a
          className="bg-slate-900 text-white p-4 rounded-md"
          href={`/documents/${doc.document}`}
          download
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
