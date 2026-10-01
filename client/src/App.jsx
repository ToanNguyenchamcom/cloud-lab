
import { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchStudents = () => {
    fetch('http://localhost:5000/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, name, email }),
    })
      .then(() => {
        setStudentId('');
        setName('');
        setEmail('');
        fetchStudents();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' })
      .then(() => fetchStudents())
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Quản Lý Sinh Viên - Buổi 3 Docker MERN</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input placeholder="MSSV" value={studentId} onChange={(e) => setStudentId(e.target.value)} required style={{ marginRight: '8px' }} />
        <input placeholder="Họ tên" value={name} onChange={(e) => setName(e.target.value)} required style={{ marginRight: '8px' }} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginRight: '8px' }} />
        <button type="submit">Thêm sinh viên</button>
      </form>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '650px' }}>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st._id}>
              <td>{st.studentId}</td>
              <td>{st.name}</td>
              <td>{st.email}</td>
              <td>
                <button onClick={() => handleDelete(st._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
