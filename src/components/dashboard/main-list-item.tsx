import React from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import { Bell as BellICon } from '@phosphor-icons/react/dist/ssr/Bell';

interface MainListItemProps {
  username: string;
  content: string;
  time: string;
}

const MainListItem: React.FC<MainListItemProps> = ({ username, content, time}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "10px",
        marginX: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <BellICon />
        <Typography variant="body1" sx={{ color: "green", fontWeight: "bold", fontSize: "0.875rem" }}>
          {username}:
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "red",
            fontWeight: "bold",
            fontSize: "0.875rem",
          }}
        >
          {content}
        </Typography>
      </Stack>
      <Chip
        label={time}
        sx={{
          backgroundColor: "#e0f2f1",
          color: "#00796b",
          fontWeight: "bold",
        }}
        size="small"
      />
    </Box>
  );
};

export default MainListItem;
