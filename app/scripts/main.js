'use strict';

var $window = $(window);

$(function() {

    //Desktop header navigation

    var menuContent = function() {
        $('.menu_redesign > nav > ol > li').mouseover(function() {
            $(this).parent().children().removeClass('active');
            $(this).addClass('active');
        });
    };

    menuContent();

    //Responsive header

    //Burger button click
    $('header').find('.menu-collapse-wrap').on('click', function() {
        $(this).closest('header').toggleClass('menu-expand');
        $('body').toggleClass('page-noscroll');
        return false;
    });

    function SetMenuVisibility() {
        if ($(window).width() <= 1200) {
            $('.menu-nav').addClass('menu-responsive');
        } else {
            $('.menu-nav').removeClass('menu-responsive');
        }
    }

    SetMenuVisibility();

    var HEIGHT_THIS = 52;

    function MenuDropdownHeight() {
        $('.menu-nav .has-dropdown > a').each(function() {
            if ($(window).width() <= 1200) {
                var parentItem = $(this).parent('li'),
                    childrenNumb = parentItem.find('.menu_dd').find('.first-level-link > li').length;
                if (parentItem.hasClass('active')) $(this).next().addClass('submenu-open').height(HEIGHT_THIS * childrenNumb);
            } else {
                $(this).next().removeAttr('style');
            }
        });
    }

    MenuDropdownHeight();

    $('.menu-nav .has-dropdown > a').on('click', function() {
        var dropList = $(this).next();
        $(this).closest('li').toggleClass('active');
        if ($(window).width() <= 1200) {
            if (dropList.hasClass('submenu-open')) {
                dropList.removeAttr('style').removeClass('submenu-open');
            } else {
                var childrenNumb = dropList.find('.first-level-link > li').length;
                dropList.addClass('submenu-open').height(HEIGHT_THIS * childrenNumb);
            }
        } else {
            dropList.removeAttr('style').removeClass('submenu-open');
        }
        return false;
    });

    $('.services_list li').on('click', function() {
        $('.services_list li').removeClass('show');
        $(this).addClass('show');
    });

    $('.solutions-block li').on('click', function() {
        $('.solutions-block li').removeClass('show');
        $(this).addClass('show');
    });


    // function behaviorSlide(el){
    //     var that = el,
    //         thisOffset = $(that).offset().top,
    //         currentEl = $('.services_list li.current'),
    //         $servicesWrapOffset = $('.services_list').offset().top,
    //         currentOffset,
    //         topScrollMargin,
    //         CORRECT_HEIGHT = 183; // correct height between slider and wrap section;
    //
    //     if (currentEl.offset()) {
    //         currentOffset = currentEl.offset().top;
    //     }
    //
    //     if(thisOffset > currentOffset) {
    //         topScrollMargin = currentOffset;
    //     }else if (thisOffset == currentOffset) {
    //         topScrollMargin = $servicesWrapOffset - CORRECT_HEIGHT;
    //     }
    //     $('html, body').animate({ scrollTop: topScrollMargin}, 'normal')
    // }


    // var $servicesList = $('.services_list li'),
    //     $servicesSection = $('.services_list li section');
    //
    // $(document).on('click','.services_list li a', function(){
    //
    //     var parentListItem = $(this).parents('li');
    //
    //     function openSlide(){
    //         $servicesList.removeClass('current');
    //         $servicesSection.slideUp();
    //     }
    //
    //     if ( $window.width() > 950 ) {
    //         behaviorSlide(this);
    //
    //         if (parentListItem.hasClass('current')) {
    //             openSlide();
    //         } else {
    //             openSlide();
    //             parentListItem.addClass('current').find('section').slideDown();
    //         }
    //     } else {
    //         if (parentListItem.hasClass('current')) {
    //             $servicesList.removeClass('current');
    //         }
            // else {
            //     $servicesList.removeClass('current').find('section').removeAttr('style');
            //     parentListItem.addClass('current');
            //     var topMargin = parentListItem.offset().top - $('#top_menu').height();
            //     $('body,html').animate({ scrollTop: topMargin }, 500);
            //     console.log(topMargin);
            // }
        // }

    //     return false;
    // });



    //Areas slider logic appearence
    var _$windowWidth = $window.width();
    var areasSlider =  $('.areas-slider.bxslider');

    if (_$windowWidth <= 1268) {
        areasSlider.bxSlider({
            minSlides: 1,
            maxSlides: 4,
            slideWidth: 260,
            slideMargin: 20,
            controls: false

        });
    }

    function ariasSliderResizer() {
        var $windowWidth = $window.width();
        if ($windowWidth > 1269) {
            try {
                areasSlider.destroySlider();
            } catch(e) {
                console.log(`You are recizing the window`)
            }
        } else {
            areasSlider.bxSlider({
                minSlides: 1,
                maxSlides: 4,
                slideWidth: 260,
                slideMargin: 20,
                controls: false
            });
        }
    }

    function ImgResize() {
        // if ( $(window).width() < 2200 && $(window).width() > 1200 ) {
        $('.main_slider .bxslider > li').each(function() {
            $(this).find('img').css({'opacity': '0'});
            var imgAttr = $(this).find('img').attr('src');
            $(this).find('.backstretch').remove();
            $(this).backstretch(imgAttr);
        });
        /*                var tmpSliderHeight  = $(window).height() - ($(window).height()/100 *25); //25 - height of element below the slider
                        $(this).css('height', tmpSliderHeight);
                        $('#home').css('height', tmpSliderHeight);
                        $('.bxslider > li').css('height', tmpSliderHeight);*/
        // } else {
        //     $('.main_slider .bxslider > li').each(function() {
        //         $(this).find('img').css({'opacity': '1'});
        //         $(this).find('.backstretch').remove();
        //     });
        /*            var tmpSliderHeight  = $(window).height() - ($(window).height()/100 * 25); //25 - height of element below the slider
                    $(this).css('height', tmpSliderHeight);
                    $('#home').css('height', tmpSliderHeight);
                    $('.bxslider > li').css('height', tmpSliderHeight);*/
//                $('#home .bx-viewport').css('height', $(window).height()/2 +200);
//         }

        // if ( $(window).width() > 1220 ) {
        //     $('#company').find('.backstretch').remove();
        //     $('#company').backstretch(Drupal.settings.basePath + Drupal.settings.themePath + '/images/company_bg.jpg');
        //
        //     $('#showcase').find('.backstretch').remove();
        //     $('#showcase').backstretch(Drupal.settings.basePath + Drupal.settings.themePath + '/images/showcase_bg.jpg');
        //
        //     $('#expertise').find('.backstretch').remove();
        //     $('#expertise').backstretch( Drupal.settings.basePath + Drupal.settings.themePath + '/images/expertise_bg.jpg');
        //
        //     $('#related').find('.backstretch').remove();
        //     $('#related').backstretch(Drupal.settings.basePath + Drupal.settings.themePath + '/images/showcase_bg.jpg');
        // } else {
        //     $('#showcase').find('.backstretch').remove();
        //     $('#showcase').css({'background': 'url('+Drupal.settings.basePath + Drupal.settings.themePath + '/images/showcase_bg.jpg'+') no-repeat center'});
        //
        //     $('#related').find('.backstretch').remove();
        //
        //     if ( $(window).width() > 680 ) {
        //         $('#expertise').find('.backstretch').remove();
        //         $('#expertise').css({'background-image': 'url('+Drupal.settings.basePath + Drupal.settings.themePath + '/images/expertise_bg.jpg'+')', 'background-repeat': ' no-repeat', 'background-position': ' bottom right', 'background-size': 'cover'});
        //         $('#related').css({'background': 'url('+Drupal.settings.basePath + Drupal.settings.themePath + '/images/showcase_bg.jpg'+') no-repeat center'});
        //     } else {
        //         $('#expertise').find('.backstretch').remove();
        //         $('#expertise').removeAttr('style');
        //         $('#related').css({'background': 'url('+Drupal.settings.basePath + Drupal.settings.themePath + '/images/showcase_bg2.jpg'+') no-repeat 38% 50%'});
        //     }
        // }
    }
    ImgResize();

    var slideWidth;

    function MainSliderMargin() {
        if ( $(window).width() < 1500 ) {
            slideWidth = 600 + 'px';
        }
        if ( $(window).width() < 1300 ) {
            slideWidth = 42+'%';
        }
        if (  $(window).width() > 1200 && $(window).width() < 1300 ) {
            slideWidth = Math.floor(($(window).width()-100)/2)+'px';
        }
        if ( $(window).width() < 954 ) {
            slideWidth = 0;
        }
        $('#home .bxslider > li.active-slide').find('div.m_s_cont').css({'margin-left': '-'+ slideWidth})
    }
    MainSliderMargin();

    $('#home .bxslider').bxSlider({
        onSlideAfter: function (currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
            $('#home div.m_s_cont').removeAttr('style');
            $('.active-slide').removeClass('active-slide');
            $('#home .bxslider > li').eq(currentSlideHtmlObject + 1).addClass('active-slide').find('div.m_s_cont').animate({
                opacity: '1',
                marginLeft: '-'+slideWidth
            },400);
        },
        onSliderLoad: function () {
            $('#home .bxslider > li').eq(1).addClass('active-slide').find('div.m_s_cont').animate({
                opacity: '1',
                marginLeft: '-'+slideWidth
            },400);
        }
    });

    var showCaseBlock = $('#pr_slider');

    function setShowcaseSlider(){
        var windowWidth = window.innerWidth;

        var pr_item = showCaseBlock.find('.pr_figure').width() + 20;
        var pr_items = showCaseBlock.find('.pr_figure').length;

        var pr_items_in_view = Math.floor(windowWidth/pr_item);

        if ( pr_items_in_view < pr_items ) {
            if (windowWidth > 1200) {
                showCaseBlock.bxSlider({
                    pager: false,
                    speed: 1200,
                    nextSelector: '#showcase #pr_next',
                    prevSelector: '#showcase #pr_prev',
                    nextText: '',
                    prevText: '',
                    maxSlides: 6,
                    moveSlides: 3,
                    slideWidth: 366
                });

                showCaseBlock.closest('.bx-wrapper').css({
                    'width': $window.width() + 183 + 'px',
                    'margin': '0 0 0 -183px'
                });

                showCaseBlock.closest('#show_slider').find('.left_link_wrap').show();
                showCaseBlock.closest('#show_slider').find('.right_link_wrap').show();

            } else if (windowWidth > 767) {
                showCaseBlock.bxSlider({
                    pager: false,
                    speed: 800,
                    nextSelector: '#showcase #pr_next',
                    prevSelector: '#showcase #pr_prev',
                    nextText: '',
                    prevText: '',
                    maxSlides: 4,
                    moveSlides: 2,
                    slideWidth: 300
                });

                showCaseBlock.closest('.bx-wrapper').css({
                    'width': $window.width() + 150 + 'px',
                    'margin': '0 0 0 -150px'
                });

                showCaseBlock.closest('#show_slider').find('.left_link_wrap').show();
                showCaseBlock.closest('#show_slider').find('.right_link_wrap').show();

            } else {
                showCaseBlock.bxSlider({
                    pager: false,
                    speed: 400,
                    nextSelector: '#showcase #pr_next',
                    prevSelector: '#showcase #pr_prev',
                    nextText: '',
                    prevText: '',
                    maxSlides: 3,
                    moveSlides: 1,
                    slideWidth: 300
                });

                showCaseBlock.closest('.bx-wrapper').css({
                    'width': $window.width() - 10 + 'px',
                    'margin': '0 0 0 10px'
                });

                showCaseBlock.closest('#show_slider').find('.left_link_wrap').hide();
                showCaseBlock.closest('#show_slider').find('.right_link_wrap').hide();

            }
        } else {
            showCaseBlock.closest('#show_slider').find('.left_link_wrap').hide();
            showCaseBlock.closest('#show_slider').find('.right_link_wrap').hide();
        }
    }

    if (showCaseBlock.length) {
        setShowcaseSlider();
    }

    // function destroySliderCustom(el) {
    //     el.find('.bx-clone').remove();
    //     el.find('.bx-loading').remove();
    //     el.closest('#show_slider').find('.bx-controls').remove();
    //     el.children().each(function() {
    //         $(this).removeAttr('style');
    //     });
    //     el.removeAttr('style');
    //     el.unwrap().unwrap();
    //     $('#pr_next .bx-next').remove();
    //     $('#pr_prev .bx-prev').remove();
    // }

    var hoverOffFunction = function() {
        $('.pr_figure').removeClass('hovered');
        $(this).find('figcaption').stop(true, false).animate({
            top: '181px'
        }, 200, function() {
        });
    };
    var hoverFunction = function() {
        $(this).find('figcaption').stop(true, false).animate({
            top: 0
        }, 200, function() {
            $(this).parent('.pr_figure').addClass('hovered');
        });
    };

    if ( $window.width() > 1200 ) {
        $('.pr_figure').on('mouseleave', hoverOffFunction);
        $('.pr_figure').on('mouseenter', hoverFunction);
    }


    $window.resize(function() {
        var $windowWidth = $window.width();
        if ($windowWidth > 1200) {
            $('#top_menu').removeAttr('style');
        }

        SetMenuVisibility();
        ariasSliderResizer();
        MainSliderMargin();
        ImgResize();

        // if (showCaseBlock.length) {
        //     if (showCaseBlock.closest('.bx-wrapper').length) {
        //         destroySliderCustom(showCaseBlock);
        //         //showCaseSlider.destroySlider();
        //     }
        //     setShowcaseSlider();
        // }
    });

});

$(function () {
   $('.showcase.bxslider').bxSlider({
       pager: false,
       autoStart: true,
       pause: 1000
   });
});

/****************************************************/

$(function() {
    var $window = $(window);



    // $('#home .bxslider').bxSlider({
    //     onSlideAfter: function (currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
    //         $('#home div.m_s_cont').removeAttr('style');
    //         $('.active-slide').removeClass('active-slide');
    //         $('#home .bxslider > li').eq(currentSlideHtmlObject + 1).addClass('active-slide').find('div.m_s_cont').animate({
    //             opacity: '1',
    //             marginLeft: '-'+slideWidth
    //         },400);
    //     },
    //     onSliderLoad: function () {
    //         $('#home .bxslider > li').eq(1).addClass('active-slide').find('div.m_s_cont').animate({
    //             opacity: '1',
    //             marginLeft: '-'+slideWidth
    //         },400);
    //     }
    // });
});
