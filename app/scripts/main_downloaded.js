(function ($, Drupal, window, document, undefined) {
$(document).ready(function() {
    'use strict';

    $.browser.chrome = $.browser.webkit && !! window.chrome;
    $.browser.safari = $.browser.webkit && !window.chrome;

    if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $(window).scroll(function() {
            if ( !$.browser.chrome ) { var scroll_y = $('html').scrollLeft(); } else { var scroll_y = $('body').scrollLeft(); }
            if ( $.browser.safari ) { var scroll_y = $(document).scrollLeft(); }
            $('.page_wrap > header').css('left', -scroll_y + 'px');
        });
    }

    var $window = $(window);

    function ImgResize() {
        if ( $(window).width() < 2200 && $(window).width() > 1200 ) {
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
        } else {
            $('.main_slider .bxslider > li').each(function() {
                $(this).find('img').css({'opacity': '1'});
                $(this).find('.backstretch').remove();
            });
/*            var tmpSliderHeight  = $(window).height() - ($(window).height()/100 * 25); //25 - height of element below the slider
            $(this).css('height', tmpSliderHeight);
            $('#home').css('height', tmpSliderHeight);
            $('.bxslider > li').css('height', tmpSliderHeight);*/
//                $('#home .bx-viewport').css('height', $(window).height()/2 +200);
        }

        if ( $(window).width() > 1220 ) {
            $('#company').find('.backstretch').remove();
            $('#company').backstretch(Drupal.settings.basePath + Drupal.settings.themePath + '/images/company_bg.jpg');

            $('#showcase').find('.backstretch').remove();
            $('#showcase').backstretch(Drupal.settings.basePath + Drupal.settings.themePath + '/images/showcase_bg.jpg');

            $('#expertise').find('.backstretch').remove();
            $('#expertise').backstretch( Drupal.settings.basePath + Drupal.settings.themePath + '/images/expertise_bg.jpg');

            $('#related').find('.backstretch').remove();
            $('#related').backstretch(Drupal.settings.basePath + Drupal.settings.themePath + '/images/showcase_bg.jpg');
        } else {
            $('#showcase').find('.backstretch').remove();
            $('#showcase').css({'background': 'url('+Drupal.settings.basePath + Drupal.settings.themePath + '/images/showcase_bg.jpg'+') no-repeat center'});

            $('#related').find('.backstretch').remove();

            if ( $(window).width() > 680 ) {
                $('#expertise').find('.backstretch').remove();
                $('#expertise').css({'background-image': 'url('+Drupal.settings.basePath + Drupal.settings.themePath + '/images/expertise_bg.jpg'+')', 'background-repeat': ' no-repeat', 'background-position': ' bottom right', 'background-size': 'cover'});
                $('#related').css({'background': 'url('+Drupal.settings.basePath + Drupal.settings.themePath + '/images/showcase_bg.jpg'+') no-repeat center'});
            } else {
                $('#expertise').find('.backstretch').remove();
                $('#expertise').removeAttr('style');
                $('#related').css({'background': 'url('+Drupal.settings.basePath + Drupal.settings.themePath + '/images/showcase_bg2.jpg'+') no-repeat 38% 50%'});
            }
        }
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

    $('.tech-list.bxslider').bxSlider({
        responsive: true,
        pager: true
    });

    if ( $("#brands_slider").length > 0 ) {
        $("#brands_slider").carouFredSel({
            responsive: true,
            scroll: 3,
            items: {
                visible: 5,
                width: 242
            },
            swipe: {
                onTouch: true,
                onMouse: true
            }
        });

        $('#brands_slider').swipe( { excludedElements: "button, input, select, textarea, .noSwipe" });
    }

    $('#expertise section ul > li figure').hover(
        function() {
            $(this).find('figcaption').stop(true, false).animate({
                bottom: 0
            }, 200, function() {
            });
        }, function() {
            $(this).find('figcaption').stop(true, false).animate({
                bottom: '-271px'
            }, 200, function() {
            });
        }
    );

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

    function destroySliderCustom(el) {
        el.find('.bx-clone').remove();
        el.find('.bx-loading').remove();
        el.closest('#show_slider').find('.bx-controls').remove();
        el.children().each(function() {
            $(this).removeAttr('style');
        });
        el.removeAttr('style');
        el.unwrap().unwrap();
        $('#pr_next .bx-next').remove();
        $('#pr_prev .bx-prev').remove();
    }

    $('.btn_filter').on('click',function(e){
        $(this).addClass('clicked');
        $('.filters_block').fadeIn();
        e.preventDefault()
    });

    $('.btn_close').on('click',function(e){
        $('.filters_block').fadeOut(function(){
            $('.btn_filter').removeClass('clicked');
        });
        e.preventDefault()
    });

    $('.project_inner .case-thumb-slider').each(function(){
        var sliderCount = $(this).children().length,
            itemW = $('.case-thumb-slider li').width(),
            sliderW;
        sliderW = (itemW + 10) * sliderCount + 20;
        $(this).css({width: sliderW + 'px'});
    });

    /*Project Page*/
    //$('#related').backstretch(Drupal.settings.basePath + Drupal.settings.themePath + '/images/showcase_bg.jpg');

    var relatedSliderBlock = $('#related_slider');

    function setRelatedSlider(){
        var windowWidth = window.innerWidth;

        var item = relatedSliderBlock.find('.pr_figure').width() + 20;
        var items = relatedSliderBlock.find('.pr_figure').length;
        var items_in_view = Math.floor(windowWidth/item);

        if ( items_in_view < items ) {
            if (windowWidth > 1200) {
                relatedSliderBlock.bxSlider({
                    pager: false,
                    speed: 1200,
                    nextSelector: '#pr_next',
                    prevSelector: '#pr_prev',
                    nextText: '',
                    prevText: '',
                    maxSlides: 4,
                    moveSlides: 3,
                    slideWidth: 366
                });

                relatedSliderBlock.closest('.bx-wrapper').css({'width':$window.width() + 183 + 'px','margin':'0 0 0 -183px'});

                relatedSliderBlock.closest('#show_slider').find('.left_link_wrap').show();
                relatedSliderBlock.closest('#show_slider').find('.right_link_wrap').show();

            } else if ( windowWidth > 767 ) {
                relatedSliderBlock.bxSlider({
                    pager: false,
                    speed: 800,
                    nextSelector: '#pr_next',
                    prevSelector: '#pr_prev',
                    nextText: '',
                    prevText: '',
                    maxSlides: 4,
                    moveSlides: 2,
                    slideWidth: 300
                });

                relatedSliderBlock.closest('.bx-wrapper').css({'width':$window.width() + 150 + 'px','margin':'0 0 0 -150px'});

                relatedSliderBlock.closest('#show_slider').find('.left_link_wrap').show();
                relatedSliderBlock.closest('#show_slider').find('.right_link_wrap').show();


            } else {
                relatedSliderBlock.bxSlider({
                    pager: false,
                    speed: 400,
                    nextSelector: '#pr_next',
                    prevSelector: '#pr_prev',
                    nextText: '',
                    prevText: '',
                    maxSlides: 3,
                    moveSlides: 1,
                    slideWidth: 300
                });

                relatedSliderBlock.closest('.bx-wrapper').css({'width':$window.width() - 10 + 'px','margin':'0 0 0 10px'});

                relatedSliderBlock.closest('#show_slider').find('.left_link_wrap').hide();
                relatedSliderBlock.closest('#show_slider').find('.right_link_wrap').hide();
            }
        } else {
            relatedSliderBlock.closest('#show_slider').find('.left_link_wrap').hide();
            relatedSliderBlock.closest('#show_slider').find('.right_link_wrap').hide();
        }

    }

    if (relatedSliderBlock.length) {
        setRelatedSlider();
    }

    $(window).resize(function() {

        if (showCaseBlock.length) {
            if (showCaseBlock.closest('.bx-wrapper').length) {
                destroySliderCustom(showCaseBlock);
                //showCaseSlider.destroySlider();
            }
            setShowcaseSlider();
        }

        if (relatedSliderBlock.length) {
            if (relatedSliderBlock.closest('.bx-wrapper').length) {
                destroySliderCustom(relatedSliderBlock);
                //relatedSlider.destroySlider();
            }
            setRelatedSlider();
        }
    });

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
        $('.pr_figure').live('mouseleave', hoverOffFunction);
        $('.pr_figure').live('mouseenter', hoverFunction);
    }

    function SetMenuVisibility() {
        if ($(window).width() <= 1200) {
            $('.menu-nav').addClass('menu-responsive');
        } else {
            $('.menu-nav').removeClass('menu-responsive');
        }
    }
    SetMenuVisibility ();

    $(document).on('click', '.project_page .project_inner > section > div aside a', function(){
        $(this).toggleClass('clicked');
        if ($(this).hasClass('clicked')) {
            $('.more_screens').slideDown();
            $(this).find('span').text('Less screens');
        } else {
            $('.more_screens').slideUp();
            $(this).find('span').text('More screens');
        }
        return false;
    });
    $(document).on('click', '.features a', function(){
        return false;
    });

    var menuContent = function() {
        $('.menu_redesign > nav > ol > li').mouseover(function() {
            $(this).parent().children().removeClass('active');
            $(this).addClass('active');
        });
    };

    menuContent();

    /*Contact Page*/
    $('.contact_page').backstretch(Drupal.settings.basePath + Drupal.settings.themePath + '/images/contact_page.jpg');

    $('.required div select.inner-select').each(function(){
        var title = $(this).attr('title');
        if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
        $(this)
            .css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
            .after('<span class="inner-select">' + title + '</span>')
            .change(function(){
                var val = $('option:selected',this).text();
                $(this).next().text(val);
            })
    });

    /*Showcase Page*/

    $(function(){
        $('#wrapper.fe-map').mapPlugin({data: [
            {"year": 2004, "usa": 6, "europe": 5, "uk": 3},
            {"year": 2005, "usa": 24, "europe": 17, "uk": 20},
            {"year": 2006, "usa": 35, "europe": 21, "uk": 27, "canada": 21},
            {"year": 2007, "usa": 47, "europe": 30, "uk": 35, "canada": 27},
            {"year": 2008, "usa": 55, "europe": 37, "uk": 39, "canada": 32, "australia": 12},
            {"year": 2009, "usa": 68, "europe": 55, "uk": 43, "canada": 40, "australia": 18, "east": 15},
            {"year": 2010, "usa": 79, "europe": 61, "uk": 50, "canada": 47, "australia": 22, "east": 19},
            {"year": 2011, "usa": 120, "europe": 70, "uk": 120, "canada": 53, "australia": 28, "east": 25},
            {"year": 2012, "usa": 153, "europe": 96, "uk": 170, "canada": 135, "australia": 53, "east": 61},
            {"year": 2013, "usa": 208, "europe": 136, "uk": 198, "canada": 145, "australia": 80, "east": 89}
        ]});
    });

    Drupal.behaviors.watch = {
        attach: function(context, settings) {
            if (!$('.form-file').hasClass('customfile-input')) {
                $('.form-file').customFileInput();
                $('#contact_page').find('.backstretch').remove();
                $('.contact_page').backstretch(Drupal.settings.basePath + Drupal.settings.themePath + '/images/contact_page.jpg');
            }
            $('.required div select.inner-select').each(function(){

                if ($(this).next('.inner-select').length == 0) {
                    $('.required div select.inner-select').each(function(){
                        var title = $(this).attr('title');
                        if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
                        $(this)
                            .css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
                            .after('<span class="inner-select">' + title + '</span>')
                            .change(function(){
                                var val = $('option:selected',this).text();
                                $(this).next().text(val);
                            })
                    });
                }
            });
            $('input[type="text"],input[type="email"],textarea').focus(function(){
                var placeholder = $(this).attr('placeholder');
                if(placeholder != ''){
                    $(this).attr('save-placeholder',placeholder);
                    $(this).attr('placeholder',"");
                    $(this).addClass('write');
                }
            });

            $('input[type="text"],input[type="email"],textarea').blur(function(){

                if($(this).val()==''){
                    $(this).attr('placeholder',$(this).attr('save-placeholder'));
                    $(this).removeClass('write');
                }
            });

            $('input[type="submit"]').on('click',function(){
                $('.ajax-progress-trobber-success').remove();
            })
        }
    };

    $('.tags-container-wrap .collapse-btn').live('click', function(){
        $(this).closest('aside').toggleClass('filter_open');
        return false;
    });

    /* for responsive menu */

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



    $window.resize(function() {
        var $windowWidth = $window.width();
        if ( $windowWidth > 1200 ) {
            $('#top_menu').removeAttr('style');
            $('.pr_figure').live('mouseleave', hoverOffFunction);
            $('.pr_figure').live('mouseenter', hoverFunction);
        } else {
            $('.pr_figure').die('mouseleave', hoverOffFunction);
            $('.pr_figure').die('mouseenter', hoverFunction);
        }
        MainSliderMargin();
        ImgResize();
        SetMenuVisibility();
        MenuDropdownHeight();
    });

    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offsetScroll = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
    //grab the "back to top" link
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function(){
        ( $(this).scrollTop() > offsetScroll ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if( $(this).scrollTop() > offset_opacity ) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
                scrollTop: 0
            }, scroll_top_duration
        );
    });
});

