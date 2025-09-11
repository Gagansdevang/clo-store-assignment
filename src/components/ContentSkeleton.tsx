// src/components/ContentSkeleton.tsx
import React from "react";
import { Card, CardContent, Skeleton, Box } from "@mui/material";

const ContentSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        mt: 2,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Card
          key={i}
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
          {/* Image placeholder */}
          <Skeleton
            variant="rectangular"
            height={220}
            width="100%"
            sx={{ bgcolor: "#333" }}
          />

          {/* Text placeholders */}
          <CardContent sx={{ flexGrow: 1, bgcolor: "transparent", p: 2 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Skeleton
                  width={120}
                  height={20}
                  sx={{ bgcolor: "#444", mb: 1 }}
                />
                <Skeleton width={80} height={16} sx={{ bgcolor: "#444" }} />
              </Box>
              <Skeleton width={50} height={20} sx={{ bgcolor: "#444" }} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ContentSkeleton;
