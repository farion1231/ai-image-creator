"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function SearchBox({ searchTerm, onSearchChange }: SearchBoxProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
      <Input
        placeholder="搜索你的作品..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
