/*=========================================
  GUI-Responsive v2.0 SEOshop Group B.V.
=========================================*/
$(document).ready(function(){
  if($(window).width() < 480){
    $(".gui-number").each(function() {
      var valueAmount = $('.gui-number .gui-value input').val();
      $(this).replaceWith('<span class="valueAmount">' + valueAmount + '</span>');
    });
    $('.gui.gui-checkout-method .gui-col2-equal-col2').insertBefore('.gui.gui-checkout-method .gui-col2-equal-col1');
    $('.gui-account .gui-col2-left .gui-col2-left-col2').insertBefore('.gui-account .gui-col2-left .gui-col2-left-col1');
  }
});