import {
  FishSymbol,
  LucideProps,
  Search,
  Waves,
  CloudUpload,
  Paperclip,
  Eye,
  X,
} from "lucide-react";

export const Icons = {
  close: X,
  preview: Eye,
  upload: CloudUpload,
  paperclip: Paperclip,
  loading: (props: LucideProps) => {
    return (
      <svg
        fill="currentColor"
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "auto",
          display: "block",
          shapeRendering: "auto",
        }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="currentColor"
          stroke-width="10"
          r="35"
          stroke-dasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          />
        </circle>
      </svg>
    );
  },
  fish: FishSymbol,
  waves: Waves,
  search: Search,
};
