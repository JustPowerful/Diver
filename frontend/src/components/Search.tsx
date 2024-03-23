import { FC, useState } from "react";
import { Icons } from "./Icons";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import DocumentPreview from "./DocumentPreview";
import Upload from "./Upload";

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  async function onSearch() {
    setSearching(true);
    const res = await fetch(`/api/document/search?search=${query}`);
    const data = await res.json();
    setHistory((prev) => [...prev, query]);
    setDocuments(data);
    setSearching(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="m-0 p-0 flex items-center gap-2 text-5xl font-semibold text-slate-900 select-none">
        <Icons.fish className="w-20 h-20" /> <span>Diver</span>
      </div>
      <div className="text-xl font-semibold pb-5 text-slate-700">
        Search your documents with ease
      </div>
      <div className="w-1/2">
        <form className="w-full grid grid-cols-[90fr_10fr] gap-2">
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            placeholder="Search your terms here..."
          />
          <Button
            onClick={(event) => {
              event.preventDefault();
              onSearch();
            }}
          >
            {searching ? (
              <Icons.loading className="w-4 h-4" />
            ) : (
              <Icons.search className="w-4 h-4" />
            )}
          </Button>
        </form>
        <Upload />
      </div>

      {history.length > 0 && (
        <div className="w-2/3">
          {documents.map((doc) => (
            <DocumentPreview doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
