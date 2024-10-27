import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterFaculty, setFilterFaculty] = useState('All'); // State untuk menyimpan nilai filter fakultas

  // Fetch data dari json-server saat komponen di-render pertama kali
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3001/student');
        const data = await response.json();
        // Menambahkan ID unik jika ID tidak ada
        const studentsWithId = data.map(student => ({
          ...student,
          id: student.id || uuidv4(), // Menggunakan uuid jika ID tidak ada
        }));
        setStudents(studentsWithId);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Fungsi untuk menghapus student
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: 'DELETE',
      });
      setStudents(students.filter((student) => student.id !== id)); // Hapus student dari state
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Fungsi untuk meng-handle perubahan pada elemen filter
  const handleFilterChange = (e) => {
    setFilterFaculty(e.target.value); // Update nilai filter berdasarkan pilihan user
  };

  // Filter data student berdasarkan fakultas yang dipilih
  const filteredStudents = students.filter((student) => {
    if (filterFaculty === 'All') return true;
    return student.faculty === filterFaculty;
  });

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <h2>Student List</h2>
      
      {/* Elemen select untuk filter fakultas */}
      <label htmlFor="filter">Filter by Faculty: </label>
      <select
        id="filter"
        data-testid="filter"
        value={filterFaculty}
        onChange={handleFilterChange}
      >
        <option value="All">All</option>
        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
        <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
        <option value="Fakultas Teknik">Fakultas Teknik</option>
        <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
      </select>

      <table id="table-student">
        <thead>
          <tr>
            <th>No</th>
            <th>Full Name</th>
            <th>Faculty</th>
            <th>Program Study</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id} className="student-data-row">
              <td>{index + 1}</td>
              <td>
                <Link to={`/student/${student.id}`}>{student.fullname}</Link>
              </td>
              <td>{student.faculty}</td>
              <td>{student.programStudy}</td>
              <td>
                <button
                  data-testid={`delete-${student.id}`}
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
