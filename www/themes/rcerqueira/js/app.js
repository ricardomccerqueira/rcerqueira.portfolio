Portfolio.app=$.sammy(function(){
	this.loaderElement	= null;
	this.appisloaded = false;
	
	this.use('Template');

	this.swap = function(content,container,callback,params) {
		var context = this;
		$('.item').animate({ scale: '0'}, 200);
		$('body').addClass('preloading');

		container.fadeOut('slow', function() {
			container.html(content);

			$('.item').animate({ scale: '0'}, 0);

			container.fadeIn('fast');

			if(callback){
				if(params){
					callback(params);
				}else{
					callback();
				}
			}
		});
	};

	this.masonry = function(){
		$('.sectionsHolder').masonry({
				itemSelector:	'.item',
				columnWidth:	300,
				gutterWidth:	0
		});
	
		setTimeout(function(){
			$('.sectionsHolder').masonry({
					itemSelector:	'.item',
					columnWidth:	300,
					gutterWidth:	0
			});

			setTimeout(function(){
				$('.item').animate({ scale: '1'}, 100);
				$('body').removeClass('preloading');
			},500);
		},300);
	};

	this.apploaded = function(){
		Portfolio.app.masonry();

		setTimeout(function(){
			$('#main-wraper').fadeIn('fast',function(){
				$('#main-wraper').addClass('anim');
			});
		},100);
	},

	
	this.get('#/:filter', function(context){
		Portfolio.app.appisloaded = true;
		var filter = this.params['filter'];

		var getSectionContent = _.find(Portfolio.websiteData.sections, function(context){
			return context.title == filter;
		});

		context.render('templates/content.template', {item:getSectionContent}).then(function(content){
			context.app.swap(content,$('#content'),Portfolio.app.apploaded);
		});

		$('#nav .selected-menu').removeClass('selected-menu');
		$('#nav .'+filter).addClass('selected-menu');

		$(".contactButton").attr("href","#/"+filter+"/contactme");

		$('#contactFormHolder').fadeOut("fast");
	});

	this.get('#/:filter/contactme', function(context){
		if(Portfolio.app.appisloaded == false){
			Portfolio.app.appisloaded = true;

			var filter = this.params['filter'];

			var getSectionContent = _.find(Portfolio.websiteData.sections, function(context){
				return context.title == filter;
			});

			context.render('templates/content.template', {item:getSectionContent}).then(function(content){
				context.app.swap(content,$('#content'),Portfolio.app.apploaded);
			});

			$('#nav .selected-menu').removeClass('selected-menu');
			$('#nav .'+filter).addClass('selected-menu');
			
			$(".contactButton").attr("href","#/"+filter+"/contactme");
		}

		var scrollYPos = $('#contactFormHolder').offset().top;
		TweenLite.to(window, 2, {scrollTo:{y:scrollYPos, x:0}, ease:Power4.easeOut})

		setTimeout(function(){
			$('#contactFormHolder').fadeIn("slow",function(){
				var scrollYPos = $('#contactFormHolder').offset().top;
				TweenLite.to(window, 2, {scrollTo:{y:scrollYPos, x:0}, ease:Power4.easeOut})			
			});
		},1000);

		var controller 		= $.superscrollorama();
		var scrollDuration  = 600; 

		controller.addTween('#contactFormHolder', TweenMax.from( $('#contactFormHolder'), 2, {css:{opacity: 0}}), scrollDuration);
//      controller.addTween('#fade-it', TweenMax.from( $('#fade-it'), .5, {css:{opacity: 0}}), scrollDuration);
  //    controller.addTween('#fly-it', TweenMax.from( $('#fly-it'), .25, {css:{right:'1000px'}, ease:Quad.easeInOut}), scrollDuration);
    //  controller.addTween('#spin-it', TweenMax.from( $('#spin-it'), .25, {css:{opacity:0, rotation: 720}, ease:Quad.easeOut}), scrollDuration);
    //  controller.addTween('#scale-it', TweenMax.fromTo( $('#scale-it'), .25, {css:{opacity:0, fontSize:'20px'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, fontSize:'240px'}, ease:Quad.easeInOut}), scrollDuration);
    //  controller.addTween('#smush-it', TweenMax.fromTo( $('#smush-it'), .25, {css:{opacity:0, 'letter-spacing':'30px'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, 'letter-spacing':'-10px'}, ease:Quad.easeInOut}), scrollDuration); // 100 px offset for better timing

	});
});