// document.getElementById("btnregister").addEventListener("submit", function() {
//   var txtNombre = document.getElementById('name').value;
//   var txtLastName = document.getElementById('lastname').value;
//   var txtCorreo = document.getElementById('regemail').value;
//   // var txtFecha = document.getElementById('fecha').value;
//   // var cmbSelector = document.getElementById('selector').selectedIndex;
//   // var chkEstado = document.getElementById('checkBox');
//   // var rbtEstado = document.getElementsByName('radioButton');
//   //
//   // var banderaRBTN = false;
//
//   //Test campo obligatorio
//   console.log(txtNombre);
//   if (txtNombre == null || txtNombre.length == 0 || /^[a-zA-Z_áéíóúñÁÉÍÓÚÑ\s]*$/.test(txtNombre) == false) {
//     document.getElementById('name').style.borderColor = "red";
//     // return false;
//   } else {
//     document.getElementById('name').style.borderColor = "black";
//     if (txtLastName == null || txtLastName.length == 0 || /^[a-zA-Z_áéíóúñÁÉÍÓÚÑ\s]*$/.test(txtLastName) == false) {
//       document.getElementById('lastname').style.borderColor = "red";
//       // return false;
//     } else {
//       document.getElementById('lastname').style.borderColor = "black";
//       if (!(/\S+@\S+\.\S+/.test(txtCorreo))) {
//         document.getElementById('regemail').style.borderColor = "red";
//         // return false;
//       }
//       else {
//         document.getElementById('name').style.borderColor = "black";
//         document.getElementById('lastname').style.borderColor = "black";
//         document.getElementById('regemail').style.borderColor = "black";
//
//         return true;
//       }
//     }
//   }
// //Test fecha
// if(!isNaN(txtFecha)){
//   alert('ERROR: Debe elegir una fecha');
//   return false;
// }
//
// //Test comboBox
// if(cmbSelector == null || cmbSelector == 0){
//   alert('ERROR: Debe seleccionar una opcion del combo box');
//   return false;
// }
//
// //Test checkBox
// if(!chkEstado.checked){
//   alert('ERROR: Debe seleccionar el checkbox');
//   return false;
// }
//
// //Test RadioButtons
// for(var i = 0; i < rbtEstado.length; i++){
//   if(rbtEstado[i].checked){
//     banderaRBTN = true;
//     break;
//   }
// }
// if(!banderaRBTN){
//   alert('ERROR: Debe elegir una opción de radio button');
//   return false;
// }
// });

function validatorRegister() {
  var localName = document.getElementById('name').value;
  var localLastName = document.getElementById('lastname').value;
  var localMail = document.getElementById('regemail').value;
  var localPass = document.getElementById('regpassword').value;
  var localPassConf = document.getElementById('confirpass').value;
  var works = false;
  // var txtFecha = document.getElementById('fecha').value;
  // var cmbSelector = document.getElementById('selector').selectedIndex;
  // var chkEstado = document.getElementById('checkBox');
  // var rbtEstado = document.getElementsByName('radioButton');
  //
  // var banderaRBTN = false;

  //Test campo obligatorio
  console.log(localName);
  console.log(localPass);

  if (!works) {
    if (localName == null || localName.length == 0 || /^[a-zA-Z_áéíóúñÁÉÍÓÚÑ\s]*$/.test(localName) == false) {
      document.getElementById('name').style.borderColor = "red";
      return false;
    }
    else {
      document.getElementById('name').style.borderColor = "black";
    }
    if (localLastName == null || localLastName.length == 0 || /^[a-zA-Z_áéíóúñÁÉÍÓÚÑ\s]*$/.test(localLastName) == false) {
      document.getElementById('lastname').style.borderColor = "red";
      return false;
    }
    else {
      document.getElementById('lastname').style.borderColor = "black";
    }
    if (localMail == null || localMail.length == 0 || /[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(localMail) == false) {
      document.getElementById('regemail').style.borderColor = "red";
      return false;
    }
    else {
      document.getElementById('regemail').style.borderColor = "black";
    }
    if (localPass == null || localPass.length == 0 || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/.test(localPass) == false) {
      document.getElementById('regpassword').style.borderColor = "red";
      return false;
    }
    else {
      document.getElementById('regpassword').style.borderColor = "black";
    }
    if (localPassConf == null || localPassConf.length == 0 || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/.test(localPassConf) == false || localPassConf !== localPass) {
      document.getElementById('confirpass').style.borderColor = "red";
      return false;
    }
    else {
      document.getElementById('confirpass').style.borderColor = "black";
    }
  } else {
    works = true;
  }

  if (works) {

    document.getElementById('name').style.borderColor = "black";
    document.getElementById('lastname').style.borderColor = "black";
    document.getElementById('regemail').style.borderColor = "black";
    document.getElementById('regpassword').style.borderColor = "black";
    document.getElementById('confirpass').style.borderColor = "black";

    return true;
  }

}


//   document.getElementById('name').style.borderColor = "black";
//   if (txtLastName == null || txtLastName.length == 0 || /^[a-zA-Z_áéíóúñÁÉÍÓÚÑ\s]*$/.test(txtLastName) == false) {
//     document.getElementById('lastname').style.borderColor = "red";
//     return false;
//   } else {
//     document.getElementById('lastname').style.borderColor = "black";
//     if (!(/\S+@\S+\.\S+/.test(txtCorreo))) {
//       document.getElementById('regemail').style.borderColor = "red";
//       return false;
//     }
//     else {
//       document.getElementById('name').style.borderColor = "black";
//       document.getElementById('lastname').style.borderColor = "black";
//       document.getElementById('regemail').style.borderColor = "black";
//       document.getElementById('regpassword').style.borderColor = "black";
//       document.getElementById('confirpass').style.borderColor = "black";
//
//       return true;
//     }
//   }
// }
