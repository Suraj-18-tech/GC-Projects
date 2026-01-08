import type { Student } from "../services/studentService";

interface Props {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentTable = ({ students, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Students</h3>
      
      {students.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No students found</p>
      ) : (
        <div className="space-y-3">
          {students.map((student) => (
            <div 
              key={student.id} 
              className="flex justify-between items-center border-b pb-3 last:border-b-0"
            >
              <div>
                <b className="text-lg">{student.name}</b>
                <p className="text-gray-600">{student.email}</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => onEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => onDelete(student.id!)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentTable;