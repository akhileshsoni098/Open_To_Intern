try {
    function validateName(name) {
      let regex =  /^[a-z]*$/;
      return regex.test(name);
    }
   
   
    
    function validatefullname(fullName) {
   
       return /^[a-zA-Z,'.\s]{0,150}$/.test(fullName)
   
      // return regex.test(fullName);
     }
   
     function validateUrl(logoLink){
       let regex =   /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i
       return regex.test(logoLink);
   
     }
   
   } catch (error) {
      res.status(500).send({status : false, msg : error.message})
   }

   try {
    function validateEmail(email) {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
      }
    
      function validateInName(name) {
        let regex = /^[a-zA-Z ]{2,30}$/;
        return regex.test(name);
      }
    
      function validateMobile(mobile) {
        let regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
        return regex.test(mobile)
      }
   } catch (error) {
    res.status(500).send({status : false, msg : error.message})
   }

module.exports.validateName = validateName
module.exports.validatefullname = validatefullname
module.exports.validateUrl = validateUrl
module.exports.validateEmail = validateEmail
module.exports.validateInName = validateInName
module.exports.validateMobile = validateMobile