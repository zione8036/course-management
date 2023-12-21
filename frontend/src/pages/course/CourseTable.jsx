import { Box, IconButton, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArchiveIcon from "@mui/icons-material/Archive";
import { archiveCourseById } from "../../services/courseService";

const CourseTable = ({ data, setData }) => {
  console.log(data);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to archive this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF0000",
        confirmButtonText: "Archive",
      }).then((res) => {
        if (res.isConfirmed) {
          archiveCourseById(id).then((res) => {
            console.log(res);
            if (res && res.status === 200) {
              const filteredData = data.filter((x) => x.id !== id);
              console.log(filteredData);
              setData(filteredData);
              toast.success(res.data.message);
            } else {
              toast.error(res.data.message);
            }
          });
        }
      });
    } catch (error) {
      if (error.response.data.statusCode === 404) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "This record may have already been deleted.",
        });
      }
    }
  };
  function formatDate(dateString) {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  const showCourseDetails = (courseDetails) => {
    Swal.fire({
      title: "Course Details",
      html: `
        <p><strong>Title:</strong> ${courseDetails.title}</p>
        <p><strong>Description:</strong> ${courseDetails.description}</p>
       
        <p><strong>Department:</strong> ${courseDetails.department}</p>
        <p><strong>Instructor:</strong> ${courseDetails.instructor}</p>
        <p><strong>Start Date:</strong> ${formatDate(
          courseDetails.startDate
        )}</p>
        <p><strong>End Date:</strong> ${
          formatDate(courseDetails.endDate) || "N/A"
        }</p>
        <p><strong>Capacity:</strong> ${courseDetails.capacity}</p>
      `,
      showCloseButton: true,
    });
  };
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

    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            color="info"
            onClick={() => {
              navigate(`edit/${params.row.id}`);
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="warning"
            onClick={() => {
              showCourseDetails(params.row);
            }}
          >
            <VisibilityIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => {
              handleDelete(params.row.id);
            }}
          >
            <ArchiveIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
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
        getRowHeight={() => "auto"}
      />
    </Box>
  );
};

export default CourseTable;
