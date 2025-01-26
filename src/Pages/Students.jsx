import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import StudentTable from '../components/StudentTable';
import AddStudentModal from '../components/AddStudentModal';
import '../index.css'

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch students from Firestore
  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList); // Update state with fetched students
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Handle adding a student
  const handleAddStudent = async (student) => {
    try {
      await addDoc(collection(db, 'students'), student);
      fetchStudents(); // Refresh the student list
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex max-w-full overflow-x-hidden">
    <Sidebar />
    <div className="flex-1 p-6 overflow-x-scroll " style={{
    scrollbarWidth: 'none',
  }}
    >
      <h1 className="text-2xl font-bold mb-4">Students Page</h1>
      
      {/* The table component with the scrollable feature */}
      <StudentTable className="" students={students} onRefresh={fetchStudents} />

      {/* Modal to add student */}
      {isModalOpen && (
        <AddStudentModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddStudent}
        />
      )}
    </div>
  </div>
  );
};

export default Students;
