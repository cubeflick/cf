(function($) {

var params = new Array;

var order = new Array;

var images = new Array;

var links = new Array;

var linksTarget = new Array;

var titles = new Array;

var interval = new Array;

var imagePos = new Array;

var appInterval = new Array;

var squarePos = new Array;

var reverse = new Array;

$.fn.coinslider= $.fn.CoinSlider = function(options){

init = function(el){

order[el.id] = new Array(); // order of square appereance

images[el.id] = new Array();

links[el.id] = new Array();

linksTarget[el.id] = new Array();

titles[el.id] = new Array();

imagePos[el.id] = 0;

squarePos[el.id] = 0;

reverse[el.id] = 1;

params[el.id] = $.extend({}, $.fn.coinslider.defaults, options);

// create images, links and titles arrays

$.each($('#'+el.id+' img'), function(i,item){

images[el.id][i] = $(item).attr('src');

links[el.id][i] = $(item).parent().is('a') ? $(item).parent().attr('href') : '';

linksTarget[el.id][i] = $(item).parent().is('a') ? $(item).parent().attr('target') : '';

titles[el.id][i] = $(item).next().is('div') ? $(item).next().html() : '';

});

// set panel

$(el).find('.banner').css({left:76}).find('>strong').css({bottom:-100}).next().css({right:-350})

$(el).css({

'background-image':'url('+images[el.id][0]+')',

'width': params[el.id].width,

'height': params[el.id].height,

'position': 'relative',

'background-position': 'top left'

}).wrap("<div class='coin-slider' id='coin-slider-"+el.id+"' />");

$.setFields(el);

if(params[el.id].navigation)

$.setNavigation(el);

$.transition(el,0);

$.transitionCall(el);

}

// squares positions

$.setFields = function(el){

tWidth = sWidth = parseInt(params[el.id].width/params[el.id].spw);

tHeight = sHeight = parseInt(params[el.id].height/params[el.id].sph);

counter = sLeft = sTop = 0;

tgapx = gapx = params[el.id].width - params[el.id].spw*sWidth;

tgapy = gapy = params[el.id].height - params[el.id].sph*sHeight;

for(i=1;i <= params[el.id].sph;i++){

gapx = tgapx;

if(gapy > 0){

gapy--;

sHeight = tHeight+1;

} else {

sHeight = tHeight;

}

for(j=1; j <= params[el.id].spw; j++){

if(gapx > 0){

gapx--;

sWidth = tWidth+1;

} else {

sWidth = tWidth;

}

order[el.id][counter] = i+''+j;

counter++;

if(params[el.id].links)

$('#'+el.id).append("<a href='"+links[el.id][0]+"' class='cs-"+el.id+"' id='cs-"+el.id+i+j+"' style='width:"+sWidth+"px; height:"+sHeight+"px; float: left; position: absolute;'></a>");

else

$('#'+el.id).append("<div class='cs-"+el.id+"' id='cs-"+el.id+i+j+"' style='width:"+sWidth+"px; height:"+sHeight+"px; float: left; position: absolute;'></div>");

// positioning squares

$("#cs-"+el.id+i+j).css({

'background-position': -sLeft +'px '+(-sTop+'px'),

'left' : sLeft ,

'top': sTop

});

sLeft += sWidth;

}

sTop += sHeight;

sLeft = 0;

}

if(params[el.id].hoverPause){

$('.cs-'+el.id).mouseover(function(){

params[el.id].pause = true;

});

$('.cs-'+el.id).mouseout(function(){

params[el.id].pause = false;

});

$('.banner').mouseover(function(){

params[el.id].pause = true;

});

$('.banner').mouseout(function(){

params[el.id].pause = false;

});

}

};

$.transitionCall = function(el){

clearInterval(interval[el.id]);

delay = params[el.id].delay + params[el.id].spw*params[el.id].sph*params[el.id].sDelay;

interval[el.id] = setInterval(function() { $.transition(el) }, delay);

}

// transitions

$.transition = function(el,direction){

if(params[el.id].pause == true) return;

$.effect(el);

squarePos[el.id] = 0;

appInterval[el.id] = setInterval(function() { $.appereance(el,order[el.id][squarePos[el.id]]) },params[el.id].sDelay);

$(el).css({ 'background-image': 'url('+images[el.id][imagePos[el.id]]+')' });

if(typeof(direction) == "undefined")

imagePos[el.id]++;

else

if(direction == 'prev')

imagePos[el.id]--;

else

imagePos[el.id] = direction;

if (imagePos[el.id] == images[el.id].length) {

imagePos[el.id] = 0;

}

if (imagePos[el.id] == -1){

imagePos[el.id] = images[el.id].length-1;

}

$('.cs-button-'+el.id).removeClass('cs-active');

$('#cs-button-'+el.id+"-"+(imagePos[el.id]+1)).addClass('cs-active');

$('.banner').find('> strong').animate({bottom:-100},{queue:false, duration:400}).next().animate({right:-350},400,function(){

	$('.banner').css({left:1074})

	$('.banner').eq(imagePos[el.id]).css({left:76}).find('>strong').eq(0).css({bottom:-100}).next().css({right:-350, top:110}).prev().animate({bottom:38},{queue:false,duration:600},'easeOutExpo').next().animate({right:124, top:110},{queue:false,duration:600},'easeOutExpo')})

};

$.appereance = function(el,sid){

$('.cs-'+el.id).attr('href',links[el.id][imagePos[el.id]]).attr('target',linksTarget[el.id][imagePos[el.id]]);

if (squarePos[el.id] == params[el.id].spw*params[el.id].sph) {

clearInterval(appInterval[el.id]);

return;

}

$('#cs-'+el.id+sid).css({ opacity: 0, 'background-image': 'url('+images[el.id][imagePos[el.id]]+')' });

$('#cs-'+el.id+sid).animate({ opacity: 1 }, 1000);

squarePos[el.id]++;

};

// navigation

$.setNavigation = function(el){

// image buttons

$('.controls').append("<div id='cs-buttons-"+el.id+"' class='cs-buttons'></div>");

for(k=1;k<images[el.id].length+1;k++){

$('#cs-buttons-'+el.id).append("<a class='cs-button-"+el.id+"' id='cs-button-"+el.id+"-"+k+"'>"+k+"</a>");

}

$.each($('.cs-button-'+el.id), function(i,item){

$(item).click( function(e){if($(this).hasClass('cs-active')){return false}

else{

$('.cs-button-'+el.id).removeClass('cs-active');

$(this).addClass('cs-active');

e.preventDefault();

$.transition(el,i);

$.transitionCall(el);}

})

});

$('#cs-navigation-'+el.id+' a').mouseout(function(){

params[el.id].pause = false;

});

}

// effects

$.effect = function(el){

effA = ['random','swirl','rain','straight'];

if(params[el.id].effect == '')

eff = effA[Math.floor(Math.random()*(effA.length))];

else

eff = params[el.id].effect;

order[el.id] = new Array();

if(eff == 'random'){

counter = 0;

for(i=1;i <= params[el.id].sph;i++){

for(j=1; j <= params[el.id].spw; j++){

order[el.id][counter] = i+''+j;

counter++;

}

}

$.random(order[el.id]);

}

if(eff == 'rain') {

$.rain(el);

}

if(eff == 'swirl')

$.swirl(el);

if(eff == 'straight')

$.straight(el);

reverse[el.id] *= -1;

if(reverse[el.id] > 0){

order[el.id].reverse();

}

}

// shuffle array function

$.random = function(arr) {

var i = arr.length;

if ( i == 0 ) return false;

while ( --i ) {

var j = Math.floor( Math.random() * ( i + 1 ) );

var tempi = arr[i];

var tempj = arr[j];

arr[i] = tempj;

arr[j] = tempi;

}

}

//swirl effect by milos popovic

$.swirl = function(el){

var n = params[el.id].sph;

var m = params[el.id].spw;

var x = 1;

var y = 1;

var going = 0;

var num = 0;

var c = 0;

var dowhile = true;

while(dowhile) {

num = (going==0 || going==2) ? m : n;

for (i=1;i<=num;i++){

order[el.id][c] = x+''+y;

c++;

if(i!=num){

switch(going){

case 0 : y++; break;

case 1 : x++; break;

case 2 : y--; break;

case 3 : x--; break;

}

}

}

going = (going+1)%4;

switch(going){

case 0 : m--; y++; break;

case 1 : n--; x++; break;

case 2 : m--; y--; break;

case 3 : n--; x--; break;

}

check = $.max(n,m) - $.min(n,m);

if(m<=check && n<=check)

dowhile = false;

}

}

// rain effect

$.rain = function(el){

var n = params[el.id].sph;

var m = params[el.id].spw;

var c = 0;

var to = to2 = from = 1;

var dowhile = true;

while(dowhile){

for(i=from;i<=to;i++){

order[el.id][c] = i+''+parseInt(to2-i+1);

c++;

}

to2++;

if(to < n && to2 < m && n<m){

to++;

}

if(to < n && n>=m){

to++;

}

if(to2 > m){

from++;

}

if(from > to) dowhile= false;

}

}

// straight effect

$.straight = function(el){

counter = 0;

for(i=1;i <= params[el.id].sph;i++){

for(j=1; j <= params[el.id].spw; j++){

order[el.id][counter] = i+''+j;

counter++;

}

}

}

$.min = function(n,m){

if (n>m) return m;

else return n;

}

$.max = function(n,m){

if (n<m) return m;

else return n;

}

this.each (

function(){ init(this); }

);

};

// default values

$.fn.coinslider.defaults = {

width: 950, // width of slider panel

height:432, // height of slider panel

spw: 1, // squares per width

sph: 1, // squares per height

delay: 6000, // delay between images in ms

sDelay: 70, // delay beetwen squares in ms

opacity: 1, // opacity of title and navigation

titleSpeed: 600, // speed of title appereance in ms

effect: 'rain', // random, swirl, rain, straight

navigation: true, // prev next and buttons

links : false, // show images as links

hoverPause: true // pause on hover

};

})(jQuery);

$(window).load(function(){$('#coin-slider').coinslider()})