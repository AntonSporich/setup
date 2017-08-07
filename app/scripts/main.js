'use strict';



$(function() {
    var menuContent = function() {
        $('.menu_redesign > nav > ol > li').mouseover(function() {
            $(this).parent().children().removeClass('active');
            $(this).addClass('active');
        });
    };

    menuContent();

    /* for responsive menu */

    function SetMenuVisibility() {
        if ($(window).width() <= 1200) {
            $('.menu-nav').addClass('menu-responsive');
        } else {
            $('.menu-nav').removeClass('menu-responsive');
        }
    }

    SetMenuVisibility();

    $('header').find('.menu-collapse-wrap').on('click', function() {
        $(this).closest('header').toggleClass('menu-expand');
        $('body').toggleClass('page-noscroll');
        return false;
    });

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


});

$(function () {

    function behaviorSlide(el){
        var that = el,
            thisOffset = $(that).offset().top,
            currentEl = $('.services_list li.current'),
            $servicesWrapOffset = $('.services_list').offset().top,
            currentOffset,
            topScrollMargin,
            CORRECT_HEIGHT = 183; // correct height between slider and wrap section;

        if (currentEl.offset()) {
            currentOffset = currentEl.offset().top;
        }

        if(thisOffset > currentOffset) {
            topScrollMargin = currentOffset;
        }else if (thisOffset == currentOffset) {
            topScrollMargin = $servicesWrapOffset - CORRECT_HEIGHT;
        }
        $('html, body').animate({ scrollTop: topScrollMargin}, 'normal')
    }

    var $window = $(window);
    var $servicesList = $('.services_list li'),
        $servicesSection = $('.services_list li section');

    $(document).on('click','.services_list li a', function(){


        var parentListItem = $(this).parents('li');

        function openSlide(){
            $servicesList.removeClass('current');
            $servicesSection.slideUp();
        }

        if ( $window.width() > 950 ) {
            behaviorSlide(this);

            if (parentListItem.hasClass('current')) {
                openSlide();
            } else {
                openSlide();
                parentListItem.addClass('current').find('section').slideDown();
            }
        } else {
            if (parentListItem.hasClass('current')) {
                $servicesList.removeClass('current');
            }
            // else {
            //     $servicesList.removeClass('current').find('section').removeAttr('style');
            //     parentListItem.addClass('current');
            //     var topMargin = parentListItem.offset().top - $('#top_menu').height();
            //     $('body,html').animate({ scrollTop: topMargin }, 500);
            //     console.log(topMargin);
            // }
        }

        return false;
    });
});


