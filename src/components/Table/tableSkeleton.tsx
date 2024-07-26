import React from "react";
import { Skeleton, Box } from "@mui/material";

const TableSkeleton = () => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 5rem)",
        width: "100%",
        p: 2,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="rectangular" height={50} />
      </Box>
      <Box>
        {Array.from(new Array(10)).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              mb: 1,
              alignItems: 'center',
            }}
          >
            <Skeleton variant="rectangular" width={100} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width={350} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width={250} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width={150} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width={350} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width={200} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width={150} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width={200} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width={150} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width={200} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width={200} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width={200} height={40} sx={{ mr: 1 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TableSkeleton;
