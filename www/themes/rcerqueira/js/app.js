Portfolio.app=$.sammy(function(){
	this.loaderElement	= null;
	this.previouspage	= '';
	this.appisloaded    = false;
	this.resumeisopen   = false;
	
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

		$("title").html("Ricardo Cerqueira's Portfolio - " + filter);

		if(Portfolio.app.resumeisopen == true){
			Portfolio.app.resumeisopen = false;
			$(".resume-curtain").slideUp();
		}

		if(filter == Portfolio.app.previouspage){
			return;
		}

		Portfolio.app.previouspage = filter;

		var getSectionContent = _.find(Portfolio.websiteData.sections, function(context){
			return context.title == filter;
		});

		context.render('templates/content.template', {item:getSectionContent}).then(function(content){
			context.app.swap(content,$('#content'),Portfolio.app.apploaded);
		});

		$('#nav .selected-menu').removeClass('selected-menu');
		$('#nav .'+filter).addClass('selected-menu');

		$(".resumebutton").attr("href","#/"+filter+"/resume");
		$("#resume .close-button").attr("href","#/"+filter);
	});

	this.get('#/:filter/resume', function(context){
		if(Portfolio.app.appisloaded == false){
			Portfolio.app.appisloaded = true;

			var filter = this.params['filter'];

			$("title").html("Ricardo Cerqueira's Portfolio - Résumé");

			var getSectionContent = _.find(Portfolio.websiteData.sections, function(context){
				return context.title == filter;
			});

			context.render('templates/content.template', {item:getSectionContent}).then(function(content){
				context.app.swap(content,$('#content'),Portfolio.app.apploaded);
			});

			$('#nav .selected-menu').removeClass('selected-menu');
			$('#nav .'+filter).addClass('selected-menu');
			
			$(".contactButton").attr("href","#/"+filter+"/contactme");
			$("#resume .close-button").attr("href","#/"+filter);
		}

		TweenLite.to(window, 2, {scrollTo:{y:0, x:0}, ease:Power4.easeOut})

		$(".resume-curtain").slideDown();
		Portfolio.app.resumeisopen = true;
	});
});