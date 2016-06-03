//Bereken de hoogt van de heightsub class
var heightsubnav = $('.current .sub-menu').outerHeight();
$('.sub-bg-menu').css({
  'height': heightsubnav
});

function urlencode(str) {
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function liveSearch() {
  var query = $('.form-control').val();
  query = urlencode(query.replace('/', '-slash-'));
  if (query.length > 2) {
    var url = searchUrl + query + '/page1.ajax?limit=10';
    $.getJSON(url, function (json) {

      if (json.count > 0) {

        var productsHtml = [];

        $.each(json.products, function (index, product) {
          var productHtml = '' +
            '<div class="product clearfix">' +
            '<a href="' + product.url + '" title="' + product.fulltitle + '"><img src="' + product.image.replace('50x50x2', '36x36x2') + '" width="36" height="36" alt="' + product.fulltitle + '" /></a>' +
            '<h4><a href="' + product.url + '" title="' + product.fulltitle + '">' + product.fulltitle + '</a></h4>';

          if (product.price.price_old) {
            productHtml = productHtml +
              '<p class="price price-offer"><span class="price-old">' + product.price.price_old_money + '</span><p class="price"> ' + product.price.price_money + '</p></p>';

          } else {
            productHtml = productHtml +
              '<p class="price">' + product.price.price_money + '</p>';
          }

          productHtml = productHtml +
            '</div>';

          productsHtml.push(productHtml);
        });

        productsHtml = productsHtml.join('');

        $('.autocomplete .products-livesearch').html(productsHtml);
        $('.autocomplete .more a').attr('href', json.url);
        $('.autocomplete .more span').html('(' + json.count + ')');
        $('.autocomplete').removeClass('noresults');
      } else {
        $('.autocomplete').addClass('noresults');
      }
      $('.autocomplete').css('display', 'block');
    });
  } else {
    $('.autocomplete').css('display', 'none');
  }
}

function getAjaxTranslation(key) {
  if (translation = eval('ajaxTranslations["' + key + '"]')) {
    return translation;
  }
  return key;
}

function updateCartContainerTotalQuantity() {
  //update correct cart quantity
  $numItems = 0;
  $('#cartContainer .view-cart .product-sidebar').each(function(){
    $numItems += parseInt($('.cart-quantity', this).text());
  });
  if ($('#cartContainer .cart > .cart-total-quantity').length > 0) {
    $('#cartContainer .cart > .cart-total-quantity').html('('+$numItems+')');
  } else {
    $('#cartContainer .cart').append('<span class="cart-total-quantity">('+$numItems+')</span>');
  }  
  if ($('.sticky-mobile .cart > .cart-total-quantity').length > 0) {
    $('.sticky-mobile .cart > .cart-total-quantity').html('('+$numItems+')');
  } else {
    $('.sticky-mobile .cart').append('<span class="cart-total-quantity">('+$numItems+')</span>');
  }  
}

$(document).ready(function () {
  
    updateCartContainerTotalQuantity();

    //touch device
    if ('ontouchstart' in document.documentElement) {
      //desktop device
    } else {
      $('#stickynav').affix({
        offset: {
          top: function () {
            return (this.top = $('header').outerHeight(true) - $('#navbar').outerHeight(true));
          },
          bottom: function () {
            return (this.bottom = $('footer').outerHeight(true));
          }
        }
      });
      $('.cart, .view-cart').hover(
        function () {
          $('.view-cart').css('display', 'block');
        },
        function () {
          $('.view-cart').css('display', 'none');
        }
      );
    }
    //livesearch activeren  
    $('.form-control').keyup(function () {
      liveSearch();
    });
    $('.form-control').bind('webkitspeechchange', function () {
      liveSearch();
    });

    $(".form-control").keyup(function () {
      $("#clearField").toggle(Boolean($(this).val()));
    });

    $("#clearField").toggle(Boolean($(".form-control").val()));
    $("#clearField").click(function () {
      $(".form-control").val('').focus();
      $(this).hide();
      $('.autocomplete').css('display', 'none');
    });

    var box = $('.view-search');
    $('.stickysearch').on('click', function () {
      if (box.hasClass('open')) {
        box.removeClass('open');
        setTimeout(function () {
          box.addClass('hidden');
        }, 120);
      } else {
        box.removeClass('hidden');
        setTimeout(function () {
          box.addClass('open');
        }, 20);
      }
    });

    $(".single-item1").hover(function () {
      $('.menublock').addClass('hidden');
    }, function () {
      $('.menublock').removeClass('hidden');
    });

    $(".single-item1, .has-submenu").hover(function () {
      $('.pagecur').removeClass('current');
    }, function () {
      $('.pagecur').addClass('current');
    });


    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
      if ($(this).scrollTop() > 400) {
        $('.scrollToTop').fadeIn();
      } else {
        $('.scrollToTop').fadeOut();
      }
    });

    //Activeer doubletap voor touch devices
    $(function () {
      $('.inner li:has(has-submenu)').doubleTapToGo();
    });

    $(window).resize(function () {
      if ($(window).width() > 992) {
        $('#menu').addClass('open');
      }
    });

    if ($(window).width() > 992) {
      $('#menu').addClass('open');
    }
    // Open menu op click op mobiel
    $('#menu-toggle').on('click', function () {
      $('#menu').toggleClass('open');
    });
    //MENU3LAAGS Bekijk of sub-menu class active heeft en voeg dan + of - toe    
    $('.menu3laags .has-submenu > .togglesub').click(function () {
      if ($(this).parent().children('ul.sub-menu').hasClass('active')) {
        $(this).text('+');
      } else {
        $(this).text('-');
      }
      $(this).parent().children('ul.sub-menu').toggleClass('active');
    });

    //MENU2LAAGS Bekijk of sub-menu class open heeft en voeg dan + of - toe    
    $('.menu2laags .togglesub').click(function () {
      if ($(this).parent().hasClass('open')) {
        $(this).text('+');
      } else {
        $(this).text('-');
      }
      $(this).parent().children('ul.sub-menu').toggleClass('active');
    });
    $('.navbar li ul.dropdown-menu').hover(function () {
      $(this).parent().toggleClass('active');
    });

    $('#menu li ul.sub-menu').hover(function () {
      $(this).parent().toggleClass('current');
    });

    if ($('.menu2laags').length > 0) {
      var responsiveWidth = 991;
      var fixedMenuOffset = (this.top = $('header').outerHeight(true) - $('#navbar').outerHeight(true));
      if ($(window).innerWidth() >= responsiveWidth) {
        menu2laagsPositioner();
      }

      var affixMenuOn = false;
      $(window).scroll(function () {
        if ($(document).scrollTop() < fixedMenuOffset && affixMenuOn == true) {
          if ($(window).innerWidth() >= responsiveWidth) {
            affixMenuOn = false;
            menu2laagsPositioner();
          }
        } else if ($(document).scrollTop() > fixedMenuOffset && affixMenuOn == false) {
          if ($(window).innerWidth() >= responsiveWidth) {
            affixMenuOn = true;
            menu2laagsPositioner();
          }
        }
      });
      $(window).resize(function () {
        if ($(window).innerWidth() >= responsiveWidth) {
          menu2laagsPositioner();
        } else {
          $('.menu2laags #navbar .nav .dropdown-menu').removeAttr('style');
        }
      });
    }

    function menu2laagsPositioner() {
      var selector = '.menu2laags #navbar .nav';
      //var singleHeight = $(selector+' > li:first-child').outerHeight();
      $(selector + ' > li').each(function () {
        if ($('.dropdown-menu', this).length > 0) {
          var offset = $(this).position();
          var height = $(this).outerHeight();
          //var row = offset.top / singleHeight;
          $('.dropdown-menu', this).css('top', (height + offset.top) + 'px');
        }
      });
    }


    //Click event to scroll to top
    $('.scrollToTop').click(function () {
      $('html, body').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
    $('.scrollToTopSticky').click(function () {
      $('html, body').animate({
        scrollTop: 0
      }, 800);
      return false;
    });

    //checken of tekst meer dan 500 karakters heeft
    if ($('.collection-content').text().length > 500) {
      $('.show-more').css('display', 'block');
    } else {
      $('.show-more').css('display', 'none');
    }
});