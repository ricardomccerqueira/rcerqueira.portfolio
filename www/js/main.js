var Portfolio={
	websiteData:{
		sections:[
			{
				id:1,
				title:'websites',
				articles:[
					{
						id:1,
						title:'Aveleda',
						image:'websites/aveleda.png',
						description:'',
						keywords:'HTML5, js, css3',
						url:'http://www.aveleda.pt'
					},
					{
						id:2,
						title:'PromoFans',
						image:'websites/promofans.png',
						description:'',
						keywords:'HTML5, js, css3, less',
						url:'http://www.promofans.pt'
					},
					{
						id:3,
						title:'Str8 Portugal',
						image:'websites/str8.png',
						description:'',
						keywords:'HTML5, js, css3, less',
						url:'http://www.str8-pt.com/'
					},
					{
						id:4,
						title:'BU Portugal',
						image:'websites/bu.png',
						description:'',
						keywords:'HTML5, js, css3, parallax',
						url:'http://bu-pt.com/'
					},
					{
						id:5,
						title:'Consumos Frota',
						image:'websites/consumosfrota.png',
						description:'',
						keywords:'HTML5, js, css3',
						url:'http://www.consumosfrota.com/'
					},
					{
						id:6,
						title:'Parques de Sintra - Homepage',
						image:'websites/psml.png',
						description:'',
						keywords:'HTML5, js, css3, less',
						url:'http://www.parquesdesintra.pt/'
					},
					{
						id:7,
						title:'Estrelas e Ouriços',
						image:'websites/estrelas.png',
						description:'',
						keywords:'HTML, css',
						url:'http://estrelaseouricos.familia.sapo.pt/'
					},
					{
						id:8,
						title:'Nunes Correa',
						image:'websites/nunescorrea.png',
						description:'',
						keywords:'HTML, css',
						url:'http://www.nunescorrea.com/'
					},
					{
						id:9,
						title:'Txiling Moçambique',
						image:'websites/sapotxilling.png',
						description:'',
						keywords:'HTML, css',
						url:'http://txiling.sapo.mz/'
					},
					{
						id:10,
						title:'De Cão para Cão - tamagochi',
						image:'websites/decaoparacao.png',
						description:'',
						keywords:'flash, as3, 3d DAE',
						url:'http://www.decaoparacao.com/'
					}
				]
			},
			{
				id:2,
				title:'applications',
				articles:[
					{
						id:1,
						title:'Sally Hansen - New Products',
						image:'',
						description:'',
						keywords:'HTML5, js, css3',
						url:'https://www.facebook.com/sallyhansenportugal/app_537952529553764'
					},
					{
						id:2,
						title:'Sally Hansen - You And Sally',
						image:'',
						description:'',
						keywords:'HTML5, js, css3',
						url:'https://www.facebook.com/sallyhansenportugal/app_500581289967114'
					},
					{
						id:3,
						title:'Nunes Correa Loja Online',
						image:'',
						description:'',
						keywords:'HTML5, js, css3',
						url:'https://www.facebook.com/nunescorrea/app_288167261299097?ref=ts'
					},
					{
						id:4,
						title:'Holon - Pela Sua Saúde',
						image:'',
						description:'',
						keywords:'HTML, js, css, php',
						url:'https://www.facebook.com/grupoholonpt/app_270474949683215'
					},
					{
						id:5,
						title:'Holon - Produtos Holon',
						image:'',
						description:'',
						keywords:'HTML, js, css, php',
						url:'https://www.facebook.com/grupoholonpt/app_318275281539264'
					},
					{
						id:6,
						title:'Holon - Quem Somos',
						image:'',
						description:'',
						keywords:'HTML, js, css, php',
						url:'https://www.facebook.com/grupoholonpt/app_102195923234549'
					},
					{
						id:7,
						title:'Facebook application template',
						image:'',
						description:'',
						keywords:'HTML5, js, css, sammyJs, gitHub',
						url:'https://github.com/ricardomccerqueira/facebook-singlepageapp'
					},
					{
						id:8,
						title:'Millenium Go Festivais',
						image:'',
						description:'',
						keywords:'HTML, js, css, php',
						url:'https://www.facebook.com/millenniumgo/app_459727847372815'
					},
					{
						id:9,
						title:'Continente - Chef Online',
						image:'',
						description:'',
						keywords:'flash, as3, interactive display',
						url:'offline'
					},
					{
						id:10,
						title:'Massimo Dutti',
						image:'',
						description:'',
						keywords:'flash, as3, interactive display, webcam',
						url:'offline'
					},
					{
						id:11,
						title:'Millenium Go CoverPhoto',
						image:'',
						description:'',
						keywords:'flash, as3',
						url:'offline'
					}
				]
			},
			{
				id:3,
				title:'games',
				articles:[
					{
						id:1,
						title:'Chipicao - streetfighter',
						image:'',
						description:'',
						keywords:'flash, as3',
						url:'offline'
					},
					{
						id:2,
						title:'Chipicao - chipiskater',
						image:'',
						description:'',
						keywords:'flash, as3',
						url:'offline'
					},
					{
						id:3,
						title:'Chipicao - chipijumper',
						image:'',
						description:'',
						keywords:'flash, as3',
						url:'offline'
					},
					{
						id:4,
						title:'Chipicao - tazos 3D',
						image:'',
						description:'',
						keywords:'flash, as3, 3d DAE',
						url:'offline'
					},
					{
						id:5,
						title:'Chipicao - tazos 2D',
						image:'',
						description:'',
						keywords:'flash, as2',
						url:'offline'
					},
					{
						id:6,
						title:'M&Ms Catch The Peanut',
						image:'',
						description:'',
						keywords:'flash, as3, 3d DAE',
						url:'offline'
					},
					{
						id:7,
						title:'M&Ms Mug Run',
						image:'',
						description:'',
						keywords:'flash, as3, 3d DAE',
						url:'offline'
					},
					{
						id:8,
						title:'M&Ms bejewled',
						image:'',
						description:'',
						keywords:'flash, as3',
						url:'offline'
					},
					{
						id:9,
						title:'M&Ms PuzzleBubble',
						image:'',
						description:'',
						keywords:'flash, as3',
						url:'offline'
					}
				]
			}
		]
	},

	init:function(){
		$('#main-wraper').css('display','none');
		Portfolio.app.run('#/websites');
	}
};