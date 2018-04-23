var db = firebase.firestore();

function slideUpIn() {
  $("#login").velocity("transition.slideUpIn", 1250);
};

function slideLeftIn() {
  $(".row").delay(500).velocity("transition.slideLeftIn", {
    stagger: 500
  })
}

function shake() {
  $(".password-row").velocity("callout.shake");
}

slideUpIn();
slideLeftIn();

$("button").on("click", function() {
  shake();
});

$('.button').click(function() {
  $(this).hide();
  $('#login').hide();
  $('.front').addClass('front-open');
  $('.back').addClass('back-open');
  $('.opened').addClass('opened-open');
  $('.modal').show();
  setTimeout(function() {
    $('.modal').addClass('shadow');
  }, 1000);
  setTimeout(function() {
    $('.front').removeClass('front-open');
    $('.back').removeClass('back-open');
    $('.opened').removeClass('opened-open');
  }, 1200);
  $('.wrapper').delay(500).fadeIn();
});

$('.close').click(function() {
  $('.wrapper').fadeOut(300);
  $('.modal').removeClass('shadow');
  $('.front').addClass('front-close');
  $('.back').addClass('back-close');
  $('.opened').addClass('opened-close');
  setTimeout(function() {
    $('.modal').hide();
    $('.button').show();
    $('#login').show();
    $('.front').removeClass('front-close');
    $('.back').removeClass('back-close');
    $('.opened').removeClass('opened-close');
  }, 1100)
})

$('.wrapper').click(function() {
  $('.wrapper').fadeOut(300);
  $('.modal').removeClass('shadow');
  $('.front').addClass('front-close');
  $('.back').addClass('back-close');
  $('.opened').addClass('opened-close');
  setTimeout(function() {
    $('.modal').hide();
    $('.button').show();
    $('#login').show();
    $('.front').removeClass('front-close');
    $('.back').removeClass('back-close');
    $('.opened').removeClass('opened-close');
  }, 1100)
})

$('#cancel-button').click(function() {
  $('.wrapper').fadeOut(300);
  $('.modal').removeClass('shadow');
  $('.front').addClass('front-close');
  $('.back').addClass('back-close');
  $('.opened').addClass('opened-close');
  setTimeout(function() {
    $('.modal').hide();
    $('.button').show();
    $('#login').show();
    $('.front').removeClass('front-close');
    $('.back').removeClass('back-close');
    $('.opened').removeClass('opened-close');
  }, 1100);
});


$('#login-button').click(function signUp() {
  var user = document.getElementById("username_input").value;
  var pass = document.getElementById("password_input").value;
  firebase.auth().signInWithEmailAndPassword(user, pass).catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code
    var errorMessage = error.message;
    console.log(errorMessage);
    // ...
  });
});

function registrar() {
  var user = document.getElementById("username_input3").value;
  var pass = document.getElementById("password_input3").value;
  firebase.auth().createUserWithEmailAndPassword(user.toString(), pass.toString()).then(function() {
    var currentuser = firebase.auth().currentUser
    PermitsAdd(currentuser);
  }).catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code
    var errorMessage = error.message
    console.log(errorMessage)
    // ...
  })
}

function googleSingIn() {
  var provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var currentuser = firebase.auth().currentUser
    PermitsAdd(currentuser);
  }).catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code
    var errorMessage = error.message
    console.log(errorMessage)
    // The email of the user's account used.
    // var email = error.email
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential
    // ...
  })
}

function facebookSingIn() {
  var provider = new firebase.auth.FacebookAuthProvider()
  provider.addScope('public_profile')
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var currentuser = firebase.auth().currentUser
    PermitsAdd(currentuser);
  }).catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code
    var errorMessage = error.message
    console.log(errorMessage)
    // The email of the user's account used.
    // var email = error.email
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential
    // ...
  })
}

function PermitsAdd(currentuser) {
  if (currentuser) {
    var name = function(){
      if(currentuser.displayName!=null){
        return currentuser.displayName;
      }else{
        return "";
      }
    }
    var userInf = {
      type: 'basic',
      displayName: name(),
      permits: {
        principal: true
      }
    };
    db.collection("user_permits").doc(currentuser.uid).set(userInf)
      .then(function() {
        if(currentuser.providerData[0].providerId == "password"){
          currentuser.sendEmailVerification().then(function() {
            console.log('Enviando mensaje')
            window.location.href = "index.html";
          }).catch(function(error) {
            console.log('Error al enviar mensaje')
            console.log(error)
          })
        }
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }
}

function userViewer(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //console.log(user);
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
}
