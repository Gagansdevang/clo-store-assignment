import React from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";

interface Props {
  updateUrlParams: (params: Record<string, string | null>) => void;
  searchParams: URLSearchParams;
}

const SortDropdown: React.FC<Props> = ({ updateUrlParams, searchParams }) => {
  const sort = (searchParams.get("sort") as any) ?? "name";

  const handle = (e: any) => {
    updateUrlParams({ sort: e.target.value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: "#fff",
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: "#bbb", whiteSpace: "nowrap" }}
      >
        Sort By:
      </Typography>
      <Select
        variant="standard"
        value={sort}
        onChange={handle}
        size="small"
        sx={{
          fontSize: "0.85rem",
          minWidth: 120,
          color: "#fff",
          "& .MuiSelect-select": {
            py: 0.3, 
          },
          "& .MuiSvgIcon-root": {
            color: "#fff",
            fontSize: "1rem",
          },
          "&::before": {
            borderBottom: "1px solid #555",
          },
          "&:hover::before": {
            borderBottom: "1px solid #888",
          },
          "&::after": {
            borderBottom: "1px solid #00bcd4",
          },
        }}
      >
        <MenuItem value="name">Item Name (Default)</MenuItem>
        <MenuItem value="priceHigh">Higher Price</MenuItem>
        <MenuItem value="priceLow">Lower Price</MenuItem>
      </Select>
    </Box>
  );
};

export default SortDropdown;
