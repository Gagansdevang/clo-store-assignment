import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 0 = Paid, 1 = Free, 2 = View Only
export type PricingOption = 0 | 1 | 2;

export interface FiltersState {
  pricing: PricingOption[]; // selected options (numbers)
  keyword: string;
  sortBy: "name" | "priceHigh" | "priceLow";
  priceRange?: [number, number] | null;
}

const initialState: FiltersState = {
  pricing: [],
  keyword: "",
  sortBy: "name",
  priceRange: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPricing(state, action: PayloadAction<PricingOption[]>) {
      state.pricing = action.payload;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    resetFilters(state) {
      state.pricing = [];
      state.keyword = "";
      state.sortBy = "name";
      state.priceRange = null;
    },
    setSort(state, action: PayloadAction<FiltersState["sortBy"]>) {
      state.sortBy = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number] | null>) {
      state.priceRange = action.payload;
    },
  },
});

export const { setPricing, setKeyword, resetFilters, setSort, setPriceRange } =
  filtersSlice.actions;

export default filtersSlice.reducer;
