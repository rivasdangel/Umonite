$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      var docRef = db.collection("user_permits").doc(user.uid).get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().permits.principal){
              location.href ="./layout/principal.html";
            }
        }else{
          swal("Access Denied", "Insufficient permissions", "error");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
  });
});
