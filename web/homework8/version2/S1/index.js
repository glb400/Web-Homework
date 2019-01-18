// var currentAjax;
$(function() {
    $('#at-plus-container').hover(handlerIn, handlerOut);
});

function handlerIn(){
    reset();
    addClick();
}

function handlerOut(){
    reset();
    removeClick();
    // if(currentAjax != null)
    //     currentAjax.abort();
}

function reset() {
    $('li').each(function() {
        $(this).find('span').text('').hide();
        $(this).attr('class', 'button abled');
    });
    $('#result').text('').hide();
    $('#info-bar').attr('class', 'button disabled');
}

function addClick() {
    $('#control-ring').click(handleClick);
    $('#info-bar').click(handleSum);
}

function removeClick() {
    $('#control-ring').off('click',handleClick);
    $('#info-bar').off('click',handleSum);    
}

function handleClick(event){
    if ($(event.target).find('span').text() == '') {
        $('li').each(function() {
          if ($(event.target).find('span').text() == '') {
            $(this).attr('class', 'button disabled');
          }
            $(event.target).attr('class', 'button abled');
        });
        getNumber.call(event.target);
    }
}

function getNumber() {
    var span = $(this).find('span');
    span.text("...").show();

    $('#control-ring').off('click',handleClick);
    
    // currentAjax = $.ajax({url: '/abcdefg', context: span,success:function() {
    //         console.log("This time currentAjax is " + currentAjax.responseText);
    //         $(this).text(currentAjax.responseText);
    //         $(this).parent().attr('class', 'button disabled');
    //         $('#control-ring').click(handleClick);

    //         let check = true;
    //         $('#control-ring').find('li').each(function() {     
    //             if ($(this).find('span').text() == '') {
    //                 check = false;
    //                 $(this).attr('class', 'button abled');
    //             }
    //         });

    //         if(check == true){
    //             $('#info-bar').attr('class', 'button abled');
    //             console.log("Now enable the Calculator...");
    //         }
    //     }
    // });
    fetch('http://localhost:3000/')
        .then(obj => obj.text())
        .then(res => {
            span.text(res);
            span.parent().attr('class', 'button disabled');
            $('#control-ring').click(handleClick);

            let check = true;
            $('#control-ring').find('li').each(function() {
                if($(this).find('span').text() == '') {
                    check = false;
                    $(this).attr('class', 'button abled');
                }
            });

            if(check == true) {
                $('#info-bar').attr('class', 'button abled');
                console.log("Now enable the Calculator...");
            }
        })
        .catch (err => console.log(err));

}

function handleSum(event) {
    let check = true;
    $('#control-ring').find('li').each(function() {     
        if ($(this).find('span').text() == '') {
            check = false;
            $(this).attr('class', 'button abled');
        }
    });

    if(check == true && $('#result').text() == '') {
        let sum = 0;
        let arr = new Array();

        $('#control-ring').find('li').each(function() {
            arr.push(parseInt($(this).find('span').text()));
        });
           
        sum = arr.reduce(function(x,y){
            return x + y;
        });

        console.log("The Answer of Sum is: " + sum);
        $('#result').text(sum).show(); 
        $(event.target).attr('class', 'button disabled');        
    }
}