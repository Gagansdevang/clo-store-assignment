import React, { useEffect, useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Slider,
  Stack,
} from "@mui/material";
import { useAppDispatch } from "../hooks";
import { setPricing, setPriceRange, PricingOption } from "../features/filtersSlice";

interface Props {
  updateUrlParams: (params: Record<string, string | null>) => void;
  searchParams: URLSearchParams;
}

const pricingOptions: { label: string; key: PricingOption }[] = [
  { label: "Paid", key: 0 },
  { label: "Free", key: 1 },
  { label: "View Only", key: 2 },
];

const FilterPanel: React.FC<Props> = ({ updateUrlParams, searchParams }) => {
  const dispatch = useAppDispatch();
  const pricingParam = searchParams.get("pricing") ?? "";
  const selected = pricingParam
    ? pricingParam.split(",").map((s) => Number(s) as PricingOption)
    : [];

  const [selectedState, setSelectedState] = useState<PricingOption[]>(selected);

  useEffect(() => {
    setSelectedState(selected);
  }, [pricingParam]);

const toggle = (key: PricingOption) => {
  const next = selectedState.includes(key)
    ? selectedState.filter((s) => s !== key)
    : [...selectedState, key];

  setSelectedState(next);
  dispatch(setPricing(next));

  // Always update pricing in URL
  const params: Record<string, string | null> = {
    pricing: next.length > 0 ? next.join(",") : null,
  };

  // Reset slider only if Paid not selected
  if (!next.includes(0)) {
    dispatch(setPriceRange(null));
    params.priceFrom = null;
    params.priceTo = null;
  }

  updateUrlParams(params);
};

  const priceFromParam = searchParams.get("priceFrom");
  const priceToParam = searchParams.get("priceTo");
  const priceRangeInit =
    priceFromParam && priceToParam
      ? [Number(priceFromParam), Number(priceToParam)]
      : [0, 19999];

  const [priceRange, setLocalPriceRange] = useState<[number, number]>(
    priceRangeInit as [number, number]
  );

  useEffect(() => {
    setLocalPriceRange(priceRangeInit as [number, number]);
  }, [priceFromParam, priceToParam]);

  const onPriceChange = (_: Event, value: number | number[]) => {
    if (!Array.isArray(value)) return;
    setLocalPriceRange([value[0], value[1]]);
  };

  const onPriceCommit = () => {
    updateUrlParams({
      priceFrom: String(priceRange[0]),
      priceTo: String(priceRange[1]),
    });
    dispatch(setPriceRange(priceRange));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderRadius: 1,
        flexWrap: "wrap",
      }}
    >
      <Typography variant="body2" sx={{ color: "#fff", mr: 1 }}>
        Pricing Option:
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        {pricingOptions.map((opt) => (
          <FormControlLabel
            key={opt.key}
            control={
              <Checkbox
                size="small"
                checked={selectedState.includes(opt.key)}
                onChange={() => toggle(opt.key)}
                sx={{
                  p: 0.2,
                  color: "#aaa",
                  "&.Mui-checked": { color: "#4CAF50" },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: "#fff" }}>
                {opt.label}
              </Typography>
            }
            sx={{ m: 0 }}
          />
        ))}
      </Stack>

      <Box sx={{ width: 160, ml: 1 }}>
        <Typography variant="caption" sx={{ color: "#ccc", mb: 0.2 }}>
          Price range
        </Typography>
        <Slider
          value={priceRange}
          onChange={onPriceChange}
          onChangeCommitted={onPriceCommit}
          valueLabelDisplay="auto"
          min={0}
          max={19999}
          size="small"
          disabled={!selectedState.includes(0)} // only active if Paid selected
          sx={{
            color: "#4CAF50",
            height: 4,
            "& .MuiSlider-thumb": { bgcolor: "#fff", width: 12, height: 12 },
            "& .MuiSlider-track": { bgcolor: "#4CAF50" },
            "& .MuiSlider-rail": { bgcolor: "#555" },
          }}
        />
      </Box>
    </Box>
  );
};

export default FilterPanel;
