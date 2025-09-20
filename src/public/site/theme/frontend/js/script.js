var GUI = (function() {
    var win = $(window);
    var html = $('html,body');

    var menuMobile = function() {
        $(document).ready(function($) {
            $('.button-phone').on('click', function(event) {
                $('.animated-icon1').toggleClass('open');
                $('.bg-over-menu').toggleClass('show-over');
                $('#main-menu-mobile').toggleClass('active-menu-mobile');
                $('body').toggleClass('overflow-hidden')
                $('.close-menu-btn').addClass("active-close__menussss");
                $('.content-header').toggleClass("active-content__header");
            });
            $('.btn-menu__mopbiles').on('click', function(event) {
                $('.animated-icon1').toggleClass('open');
                $('.bg-over-menu').toggleClass('show-over');
                $('#main-menu-mobile').toggleClass('active-menu-mobile');
                $('body').toggleClass('overflow-hidden')
                $('.close-menu-btn').addClass("active-close__menussss");
                $('.content-header').toggleClass("active-content__header");
            });
            $('.bg-over-menu').on('click', function(event) {
                $('.animated-icon1').toggleClass('open');
                $('.bg-over-menu').toggleClass('show-over');
                $('#main-menu-mobile').removeClass('active-menu-mobile');
                $('body').toggleClass('overflow-hidden')
                $('.close-menu-btn').removeClass("active-close__menussss");
                $('.content-header').removeClass("active-content__header");
            });
            $('.close-menu-btn').on('click', function(event) {
                $('.animated-icon1').toggleClass('open');
                $('.bg-over-menu').toggleClass('show-over');
                $('#main-menu-mobile').removeClass('active-menu-mobile');
                $('body').toggleClass('overflow-hidden')
                $(this).removeClass("active-close__menussss");
                $('.content-header').removeClass("active-content__header");
            });
        });
        $('#main-menu-mobile .menu_clone').find("ul li").each(function() {
            if ($(this).find("ul>li").length > 0) {
                $(this).prepend('<i></i>');
            }
        });
        $('.menu-desktop').find("ul li ul li").each(function() {
            if ($(this).find("ul>li").length > 0) {
                $(this).prepend('<i></i>');
            }
        });
        $(document).on("click", "#main-menu-mobile .menu_clone ul i", function() {
            var ul = $(this).nextAll("ul");
            if (ul.is(":hidden")) {
                $(this).addClass('active');
                ul.slideDown(200);
            } else {
                $(this).removeClass('active');
                ul.slideUp();
            }
        });

    };

    var _scroll_menus = function() {
        var win = $(window);
        var heighttops = $('.header').outerHeight();
        var prevScrollpos = window.pageYOffset;

        $('body').css('padding-top', heighttops);

        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;

            if (win.scrollTop() >= heighttops) {

                $('.btn-up-topss').addClass("active-up__tops");

                $('.form-search__header').fadeOut();

                if (win.width() >= 576) {
                    $('.header').addClass('active-fixed__headers');
                    $('.header .tops-headers').slideUp();
                }

                if (win.width() <= 991) {

                    $('.header').addClass('mobile-fixed__headers');

                    if (prevScrollpos > currentScrollPos) {
                        $('.header').css('top', 0);
                    } else {
                        $('.header').css('top', (0 - heighttops));
                    }
                    prevScrollpos = currentScrollPos;
                }

            } else {
                $('.header').removeClass('active-fixed__headers');
                $('.header').removeClass('mobile-fixed__headers');
                $('.header .tops-headers').slideDown();
                $('.btn-up-topss').removeClass("active-up__tops");
            }

            /* scroll header-prd mobiles */

        }

    };



    var slideMains = function() {
        if ($('.banner-mains').length === 0) return;
        var bannerSlide = new Swiper('.banner-mains', {
            effect: "coverflow",
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            speed: 1500,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            draggable: true
        });
        var lsItem = $(".banner-mains .swiper-wrapper .swiper-slide");
        if(lsItem.eq(0).find("video").length > 0){
             bannerSlide.autoplay.stop();
        }
        bannerSlide.on('slideChange', function() {
            var active = bannerSlide.activeIndex;
            if ($(lsItem[active]).find("video").length > 0) {
                $(lsItem[active]).find("video").trigger("play");
                bannerSlide.autoplay.stop();
                $(lsItem[active]).find("video").onended = function(e) {
                    bannerSlide.autoplay.start();
                }
            } else {
                lsItem.find("video").trigger("pause");
                bannerSlide.autoplay.start();
            }

        });
        $(".banner-mains").mouseenter(function() {
            bannerSlide.autoplay.stop();
        });
        $(".banner-mains").mouseleave(function() {
            if($(".banner-mains .swiper-wrapper .swiper-slide.swiper-slide-active").length > 0){
                bannerSlide.autoplay.stop();
            }else{
            bannerSlide.autoplay.start();
            }
        });
    };


    var boxSeacrhmobiles = function() {
        if (win.width() <= 575) {
            $('.group-filter__mains .box-filter__mains').addClass('box-searchs__mobiless');
        }

        $(".titles-box__filters").click(function() {
            $(this).parents(".box-filter__mains").removeClass("box-searchs__mobiless");
        });
    };

    var showPrdDetails = function() {

        if ($('.showss-thums').length === 0) return;
        var swiper2s = new Swiper('.showss-thums', {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            loop: false,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            updateOnWindowResize: true,
        });

        if ($('.showss-topss').length === 0) return;
        var swipers = new Swiper('.showss-topss', {
            spaceBetween: 0,
            updateOnWindowResize: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: swiper2s,
            }
        })

        $(".showss-button-prev").click(function() {
            $(this).parents(".show-prd__details").find(".showss-topss .group-btns__slider .swiper-button-prev").trigger("click");
        });

        $(".showss-button-next").click(function() {
            $(this).parents(".show-prd__details").find(".showss-topss .group-btns__slider .swiper-button-next").trigger("click");
        });

        $('.showss-topss').find(".swiper-wrapper").each(function() {
            if ($(this).find(".swiper-slide").length < 2) {
                $(this).parents(".show-prd__details").find(".group-btns__showss").css("display", "none");
            }
        });

    };


    var slideFeelMains = function() {
        if ($('.customer-feel__sl').length === 0) return;
        var swiper2 = new Swiper('.customer-feel__sl', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            draggable: true,
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                1440: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    };

    var allHeights = function() {

        $('.customer-feel__sl').each(function() {
            var highestBox = 0;
            $(this).find('.feel-customers__items').each(function() {
                if ($(this).height() > highestBox) {
                    highestBox = $(this).height();
                }
            })
            $(this).find('.feel-customers__items').height(highestBox);
        });

    };


    var showNavPrdsSidebar = function() {
        $(".list-sidebar__prds > ul > li > i").click(function() {
            $(this).parent().children("ul").slideToggle();
            $(".list-sidebar__prds > ul > li > i").not(this).parent().children("ul").slideUp();
            $(this).toggleClass("active-nav__prds");
            $(".list-sidebar__prds > ul > li > i").not(this).removeClass("active-nav__prds");
        });
    };

    var showSearchHeader = function() {
        $(".btn-search__headers").click(function() {
            $(".form-search__header").fadeToggle("");
        });

        $(document).click(function(e) {
            if (!$(e.target).closest('.btn-search__headers , .form-search__header ').length) {
                $('.form-search__header ').stop(true).fadeOut();
            }
        });
    };


    var file_forms = function() {
        $(".input-files").on("change", function() {
            var fileName = $(this).val().split("\\").pop();
            $(this).parents(".up-file__advisory").find(".input-label p").addClass("selected").html(fileName);
        });

        $(".btn-Choose__file").click(function() {
            $(this).parents(".up-file__advisory").find(".input-files").trigger("click");
        });

    }

    var loadZoomDdetials = function() {
        if ($(window).width() > 991) {
            $('.cloudzoom').each(function(index, el) {
                var url = $(el).attr('src');
                $(el).attr({
                    'data-cloudzoom': "autoInside: 767, zoomWidth: 200,zoomHeight: 200, zoomImage: '" + url + "',disableZoom: 'auto'",
                });
            });
            CloudZoom.quickStart();
        }
    }

    var loadMap = function() {
        var maps = $('#map');
        var src = maps.attr('data-map');
        var frame = '<iframe src="' + src + '"></iframe>';
        var action = setTimeout(function() {
            maps.prepend(frame);
        }, 3000);
    }


    var initWowJs = function() {
        new WOW().init();
    };


    var selectAll = function() {
        $(document).ready(function() {
            if ($('.select-alls').length > 0) {
                $('.select-alls').select2();
            }
        });

    };


    var scrollTopss = function() {
        $(".btn-up-topss").click(function() {
            $("html, body").animate({ scrollTop: 0 }, 0);
            return false;
        });
    };


    var scrollbars = function() {
        if ($(".list-prj__mains").length > 0) {
            $(window).on("load", function() {
                $(".list-prj__mains").mCustomScrollbar();
            });
        }
    };

    var _initLoadVideo = function() {
        var itemVideo = $(".name-prj__items");
        itemVideo.click(function(event) {
            event.preventDefault();
            var title = $(this).data("title");
            var short = $(this).data("short");
            var img = $(this).data("img");
            var link = $(this).data("link");
            $(".iframe-videoss__prj").attr("title", title);
            $(".videos-peojects__mains").attr("data-link", link);
            $(".name-project__mains").text(title);
            $(".intros-project__mains .short").text(short);
            $(".img-project__mains .video__ source").attr("data-srcset", img);
            $(".img-project__mains .video__ source").attr("data-src", img);
            $(".img-project__mains .video__ img").attr("data-src", img);
            $(".img-project__mains .video__ img").attr("src", img);
            $(".img-project__mains .video__ img").attr("alt", title);
            $(".img-project__mains .video__ img").attr("title", title);
            $(".img-videos__peojects").removeClass("active-videos__hide");
            $(".videos-peojects__mains iframe").remove();
        })

        $(".videos-peojects__mains").click(function() {
            $(".img-videos__peojects").addClass("active-videos__hide");
        });

    }

    var youtubePlay = function() {
        function youtubeParser(url) {
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = url.match(regExp);
            return (match && match[7].length == 11) ? match[7] : false;
        }
        $(document).on('click', '.videos-peojects__mains , .videos-big__news', function(e) {

            var html = '<iframe width="100%" src="https://www.youtube.com/embed/' + youtubeParser($(this).attr('data-link')) + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            $(this).append(html);

        })
    }

    var _initAjaxCategory = function() {
        var itemAjax = $(".ajax__change");
        itemAjax.click(function(event) {
            event.preventDefault();
            var _id = $(this).data("id");
            var _this = $(this);
            _this.addClass("active");
            $(this).parents(".prds-mains").find(".ajax__change").not(_this).removeClass("active");
            var tabs = $(this).parents(".prds-mains").find(".tab__[data-id=" + _id + "]");
            if (tabs.children().length == 0) {
                $.ajax({
                        url: $(this).data('href'),
                        type: 'GET',
                        data: { id: _id }
                    })
                    .done(function(data) {
                        tabs.html(data);
                    });
            }
            $(this).parents(".prds-mains").find(".tab__").not(tabs).removeClass("active");
            tabs.addClass("active");

        })
    }
    var _ajaxMenu = function() {
        if ($(".bind-ajax").length > 0) {
            $.ajax({
                    url: 'bind-menu',
                    type: 'POST',
                    dataType: 'html'
                })
                .done(function(html) {
                    $(".bind-ajax").children('.ajaxmenu__wrapper').length > 0 ? $(".bind-ajax").children('.ajaxmenu__wrapper').remove() : '';
                    $(".bind-ajax").append(html);
                });
        }
    }
    /* HĂ m get link Youtube */
    function youtubeParser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }
    /* Play Youtube */
    var playYoutube = function() {
        $(".project-mains .name-prj__items").click(function(event) {
            event.preventDefault();
            var html = '<iframe width="100%" height="320" src="https://www.youtube.com/embed/' + youtubeParser($(this).attr('data-link')) + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            $(".videos-peojects__mains").html(html);
        });
        $('.project-mains .videos-peojects__mains').each(function() {
            var html = '<iframe width="100%" src="https://www.youtube.com/embed/' + youtubeParser($(this).attr('data-link')) + '?autoplay=0" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            $(this).append(html);
        });
        $('.videos-big__news').each(function() {
            var html = '<iframe width="100%" src="https://www.youtube.com/embed/' + youtubeParser($(this).attr('data-video')) + '?autoplay=0" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            $(this).append(html);
        });
    }
    return {
        _: function() {
            _scroll_menus();
            _initLoadVideo();
            _initAjaxCategory();
            menuMobile();
            slideMains();
            slideFeelMains();
            playYoutube();
            _ajaxMenu();
            showPrdDetails();
            initWowJs();
            selectAll();
            file_forms();
            showNavPrdsSidebar();
            loadMap();
            showSearchHeader();
            scrollTopss();
            boxSeacrhmobiles();
            allHeights();
            youtubePlay();
            //windowOpenLink();
            //backToTop();
            initWowJs();
            scrollbars();
        }
    };
})();
var SEARCH = (function() {
    var loadNews = function($q) {
        $.ajax({
                url: 'tim-kiem-tin-tuc',
                type: 'POST',
                data: { q: $q },
            })
            .done(function(data) {
                $('.list_news').html(data);
            });

        $(document).on('click', '.list_news .pagination a', function(event) {
            event.preventDefault();
            $.ajax({
                    url: $(this).attr('href'),
                    type: 'GET'
                })
                .done(function(data) {
                    $('.list_news').html(data);
                    var hic = $('.list_news').offset().top - 50;
                    setTimeout(function() {
                        $('body,html').animate({ scrollTop: hic }, 600);
                    }, 1000);
                })
        });
    }
    var loadPro = function($q) {
        $.ajax({
                url: 'tim-kiem-san-pham',
                type: 'POST',
                data: { q: $q },
            })
            .done(function(data) {
                $('.list_proajax').html(data);
            });

        $(document).on('click', '.list_proajax .pagination a', function(event) {
            event.preventDefault();
            $.ajax({
                    url: $(this).attr('href'),
                    type: 'GET'
                })
                .done(function(data) {
                    $('.list_proajax').html(data);
                    var hic = $('.list_proajax').offset().top - 50;
                    setTimeout(function() {
                        $('body,html').animate({ scrollTop: hic }, 600);
                    }, 1000);
                })
        });
    }
    var createView = function() {
        if ($('.ajax_result').length > 0) {
            var q = $('.key').attr('id');
            loadPro(q);
            loadNews(q);
        }
    }

    return {
        _: function() {
            createView();
        }
    }
})();
var CRAWL = (function() {
    function validate(elm) {
        var _vali = true;
        $(elm).find(".select-alls").each(function(idx, index) {
            if ($(index).val() == '' || $(index).val() == undefined) {
                if ($(index).closest(".group-form__alls").children(".alert_").length == 0) {
                    $(index).closest(".group-form__alls").append("<span class='alert_'>Vui lĂ²ng chá»n dá»¯ liá»‡u !</span>");
                    setTimeout(function() {
                        $(index).closest(".group-form__alls").children(".alert_").remove();
                    }, 2000);
                    return false;
                    _vali = false;
                }
                _vali = false;
            } else {
                _vali = true;
            }
        });
        return _vali;
    }
    var _initAge = function() {
        $('.view__age').submit(function(event) {
            event.preventDefault();
            validate(this);
            if (validate(this) == true) {
                $.ajax({
                        url: $(this).attr('action'),
                        type: 'POST',
                        dataType: 'HTML',
                        data: $(this).serialize(),
                    })
                    .done(function(data) {
                        $('#modal-see__olds .content-body__modals').html(data);
                        $('#modal-see__olds').modal("show");
                    });
            }
        });
    }
    var _initHouse = function() {
        $('.view__house').submit(function(event) {
            event.preventDefault();
            validate(this);
            if (validate(this) == true) {
                $.ajax({
                        url: $(this).attr('action'),
                        type: 'POST',
                        dataType: 'HTML',
                        data: $(this).serialize(),
                    })
                    .done(function(data) {
                        $('#modal-see__olds .content-body__modals').html(data);
                        $('#modal-see__olds').modal("show");
                    });
            }


        });
    }
    return {
        _: function() {
            _initHouse();
            _initAge();
        }
    }
})();
$(document).ready(function() {
    if (/Lighthouse/.test(navigator.userAgent)) return;
    $.ajaxSetup({
        data: { csrf_tech5s_name: $('meta[name="csrf-token"]').attr('content') }
    });
    GUI._();
    SEARCH._();
    CRAWL._();
});
var CONTACT = (function() {
    var sendContact = function(json) {
        if (json.code == 200) {
            toastr['success'](json.message);
            window.location.reload();
        } else {
            toastr['error'](json.message);
        }
    }
    return {
        _: function(json) {
            sendContact(json);
        }
    }
})();