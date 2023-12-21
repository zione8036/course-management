import { Card, Container, Typography } from "@mui/material";
import React from "react";
import CourseForm from "./CourseForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCourse } from "../../services/courseService";

const CourseAdd = () => {
  const navigate = useNavigate();

  const handleSubmit = (form) => {
    try {
      createCourse(form).then((res) => {
        console.log(res);
        if (res && res.status === 200) {
          toast.success(res.data.message);
          navigate("/course");
        } else {
          console.log(res.data.message);
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="100%">
      <Typography variant="h5" mb={2} fontWeight="bold">
        Add Course
      </Typography>

      <Card sx={{ padding: "20px" }}>
        <CourseForm onSubmit={handleSubmit} />
      </Card>
    </Container>
  );
};

export default CourseAdd;
