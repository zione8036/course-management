import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { getUnit } from "../../constants";

const CourseForm = ({ initialValue, onSubmit }) => {
  const [form, setForm] = useState(
    initialValue || {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      instructor: "",
      capacity: 0,
      category: "",
      department: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);
    console.log(updatedForm);
  };

  return (
    <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12} md={6}>
        <Typography>Course Title</Typography>
        <TextField
          fullWidth
          label="Course Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>Department</Typography>
        <TextField
          fullWidth
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>Category</Typography>
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>Intructor</Typography>
        <TextField
          fullWidth
          label="Intructor"
          name="instructor"
          value={form.instructor}
          onChange={handleChange}
        />
      </Grid>

      <Grid container spacing={4} mx={1}>
        <Grid item xs={12} md={2}>
          <Typography>Capacity</Typography>
          <TextField
            fullWidth
            label="Capacity"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography>Start Date</Typography>
          <TextField
            fullWidth
            label="Start Date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography>End Date</Typography>
          <TextField
            fullWidth
            label="End Date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>Description</Typography>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={3}
        />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default CourseForm;
