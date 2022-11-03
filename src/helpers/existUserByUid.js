import { doc, getDoc } from "firebase/firestore"
import { FirebaseDB } from "../firebase/config"

export const existUserByUid = async (uid) => {
    let existUser
    const userRef = doc(FirebaseDB,`user/${uid}`)
    const docSnap = await getDoc(userRef);
  return docSnap.exists()
}
