import http from "./http";

export function getAllCourses() {
  return http.get("course/all");
}
export function getAllCoursesArchives() {
  return http.get("course/archive/all");
}
export function getAllAudits() {
  return http.get("course/audit/all");
}
export function getCourseById(id) {
  return http.get(`course/${id}`);
}

export function createCourse(courseData) {
  console.log(courseData);
  return http.post("course/add", courseData);
}

export function updateCourse(id, courseData) {
  return http.patch(`course/${id}`, courseData);
}

export function archiveCourseById(id) {
  return http.put(`course/${id}`);
}

export function updateCourseDetails(id, detailsData) {
  return http.patch(`course/details/${id}`, detailsData);
}
