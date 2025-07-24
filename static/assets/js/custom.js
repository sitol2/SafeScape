$(document).ready(function(){
	"use strict";
    
        /*==================================
* Author        : "ThemeSine"
* Template Name : CarVilla HTML Template
* Version       : 1.0
==================================== */




/*=========== TABLE OF CONTENTS ===========
1. Scroll To Top
2. welcome animation support
3. owl carousel
======================================*/

    // 1. Scroll To Top 
		$(window).on('scroll',function () {
			if ($(this).scrollTop() > 300) {
				$('.return-to-top').fadeIn();
			} else {
				$('.return-to-top').fadeOut();
			}
		});
		$('.return-to-top').on('click',function(){
				$('html, body').animate({
				scrollTop: 0
			}, 1500);
			return false;
		});

	// 2. welcome animation support

        $(window).load(function(){
        	$(".welcome-hero-txt h2,.welcome-hero-txt p").removeClass("animated fadeInUp").css({'opacity':'0'});
            $(".welcome-hero-txt button").removeClass("animated fadeInDown").css({'opacity':'0'});
        });

        $(window).load(function(){
        	$(".welcome-hero-txt h2,.welcome-hero-txt p").addClass("animated fadeInUp").css({'opacity':'0'});
            $(".welcome-hero-txt button").addClass("animated fadeInDown").css({'opacity':'0'});
        });

	
	// 3. owl carousel

		// i.  new-cars-carousel
		
			$("#new-cars-carousel").owlCarousel({
				items: 1,
				autoplay:true,
				loop: true,
				dots:true,
				mouseDrag:true,
				nav:false,
				smartSpeed:1000,
				transitionStyle:"fade",
				animateIn: 'fadeIn',
				animateOut: 'fadeOutLeft'
				// navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
			});


		// ii. .testimonial-carousel
	
		
			var owl=$('.testimonial-carousel');
			owl.owlCarousel({
				items:3,
				margin:0,
				
				loop:true,
				autoplay:true,
				smartSpeed:1000,
				
				//nav:false,
				//navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
				
				dots:false,
				autoplayHoverPause:false,
			
				responsiveClass:true,
					responsive:{
						0:{
							items:1
						},
						640:{
							items:2
						},
						992:{
							items:3
						}
					}
				
				
			});

		// iii. .brand-item (carousel)
		
			$('.brand-item').owlCarousel({
				items:6,
				loop:true,
				smartSpeed: 1000,
				autoplay:true,
				dots:false,
				autoplayHoverPause:false,
				responsive:{
						0:{
							items:2
						},
						415:{
							items:2
						},
						600:{
							items:3
						},
						1000:{
							items:6
						}
					}
				});
				
				
				$('.play').on('click',function(){
					owl.trigger('play.owl.autoplay',[1000])
				})
				$('.stop').on('click',function(){
					owl.trigger('stop.owl.autoplay')
				})

});

// Open the specific modal
function openModal(modalId) {
	var modal = document.getElementById(modalId);
	modal.style.display = "block";
  }
  
  // Close the specific modal
  function closeModal(modalId) {
	var modal = document.getElementById(modalId);
	modal.style.display = "none";
  }
  
  // Close the modal if the user clicks outside of the modal content
  window.onclick = function(event) {
	var modals = document.querySelectorAll('.modal');
	modals.forEach(function(modal) {
	  if (event.target == modal) {
		closeModal(modal.id);
	  }
	});
  }
  
  function openModal(id) {
	document.getElementById(id).style.display = "block";
  }
  
  function closeModal(id) {
	document.getElementById(id).style.display = "none";
  }
  
  // Optional: close when clicking outside
  window.onclick = function(event) {
	const modal = document.getElementById('infoModal');
	if (event.target === modal) {
	  modal.style.display = "none";
	}
  }

  // Close any modal when clicking outside the modal content
  window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

    // Close any modal when clicking outside the modal content
  window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.custom-modal');
    modals.forEach(function(modal) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  const slides = document.querySelectorAll('.hero-slideshow .slide');
  let currentSlide = 0;

  function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  setInterval(showNextSlide, 4000); // Change image every 4 seconds

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".hero-slideshow .slide");
    const nextBtn = document.querySelector(".arrow.right");
    const prevBtn = document.querySelector(".arrow.left");

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
          slide.classList.add("active");
        }
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    nextBtn.addEventListener("click", () => {
      nextSlide();
      restartAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      restartAutoSlide();
    });

    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 5000); // every 5 seconds
    }

    function restartAutoSlide() {
      clearInterval(slideInterval);
      startAutoSlide();
    }

    startAutoSlide();
  });