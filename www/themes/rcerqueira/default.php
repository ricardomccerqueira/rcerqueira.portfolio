<?php defined('C5_EXECUTE') or die(_("Access Denied.")); ?>
<!doctype html>
<html lang="en">
<?php 
	$this->inc('elements/header.php'); 
?>
<body>
	<!-- <a href="https://github.com/ricardomccerqueira" target="_blank"><img style="position: absolute; top: 0px; right: 0px; border: 0; z-index:999;" src="img/forkme_right_gray_6d6d6d.png" alt="Fork me on GitHub"></a>-->
	<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->

	<div class="resume-curtain">
		<section id="resume">
			<a class="close-button float-right" href="#">close</a>
			
			<?php $a = new Area('resume_name'); $a->display($c); ?>
			
			<article class="article float-left">
				<figure class="figure">
					<?php $a = new Area('resume_picture'); $a->display($c); ?>
				</figure>
				
				<?php $a = new Area('resume_description'); $a->display($c); ?>
			</article>

			<article class="article float-right">
				<div class="title-bar">
					Personal info
				</div>

				<?php $a = new Area('resume_contacts'); $a->display($c); ?>
			</article>

			<article class="article float-left clearfix">
				<div class="title-bar">
					Coding Skills
				</div>

				<?php $a = new Area('resume_skills'); $a->display($c); ?>
			</article>

			<article class="article float-right">
				<div class="title-bar">
					Software skills
				</div>

				<?php $a = new Area('resume_sofware'); $a->display($c); ?>
			</article>
			

			<article class="article float-left clearfix">
				<div class="title-bar">
					Education
				</div>

				<?php $a = new Area('resume_education'); $a->display($c); ?>
			</article>

			<article class="article float-right">
				<div class="title-bar">
					Work Experience
				</div>

				<?php $a = new Area('resume_workexperience'); $a->display($c); ?>				
			</article>

			
		</section>
	</div>
	<div id="main-wraper">
		<header id="header">
			<div id="headerCenteredContent">
				<h1 id="logo" class="float-left">
					<?php $a = new Area('logo'); $a->display($c); ?>
				</h1>

				<nav id="nav" class="float-right">
					<ul>
						<li class="float-left websites">
							<a href="#/websites" >web</a>
							<div class="underline"></div>
						</li>
						<li class="float-left applications">
							<a href="#/applications" >applications</a>
							<div class="underline"></div>
						</li>
						<li class="float-left games">
							<a href="#/games" >games</a>
							<div class="underline"></div>
						</li>                
					</ul>
				</nav>
			</div>
		</header>

		<div role="main" >
			<div id="content" class="clearfix">

			</div>
		</div>

		<footer id="footer">
			<ul id="footer-links">
				<li>
					<a class="resumebutton" href="#">Résumé</a>
				</li>

				<li>
					<a href="https://github.com/ricardomccerqueira" target="_blank"><img src="img/icon_github.png" /></a>
				</li>

				<li>
					<a href="http://www.delicious.com/ricardocerqueira" target="_blank"><img src="img/icon_delicious.png" /></a>
				</li>

				<li>
					<div class="g-plusone" expandTo="top" recommendations="false" data-size="medium" data-annotation="none" href="www.rcerqueira.com"></div>
				</li>
			</ul>
		</footer>
	</div>
	<?php 
	$this->inc('elements/footer.php');
	?> 
</body>

<script type="text/javascript">
	$(function(){
		Portfolio.init();
	});

    //analytics
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-37357037-1']);
    _gaq.push(['_setDomainName', 'rcerqueira.com']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

    //google Plus
    (function() {
      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
      po.src = 'https://apis.google.com/js/plusone.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
</html>