import React from "react";
import { InputBase, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  updateUrlParams: (params: Record<string, string | null>) => void;
  searchParams: URLSearchParams;
}

const SearchBar: React.FC<SearchBarProps> = ({ updateUrlParams, searchParams }) => {
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");

  const handleSearch = () => {
    updateUrlParams({ q: query || null });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: 1,
        px: 2,
        height: 44,
      }}
    >
      <InputBase
        sx={{
          color: "#FFFFFF",
          flex: 1,
          "& input::placeholder": {
            color: "#AAAAAA",
            opacity: 1,
          },
        }}
        placeholder="Find the items you’re looking for"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <IconButton
        onClick={handleSearch}
        sx={{
          color: "#FFFFFF",
          p: 0.5,
          ml: 1,
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
