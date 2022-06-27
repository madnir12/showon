// importing initialize
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
// importing aith
import { getAuth, sendEmailVerification, updatePassword, reauthenticateWithCredential, updateProfile, updateEmail, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
// importing firestore
import { getFirestore, updateDoc, setDoc, doc, getDocs, getDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
// importing firestorage
import { getStorage, listAll, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";
// my app
const firebaseConfig = {
  apiKey: "AIzaSyBopbXRlY28MTWVvOSqlpp-Wgb7WGTtCyQ",
  authDomain: "lerning-firebase-for-web.firebaseapp.com",
  projectId: "lerning-firebase-for-web",
  storageBucket: "lerning-firebase-for-web.appspot.com",
  messagingSenderId: "184509748353",
  appId: "1:184509748353:web:30e0c2ab2eddd4ddd96980"
};
// initializwing app
const app = initializeApp(firebaseConfig);
// getting Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// getting firestorage
const storage = getStorage();

// getting auth
const auth = getAuth();
// checking user loged in or not //
let page = window.location.pathname;

onAuthStateChanged(auth, (logedinuser) => {

  if (logedinuser) {

    if (page.includes("login")) {
      setTimeout(() => { location.replace("../index.html") }, 3000)

    }
    else {
      if (page.includes("dashboard")) {
        notLog()
        // getting profile
        getuserprofile()
        sendVE()
      }
      else {
        if (page.includes("setting")) {
          notLog()
          // getting profile
          getuserprofile()
          // updating profile
          upupfull()
          // update frofile photo
          showBeforeUPThenUP();



        }
        else {
          if (page.includes("signup")) {
            setTimeout(() => { location.replace("../index.html") }, 3000)

          }
          else {
            forNavbtn()
            testfst()

          }

        }
      }



    }



  }
  // if user not loged
  else {
    if (page.includes("Courses")) {
      location.replace("auth/login.html")

    }
    else {
      if (page.includes("dashboard")) {
        location.replace("index.html")

      }
      else {
        if (page.includes("setting")) {
          location.replace("index.html")

        }

        else {
          if (page.includes("signup")) {
            notLog()
            // singup user
            const signupme = document.getElementById("signup");

            signupme.addEventListener("click", () => {
              $(".preloader").css("display", "grid")
              letmesignup();



            })


          }
          else {
            notLog()
          }
        }
      }
    }

  }

})


const signin = document.getElementById("login");


// singin firebase

if (page.includes("login")) {
  signin.addEventListener("click", () => {
    $(".preloader").css("display", "grid")
    letmesignin()
  });
}






// logout user
if (page.includes("dashboard")) {
  letmelogout()



};
if (page.includes("setting")) {
  letmelogout()




};


// google login
$("#googlesignin").on("click", () => {
  console.log("clicked")
  letmegooglesignin()
})
// facebook login
$("#facebooksignin").click(() => {
  letmefacebooklogin()
})


// functions
function forNavbtn() {
  $(".preloader").css("display", "none")
  $(".bdcontainer").css("display", "block")
  let golog = $("#navbtn");
  document.getElementById("navbtn").innerHTML = "Go to Dashboard"
  $("#gsp").css("display", "none")
  golog.addClass("navbtnafl")
  golog.attr("href", "dashboard.html")
}
// function for hide loader and display page
function notLog() {
  document.querySelector(".preloader").style.display="none";
  document.querySelector(".bdcontainer").style.display ="block";

}
// function for signin
function letmesignin() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorMessage) {
        logerrors();
      }
    });
};
// fuction for signup
function letmesignup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // creting user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then(

      (userCredential) => {

        // Signed in 
        const user = userCredential.user;
        // ...
        upun();
      })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorMessage) {
        logerrors();
      }
      // ..
    })
}

// fonction for google signin
function letmegooglesignin() {
  const provider = new GoogleAuthProvider(app);

  signInWithPopup(auth, provider)
    .then((result) => {

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

// function for facebook login
function letmefacebooklogin() {
  const fbprovider = new FacebookAuthProvider();

  signInWithPopup(auth, fbprovider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
}

// function for getting user profile
function getuserprofile() {
  const docRef = doc(db, "users", auth.currentUser.uid);
  getDoc(docRef).then((frdata) => {
    let fulldata = frdata.data();
    $("#pdi").attr("src", fulldata.photo)
    $("#pde").html(fulldata.email)
    $("#pde").val(fulldata.email)
    $("#pdpe").val(fulldata.email)
    $("#pdn").html(fulldata.name)
    $("#pdn").val(fulldata.name)
    $("#pdag").val(fulldata.age)
    $("#pdad").val(fulldata.adress)
    $("#pdev").html(fulldata.verification)
    $("#pdu").html(fulldata.uid)
    $("#pdad").html(fulldata.adress)
    $("#pdag").html(fulldata.age)

  })







  // let lus = auth.currentUser;
  // lus.providerData.forEach((profile) => {
  //   const pprovider = profile.providerId;
  //   const puid = profile.uid;
  //   const pname = profile.displayName;
  //   const pemail = profile.email;
  //   const purl = profile.photoURL;
  //   const emailv = lus.emailVerified;


  // });

}

// function for logout
function letmelogout() {
  document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });



  })
}

