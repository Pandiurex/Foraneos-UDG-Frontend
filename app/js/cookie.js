class Cookie {
  static getCookie() {
    const cookies = `; ${document.cookie}`;
    const aux = cookies.split('; sesion=')[1];
    return aux.split(';');
  }

  // static haveSession() {
  //   let myToken = Cookie.getCookie('userToken');
  //   if (myToken != null){
  //     window.location.replace("./home.html");
  //   }
  // }

  //   static logOut(){
  //     let exp = "Thu, 01 Jan 1970 00:00:00 UTC";
  //     let myToken = Cookie.getCookie('userToken');
  //     console.log(myToken);
  //     document.cookie = `userToken=;path=/;expires=${exp};`;
  //     document.cookie = `userName=;path=/;expires=${exp};`;
  //     document.cookie = `userRole=;path=/;expires=${exp};`;
  //     fetch('https://easy-motion.herokuapp.com/auth/logout',{
  //       method: 'GET',
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${myToken}`
  //       },
  //     })
  //     .then(response => {
  //         if(response.status==200){
  //           console.log('200');
  //           window.location.href = "./home.html";
  //         }
  //       })
  //       console.log('s');


  //   }

    

  //   static noSession(){
  //     let myToken = Cookie.getCookie('userToken');
  //     if(myToken == null){
  //       window.location.replace("./home.html");
  //     }
  //   }

  //   static exito(userToken, userName, userRole){
  //       let nowTime = new Date();
  //       nowTime.setTime(nowTime.getTime() + 5*60*1000); // in milliseconds
  //       document.cookie = `userToken=${userToken};path=/;expires=${nowTime.toGMTString()};`;
  //       document.cookie = `userName=${userName};path=/;expires=${nowTime.toGMTString()};`;
  //       document.cookie = `userRole=${userRole};path=/;expires=${nowTime.toGMTString()};`;
  //       console.log('exito');
  //       window.location.replace("./home.html");
  //       //window.location.replace("file:///home/chrislap/Dropbox/Easy-Motion-Web/src/home.html");
  //   }
}

export default Cookie;
