import React from "react";

/**
 * Props:
 * - student: object
 * - onBack: fn
 */
export default function StudentDetails({ student, onBack }) {
  if (!student) return null;

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ margin: 0 }}>Student Details</h3>
          <div className="hint">Read-only view</div>
        </div>
        <div>
          <button className="btn btn-ghost" onClick={onBack}>Back</button>
        </div>
      </div>

      <div className="detail-grid" style={{ marginTop: 14 }}>
        <div className="detail-item">
          <strong>Name</strong>
          <div>{student.name}</div>
        </div>

        <div className="detail-item">
          <strong>Section</strong>
          <div>{student.section}</div>
        </div>

        <div className="detail-item">
          <strong>Marks</strong>
          <div>{student.marks}</div>
        </div>

        <div className="detail-item">
          <strong>Grade</strong>
          <div>{student.grade}</div>
        </div>
      </div>
    </div>
  );
}
