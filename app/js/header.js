function getParametro(parametro) {
  const urlWeb = window.location.search.substring(1);
  const hash = urlWeb.split('&');
  for (let i = 0; i < hash.length; i += 1) {
    const sParametro = hash[i].split('=');
    if (sParametro[0] == parametro) {
      return sParametro[1];
    }
  }
  return null;
}
