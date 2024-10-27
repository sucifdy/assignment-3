import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [student, setStudent] = useState({
    fullname: '',
    profilePicture: '',
    address: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
    programStudy: '',
    faculty: '',
  });

  const navigate = useNavigate();

  // Fungsi untuk meng-handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  // Fungsi untuk meng-handle programStudy dan menentukan faculty
  const handleProgramStudyChange = (e) => {
    const selectedProgramStudy = e.target.value;
    let faculty = '';

    switch (selectedProgramStudy) {
      case 'Ekonomi':
      case 'Manajemen':
      case 'Akuntansi':
        faculty = 'Fakultas Ekonomi';
        break;
      case 'Administrasi Publik':
      case 'Administrasi Bisnis':
      case 'Hubungan Internasional':
        faculty = 'Fakultas Ilmu Sosial dan Politik';
        break;
      case 'Teknik Sipil':
      case 'Arsitektur':
        faculty = 'Fakultas Teknik';
        break;
      case 'Matematika':
      case 'Fisika':
      case 'Informatika':
        faculty = 'Fakultas Teknologi Informasi dan Sains';
        break;
      default:
        faculty = '';
    }

    setStudent({
      ...student,
      programStudy: selectedProgramStudy,
      faculty: faculty, // Set otomatis fakultas berdasarkan program study
    });
  };

  // Fungsi untuk menambahkan data student ke json-server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      navigate('/student'); // Setelah submit, redirect ke halaman all student
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">Fullname:</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          data-testid="name"
          value={student.fullname}
          onChange={handleChange}
          required
        />

        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          type="text"
          id="profilePicture"
          name="profilePicture"
          data-testid="profilePicture"
          value={student.profilePicture}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          data-testid="address"
          value={student.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          data-testid="phoneNumber"
          value={student.phoneNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="birthDate">Birth Date:</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          data-testid="date"
          value={student.birthDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          data-testid="gender"
          value={student.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label htmlFor="programStudy">Program Study:</label>
        <select
          id="programStudy"
          name="programStudy"
          data-testid="prody"
          value={student.programStudy}
          onChange={handleProgramStudyChange}
          required
        >
          <option value="">Select Program Study</option>
          <option value="Ekonomi">Ekonomi</option>
          <option value="Manajemen">Manajemen</option>
          <option value="Akuntansi">Akuntansi</option>
          <option value="Administrasi Publik">Administrasi Publik</option>
          <option value="Administrasi Bisnis">Administrasi Bisnis</option>
          <option value="Hubungan Internasional">Hubungan Internasional</option>
          <option value="Teknik Sipil">Teknik Sipil</option>
          <option value="Arsitektur">Arsitektur</option>
          <option value="Matematika">Matematika</option>
          <option value="Fisika">Fisika</option>
          <option value="Informatika">Informatika</option>
        </select>

        <button type="submit" data-testid="add-btn">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;