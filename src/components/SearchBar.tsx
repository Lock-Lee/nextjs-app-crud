import React, { FC, useState } from "react";
import IconSearch from "./Icons/IconSearch";

const categories = [
  "Community",
  "History",
  "Exercise",
  "Food",
  "Pets",
  "Health",
  "Fashion",
  "Others",
];

interface SearchBarProps {
  onSearchChange?: (value: string) => void;
  onCategoryChange?: (category: string) => void;
  onCreate?: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  onSearchChange,
  onCategoryChange,
  onCreate,
}) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    onSearchChange?.(val);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCategory(val);
    onCategoryChange?.(val);
  };

  return (
    <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-4 px-4 py-4 bg-white">
      <div className="flex items-center w-full md:w-1/2 border border-gray-300 rounded px-3 py-2 bg-gray-50">
        <IconSearch />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          className="w-full bg-transparent focus:outline-none text-sm text-black"
        />
      </div>

      <select
        className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded bg-gray-50 text-sm text-gray-700"
        value={category}
        onChange={handleCategoryChange}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        onClick={() => onCreate?.()}
      >
        + Create
      </button>
    </div>
  );
};

export default SearchBar;
