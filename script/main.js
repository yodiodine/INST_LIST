import { loginEmail, logOut, setPers, dbRead } from "./firebase.js";

window.onload = function(){
    // 인증상태 세션 지속
    setPers();

    //DB체크
    dbRead();

    const lgn_btn = document.querySelector(".lgn_btn");
    const email = document.querySelector('.email');
    const pw = document.querySelector('.pw');
    const top_btn = document.querySelector('#footer button');
    
    //로그인
    lgn_btn.addEventListener('click',(e)=>{
        e.preventDefault();
        
        loginEmail(email.value,pw.value)
        .then((result)=>{
            console.log(result);
            const user = result.user;
            loginSuccess(user.email,user.uid);
        })
    });
    
    //로그인 성공
    function loginSuccess(email,uid){
        console.log("hi " + email + "!!!");
        location.reload();
    }

    //관리자 로그인 || 로그아웃
    const manager_btn = document.querySelector('.lg_inout_btn');
    const lgn_pop = document.querySelector('.lgn_pop');
    manager_btn.addEventListener('click',(e)=>{
        if(manager_btn.className === 'lg_inout_btn'){
            lgn_pop.classList.add('open');
        }else{
            e.preventDefault();
            console.log("click");
            logOut();
            location.reload();
        }
    })

    const close_lgn = document.querySelector('.close_lgn');
    close_lgn.addEventListener('click',()=>{
        lgn_pop.classList.remove('open');
        email.value = "";
        pw.value = "";
    })

    email.addEventListener('keydown',(e)=>{
        if(e.keyCode === 13) lgn_btn.click();
    })
    pw.addEventListener('keydown',(e)=>{
        if(e.keyCode === 13) lgn_btn.click();
    })

    top_btn.addEventListener('click',(e)=>{
        window.scroll({top:0,behavior:'smooth'});
    })

}
