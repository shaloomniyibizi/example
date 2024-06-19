import { useState } from 'react';
import { example_backend } from 'declarations/example_backend';

function App() {
  const [students, setStudents] = useState([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const fetchStudents = async () => {
    try {
      const studentsList = await example_backend.getStudents();
      console.log('Fetched students:', studentsList);
      setStudents(studentsList);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();
    console.log('Submitting student:', newStudent);

    try {
      await example_backend.addStudents(
        newStudent.firstName,
        newStudent.lastName,
        newStudent.email
      );
      console.log('Student added successfully');
      setNewStudent({ firstName: '', lastName: '', email: '' });
      setShowAddStudentForm(false);
      fetchStudents(); // Fetch students after adding a new student
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  const handleFetchStudents = () => {
    fetchStudents();
    setShowAddStudentForm(false); // Close the add student form when fetching students
  };

  return (
    <>
      <button onClick={() => setShowAddStudentForm(true)}>
        Add New Student
      </button>
      <button onClick={handleFetchStudents}>Fetch Students</button>
      <h2>Student List</h2>
      {!showAddStudentForm && (
        <table>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email name</th>
            <th colSpan={2}>Action</th>
          </tr>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.firstName}</td> <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          ))}
        </table>
      )}
      {showAddStudentForm && (
        <form onSubmit={handleAddStudent}>
          <label>First Name:</label>
          <input
            type='text'
            value={newStudent.firstName}
            onChange={(e) =>
              setNewStudent({ ...newStudent, firstName: e.target.value })
            }
            required
          />
          <label>Last Name:</label>
          <input
            type='text'
            value={newStudent.lastName}
            onChange={(e) =>
              setNewStudent({ ...newStudent, lastName: e.target.value })
            }
            required
          />
          <label>Email:</label>
          <input
            type='text'
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
            required
          />
          <button type='submit'>Save Student</button>
        </form>
      )}
    </>
  );
}

export default App;
