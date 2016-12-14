//myPlugins
  ;(function($){
    $.fn.qTabs = function(){
        var global = this;
        global.find('.tabs-content__item').hide();
        global.find('.tabs-content__item.active').show();
        $(this).find('.tabs-nav li').click(function(){
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            var data = $(this).find('a').attr('href');
            $(global).find('.tabs-content__item').hide().removeClass('active');
            $(global).find('.tabs-content__item' + data + '').fadeIn(300).addClass('active');
            return false;
        })
    }
    $.fn.qToggle = function(){
        var global = this;
        $(this).click(function(e){
            e.preventDefault();
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        })
    }
    $.fn.equalHeight = function(){
        var global = this,
            maxHeigh = 0,
            tmpHeigh = 0;
        $(this).each(function(){
            tmpHeight = $(this).outerHeight();
            if(tmpHeight > maxHeigh){
                maxHeigh = tmpHeight;
            }
        })

        $(this).each(function(){
            $(this).css('min-height', maxHeigh);
        })
    }
  }(jQuery));

$(function(){
    $('input[name="phone"]').inputmask('+7(999)-999-9999');
    $(window).load(function(){
       $('.certificates__item').equalHeight();
        $('.inner-steps__item').equalHeight();
        $('.reference__item').equalHeight(); 
    });
    

    /*-------------------------------------------------*/
    /*  card 
    /*-------------------------------------------------*/
    var cardPreviewCarousel = $('#cardPreviewCarousel').owlCarousel({
        items: 4,
        margin: 8,
        loop: true
    });
    $('#cardPreviewCarousel a').click(function(){
        $('.card-preview__main img').attr('src', $(this).attr('href'));
        $('.card-preview__main a').attr('href', $(this).data('largest-img'));
        return false;
    });
    $('.card-preview__controls button').click(function(e){
        if($(e.target).is('.prev')){
            cardPreviewCarousel.trigger('prev.owl.carousel');
        }else{
            cardPreviewCarousel.trigger('next.owl.carousel');
        }
    });
    $('.card-preview__main a').click(function(){
        $.fancybox(this.href,{padding: 0});
        return false;
    });

    $('.card-complect__nav a').click(function(){
        $(this).addClass('active');
        $(this).parent().siblings().find('a').removeClass('active');
        $('.card-complect__content').each(function(){
            $(this).hide().removeClass('active');
        });
        $('.card-complect__content.'+$(this).attr('href')+'').fadeIn().addClass('active');
        return false;
    });
    /*-------------------------------------------------*/
    /*  card  end
    /*-------------------------------------------------*/



    var mapPointsCarousel = $('#mainMapList').bxSlider({
        pager: false,
        mode: 'vertical',
        minSlides: 9,
        maxSlides: 9,
        slideHeight: 35
    });

    $('.main-map__controls-bottom').click(function(){
        mapPointsCarousel.goToPrevSlide();
    });
    $('.main-map__controls-top').click(function(){
        mapPointsCarousel.goToNextSlide();
    });

    $('.fancybox').fancybox({
        padding: 0
    });

    $('.responsive-menu').click(function(){
        $(this).siblings('.main-menu').slideToggle();
    });

    $('.answerOpen').click(function(){
        $(this).closest('.inner-question__item').find('.answer').slideToggle();
    });
    
    if($('.filter-sort').length){
    $(document).click(function(e){
        if(!($(e.target).is('.filter-sort') || $.contains($('.filter-sort')[0], e.target))){
            $('.filter-sort__nav').hide();
        }
    });
    }
    $('.filter-sort').click(function(e){
        $(this).find('.filter-sort__nav').fadeToggle(0);
        if($(e.target).is('li')){
            $(this).find('.filter-sort__active').text($(e.target).text());
        }
    });

    ymaps.ready(function(){
        if($('#mainMap').length){
            var myMap, 
                mapContacts,
                myPlacemark,
                places = {
                    'point1':[55.75939006898599,37.598968499999906],
                    'point2':[55.75476067956102,37.582852524903565],
                    'point3':[55.7465416719073,37.5879148820559]
                }

                
            myMap = new ymaps.Map("mainMap", {
                center: places['point1'],
                zoom: 15
            });

            for(point in places){
                myPlacemark = new ymaps.Placemark(places[point],{}, {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/placmark.png',
                    iconImageSize: [28, 42],
                    iconImageOffset: [-3, -42]
                });
                myMap.geoObjects.add(myPlacemark);
            }

            function clickGo(){
                var point = $(this).attr('href');
                $('#mainMapList li').each(function(){
                    $(this).removeClass('active');
                });
                $(this).parent().addClass('active');
                myMap.panTo(places[point]);
                return false;
            }

            $('#mainMapList a').click(clickGo);
            $('.main-map__places .allPoints').click(function(){
                $('#mainMapList li').each(function(){
                    $(this).removeClass('active');
                });
                myMap.setBounds(myMap.geoObjects.getBounds(),{
                    zoomMargin: [20, 20, 20, 445],
                    duration: 500
                });
                return false;
            });
        }//if
        if($('#contactsMap').length){
            var coords = [55.74222006900151,37.616629]
            myMap = new ymaps.Map("contactsMap", {
                center: coords,
                zoom: 17
            });
            myPlacemark = new ymaps.Placemark(coords,{}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/placmark.png',
                iconImageSize: [28, 42],
                iconImageOffset: [-3, -42]
            });
            myMap.geoObjects.add(myPlacemark);
        }
    });
    
});

