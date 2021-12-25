$(document).ready(function(){
    $('.login-info-box').fadeOut();
    $('.login-show').addClass('show-log-panel');
});


$('.login-reg-panel input[type="radio"]').on('change', function() {
    if($('#log-login-show').is(':checked')) {
        $('.register-info-box').fadeOut(); 
        $('.login-info-box').fadeIn();
        
        $('.white-panel').addClass('right-log');
        $('.register-show').addClass('show-log-panel');
        $('.login-show').removeClass('show-log-panel');
        
    }
    else if($('#log-reg-show').is(':checked')) {
        $('.register-info-box').fadeIn();
        $('.login-info-box').fadeOut();
        
        $('.white-panel').removeClass('right-log');
        
        $('.login-show').addClass('show-log-panel');
        $('.register-show').removeClass('show-log-panel');
    }
});



// flip card

$(document).ready(function() {

    var s_round = '.registerbutton';
  
    $(s_round).hover(function() {
      $('.b_round').toggleClass('b_round_hover');
      return false;
    });
  
    $(s_round).click(function() {
      $('.flip_box').toggleClass('flipped');
      //make #front display none
        $('.front').toggle();
        //if id="label-login" innerhtml is "Register" the innerhtml of id="label-login" to "Login"
        if($('#label-login').html() == "Register"){
            $('#label-login').html("Login");
        }
        //if id="label-login" innerhtml is "Login" the innerhtml of id="label-login" to "Register"
        else{
            $('#label-login').html("Register");
        }
        




    
      return false;
    });
  
    $(s_round).on('transitionend', function() {
      return false;
    });
  });