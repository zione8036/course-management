import { Box, Card, IconButton, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { getAllCoursesArchives } from "../../services/courseService";

const ArchiveCourses = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getCourseArchives();
  }, []);

  const getCourseArchives = () => {
    getAllCoursesArchives().then((res) => {
      if (res) {
        setData(res.data);
      }
    });
  };
  function formatDate(dateString) {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const columns = [
    {
      field: "category",
      headerName: "Category",
      sortable: true,
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "title",
      headerName: "Course title",
      sortable: true,
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "instructor",
      headerName: "Instructor",
      width: 230,
      sortable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      headerAlign: "center",
      align: "center",
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

export default ArchiveCourses;
