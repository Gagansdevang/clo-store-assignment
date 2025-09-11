// src/components/ContentCard.tsx
import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { ContentItem } from "../api/contentApi";

const getPricingLabel = (pricingOption: 0 | 1 | 2): string => {
  switch (pricingOption) {
    case 0:
      return "Paid";
    case 1:
      return "Free";
    case 2:
      return "View Only";
    default:
      return "Free";
  }
};

const ContentCard: React.FC<{ item: ContentItem }> = ({ item }) => {
  const label = getPricingLabel(item.pricingOption);

  return (
    <Card
      sx={{
        bgcolor: "#1e1e1e",
        color: "white",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={item.thumbnailUrl}
        alt={item.title}
        sx={{ width: "100%", height: 220, objectFit: "cover" }}
      />

      <CardContent sx={{ flexGrow: 1, bgcolor: "transparent", p: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: "white" }}
              noWrap
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              by {item.creator}
            </Typography>
          </Box>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              color: label === "Paid" ? "#4dabf7" : "#81c784",
              whiteSpace: "nowrap",
              ml: 2,
            }}
          >
            {label === "Paid" ? `$${item.price ?? "—"}` : label}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
