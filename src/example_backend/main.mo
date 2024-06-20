import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor {
  stable var students : [Student] = [];
  public type Student = {
    id: Nat;
    firstName:Text;
    lastName:Text;
    email:Text;
  };

  

  public query func getStudents():async [Student]{
    return students;
  };

  public func addStudents(firstName:Text, lastName:Text,email:Text):async (){
    let id = students.size();
    let newStudent : [Student] = [{id; firstName;lastName;email}];
    students := Array.append(students,newStudent)
  };

  public func deleteStudent(id : Nat) : async () {
    students := Array.filter<Student>(students, func(student : Student) : Bool {
      student.id != id;
    });
  };

  public func updateStudent(id : Nat, newFirstName : Text, newLastName : Text, newEmail : Text) : async () {
    students := Array.map<Student, Student>(students, func(student : Student) : Student {
      if (student.id == id) {
        { id = student.id; firstName = newFirstName; lastName = newLastName; email = newEmail }
      } else {
        student;
      }
    });
  };
};
