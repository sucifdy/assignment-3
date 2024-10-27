import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams(); // Mendapatkan ID student dari URL
  const [student, setStudent] = useState({
    fullname: '',
    address: '',
    phoneNumber: '',
    birthDate: '',
    gender: 'Male',
    programStudy: 'Ekonomi',
    profilePicture: '',
  }); // State untuk menyimpan data student
  const [loading, setLoading] = useState(true); // State untuk meng-handle loading
  const navigate = useNavigate();

  // Menentukan fakultas berdasarkan program studi
  const facultyMap = {
    Ekonomi: "Fakultas Ekonomi",
    Manajemen: "Fakultas Ekonomi",
    Akuntansi: "Fakultas Ekonomi",
    "Administrasi Publik": "Fakultas Ilmu Sosial dan Ilmu Politik",
    "Administrasi Bisnis": "Fakultas Bisnis",
    "Hubungan Internasional": "Fakultas Ilmu Sosial dan Ilmu Politik",
    "Teknik Sipil": "Fakultas Teknik",
    Arsitektur: "Fakultas Teknik",
    Matematika: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    Fisika: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    Informatika: "Fakultas Ilmu Komputer",
  };

  // Melakukan fetch data student berdasarkan ID
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:3001/student/${id}`);
        const data = await response.json();
        setStudent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudent();
  }, [id]);

  // Meng-handle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  // Meng-handle submit untuk update data student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const faculty = facultyMap[student.programStudy]; // Mendapatkan fakultas berdasarkan program studi
      await fetch(`http://localhost:3001/student/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...student, faculty }), // Menambahkan faculty ke body
      });
      navigate('/student'); // Redirect ke halaman all student setelah update
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <h2>Edit Student</h2>
      <img src={student.profilePicture} alt={`${student.fullname}'s Profile`} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">Fullname:</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={student.fullname}
          onChange={handleChange}
          required
          data-testid="name"
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={student.address}
          onChange={handleChange}
          required
          data-testid="address"
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={student.phoneNumber}
          onChange={handleChange}
          required
          data-testid="phoneNumber"
        />

        <label htmlFor="birthDate">Birth Date:</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={student.birthDate}
          onChange={handleChange}
          required
          data-testid="date"
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={student.gender}
          onChange={handleChange}
          required
          data-testid="gender"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label htmlFor="programStudy">Program Study:</label>
        <select
          id="programStudy"
          name="programStudy"
          value={student.programStudy}
          onChange={handleChange}
          required
          data-testid="prody" // Tambahkan data-testid pada elemen select untuk program study
        >
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

        <button type="submit" data-testid="edit-btn">Update</button> {/* Tambahkan data-testid pada tombol submit */}
      </form>
    </div>
  );
};

export default EditStudent;
