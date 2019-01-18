$(function() {
  var str = "Please input your ";

  $('input:not(.button)').each(function(i) {

    if ($(this).val() == '') {
      if ($(this).attr('type') == 'password') {
        $(this).attr('type', 'text');
      }
      var temp = str + $(this).attr('id');
      $(this).val(temp);
      $(this).addClass("tip");
    }
    });

  $('input:not(.button)').focus(function() {
    if ($(this).val().indexOf("Please") != -1) {
      if ($(this).val().indexOf('password') != -1) {
        $(this).attr('type', 'password');
      }
      $(this).val("");
      $(this).removeClass("tip");
    }
  });


  $('input:not(.button)').blur(function() {
    if ($(this).val() == '' || validator.isFieldValid(this.id, $(this).val())) {
      $(this).parent().find('.errormessage').text('').hide();
      if ($(this).val() == '') {
        if ($(this).attr('type') == 'password') {
          $(this).attr('type', 'text');
        }
        var temp = str + $(this).attr('id');
        $(this).val(temp);
        $(this).addClass("tip");
      }
    }
    else {

      $(this).parent().find('.errormessage').text(validator.form[this.id].errorTips).show();
    }
  });

  $('input.submit').click(function() {
    // judge whether the whole form is valid
    $('input:not(.button)').blur();
    if (!validator.isFormValid())
      return false;
  });

  $('input.button.reset').click(function() {
    $('input:not(.button)').each(function(i) {
      if ($(this).attr('type') == 'password') {
        $(this).attr('type', 'text');
      }
      var temp = str + $(this).attr('id');
      $(this).val(temp);
      $(this).addClass("tip");
      $(this).parent().find('.errormessage').text('').hide();
    });
  });
  
  $(".eye").mousedown(function(){  
    if ($(this).parent().find('input').attr('type') == 'password')
      $(this).parent().find('input').attr("type", "text");  
  });  
  $(".eye").mouseup(function(){
    if ($(this).parent().find('input').attr('type') == 'text' && $(this).parent().find('input').val().indexOf('Please') == -1)  
      $(this).parent().find('input').attr("type", "password");  
  });  
});