import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const AddStudentModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    phoneNumber: "",
    email: "",
    guardianName: "",
    guardianContact: "",
    enrollmentDate: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    for (const field in formData) {
      if (formData[field] === "" || formData[field] === undefined) {
        toast.warn(`Please fill in the ${field} field.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // Start loading

    try {
      await addDoc(collection(db, "students"), formData); // Save to Firestore
      toast.success("Student added successfully!");
      onSave(); // Refresh student list in parent
      onClose(); // Close modal
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student. Please try again.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="lg" >
      <DialogHeader>Add New Student</DialogHeader>
      <DialogBody divider className="overflow-y-auto max-h-[70vh] bg-transparent">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={formData.class}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="section"
            placeholder="Section"
            value={formData.section}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="guardianName"
            placeholder="Guardian Name"
            value={formData.guardianName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="guardianContact"
            placeholder="Guardian Contact"
            value={formData.guardianContact}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="date"
            name="enrollmentDate"
            placeholder="Enrollment Date"
            value={formData.enrollmentDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded cursor-pointer mr-2"
          disabled={isLoading}
        >
          Close
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className={`px-4 py-2 bg-blue-500 text-white rounded cursor-pointer ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Add"}
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddStudentModal;
