var currentuser;

var fileButton = document.getElementById('imgButton');
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentuser = user;

  }
});


fileButton.addEventListener('change', function(e) {
  //Get file
  var file = e.target.files[0];
  //////////
  //Create a storage ref
  var storage = firebase.storage();

  // Create a storage reference from our storage service
  var storageRef = storage.ref();
  //var uploadTask = storageRef.child('images/' + file.name).put(file);
  var uploadTask = storageRef.child("SmartSoftware" + "/" + currentuser.uid + "/img/" + currentuser.uid).put(file);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    },
    function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      var downloadURL = uploadTask.snapshot.downloadURL;
      var docRef = db.collection("user_permits").doc(currentuser.uid);
      $("#img-logo").attr("src", downloadURL);
      // Set the "capital" field of the city 'DC'
      docRef.update({
          img_perfil: downloadURL
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    });
})
