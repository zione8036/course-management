import { Box, Card, IconButton, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { getAllAudits } from "../../services/courseService";

const AuditCourses = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getCourseAudits();
  }, []);

  const getCourseAudits = () => {
    getAllAudits().then((res) => {
      if (res) {
        console.log(res.data);
        setData(res.data);
      }
    });
  };
  function formatDate(dateString) {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return date.toLocaleDateString("en-US", options);
  }

  const columns = [
    {
      field: "changedField",
      headerName: "Changed Field",
      sortable: true,
      width: 200,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "newValue",
      headerName: "New Value",
      width: 350,
      sortable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "oldValue",
      headerName: "Old Value",
      width: 350,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dateCreated",
      headerName: "Date Modified",
      width: 250,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => formatDate(params.row.dateCreated),
    },
  ];

  return (
    <Card sx={{ padding: "20px", paddingBottom: "50px" }}>
      <Box sx={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          getRowHeight={() => "20"}
        />
      </Box>
    </Card>
  );
};

export default AuditCourses;
