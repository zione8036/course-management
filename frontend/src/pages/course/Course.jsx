import { Button, Card, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseTable from "./CourseTable";
import SuspenseFallback from "../../components/SuspenseFallback";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { getAllCourses } from "../../services/courseService";

const Course = () => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = () => {
    getAllCourses().then((res) => {
      if (res) {
        setCourse(res.data);
      }
    });
  };

  const navigate = useNavigate();

  if (course) {
    const courseWithoutArchived = course.filter((x) => x.archive != true);
    return (
      <Container maxWidth="100%">
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("add");
            }}
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
          >
            Add
          </Button>
        </Stack>
        <Card sx={{ padding: "20px", paddingBottom: "50px" }}>
          <CourseTable data={courseWithoutArchived} setData={setCourse} />
        </Card>
      </Container>
    );
  }
  return <SuspenseFallback />;
};

export default Course;
