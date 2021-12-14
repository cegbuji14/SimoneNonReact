import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyDcMCAkPWTYMby98evAcP54jTZs9cn-HnE",
	authDomain: "simone-game-97f22.firebaseapp.com",
	projectId: "simone-game-97f22",
	storageBucket: "simone-game-97f22.appspot.com",
	messagingSenderId: "818359659",
	appId: "1:818359659:web:473ad59e2732d0c339f02e",
};


const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};
export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};