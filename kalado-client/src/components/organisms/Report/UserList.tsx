import React from "react";
import { Box } from "@mui/material";
import ReportCard from "./UserCard";

type Report = {
  id: number;
  email: string;
  status: string;
};

type ReportListProps = {
  reports: Report[];
  onStatusChange: (id: number, newStatus: string) => void;
};

const ReportList: React.FC<ReportListProps> = ({ reports, onStatusChange }) => {
  return (
    <Box>
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          email={report.email}
          status={report.status}
          onStatusChange={(newStatus) => onStatusChange(report.id, newStatus)}
        />
      ))}
    </Box>
  );
};

export default ReportList;
