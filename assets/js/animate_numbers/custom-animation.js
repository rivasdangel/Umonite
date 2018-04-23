$('#counter-block').ready(function() {
  $('.fb').animationCounter({
    start: 0,
    step: 1,
    delay: 100
  });
  $('.bike').animationCounter({
    start: 245677,
    step: 100,
    delay: 2000
  });
  $('.code').animationCounter({
    start: 0,
    end: 570,
    step: 4,
    delay: 1000
  });
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
