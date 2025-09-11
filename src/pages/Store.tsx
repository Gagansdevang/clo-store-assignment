import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";
import FilterPanel from "../components/FilterPanel";
import SearchBar from "../components/SearchBar";
import ContentGrid from "../components/ContentGrid";
import SortDropdown from "../components/SortDropdown";
import { useQuery } from "@tanstack/react-query";
import { fetchAllContents, ContentItem } from "../api/contentApi";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import {
  setKeyword,
  setPricing,
  setSort,
  setPriceRange,
} from "../features/filtersSlice";

const PAGE_SIZE = 20;

const StorePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const keyword = searchParams.get("q") ?? "";
    const pricingParam = searchParams.get("pricing") ?? "";
    const sort = (searchParams.get("sort") as any) ?? "name";
    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");

    const pricing = pricingParam ? pricingParam.split(",") : [];
    dispatch(setKeyword(keyword));
    dispatch(setPricing(pricing as any));
    dispatch(setSort(sort));
    if (priceFrom && priceTo) {
      dispatch(setPriceRange([Number(priceFrom), Number(priceTo)]));
    }
  }, []);

  const { data, isLoading, isError } = useQuery<ContentItem[], Error>({
    queryKey: ["contents"],
    queryFn: fetchAllContents,
  });

  useEffect(() => setVisibleCount(PAGE_SIZE), [searchParams.toString()]);

  const updateUrlParams = (params: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([k, v]) => {
      if (!v) next.delete(k);
      else next.set(k, v);
    });
    setSearchParams(next);
  };

const filtered = useMemo(() => {
  if (!data) return [];
  const q = (searchParams.get("q") ?? "").toLowerCase();
  const pricingParam = searchParams.get("pricing");
  const pricingSelected = pricingParam
    ? pricingParam.split(",").map((s) => Number(s) as 0 | 1 | 2)
    : [];

  const sort = (searchParams.get("sort") as any) ?? "name";
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");

  let list = data.slice();

  // 🔍 Keyword filtering
  if (q) {
    list = list.filter(
      (it) =>
        (it.creator ?? "").toLowerCase().includes(q) ||
        (it.title ?? "").toLowerCase().includes(q)
    );
  }

  // 🎯 Pricing filter
  if (pricingSelected.length > 0) {
    list = list.filter((it) => pricingSelected.includes(it.pricingOption));
  }

  // 💰 Price range — only affects Paid when it's selected
  if (pricingSelected.includes(0) && priceFrom && priceTo) {
    const from = Number(priceFrom);
    const to = Number(priceTo);

    list = list.filter((it) => {
      if (it.pricingOption === 0) {
        const p = it.price ?? 0;
        return p >= from && p <= to;
      }
      return true; // Free / View Only unaffected
    });
  }

  // 🔄 Sorting
  if (sort === "name") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "priceHigh") {
    list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  } else if (sort === "priceLow") {
    list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  }

  return list;
}, [data, searchParams]);




  const loadMore = () => setVisibleCount((c) => c + PAGE_SIZE);

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );

  if (isError) return <div>Failed to load data. Try again later.</div>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* First sticky row: Search + Sort */}
      <Box
        sx={{
        //   position: "sticky",
          top: 20,
          zIndex: 1000,
          bgcolor: "#1E1E1E",
          py: 1,
          color: "#fff",
          borderRadius: 1,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
        >
          <Box sx={{ flex: 1 }}>
            <SearchBar
              updateUrlParams={updateUrlParams}
              searchParams={searchParams}
            />
          </Box>
          
        </Stack>
      </Box>

      {/* Second sticky row: Filter panel */}
<Box
  sx={{
    // position: "sticky",
    top: { xs: 84, sm: 84 }, // height of the previous sticky row
    zIndex: 999,
    bgcolor: "#121212",
    py: 1,
  }}
>
  <Paper
    sx={{
      px: 2,
      py: 0.5,
      bgcolor: "#0a0a0aff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {/* Left: FilterPanel */}
    <FilterPanel updateUrlParams={updateUrlParams} searchParams={searchParams} />

    {/* Right: Reset Button */}
    <Button
      variant="text" // no border
      sx={{
        color: "#ff6f61", // accent color (change if needed)
        fontWeight: 500,
        textTransform: "none",
        ml: 2,
      }}
      onClick={() => {
        setSearchParams({});
        dispatch(setKeyword(""));
        dispatch(setPricing([]));
        dispatch(setSort("name"));
        dispatch(setPriceRange(null));
      }}
    >
      Reset Filters
    </Button>
  </Paper>
</Box>

     <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    mt: 1, // small margin top from filter row
  }}
>
  <Box sx={{ width: { xs: "100%", sm: "200px" } }}>
    <SortDropdown
      updateUrlParams={updateUrlParams}
      searchParams={searchParams}
    />
  </Box>
</Box>

      {/* Content Grid */}
      <Box sx={{ mt: 2 }}>
        <ContentGrid
          items={filtered.slice(0, visibleCount)}
          totalCount={filtered.length}
          loadMore={loadMore}
          hasMore={visibleCount < filtered.length}
        />
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StorePage;
