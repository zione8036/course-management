import EventIcon from "@mui/icons-material/Event";
import React, { lazy } from "react";
import ArchiveIcon from "@mui/icons-material/Archive";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
const Course = lazy(() => import("./pages/course/Course"));
const ArchiveCourses = lazy(() => import("./pages/course/ArchiveCourses"));
const CourseAdd = lazy(() => import("./pages/course/CourseAdd"));
const CourseEdit = lazy(() => import("./pages/course/CourseEdit"));
const AuditCourses = lazy(() => import("./pages/course/AuditCourses"));
export const routes = [
  {
    icon: <EventIcon />,
    text: "Course",
    path: "/course",
    element: <Course />,
  },
  {
    icon: <ArchiveIcon />,
    text: "Archives",
    path: "/course/archives",
    element: <ArchiveCourses />,
  },
  {
    icon: <AutoStoriesIcon />,
    text: "Audit logs",
    path: "/course/audit-logs",
    element: <AuditCourses />,
  },
  {
    path: "/course/add",
    element: <CourseAdd />,
  },
  {
    path: "/course/edit/:id",
    element: <CourseEdit />,
  },
];
