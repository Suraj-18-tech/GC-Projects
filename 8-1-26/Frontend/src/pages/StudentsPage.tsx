import type { Student } from "../services/studentService";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import { useEffect, useState } from "react";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSave = async (student: Student) => {
    if (student.id) {
      await updateStudent(student.id, student);
    } else {
      await addStudent(student);
    }
    setEditingStudent(null);
    fetchStudents();
  };

  const handleDelete = async (id: string) => {
    await deleteStudent(id);
    fetchStudents();
  };

  const clearSelection = () => {
    setEditingStudent(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Student Management
      </h1>

      <StudentForm
        onSave={handleSave}
        editingStudent={editingStudent}
        clearSelection={clearSelection}
      />

      <StudentTable
        students={students}
        onEdit={setEditingStudent}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default StudentsPage;