export default function goTo(url) {
  const { protocol, hostname } = window.location;
  let { port } = window.location;

  if (port !== '') {
    port = `:${port}`;
  }

  window.location.href = `${protocol}//${hostname}${port}${url}`;
}
