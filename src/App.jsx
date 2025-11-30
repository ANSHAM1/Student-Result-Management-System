import React, { useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./components/StudentDetails";
import studentService from "./services/studentService";

import './App.css';

export default function App() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState("list"); 
  const [formMode, setFormMode] = useState("add");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manual load of students
  function loadStudents() {
    setLoading(true);
    studentService
      .getAll()
      .then((data) => {
        setStudents(data);
        alert("Students loaded successfully.");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load students. Check JSON Server.");
      })
      .finally(() => setLoading(false));
  }

  function handleAddClick() {
    setFormMode("add");
    setSelected(null);
    setView("form");
  }

  function handleAddSubmit(payload) {
    studentService
      .create(payload)
      .then(() => {
        alert("Student added. Click 'Load Students' to refresh the list.");
        setView("list");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add student.");
      });
  }

  function handleEditClick(student) {
    setFormMode("edit");
    setSelected(student);
    setView("form");
  }

  function handleEditSubmit(payload) {
    if (!selected || !selected.id) {
      alert("No student selected to edit.");
      return;
    }
    studentService
      .update(selected.id, { id: selected.id, ...payload })
      .then(() => {
        alert("Student updated. Click 'Load Students' to refresh the list.");
        setView("list");
        setSelected(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update student.");
      });
  }

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    studentService
      .remove(id)
      .then(() => {
        alert("Student deleted. Click 'Load Students' to refresh.");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete student.");
      });
  }

  function handleView(student) {
    setSelected(student);
    setView("details");
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="brand-left">
          <div className="brand-logo">SR</div>
          <div className="brand-text">
            <div className="app-title">Student Result Manager</div>
            <div className="app-sub">React • Vite • JSON Server</div>
          </div>
        </div>

        <div className="brand-right">
          <button
            className="btn btn-ghost"
            onClick={loadStudents}
            disabled={loading}
            title="Load all students from server"
          >
            {loading ? "Loading..." : "Load Students"}
          </button>

          <button className="btn btn-primary" onClick={handleAddClick}>
            + Add Student
          </button>
        </div>
      </header>

      <main className="admin-main">
        {view === "list" && (
          <StudentList
            students={students}
            onLoad={loadStudents}
            onAdd={handleAddClick}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}

        {view === "form" && (
          <StudentForm
            mode={formMode}
            initial={formMode === "edit" ? selected : null}
            onSubmit={formMode === "add" ? handleAddSubmit : handleEditSubmit}
            onCancel={() => {
              setSelected(null);
              setView("list");
            }}
          />
        )}

        {view === "details" && (
          <StudentDetails
            student={selected}
            onBack={() => {
              setSelected(null);
              setView("list");
            }}
          />
        )}
      </main>

      <footer className="admin-footer">
        <small>
          Note: All data operations are manual per assignment. After create/edit/delete,
          click <strong>Load Students</strong> to refresh.
        </small>
      </footer>
    </div>
  );
}
