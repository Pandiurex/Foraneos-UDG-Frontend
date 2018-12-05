const realFileBtn = document.getElementById('real-file');
const customBtn = document.getElementById('btnupload');
const customTxt = document.getElementById('custom-text');

customBtn.addEventListener('click', () => {
  realFileBtn.click();
});

realFileBtn.addEventListener('change', () => {
  if (realFileBtn.value) {
    customTxt.innerHTML = realFileBtn.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/,
    )[1];
  } else {
    customTxt.innerHTML = 'No file chosen, yet.';
  }
});
