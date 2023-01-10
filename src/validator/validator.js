

// =====================college Regex ========================================


const isValidName = function  isValidName(name) {
    return /^[a-z]*$/
    .test(name)

}
const isValidfname = function isValidfname (fullName) {
    return /^[a-zA-Z,'.\s]{0,150}$/
    .test(fullName)

}

const urlreg = function urlreg(urlreg){

    return  /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i
    .test(urlreg)
}






  // ========================== Intern Regex =====================



  
   const validateEmail =   function validateEmail(email) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

 const validateName =     function validateName(InternName) {

    let regex = /^[a-zA-Z ]{2,30}$/;

    return regex.test(InternName);

  }

   const validateMobile  = function validateMobile(mobile) {

    let regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/ ;

    return regex.test(mobile)

  }

  //=============college exports =================

module.exports = {isValidName,isValidfname,urlreg}

//============intern export ================

module.exports = {validateEmail,validateName,validateMobile}