$(window).load(function() {
    var linkInfo = $('#top_menu a:contains("Company")'),
        linkInfoPos = linkInfo.offset(),
        linkInfoAlign,
        linkExp = $('#top_menu a:contains("Expertise")'),
        linkExpPos = linkExp.offset(),
        linkExpAlign,
        linkServices = $('#top_menu a:contains("Services")'),
        linkServicesPos = linkServices.offset(),
        linkServicesAlign;
        if ( $(window).width() > 1200 ) {
            linkInfoAlign = linkInfoPos.left -($(window).width() - 1200)/2;
            linkExpAlign = linkExpPos.left -($(window).width() - 1200)/2;
            linkServicesAlign = linkServicesPos.left -($(window).width() - 1200)/2;
        } else {
            linkInfoAlign = linkInfoPos.left;
            linkExpAlign = linkExpPos.left;
            linkServicesAlign = linkServicesPos.left;
        }
    if ($(window).width() > 1200) {
        linkInfo.parent().find('.menu_dd').css({ 'width' : 1200 - linkInfoAlign +'px'});
        $('#menu_expertise').css({ 'left' : - linkExpAlign +'px'});
        $('#menu_services').css({ 'left' : - linkServicesAlign +'px'});
    };

    $('input[type="text"],input[type="email"],textarea').focus(function(){
        var placeholder = $(this).attr('placeholder');
        if(placeholder != ''){
            $(this).attr('save-placeholder',placeholder);
            $(this).attr('placeholder',"");
            $(this).addClass('write');
        }
    });

    $('input[type="text"],input[type="email"],textarea').blur(function(){

        if($(this).val()==''){
            $(this).attr('placeholder',$(this).attr('save-placeholder'));
            $(this).removeClass('write');
        }
    });

    $('ul.expertise-list li').bind('hover', function(){
        $(this).find('a:first').addClass('hover')
    });

    $('ul.expertise-list li').bind('click', function(){
        window.location.href = $(this).find('a.case-link').data('href');
    });

    $('ul.expertise-list li').bind('mouseleave', function(){
        $(this).find('a:first').removeClass('hover')
    });

    $('.company-tablet-accordion .accord-title').on('click', function(event) {
        event.preventDefault();
        var parentListItem = $(this).closest('li');
        $('.company-tablet-accordion').children('li').each(function(){
            $(this).removeClass('show-content');
        });
        parentListItem.addClass('show-content');
        var topMargin = parentListItem.offset().top - $('#top_menu').height();
        $('body,html').animate({ scrollTop: topMargin }, 500
        );
    });

});

