import React from "react";

/**
 * Props:
 * - students: array
 * - onLoad: fn
 * - onAdd: fn
 * - onEdit: fn(student)
 * - onDelete: fn(id)
 * - onView: fn(student)
 */
export default function StudentList({ students = [], onLoad, onAdd, onEdit, onDelete, onView }) {
  return (
    <div className="card">
      <div className="list-header">
        <div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Students</h3>
            <div className="hint">Manual loading. Click Load to fetch from server.</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={onLoad}>Load Students</button>
          <button className="btn btn-primary" onClick={onAdd}>Add Student</button>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="center">
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No students loaded</div>
          <div className="hint">Click <strong>Load Students</strong> to fetch from the server.</div>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="table" role="table">
            <thead>
              <tr>
                <th style={{ width: "38%" }}>Name</th>
                <th style={{ width: "12%" }}>Section</th>
                <th style={{ width: "12%" }}>Marks</th>
                <th style={{ width: "12%" }}>Grade</th>
                <th style={{ width: "26%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="row-name">{s.name}</div>
                    <div className="hint" style={{ marginTop: 6 }}>{/* placeholder for small info */}</div>
                  </td>
                  <td>{s.section}</td>
                  <td>{s.marks}</td>
                  <td>{s.grade}</td>
                  <td className="actions">
                    <button className="action-btn view-btn" onClick={() => onView(s)}>View</button>
                    <button className="action-btn edit-btn" onClick={() => onEdit(s)}>Edit</button>
                    <button className="action-btn delete-btn" onClick={() => onDelete(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
