import { useEffect, useState } from "react";
import type { Student } from "../services/studentService";

interface Props {
  onSave: (student: Student) => void;
  editingStudent: Student | null;
  clearSelection: () => void;
}

const StudentForm = ({ onSave, editingStudent, clearSelection }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
    }
  }, [editingStudent]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: editingStudent?.id,
      name,
      email,
    });
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={submitHandler} className="bg-white p-4 rounded shadow max-w-md mx-auto mb-6">
      <h3 className="text-xl font-bold mb-4">
        {editingStudent ? "Update Student" : "Add Student"}
      </h3>
      
      <input
        className="border p-2 w-full mb-3"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2"
      >
        {editingStudent ? "Update" : "Create"}
      </button>

      {editingStudent && (
        <button
          type="button"
          onClick={clearSelection}
          className="bg-gray-400 text-white px-4 py-2 rounded w-full"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default StudentForm;