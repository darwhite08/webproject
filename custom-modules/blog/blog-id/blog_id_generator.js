var CryptoJS = require("crypto-js");

function blog_id_generator (userId) {
    var userId = this.userId;
    const timestamp = Date.now(); 
    const  formedID = generateID(userId,timestamp)  ;
    return formedID ;
}

function generateID (userId,timestamp) {
    var combined = userId + timestamp;
    var generatedID = CryptoJS.MD5(combined)
    return generatedID;
}

module.exports = {blog_id_generator};