import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center transition-all duration-300 w-full md:w-96">
      <Input
        type="text"
        value={value}
        placeholder="Search photos..."
        onChange={(e) => onChange(e.target.value)}
        className="rounded-r-none py-8 px-4 text-lg bg-transparent"
      />
      <Button
        variant="ghost"
        size="icon"
        className="rounded-l-none border border-l-0 border-input h-[66px] w-12 bg-background"
      >
        <SearchIcon className="h-4 w-4 text-gray-900" />
      </Button>
    </div>
  );
}