// function for update user profile when user signup
function upun() {

  updateProfile(auth.currentUser, {
    displayName: "none",
    photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCvIQEdbJs-ZGwXXa5GRQqd8qDGlQaUEaolA&usqp=CAU"
  }).then(() => {

  }).catch((error) => {

    // An error occurred
    // ...
  });

}
// function for update user profile
function upupfull() {
  
  $("#savest").on("click", () => {
    let pname = $("#pdn").val()
    let page = $("#pdag").val()
    let padress = $("#pdad").val()
    
    updateProfile(auth.currentUser, {
      displayName: pname
    }).then(() => {
      // update profile from database
      let usr = auth.currentUser;


      setDoc(doc(db, "users", usr.uid), {
        name: usr.displayName,
        uid: usr.uid,
        age: page,
        email: usr.email,
        photo: usr.photoURL,
        adress: padress,
        verification: usr.emailVerified
      }).then(() => {
         successms();
      })




    })


  })
  // email and password area
  $("#savelst").on("click", () => {
    let pemail = $("#pdpe").val()

    if (pemail) {
      
      // this will update email
      updateEmail(auth.currentUser, pemail).then((cre) => {
        
        
          
        
        // ...
      }).catch((error) => {
          if(error){
            if(error.message.includes("invalid-email")){
              $(".afterms").html("invalid email")
            } else{ relogin();}
            
          }
        // An error occurred
       
        // ...
      });
    }

    // this will apdate password
    let ppass = $("#pdps").val()
    if (ppass) {
      updatePassword(auth.currentUser, ppass).then(() => {
        successms()
        
        // Update successful.
      }).catch((error) => {
        if (error) {
          if(error.message.includes(" should be at least")){
            $(".afterms").html("password  should be at least 6 character")
          } else{
            relogin()
          }
        } else{
          successms()
        }
       
      });
    } else{
      successms()
    }



  })
 
}

// function for alart relogin
function relogin() {
  $(".afterms").addClass("alert")
  $(".afterms").html("To update the email address or password,you must have signed in recently,plese logout and login again")
}
// function for success message
function successms(){
  $(".afterms").html("successfull")
  const DocRef = doc(db, "users", auth.currentUser.uid);
    updateDoc(DocRef, {
      "email": auth.currentUser.email
    });
}

// function for changing profile
function testfst() {


  // checking if user is exist
  const docRef = doc(db, "users", auth.currentUser.uid);
  getDoc(docRef)
    .then((userdata) => {
      let havedata = userdata.data()
      if (havedata) {
      }
      else {

        let usr = auth.currentUser;

        setDoc(doc(db, "users", usr.uid), {
          name: usr.displayName,
          uid: usr.uid,
          age: "not set",
          email: usr.email,
          photo: usr.photoURL,
          adress: "not set",
          verification: usr.emailVerified
        });

      }

    })

}
// function for email verification
function sendVE() {
  let cem = auth.currentUser.emailVerified
  if (cem == true) {
    const DocRef = doc(db, "users", auth.currentUser.uid);
    updateDoc(DocRef, {
      "verification": true
    });


  } else {
    $(".emailvr").css("display", "flex")
  }
  $("#sendve").on("click", () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
      });
    $("#sendve").html("Resend")
  })

}
// function for login errors 
function logerrors() {
  $(".preloader").css("display", "none")
  $(".haver").html(` <i class="fa fa-exclamation-circle"></i> There is an issue with email or password,Please recheck`)


}

// function for get and upload file
function showBeforeUPThenUP() {
  $("#pdf").on("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      $("#pdi").attr("src", reader.result)
    }

    // uplod section
    let crid = auth.currentUser.uid
    let pathff = 'users' + '/' + crid + '/' + 'profile'


    const storageRef = ref(storage, pathff);

    uploadBytes(storageRef, file).then(() => {
      


    getDownloadURL(storageRef).then((downloadURL) => {
      // this will update name and photo
      updateProfile(auth.currentUser, {
        photoURL: downloadURL
      })
    });

    });

  })


}



