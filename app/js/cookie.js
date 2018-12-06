import API from './api.js';

class Cookie {
  static setCookie(name, value) {
    document.cookie = `${name}=${value}`;
  }

  static getCookie(name) {
    const cookies = `; ${document.cookie}`;
    const aux = cookies.split(`; ${name}=`)[1];
    return aux.split(';')[0];
  }

  static saveCookies({ hash, user, type }) {
    this.setCookie('session', hash);
    this.setCookie('user', user);
    this.setCookie('type', type);
  }

  static haveSession() {
    const hash = this.getCookie('session');
    if (myToken != null) {
      window.location.replace("./index.html");
    }
  }

  static async login(body) {
    const hash = this.getCookie('session');
    const response = await API.post('auth/login', body, hash);
    if (response.status >= 200 && response.status < 300) {
      this.saveCookies(response.data);
      window.location.replace("./profile.html");
      return true;
    }

    return false;
  }

  static logout() {
    const hash = getCookie('session');

    if (hash !== undefined) {

    }
  }

    static logOut(){
      let exp = "Thu, 01 Jan 1970 00:00:00 UTC";
      let myToken = Cookie.getCookie('userToken');
      console.log(myToken);
      document.cookie = `userToken=;path=/;expires=${exp};`;
      document.cookie = `userName=;path=/;expires=${exp};`;
      document.cookie = `userRole=;path=/;expires=${exp};`;
      fetch('https://easy-motion.herokuapp.com/auth/logout',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${myToken}`
        },
      })
      .then(response => {
          if(response.status==200){
            console.log('200');
            window.location.href = "./home.html";
          }
        })
        console.log('s');


    }

    

  //   static noSession(){
  //     let myToken = Cookie.getCookie('userToken');
  //     if(myToken == null){
  //       window.location.replace("./home.html");
  //     }
  //   }

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
