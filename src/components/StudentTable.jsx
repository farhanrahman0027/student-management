import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import AddStudentModal from "./AddStudentModal";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null); // For "View" functionality
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // For "Delete" confirmation dialog
  const [studentToDelete, setStudentToDelete] = useState(null);

  // For Edit functionality
  const [selectedStudent, setSelectedStudent] = useState(null); // To hold the student being edited
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
  const handleView = (student) => {
    setViewStudent(student);
  };

  // Handle "Edit" button click
  const handleEdit = (student) => {
    setSelectedStudent(student); // Sets the student to be edited
    setIsEditModalOpen(true); // Opens the edit modal
  };

  // Handle saving updated student details
  const handleSaveEdit = async () => {
    if (!selectedStudent) return;

    try {
      // Update the student in Firestore
      await updateDoc(doc(db, "students", selectedStudent.id), selectedStudent);
      fetchStudents(); // Refresh the list after updating
      toast.success("Student updated successfully!");
      setIsEditModalOpen(false); // Close the edit modal
      setSelectedStudent(null); // Reset the selected student
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student. Please try again.");
    }
  };

  // Handle input change for edit modal
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle "Delete" button click
  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteDoc(doc(db, "students", studentToDelete.id));
      fetchStudents(); // Refresh the list after deletion
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student. Please try again.");
    }
    setDeleteDialogOpen(false); // Close the dialog
    setStudentToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false); // Close the dialog
    setStudentToDelete(null);
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

      <div
        className="overflow-x-auto mt-6"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">ID</th>
              <th className="border border-gray-200 p-2">Name</th>
              <th className="border border-gray-200 p-2">Class</th>
              <th className="border border-gray-200 p-2">Section</th>
              <th className="border border-gray-200 p-2">Roll Number</th>
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
                <td className="border border-gray-200 p-2 flex gap-2">
                  <button
                    onClick={() => handleView(student)}
                    className="px-2 py-1 bg-green-500 text-white rounded cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(student)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(student)}
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

      {/* View Student Dialog */}
      {viewStudent && (
        <Dialog open={Boolean(viewStudent)} onClose={() => setViewStudent(null)}>
          <DialogTitle>Student Details</DialogTitle>
          <DialogContent>
            {Object.entries(viewStudent).map(([key, value]) => (
              <p key={key}>
                <strong>{key}: </strong> {value}
              </p>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewStudent(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Edit Student Modal */}
      {isEditModalOpen && selectedStudent && (
        <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <DialogTitle>Edit Student Details</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              name="name"
              value={selectedStudent?.name || ""}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Class"
              name="class"
              value={selectedStudent?.class || ""}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Section"
              name="section"
              value={selectedStudent?.section || ""}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Roll Number"
              name="rollNumber"
              value={selectedStudent?.rollNumber || ""}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditModalOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          Do you really want to delete this student? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {isModalOpen && (
        <AddStudentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={() => {
            fetchStudents(); // Refresh the list after saving
            toast.success("Student saved successfully!");
          }}
        />
      )}
    </div>
  );
};

export default StudentTable;
