import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const auth = getAuth();
const ProLoginRef = collection(db, "proLogin");

const ProfessionalSignUp = async (state) => {
  await addDoc(ProLoginRef, state)
    .then(() => {
      createUserWithEmailAndPassword(auth, state.email, state.password)
        .then((res) => {
          const user = res.user;
          try {
            updateProfile(user, {
              displayName: state.username,
              phoneNumber: 234567,
            }).then(alert("Thug life"));
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => console.log("Auth Create :", err));
    })
    .catch((err) => console.log("Add Doc : ", err));
};
const ProfessionalSignIn = (state, setProfessional) => {
  // console.log(setProfessional);
  signInWithEmailAndPassword(auth, state.email, state.password)
    .then((data) => {
      alert("Logged In");
      setProfessional(true);
      const user = data.user;
      console.log(user);
    })
    .catch((err) => console.log("Sign in Error :", err.message));
};

export { ProfessionalSignUp, ProfessionalSignIn };
