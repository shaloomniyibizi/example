import { useState } from 'react';
import { example_backend } from 'declarations/example_backend';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './components/ui/alert-dialog';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';
import { Pencil, Trash } from 'lucide-react';

function App() {
  const [students, setStudents] = useState([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const studentsList = await example_backend.getStudents();
      setStudents(studentsList);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();
    try {
      if (editingStudent) {
        await example_backend.updateStudent(
          editingStudent.id,
          newStudent.firstName,
          newStudent.lastName,
          newStudent.email
        );
        toast.success('Student updated successfully');
      } else {
        await example_backend.addStudents(
          newStudent.firstName,
          newStudent.lastName,
          newStudent.email
        );
        toast.success('Student added successfully');
      }

      setNewStudent({ firstName: '', lastName: '', email: '' });
      setShowAddStudentForm(false);
      fetchStudents();
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };
  const handleEditStudent = (student) => {
    setNewStudent({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
    });
    setEditingStudent(student);
    setShowAddStudentForm(true);
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await example_backend.deleteStudent(studentId);
      toast.success('Student deleted successfully');
      fetchStudents(); // Fetch students after deleting a student
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };
  const handleFetchStudents = () => {
    fetchStudents();
    setShowAddStudentForm(false); // Close the add student form when fetching students
  };

  return (
    <div className='container max-w-[80vw] mx-auto mt-12'>
      <div className='flex justify-end'>
        <Dialog open={showAddStudentForm} onOpenChange={setShowAddStudentForm}>
          <DialogTrigger asChild>
            <Button onClick={() => setShowAddStudentForm(true)}>
              Add New Student
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <form onSubmit={handleAddStudent}>
              <DialogHeader>
                <DialogTitle>Add new student</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input
                    type='text'
                    value={newStudent.firstName}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        firstName: e.target.value,
                      })
                    }
                    required
                    id='firstName'
                    placeholder='Enter First Name'
                  />
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input
                    type='text'
                    value={newStudent.lastName}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        lastName: e.target.value,
                      })
                    }
                    required
                    id='lastName'
                    placeholder='Enter Last Name'
                  />
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    type='email'
                    value={newStudent.email}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, email: e.target.value })
                    }
                    required
                    id='email'
                    placeholder='Enter Email'
                  />
                </div>
                <Button type='submit'>Save Student</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table className='max-w-[80vw] mx-auto'>
        <TableCaption>A list Students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='font-medium'>First name</TableHead>
            <TableHead className='font-medium'>Last name</TableHead>
            <TableHead className='font-medium'>Email address</TableHead>
            <TableHead className='font-medium'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell className='flex gap-2'>
                <Button
                  variant='outline'
                  size={'sm'}
                  className='text-blue-900'
                  onClick={() => handleEditStudent(student)}
                >
                  <Pencil className='mr-2 h-4 w-4' /> Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button size={'sm'} variant='destructive'>
                      <Trash className='mr-2 h-4 w-4' />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your user and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          variants={'outline'}
                          className=''
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          Continue
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </div>
  );
}

export default App;
