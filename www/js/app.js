Portfolio.app=$.sammy(function(){
	this.loaderElement	= null;
	
	this.use('Template');

	this.swap = function(content,container,callback,params) {
		var context = this;
		$('.item').animate({ scale: '0'}, 100);
		$('body').addClass('preloading');

		container.fadeOut('slow', function() {
			container.html(content);

			$('.item').animate({ scale: '0'}, 0);

			container.fadeIn('slow');

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
		var filter = this.params['filter'];

		var getSectionContent = _.find(Portfolio.websiteData.sections, function(context){
			return context.title == filter;
		});

		console.log(getSectionContent);

		context.render('templates/content.template', {item:getSectionContent}).then(function(content){
			context.app.swap(content,$('#content'),Portfolio.app.apploaded);
		});

		$('#nav .selected-menu').removeClass('selected-menu');
		$('#nav .'+filter).addClass('selected-menu');
	});
});