import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { 
    getAuth,// authentication 설정
    signInWithEmailAndPassword,// email 로그인
    signOut,
    setPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuhAg_xLUlnloqrtS9AkumCS-3SM_NraA",
    authDomain: "test-aedbe.firebaseapp.com",
    databaseURL: "https://test-aedbe-default-rtdb.firebaseio.com/",
    projectId: "test-aedbe",
    storageBucket: "test-aedbe.appspot.com",
    messagingSenderId: "141860986680",
    appId: "1:141860986680:web:adf586c20c91cf425e6bcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export const dbRead = () =>{
    const refDb = ref(database, 'INST_LIST/');
    let data;
    onValue(refDb,(snapshot)=>{
        data = snapshot.val();
        console.log(data)
        if(data.length > 0) makeList(data);
        else console.log("no data")
    })
}

const auth = getAuth();
const add_wrap = document.querySelector('.add_wrap');
const lg_inout_btn = document.querySelector('.lg_inout_btn');
export const setPers = () =>{    
    add_wrap.innerHTML = '';
    setPersistence(auth,browserSessionPersistence)
    .then(()=>{
        console.log("로그인 되었음\n" + auth.currentUser.uid);
        lg_inout_btn.classList.add('logout');
        lg_inout_btn.innerHTML = '로그아웃';
        add_wrap.innerHTML = `<button class="add_btn">리스트 추가하기</button>`;
        return signInWithEmailAndPassword(auth,email,password);
    })
    .catch((error)=>{
        const errCode = error.code;
        const errMsg = error.message;

        console.log("persistence\ncode: " + errCode + "\nmsg: " + errMsg)
    })
}

export const loginEmail = (email,password) =>{
    return signInWithEmailAndPassword(auth,email,password)
        .catch((error) => {
            const errCode = error.code;
            let errMsg ="";
            switch(errCode){
                case "auth/invalid-email" : 
                    errMsg = "이메일 형식을 확인해 주세요.";
                    break;
                case "auth/missing-password" : 
                    errMsg = "비밀번호를 확인해 주세요.";
                    break;
                case "auth/user-not-found" : 
                    errMsg = "등록되지 않은 유저입니다.";
                    break;
                default:
                    errMsg = "로그인 실패. 다시 시도해 주세요";
                    break;
            }
            alert(errMsg);
        })
}

export const logOut = ()=>{
    return signOut(auth).then(() => {
        console.log('로그아웃 완료');
    }).catch((error) => {
        console.log("로그아웃 실패: " + error);
    });
}

function makeList(data){
    for(let i=0;i<data.length;i++){
        console.log(data[i].TITLE);
    }
}