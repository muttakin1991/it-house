// Carousel Plugin
(function ($) {
 
    $.fn.carousel = function(options) {
        var settings = $.extend({
            // default settings
   			carouselWrap: ".carousel-wrap", //contains all the carousel elements
            carousel: ".carousel", //carousel element
            slide: ".carousel-slide", //slide element
            thumbCon: ".carousel-thumbs", // thumbnail control container
            thumb: ".carousel-thumb-item", //thumbnail control element
            startingSlide: 0,
            speed: 500, //speed moving to next slide
            duration: 5000, //time between slide moves
            auto: false, //autorotate
            pauseOnHover: true //pause if user's mouse enters carouselWrap area
        }, options );

        var slideWidth = $(settings.slide).width(),
        	slideCount = $(settings.slide).length,
        	carWidth = slideWidth*slideCount,
        	nIntervId, //set this variable outside scope of startCarousel()
        	currentSlide = settings.startingSlide;


        //width of carousel will be width of slides times the number of slides
        $(settings.carousel).css("width",carWidth);

        var moveSlide = function(num){
        	//need to store current slide
        	currentSlide = num;
        	var pos = (slideWidth*num);
        	$(settings.carousel).animate({"left": -pos+"px"}, settings.speed);
        	// add class to thumb with correct number. Remove from siblings
        	$(settings.thumb+"[data-number="+num+"]").addClass("carousel-thumb-active").siblings().removeClass("carousel-thumb-active");
        }

        var startCarousel = function(){
        	//only run if auto is set to true
	        if(settings.auto === true){
	        	var durationNum;
		        nIntervId = setInterval(function () {
		        	//if durationNum is undefined, it hasn't been assigned a slide number yet so set to current slide
		        	if(typeof durationNum == 'undefined'){
		        		durationNum = currentSlide;
		        	}
		        	//subtract slideCount and startingSlide by 1 because you're not counting the first slide
		        	if(durationNum == slideCount-1){
		        		durationNum = settings.startingSlide-1;
		        	}
		        	//increase number by one to move to next slide
		        	durationNum++;
		        	moveSlide(durationNum);
		        }, settings.duration);
	        }
        }

        // Put index data attributes on slides
        $(settings.slide).each(function(i){
    		var num = i;
    		$(this).attr("data-number",num);
    	})

        // Build thumbnails
        $(settings.slide).each(function(i){
        	var cImgSrc = $(this).find("img").attr("src"),
        		cImgAlt = $(this).attr("alt");
        	$(settings.thumbCon).append("<div class='"+settings.thumb.replace(".","")+"' data-number='"+i+"'><img class='carousel-thumb' src='"+cImgSrc+"' alt='"+cImgAlt+"'/><div class='carousel-thumb-over'></div></div>");
        });

        //Add class to last and first thumb
        $(settings.thumb).first().addClass("carousel-thumb-first");
        $(settings.thumb).last().addClass("carousel-thumb-last");

        // Controls thumbnail clicks
        $(settings.thumb).click(function(){
        	var num = $(this).data("number");
        	moveSlide(num);
        });

        // First move to set starting slide
       	moveSlide(settings.startingSlide);
    	startCarousel();

    	// Controls pause on hover
        if(settings.pauseOnHover){
	        $(settings.carouselWrap).mouseover(function() {
	        	clearInterval(nIntervId);
	        }).mouseout(function() {
	        	startCarousel();
	        });
	    }

        return this;
    };
 
}(jQuery));