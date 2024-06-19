import Array "mo:base/Array";

actor {
  stable var students : [Student] = [];
  public type Student = {
    firstName:Text;
    lastName:Text;
    email:Text;
  };

  public query func getStudents():async [Student]{
    return students;
  };

  public func addStudents(firstName:Text, lastName:Text,email:Text):async (){
    let newStudent : [Student] = [{firstName;lastName;email}];
    students := Array.append(students,newStudent)
  };

};
