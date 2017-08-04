'use strict';

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
