firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var docRef = db.collection("user_permits").doc(user.uid);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        //console.log("Document data:", doc.data());
        if(doc.data().img_perfil != "")
        $("#img-logo").attr("src", doc.data().img_perfil);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

  }
});
