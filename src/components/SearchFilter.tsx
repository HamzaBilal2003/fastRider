import React from "react";

interface SearchFilterProps {
  Icon?: React.ElementType | null;
  Placeholder?: string;
  className?: string;
  handleFunction?: (value: string) => void;
  bgColor?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  Icon = null,
  Placeholder = "Search",
  className = "text-gray-600",
  handleFunction = () => console.log("search button"),
  bgColor
}) => {

  return (
    <div className={`${bgColor || "bg-white"} border border-gray-300 relative py-[5px] px-2 rounded-lg ${className}`}>
      {Icon ? (
        <Icon className="text-2xl absolute top-1/2 left-3 transform -translate-y-1/2 block" />
      ) : (
        <i className="cursor-pointer bi bi-search text-base absolute top-1/2 left-3 transform -translate-y-1/2 block"></i>
      )}
      <input
        type="text"
        onKeyUp={(e) => handleFunction((e.target as HTMLInputElement).value)}
        className={`ml-5 bg-transparent pl-2 text-base outline-none py-1 placeholder:text-gray-600 placeholder:text-base ${className}`}
        placeholder={Placeholder}
      />
    </div>
  );
};

export default SearchFilter;
