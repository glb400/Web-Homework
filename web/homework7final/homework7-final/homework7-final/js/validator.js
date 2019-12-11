var validator = {
    form: {
    username: {
        status: false,
        errorMessage: ' 6~18位英文字母、数字或下划线，必须以英文字母开头'
    },
    sid: {
        status: false,
        errorMessage: ' 8位数字，不能以0开头'
    },
    phone: {
        status: false,
        errorMessage: ' 11位数字，不能以0开头'
    },
    email: {
        status: false,
        errorMessage: ' 请输入合法邮箱'
    }
    },

    isUsernameValid: function(username){
        return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(username);
    },

    isSidValid: function(sid){
        return this.form.sid.status = /^[1-9]\d{7}$/.test(sid);
    },

    isPhoneValid: function(phone){
        return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
    },

    isEmailValid: function(email){
        return this.form.email.status = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email);
    },

    isFieldValid: function(fieldname, value){
        var CapFilename = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
        return this["is" + CapFilename + "Valid"](value);
    },

    isFormValid: function(){
        return this.form.username.status && this.form.sid.status && this.form.phone.status && this.form.email.status;
    },

    getErrorMessage: function(fieldname){
        return this.form[fieldname].errorMessage;
    },

    isAttrValidUnique: function(registry, user, attr){
        for(var key in registry){
            if(registry.hasOwnProperty(key) && registry[key][attr] == user[attr])
                return false;
        }
        return true;
    }
}

if (typeof module == 'object') {
    module.exports = validator;
}