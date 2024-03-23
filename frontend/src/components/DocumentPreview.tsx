import { FC } from "react";
import { Icons } from "./Icons";
import { motion } from "framer-motion";

interface DocumentPreviewProps {
  doc: any;
}

const DocumentPreview: FC<DocumentPreviewProps> = ({ doc }) => {
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 2, type: "spring" }}
      key={doc.content}
      className="p-2 m-2 bg-white rounded-lg shadow-md grid grid-cols-[8fr_90fr] gap-3 w-full box-border"
    >
      {/* display the document type as an icon for example:
    if the document type is a pdf display a pdf icon / if the document type is a word document display a word icon / if the document type is a text document display a text icon / if the document is an image display an image icon
            */}
      {(doc.document.endsWith(".docx") || doc.document.endsWith(".doc")) && (
        <div className="w-full h-full bg-blue-300 flex justify-center items-center rounded-md">
          <img src="/images/word.png" className="w-10 h-auto" />
        </div>
      )}

      {doc.document.endsWith(".xlsx") && (
        <div className="w-full h-full bg-blue-300 flex justify-center items-center rounded-md">
          <img src="/images/excel.png" className="w-10 h-auto" />
        </div>
      )}

      {doc.document.endsWith(".pdf") && (
        <div className="w-full h-full bg-red-300 flex justify-center items-center rounded-md">
          <img src="/images/pdf.png" className="w-10 h-auto" />
        </div>
      )}

      {doc.document.endsWith(".txt") && (
        <div className="w-full h-full bg-zinc-400 flex justify-center items-center rounded-md">
          <img src="/images/txt.png" className="w-10 h-auto" />
        </div>
      )}

      {doc.document.endsWith(".pptx") && (
        <div className="w-full h-full bg-orange-300 flex justify-center items-center rounded-md">
          <img src="/images/powerpoint.png" className="w-10 h-auto" />
        </div>
      )}

      {(doc.document.endsWith(".jpg") ||
        doc.document.endsWith(".png") ||
        doc.document.endsWith("jpeg")) && (
        <div className="w-full h-full bg-slate-300 flex justify-center items-center rounded-md">
          <img src="/images/image.png" className="w-10 h-auto" />
        </div>
      )}
      <div>
        <div className="text-lg font-semibold text-slate-800">
          {doc.document}
        </div>
        {/* Concatinate the content to 120 characters only */}
        <div className="text-sm text-slate-600">
          {doc.content.length > 120
            ? doc.content.substring(0, 120) + "..."
            : doc.content}
        </div>
        {/* display the document term frequency */}
        <div className="text-md text-slate-500 flex items-center gap-1">
          {/* {doc.tf} */}
          {/* if the document frequency is between 0.0 and 0.3 display it in red /
    if the document frequency is between 0.3 and 0.4 display it in yellow /
    if the document frequency is between 0.4 and 0.6 display it in green /
    if the document frequency is between 0.5 and 1 display it in dark green
    */}
          <Icons.waves className="w-4 h-4" />
          Term Frequency:{" "}
          <span
            className={`text-sm font-semibold ${
              doc.tf >= 0.0 && doc.tf <= 0.3
                ? "text-red-500"
                : doc.tf > 0.3 && doc.tf <= 0.4
                ? "text-yellow-500"
                : doc.tf > 0.4 && doc.tf <= 0.6
                ? "text-green-500"
                : "text-green-800"
            }`}
          >
            {doc.tf}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentPreview;
