import { useEffect, useState } from "react";
import "./App.css";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./services/studentService";
import type { Student } from "./services/studentService";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSave = async (student: Student) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id!, student);
      setEditingStudent(null);
    } else {
      await addStudent(student);
    }
    loadStudents();
  };

  const handleDelete = async (id: string) => {
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Student Management
      </h1>
      
      <StudentForm
        onSave={handleSave}
        editingStudent={editingStudent}
        clearSelection={() => setEditingStudent(null)}
      />
      
      <StudentTable
        students={students}
        onEdit={setEditingStudent}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;