import { Card, Container, Typography } from "@mui/material";
import React from "react";
import CourseForm from "./CourseForm";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import SuspenseFallback from "../../components/SuspenseFallback";
import { getCourseById, updateCourse } from "../../services/courseService";

const CourseEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourse(+params.id);
  }, []);

  const getCourse = (id) => {
    getCourseById(id).then((res) => {
      if (res && res.data) {
        setCourse(res.data);
      }
    });
  };

  const handleSubmit = (form) => {
    try {
      updateCourse(+params.id, form).then((res) => {
        if (res && res.status === 200) {
          toast.success(res.data.message);
          navigate("/course");
        } else {
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      if (error.response && error.response.status) {
        alert(error.response.data.message);
      } else if (error.response && error.response.status === 404) {
        alert("This record may have already been deleted");
      }
    }
  };
  if (course) {
    return (
      <Container maxWidth="100%">
        <Typography variant="h5" mb={2} fontWeight="bold">
          Edit Course
        </Typography>

        <Card sx={{ padding: "20px" }}>
          <CourseForm
            onSubmit={handleSubmit}
            initialValue={{
              ...course,
              startDate: new Date(course.startDate).toISOString().split("T")[0],
              endDate: new Date(course.endDate).toISOString().split("T")[0],
            }}
          />
        </Card>
      </Container>
    );
  }
  return <SuspenseFallback />;
};

export default CourseEdit;
