var options = {};
var elem = document.querySelector('.sidenav');
var instance = M.Sidenav.init(elem, options);

// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
// var collapsibleElem = document.querySelector('.collapsible');
// var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

// Or with jQueryvar elem = document.querySelector('.collapsible');
var instance = M.Collapsible.init(elem, options);

// Or with jQuery

$(document).ready(function() {
  $('.sidenav').sidenav();
  $(".dropdown-trigger").dropdown();
  $('.collapsible').collapsible();
});
