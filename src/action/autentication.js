import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { getDataUser } from "./fb_database";

const auth = getAuth();

export const checkDataLogin = async (setIsLogin, setDataUser = () => {
    }, setDataUserInfo = () => { }) => {
        const uuid = await localStorage.getItem('UID');
        // console.log("UUID ==> ", uuid)
        if (uuid == null) {
            setIsLogin(false)
        } else {
            setIsLogin(true)
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setDataUser(user)
                    setDataUserInfo(await getDataUser(user.uid))
                } else {
                    setIsLogin(false)
                }
            })
        }
}

export const firebaseLogout = async () => {
    localStorage.setItem('jwt-token', null);
    localStorage.setItem('UID', null);
    signOut(auth)
    console.log('Signed Out');

}