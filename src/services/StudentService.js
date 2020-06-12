export default class StudentService {
  static list = (firestore, callback) => {
    let ref = firestore.collection("students");
    ref.onSnapshot(
      query => {
        let students = [];

        query.forEach(
          doc => {
            // descontrução
            const { name, course, IRA } = doc.data();

            students.push({
              _id: doc.id,
              name,
              course,
              IRA
            }); //push
          } //document
        ); //forEach

        callback(students);
      } //query
    ); //onSnapshot
  };

  static delete = (firestore, callback, id) => {
    firestore
      .collection("students")
      .doc(id)
      .delete()

      .then(() => callback("Success"))
      .catch(error => callback("Error"));
  };

  static create = (firestore, callback, student) => {
    firestore
      .collection("students")
      .add({
        name: student.name,
        course: student.course,
        IRA: student.IRA
      })

      .then(() => callback("success"))
      .catch(error => callback("error"));
  };

  // recuperar
  static retrieve = (firestore, callback, id) => {
    firestore
      .collection("students")
      .doc(id)
      .get()
      .then(doc => {
        callback({
          name: doc.data().name,
          course: doc.data().course,
          IRA: doc.data().IRA
        });
      })
      .catch(error => callback(null));
  };

  static edit = (firestore, callback, student, id) => {
    firestore
      .collection("students")
      .doc(id)
      .set(
          {
            name: student.name,
            course: student.course,
            IRA: student.IRA
          }
      )
      .then(() => {
        callback("success");
      })
      .catch(error => callback('error'));
  }
}
