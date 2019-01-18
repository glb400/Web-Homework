// var currentAjax;
// var callback;

$(function() {
	$('#at-plus-container').hover(handlerIn,handlerOut);
});

function handlerIn(){
	reset();
    // $('.at-plus-button').click(robot.bind(null, Callback()));
    $('.at-plus-button').click(function() {
        let Li = $('#control-ring li').toArray();
        let promise = Promise.resolve();
        for (let i = 0;i < Li.length; ++i) 
            promise = promise.then(() => handleClick($(Li[i])));
        promise.then(() => infoBarClick($('#info-bar')));
    });
}

function handlerOut(){
	reset();
	$('.at-plus-button').unbind('click');

	// if(currentAjax != null)
	// 	currentAjax.abort();
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

// function robot(callback){
// 	$('.at-plus-button').unbind('click');
// 	$('.at-plus-button').attr('class','default at-plus-button');
// 	callback[0]();
// }

function handleClick(li) {
    return new Promise(function (resolve, reject) {
        var span = li.find('span');
        span.text('...').show();

        $('li').each(function() {
            $(this).attr('class', 'button disabled');
        });
        li.attr('class', 'button abled');

        fetch('http://localhost:3000/')
        .then(obj => obj.text())
        .then(res => {
            span.text(res);
            span.parent().attr('class', 'button disabled');
            // $('#control-ring').click(handleClick);

            // let check = true;
            // $('#control-ring').find('li').each(function() {
            //     if($(this).find('span').text() == '') {
            //         check = false;
            //         $(this).attr('class', 'button abled');
            //     }
            // });

            // if(check == true) {
            //     $('#info-bar').attr('class', 'button abled');
            //     console.log("Now enable the Calculator...");
            // }
            resolve();
            // reject();
        })
        .catch (err => console.reject(err));
    });
}

function infoBarClick(infoBar) {
    return new Promise(function (resolve, reject) {
        $('#info-bar').attr('class', 'button abled');
    	handleSum();
    });
}

// function Callback() {
//     var callback = [];
// 	for (var i = 0; i < $('li').length;i ++) {
// 		callback[i] = function(i) {
// 			return function() {
//                 var span = $('li').eq(i).find('span');
//                 span.text('...').show();

// 				$('li').each(function() {
// 					$(this).attr('class', 'button disabled');
// 				});
// 				$('li').eq(i).attr('class', 'button abled');

// 				currentAjax = $.ajax({url: '/abcdefg', content: span, success: function() {
// 						if(currentAjax != null) {
//                             span.text(currentAjax.responseText);
//                             span.parent().attr('class', 'button disabled');
// 							callback[i+1]();
// 						}
// 					}
// 				});
// 			};
// 		}(i);
//     }
    
// 	callback[5] = function() {
//     	$('#info-bar').attr('class', 'button abled');
//     	handleSum();
// 	}
// 	return callback;
// }

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