$.fn.customFileInput = function(){
    //apply events and styles for file input element
    var fileInput = $(this)
        .addClass('customfile-input') //add class for CSS
        .mouseover(function(){ upload.addClass('customfile-hover'); })
        .mouseout(function(){ upload.removeClass('customfile-hover'); })
        .focus(function(){
            upload.addClass('customfile-focus');
            fileInput.data('val', fileInput.val());
        })
        .blur(function(){
            upload.removeClass('customfile-focus');
            $(this).trigger('checkChange');
        })
        .bind('disable',function(){
            fileInput.attr('disabled',true);
            upload.addClass('customfile-disabled');
        })
        .bind('enable',function(){
            fileInput.removeAttr('disabled');
            upload.removeClass('customfile-disabled');
        })
        .bind('checkChange', function(){
            if(fileInput.val() && fileInput.val() != fileInput.data('val')){
                fileInput.trigger('change');
            }
        })
        .bind('change',function(){
            //get file name
            var fileName = $(this).val().split(/\\/).pop();
            //get file extension
            var fileExt = 'customfile-ext-' + fileName.split('.').pop().toLowerCase();
            //update the feedback
            uploadFeedback
                .text(fileName) //set feedback text to filename
                .removeClass(uploadFeedback.data('fileExt') || '') //remove any existing file extension class
                .addClass(fileExt) //add file extension class
                .data('fileExt', fileExt) //store file extension for class removal on next change
                .addClass('customfile-feedback-populated'); //add class to show populated state
            //change text of button
            uploadButton.text('Change');
        })
        .click(function(){ //for IE and Opera, make sure change fires after choosing a file, using an async callback
            fileInput.data('val', fileInput.val());
            setTimeout(function(){
                fileInput.trigger('checkChange');
            },100);
        });

    //create custom control container
    var upload = $('<div class="customfile"></div>');
    //create custom control button
    var uploadButton = $('<span class="customfile-button" aria-hidden="true">Browse</span>').appendTo(upload);
    //create custom control feedback
    var uploadFeedback = $('<span class="customfile-feedback" aria-hidden="true">No file selected</span>').appendTo(upload);

    //match disabled state
    if(fileInput.is('[disabled]')){
        fileInput.trigger('disable');
    }

    //on mousemove, keep file input under the cursor to steal click
    upload
        .mousemove(function(e){
            fileInput.css({
                'right': 0, //position right side 20px right of cursor X)
                'top': 0
            });
        })
        .insertAfter(fileInput); //insert after the input

    fileInput.appendTo(upload);

    //return jQuery
    return $(this);
};

$(function(){
    $('#edit-submitted-file-upload').customFileInput();
});

$.fn.hasAttr = function(name) {
    return this.attr(name) !== undefined;
};

    (function () {
        var needFormInit = false;
        Drupal.behaviors.webform = {
            attach: function (context, settings) {
                var captcha = document.getElementsByClassName('g-recaptcha')[0];
                if (needFormInit === true && !captcha.childNodes.length) {
                    var siteKey = captcha.getAttribute('data-sitekey');
                    grecaptcha.render(captcha, {'sitekey': siteKey});
                }
                needFormInit = true;
            }
        };
    })();

})(jQuery, Drupal, this, this.document);
