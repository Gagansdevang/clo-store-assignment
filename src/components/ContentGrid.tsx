import React from "react";
import { Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { ContentItem } from "../api/contentApi";
import ContentCard from "./ContentCard";
import ContentSkeleton from "./ContentSkeleton";

interface Props {
  items: ContentItem[];
  totalCount: number;
  loadMore: () => void;
  hasMore: boolean;
}

const ContentGrid: React.FC<Props> = ({ items, loadMore, hasMore }) => {
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<ContentSkeleton count={4} />}
      style={{ overflow: "visible" }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2, // 2 * 8px = 16px
        }}
      >
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </Box>
    </InfiniteScroll>
  );
};

export default ContentGrid;
