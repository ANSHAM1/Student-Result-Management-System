import React, { useState } from "react";

/**
 * Props:
 * - mode: 'add' | 'edit'
 * - initial: object | null
 * - onSubmit: fn(payload)
 * - onCancel: fn()
 */
export default function StudentForm({ mode = "add", initial = null, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [section, setSection] = useState(initial?.section || "");
  const [marks, setMarks] = useState(initial?.marks ?? "");
  const [grade, setGrade] = useState(initial?.grade || "");

  function handleSubmit(e) {
    e.preventDefault();
    // minimal validation
    if (!name.trim()) return alert("Name is required.");
    if (!section.trim()) return alert("Section is required.");
    if (marks === "" || isNaN(Number(marks))) return alert("Enter valid marks.");
    if (!grade.trim()) return alert("Grade is required.");

    onSubmit({
      name: name.trim(),
      section: section.trim(),
      marks: Number(marks),
      grade: grade.trim(),
    });
  }

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div>
          <h3 style={{ margin: 0 }}>{mode === "add" ? "Add Student" : "Edit Student"}</h3>
          <div className="hint">Use the form below and submit. Then click Load Students to refresh.</div>
        </div>
        <div>
          <button className="btn btn-ghost" onClick={onCancel}>Back</button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          </div>

          <div className="form-field">
            <label>Section</label>
            <input type="text" value={section} onChange={(e) => setSection(e.target.value)} placeholder="Section (e.g. A)" />
          </div>

          <div className="form-field">
            <label>Marks</label>
            <input type="number" value={marks} onChange={(e) => setMarks(e.target.value)} placeholder="0 - 100" />
          </div>

          <div className="form-field">
            <label>Grade</label>
            <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade (e.g. A, B+)" />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">{mode === "add" ? "Add Student" : "Save Changes"}</button>
          <button className="btn btn-ghost" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
