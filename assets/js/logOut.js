var db = firebase.firestore();
var email;

function userViewer(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      email = user.email;
      var docRef = db.collection("user_permits").doc(user.uid).get().then(function(doc) {
        if (doc.exists) {
            if(!doc.data().permits.principal){
              location.href ="../index.html";
            }
        }else{
          //swal("Access Denied", "Insufficient permissions", "error");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }else{
      location.href ="../index.html";
    }
  });
}

userViewer();

$("#logOut").click(function(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
});
