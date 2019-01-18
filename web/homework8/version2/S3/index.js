var currentAjax = new Array();

$(function() {
	$('#at-plus-container').hover(handlerIn,handlerOut);
});

function handlerIn(){
	reset();
	$('.at-plus-button').click(robot.bind(null, Callback()));
}

function handlerOut(){
	reset();
	$('.at-plus-button').unbind('click');

	for (var i = 0; i < currentAjax.length; i++){
        if(currentAjax[i] != null)
            currentAjax[i].abort();
    }
}

function reset() {
    $('li').each(function() {
        $(this).find('span').text('').hide();
        $(this).attr('class', 'button abled');
    });
    $('#result').text('').hide();
    $('#info-bar').attr('class', 'button disabled');
    $('.at-plus-button').attr('class', 'at-plus-button');
}

function robot(callback){
	$('.at-plus-button').unbind('click');
	$('.at-plus-button').attr('class','default at-plus-button');
	for (var i = 0; i < callback.length; i++) {
        callback[i]();
      }
}

function Callback() {
    var callback = [];
	for (var i = 0; i < $('li').length;i ++) {
		callback[i] = function(i) {
			return function() {
                var span = $('li').eq(i).find('span');
                span.text('...').show();

                var tmp = Math.round(Math.random() * 100);
				currentAjax[i] = $.ajax({url: tmp + '/abcdefg',content: span, success: function() {
                    if(currentAjax[i] != null) {
                        span.text(currentAjax[i].responseText);
                        span.parent().attr('class', 'button disabled');

                        let check = true;
                        $('#control-ring').find('li').each(function() {     
                            if ($(this).find('span').text() == '' || $(this).find('span').text() == '...') {
                                check = false;
                                $(this).attr('class', 'button abled');
                            }
                        });

                        if(check == true)
                            handleSum();
                    }
                }})
			};
		}(i);
    }
    return callback;
}

function handleSum() {
	var sum = 0;
	var arr = new Array();

	$('li').each(function() {
	    arr.push(parseInt($(this).find('span').text()));
    });
           
    sum = arr.reduce(function(x,y){
        return x + y;
    });

    console.log("The Answer of Sum is: " + sum);
    $('#result').text(sum).show(); 
    $('#info-bar').attr('class', 'button disabled');       
}