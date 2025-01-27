import React from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";

type ReportCardProps = {
  email: string;
  status: string;
  onStatusChange: (newStatus: string) => void;
};

const ReportCard: React.FC<ReportCardProps> = ({ email, status, onStatusChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <Typography sx={{ flex: 1 }}>{email}</Typography>
      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        sx={{ minWidth: "120px" }}
      >
        <MenuItem value="allowed">Allowed</MenuItem>
        <MenuItem value="blocked">Blocked</MenuItem>
      </Select>
    </Box>
  );
};

export default ReportCard;
