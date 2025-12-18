// Mobile menu toggle function - uses setTimeout to sync with Bootstrap
function myFunction(element) {
    // Use setTimeout to check state after Bootstrap updates it
    setTimeout(function () {
        const button = element.closest('.navbar-toggler');
        const isCollapsed = button.classList.contains('collapsed');

        // If collapsed (menu closed), remove change (show hamburger)
        // If not collapsed (menu open), add change (show X)
        if (isCollapsed) {
            element.classList.remove('change');
        } else {
            element.classList.add('change');
        }
    }, 50);
}

$(document).ready(function () {
    // Sync hamburger animation with Bootstrap collapse state
    const mobileBar = document.querySelector('.mobile-bar');
    const navbarToggle = document.querySelector('#navbarTogglerDemo01');

    $('#navbarTogglerDemo01').on('show.bs.collapse', function () {
        if (mobileBar) {
            mobileBar.classList.add('change');
        }
    });

    $('#navbarTogglerDemo01').on('hide.bs.collapse', function () {
        if (mobileBar) {
            mobileBar.classList.remove('change');
        }
    });

    // Also handle button click to ensure sync
    $('.navbar-toggler').on('click', function () {
        setTimeout(function () {
            const isExpanded = $('.navbar-toggler').attr('aria-expanded') === 'true';
            if (isExpanded) {
                mobileBar.classList.add('change');
            } else {
                mobileBar.classList.remove('change');
            }
        }, 10);
    });

    $('.dropdown-menu a.dropdown-toggle')
        .on('click', function (e) {
            if (!$(this).next().hasClass('show')) {
                $(this)
                    .parents('.dropdown-menu')
                    .first()
                    .find('.show')
                    .removeClass("show");
            }
            var $subMenu = $(this).next(".dropdown-menu");
            $subMenu.toggleClass('show'); // appliqué au ul
            $(this)
                .parent()
                .toggleClass('show'); // appliqué au li parent

            $(this)
                .parents('li.nav-item.dropdown.show')
                .on('hidden.bs.dropdown', function (e) {
                    $('.dropdown-submenu .show').removeClass('show'); // appliqué au ul
                    $('.dropdown-submenu.show').removeClass('show'); // appliqué au li parent
                });
            return false;
        });



    var heroSwiper = new Swiper(".hero-slider", {
        loop: true,
        autoplay: {
            delay: 100000,
            disableOnInteraction: false,
        },
    });

    var swiper = new Swiper(".journal-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".journal-button-next",
            prevEl: ".journal-button-prev",
        },
        pagination: false,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
        },
    });

    var swiper = new Swiper(".concern-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".journal-button-next",
            prevEl: ".journal-button-prev",
        },
        pagination: false,
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
        },
    });



    var swiper = new Swiper(".mySwiper.trustees-slider", {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".trustees-button-next",
            prevEl: ".trustees-button-prev",
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });


    $(document).ready(function () {
        $('.counter-one').counterUp({
            delay: 100,
            time: 5000
        });
    });

    $(document).ready(function () {
        $('.counter-two').counterUp({
            delay: 100,
            time: 5000
        });
    });

    // Fixed navbar on scroll
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 150) {
            $('.navbar').addClass('navbar-fixed');
        } else {
            $('.navbar').removeClass('navbar-fixed');
        }
    });

    // Lazy loading for sections using Intersection Observer
    const lazySections = document.querySelectorAll('section:not(#hero)');

    // Add lazy-section class to all sections except hero
    lazySections.forEach(section => {
        section.classList.add('lazy-section');
    });

    // Intersection Observer options for sections
    const sectionObserverOptions = {
        root: null, // viewport
        rootMargin: '50px', // start loading 50px before section enters viewport
        threshold: 0.1 // trigger when 10% of section is visible
    };

    // Intersection Observer callback for sections
    const sectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('lazy-loaded');
                // Stop observing once loaded
                observer.unobserve(entry.target);
            }
        });
    };

    // Create and start observing sections
    const sectionObserver = new IntersectionObserver(sectionObserverCallback, sectionObserverOptions);

    lazySections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Lazy loading for images within sections (except hero)
    const lazyImages = document.querySelectorAll('section:not(#hero) img:not([loading="lazy"])');

    // Add native lazy loading to images that don't have it
    lazyImages.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // Active nav link based on current URL
    function setActiveNavLink() {
        // Get current page pathname
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';

        // Remove all active classes first
        $('.navbar-nav .nav-link').removeClass('active');

        // Find and activate matching nav link
        $('.navbar-nav .nav-link').each(function () {
            const linkHref = $(this).attr('href');

            // Skip dropdown toggles and empty links
            if (!linkHref || linkHref === '#' || $(this).hasClass('dropdown-toggle')) {
                return;
            }

            // Normalize paths for comparison
            const normalizedLink = linkHref.replace(/^\.\//, '').replace(/^\//, '');
            const normalizedCurrent = currentPage.replace(/^\.\//, '').replace(/^\//, '');

            // Check if current page matches the link
            if (normalizedCurrent === normalizedLink ||
                normalizedCurrent === '' && (normalizedLink === 'index.html' || normalizedLink === '')) {
                $(this).addClass('active');
                return false; // break loop
            }
        });

        // Check dropdown items and activate parent dropdown if match
        $('.dropdown-item').each(function () {
            const dropdownHref = $(this).attr('href');

            if (!dropdownHref || dropdownHref === '#') {
                return;
            }

            const normalizedDropdown = dropdownHref.replace(/^\.\//, '').replace(/^\//, '');
            const normalizedCurrent = currentPage.replace(/^\.\//, '').replace(/^\//, '');

            if (normalizedCurrent === normalizedDropdown) {
                // Activate the dropdown parent link
                const parentDropdown = $(this).closest('.dropdown');
                if (parentDropdown.length) {
                    parentDropdown.find('.nav-link.dropdown-toggle').addClass('active');
                }
                return false; // break loop
            }
        });

        // Special case for index.html or root
        if (currentPage === 'index.html' || currentPage === '' || currentPath === '/' || currentPath.endsWith('/')) {
            $('.navbar-nav .nav-link[href="index.html"], .navbar-nav .nav-link[href="/"], .navbar-nav .nav-link[href="./"], .navbar-nav .nav-link[href=""]').addClass('active');
        }
    }

    // Call on page load
    setActiveNavLink();
});


$('.video-btn').magnificPopup({
    type: 'iframe',
    iframe: {
        markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-i' +
            'frame" frameborder="0" allowfullscreen></iframe></div>',
        patterns: {
            youtube: {
                index: 'youtube.com/',
                id: 'v=',
                src: 'https://www.youtube.com/embed/%id%?autoplay=1'
            },
            vimeo: {
                index: 'vimeo.com/',
                id: '/',
                src: 'https://player.vimeo.com/video/%id%?autoplay=1'
            },
            gmaps: {
                index: '//maps.google.',
                src: '%id%&output=embed'
            }

            // you may add here more sources

        },

        srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
    }

});