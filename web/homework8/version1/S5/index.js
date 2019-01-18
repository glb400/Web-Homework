//callback functions.
function GetState() {
    var currentState = null;
    return function(state) {
        if (typeof state != 'undefined')
            currentState = state;
        else    
            return currentState;
    }
}

function GetSum() {
    var sum = 0;
    return function(number) {
        if (typeof number != 'undefined')
            sum += parseInt(number);
        else   
            return sum;
    }
}

$(function() {
    var State = GetState();
    $('#A').prop('handler', function() {
        return aHandler;
    });
    $('#B').prop('handler', function() {
        return bHandler;
    });
    $('#C').prop('handler', function() {
        return cHandler;
    });
    $('#D').prop('handler', function() {
        return dHandler;
    });
    $('#E').prop('handler', function() {
        return eHandler;
    });
    $('#at-plus-container').hover(handlerIn.bind(null, State), handlerOut.bind(null, State));
});

function handlerIn(state) {
    reset();
    $('.at-plus-button').click(robot.bind(null, state));
}

function handlerOut(state) {
    reset();
    $('.at-plus-button').unbind('click');
    $('li').each(function() {
        $(this).unbind('done');
    });

    var s = state();
    if (s != null)
        s.abort();
}

function reset() {
    $('li').each(function() {
        $(this).find('span').text('').hide();
        $(this).attr('class', 'button abled');
    });
    $('#result').text('').hide();
    $('#info-bar').attr('class', 'button disabled');
    $('.at-plus-button').attr('class', 'at-plus-button');
    $('#showorder').text('').hide();
    $('#message').text('').hide();
}

function robot(State) {
    $('.at-plus-button').unbind('click');
    $('.at-plus-button').attr('class', 'default at-plus-button');
    var buttons = $('li');
    randomSort(buttons);

    var Sum = GetSum();
    for (var i = 0;i < buttons.length;i ++) {
        if(i != (buttons.length - 1))
            $(buttons[i]).on('done', $(buttons[i+1]).prop('handler').bind(null, Sum, State));
        else    
            $(buttons[i]).on('done', bubbleHandler.bind(null, Sum, State));
    }

    $(buttons[0]).prop('handler').call(null, Sum, State);
}

function randomSort(buttons) {
    buttons.sort(function(x, y) {
        return Math.random() > 0.5 ? -1 : 1;
    });

    var str = new Array();
    for (var i = 0;i < buttons.length;i ++) {
        str[i] = $(buttons[i]).attr('id');
    }

    $("#showorder").text(str).show();
}

function error(message, currentSum) {
    this.message = message;
    this.currentSum = currentSum;
}

function aHandler(Sum, State) {
    let span = $('#A').find('span');
    try {
        span.text('...').show();
        span.parent().attr('class', 'button disabled');
        var state = $.ajax({url: '/rand', context: span, success: function() {
            if (State() != null) {
                console.log(""+state.responseText);
                span.text(state.responseText);
                Sum(state.responseText);      
                $('#A').trigger('done');         
            }
        }});

        State(state);
        
        //Random Error
        if (Math.random() > 0.5) 
            throw new error('这不是个天大的秘密', Sum());
        else 
            $('#message').text('这是个天大的秘密').show();
    }
    catch (err) {
        $('#message').text(err.message).show();
    }
}

function bHandler(Sum, State) {
    let span = $('#B').find('span');
    try {
        span.text('...').show();
        span.parent().attr('class', 'button disabled');
        var state = $.ajax({url: '/rand', context: span, success: function() {
            if (State() != null) {
                console.log(""+state.responseText);
                span.text(state.responseText);
                Sum(state.responseText);      
                $('#B').trigger('done');         
            }
        }});

        State(state);
        
        //Random Error
        if (Math.random() > 0.5) 
            throw new error('我知道', Sum());
        else 
            $('#message').text('我不知道').show();
    }
    catch (err) {
        $('#message').text(err.message).show();
    }
}

function cHandler(Sum, State) {
    let span = $('#C').find('span');
    try {
        span.text('...').show();
        span.parent().attr('class', 'button disabled');
        var state = $.ajax({url: '/rand', context: span, success: function() {
            if (State() != null) {
                console.log(""+state.responseText);
                span.text(state.responseText);
                Sum(state.responseText);      
                $('#C').trigger('done');         
            }
        }});

        State(state);
        
        //Random Error
        if (Math.random() > 0.5) 
            throw new error('你知道', Sum());
        else 
            $('#message').text('你不知道').show();
    }
    catch (err) {
        $('#message').text(err.message).show();
    }
}

function dHandler(Sum, State) {
    let span = $('#D').find('span');
    try {
        span.text('...').show();
        span.parent().attr('class', 'button disabled');
        var state = $.ajax({url: '/rand', context: span, success: function() {
            if (State() != null) {
                console.log(""+state.responseText);
                span.text(state.responseText);
                Sum(state.responseText);      
                $('#D').trigger('done');         
            }
        }});

        State(state);
        
        //Random Error
        if (Math.random() > 0.5) 
            throw new error('他知道', Sum());
        else 
            $('#message').text('他不知道').show();
    }
    catch (err) {
        $('#message').text(err.message).show();
    }
}

function eHandler(Sum, State) {
    let span = $('#E').find('span');
    try {
        span.text('...').show();
        span.parent().attr('class', 'button disabled');
        var state = $.ajax({url: '/rand', context: span, success: function() {
            if (State() != null) {
                console.log(""+state.responseText);
                span.text(state.responseText);
                Sum(state.responseText);      
                $('#E').trigger('done');         
            }
        }});

        State(state);
        
        //Random Error
        if (Math.random() > 0.5) 
            throw new error('才不怪', Sum());
        else 
            $('#message').text('才怪').show();
    }
    catch (err) {
        $('#message').text(err.message).show();
    }
}

function bubbleHandler(Sum) {
    try {
        var sum = Sum();
        $('#result').text(sum).show();

        if (Math.random() > 0.5) 
            throw new error('楼主异步调用战斗力感人，目测超过', Sum());
        else 
            $('#message').text('楼主异步调用战斗力感人，目测不超过' + sum).show();
        
    }
    catch (err) {
        $('#message').text(err.message + err.currentSum).show();
    }
}