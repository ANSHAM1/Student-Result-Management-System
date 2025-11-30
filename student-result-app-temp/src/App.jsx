import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import studentService from './services/studentService';

export default function App() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState('list');
  const [formMode, setFormMode] = useState('add');
  const [selected, setSelected] = useState(null);

  function loadStudents() {
    studentService.getAll()
      .then(data => {
        setStudents(data);
        alert('Students loaded.');
      })
      .catch(() => alert('Failed to load students.'));
  }

  function handleAddSubmit(payload) {
    studentService.create(payload)
      .then(() => {
        alert('Student added. Click Load Students.');
        setView('list');
      })
  }

  function handleEditSubmit(payload) {
    studentService.update(selected.id, { id: selected.id, ...payload })
      .then(() => {
        alert('Student updated. Click Load Students.');
        setView('list');
        setSelected(null);
      })
  }

  function handleDelete(id) {
    studentService.remove(id)
      .then(() => alert('Student deleted. Click Load Students.'));
  }

  return (
    <div className='container'>
      <header className='header'>
        <div className='brand'>
          <div className='logo'>SR</div>
          <div>
            <div className='title'>Student Result Manager</div>
            <div className='subtitle'>React + JSON Server</div>
          </div>
        </div>

        <div className='controls'>
          <button className='button btn-ghost' onClick={loadStudents}>Load Students</button>
          <button className='button btn-primary' onClick={() => { setFormMode('add'); setView('form'); }}>Add Student</button>
        </div>
      </header>

      {view==='list' && (
        <StudentList
          students={students}
          onLoad={loadStudents}
          onAdd={() => { setFormMode('add'); setView('form'); }}
          onEdit={(s) => { setSelected(s); setFormMode('edit'); setView('form'); }}
          onDelete={handleDelete}
          onView={(s) => { setSelected(s); setView('details'); }}
        />
      )}

      {view==='form' && (
        <StudentForm
          mode={formMode}
          initial={formMode==='edit'? selected: null}
          onSubmit={formMode==='add'? handleAddSubmit : handleEditSubmit}
          onCancel={() => setView('list')}
        />
      )}

      {view==='details' && (
        <StudentDetails student={selected} onBack={() => setView('list')} />
      )}
    </div>
  );
}
