function getParametro(parametro) {
var urlWeb = window.location.search.substring(1);
 var hash = urlWeb.split('&');
  for (var i = 0; i < hash.length; i++) {
    var sParametro = hash[i].split('=');
    if (sParametro[0] == parametro) {
      return sParametro[1];
    }
  }
 return null;
}
