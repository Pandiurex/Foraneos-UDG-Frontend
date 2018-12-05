/* eslint linebreak-style: [2, "windows"] */
class Cookie {
  static getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
  }

    static logOut(){
      let exp = "Thu, 01 Jan 1970 00:00:00 UTC";
      let myToken = Cookie.getCookie('userToken');
      console.log(myToken);
      document.cookie = `userToken=;path=/;expires=${exp};`;
      document.cookie = `userName=;path=/;expires=${exp};`;
      document.cookie = `userRole=;path=/;expires=${exp};`;
      fetch('https://api.foraneos-udg.ml/auth/logout',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'hash': `${myToken}`
        },
      })
      .then(response => {
          if(response.status==200){
            console.log('200');
            window.location.href = "./index.html";
          }
        })
        console.log('s');


    }

    static haveSession(){
      let myToken = Cookie.getCookie('userToken');
      if(myToken != null){
        window.location.replace("./index.html");
      }
    }

    static noSession(){
      let myToken = Cookie.getCookie('userToken');
      if(myToken == null){
        window.location.replace("./index.html");
      }
    }

    static exito(userToken, userName, userRole){
        let nowTime = new Date();
        nowTime.setTime(nowTime.getTime() + 5*60*1000); // in milliseconds
        document.cookie = `userToken=${userToken};path=/;expires=${nowTime.toGMTString()};`;
        document.cookie = `userName=${userName};path=/;expires=${nowTime.toGMTString()};`;
        document.cookie = `userRole=${userRole};path=/;expires=${nowTime.toGMTString()};`;
        console.log('exito');
        window.location.replace("./home.html");
        //window.location.replace("file:///home/chrislap/Dropbox/Easy-Motion-Web/src/home.html");
    }


}
export default Cookie;
