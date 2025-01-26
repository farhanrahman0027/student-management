import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import AddStudentModal from "./AddStudentModal";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [localData, setLocalData] = useState([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Fetch students from Firestore
  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      setStudents(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students. Please try again.");
    }
  };

  // Handle "View" button click
  const handleView = (id) => {
    const student = students.find((s) => s.id === id);
    toast.info(
      `Viewing details:\nName: ${student.name}\nClass: ${student.class}\nRoll Number: ${student.rollNumber}\nGender: ${student.gender}`
    );
  };

  // Handle "Edit" button click
  const handleEdit = (id) => {
    const student = students.find((s) => s.id === id);
    setSelectedStudent(student);
    handleOpenModal(); // Open modal for editing
  };

  // Handle "Delete" button click
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      fetchStudents(); // Refresh the list after deletion
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student. Please try again.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <div>
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Add Student
        </button>
      </div>

      <div className="overflow-x-auto mt-6" style={{
    scrollbarWidth: 'none',
  }}>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">ID</th>
              <th className="border border-gray-200 p-2">Name</th>
              <th className="border border-gray-200 p-2">Class</th>
              <th className="border border-gray-200 p-2">Section</th>
              <th className="border border-gray-200 p-2">Roll Number</th>
              <th className="border border-gray-200 p-2">Gender</th>
              <th className="border border-gray-200 p-2">Date of Birth</th>
              <th className="border border-gray-200 p-2">Phone Number</th>
              <th className="border border-gray-200 p-2">Email</th>
              <th className="border border-gray-200 p-2">Guardian Name</th>
              <th className="border border-gray-200 p-2">Guardian Contact</th>
              <th className="border border-gray-200 p-2">Address</th>
              <th className="border border-gray-200 p-2">Enrollment Date</th>
              <th className="border border-gray-200 p-2">Action</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-60">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border border-gray-200 p-2">{student.id}</td>
                <td className="border border-gray-200 p-2">{student.name}</td>
                <td className="border border-gray-200 p-2">{student.class}</td>
                <td className="border border-gray-200 p-2">{student.section}</td>
                <td className="border border-gray-200 p-2">{student.rollNumber}</td>
                <td className="border border-gray-200 p-2">{student.gender}</td>
                <td className="border border-gray-200 p-2">{student.dateOfBirth}</td>
                <td className="border border-gray-200 p-2">{student.phoneNumber}</td>
                <td className="border border-gray-200 p-2">{student.email}</td>
                <td className="border border-gray-200 p-2">{student.guardianName}</td>
                <td className="border border-gray-200 p-2">{student.guardianContact}</td>
                <td className="border border-gray-200 p-2">{student.address}</td>
                <td className="border border-gray-200 p-2">{student.enrollmentDate}</td>
                <td className="border border-gray-200 p-2 flex gap-2">
                  <button
                    onClick={() => handleView(student.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AddStudentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={() => {
            fetchStudents(); // Refresh the list after saving
            toast.success("Student saved successfully!");
          }}
          localData={localData}
          setLocalData={setLocalData}
          selectedStudent={selectedStudent}
        />
      )}
    </div>
  );
};

export default StudentTable;
