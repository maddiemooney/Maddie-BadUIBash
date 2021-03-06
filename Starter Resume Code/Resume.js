 var machine1 = $("#machine1").slotMachine({
     active: 0,
     delay: 500,
     direction: "down"
   });

   var machine2 = $("#machine2").slotMachine({
     active: 1,
     delay: 500,
     direction: "down"
   });

   var machine3 = $("#machine3").slotMachine({
    active: 1,
    delay: 1000,
    direction: "down"
  });

  var results;
  var resume = [];

  function onComplete(active) {
    switch (this.element[0].id) {
      case "machine1":
        $("#machine1Result").text(this.active);
        results[0] = $('#machine1').find('span.option > span').eq(this.active + 1).text();
        break;
      case "machine2":
        $("#machine2Result").text(this.active);
        results[1] = $('#machine2').find('span.option > span').eq(this.active + 1).text();
        break;
      case "machine3":
        $("#machine3Result").text(this.active);
        results[2] = $('#machine3').find(':input').each(function(){
            $(this).change(function(){
                results[2] = this.value
                resume.push(results[0]+" "+results[1]+": "+results[2])
            });
          })
        break;
    }
  }

  $(".randomizeButton").click(function() {

    $('#slot-machine .arm').animate({ top: '45px', height: '2%' });
    $('#slot-machine .arm .knob').animate({ top: '-20px', height: '20px' });
    $('#slot-machine .arm-shadow').animate({ top: '40px' }, 380);
    $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '50%', opacity: 1 });
           
      console.log("pull the lever kronk");
    results = [];
    machine1.shuffle(5, onComplete);
    setTimeout(function() {
      machine2.shuffle(5, onComplete);
    }, 500);
    setTimeout(function() {
        machine3.shuffle(5, onComplete);
    }, 750);

    setTimeout(function(){
        $('#slot-machine .arm').animate({ top: '-25px', height: '50%', overflow: 'visible' });
        $('#slot-machine .arm .knob').animate({ top: '-15px', height: '16px' });
        $('#slot-machine .arm-shadow').animate({ top: '13px' });
        $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '0', opacity: 0 });
    }, 500);
  });

  $("#slot-display").click(function() {
      resset = [...new Set(resume)]
      console.log(resset);
      for(var i=0; i < resset.length; i++) {
        $('#transactionDetails').append('<p>'+resset[i]+'</p>');
      }
      $('#resumecontainer').show();
  })

  $(document).on('keyup', '.numeric-only', function(event) {
    var v = this.value;
    if($.isNumeric(v) === false) {
         //chop off the last char entered
         this.value = this.value.slice(0,-1);
    }
 });


  /*! SlotMachine - v3.0.1 - 2016-03-03
* https://github.com/josex2r/jQuery-SlotMachine
* Copyright (c) 2016 Jose Luis Represa; Licensed MIT */
"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(a,b,c,d){function e(b,c){var d=void 0;return a.data(b[0],"plugin_"+f)?d=a.data(b[0],"plugin_"+f):(d=new p(b,c),a.data(b[0],"plugin_"+f,d)),d}var f="slotMachine",g={active:0,delay:200,auto:!1,spins:5,randomize:null,complete:null,stopHidden:!0,direction:"up"},h="slotMachineNoTransition",i="slotMachineBlurFast",j="slotMachineBlurMedium",k="slotMachineBlurSlow",l="slotMachineBlurTurtle",m="slotMachineGradient",n=m,o=function(){function a(b,c){return _classCallCheck(this,a),this.cb=b,this.initialDelay=c,this.delay=c,this.deferred=jQuery.Deferred(),this.startTime=null,this.timer=null,this.running=!1,this.resume(),this}return _createClass(a,[{key:"_start",value:function(){this.timer=setTimeout(function(){this.cb.call(this)}.bind(this),this.delay)}},{key:"cancel",value:function(){this.running=!1,clearTimeout(this.timer)}},{key:"pause",value:function(){this.running&&(this.delay-=(new Date).getTime()-this.startTime,this.cancel())}},{key:"resume",value:function(){this.running||(this.running=!0,this.startTime=(new Date).getTime(),this._start())}},{key:"reset",value:function(){this.cancel(),this.delay=this.initialDelay,this._start()}},{key:"add",value:function(a){this.pause(),this.delay+=a,this.resume()}}]),a}(),p=function(){function c(b,d){_classCallCheck(this,c),this.element=b,this.settings=a.extend({},g,d),this.defaults=g,this.name=f,this.$slot=a(b),this.$tiles=this.$slot.children(),this.$container=null,this._minTop=null,this._maxTop=null,this._$fakeFirstTile=null,this._$fakeLastTile=null,this._timer=null,this._spinsLeft=null,this.futureActive=null,this.running=!1,this.stopping=!1,this.active=this.settings.active,this.$slot.css("overflow","hidden"),this.$container=this.$tiles.wrapAll('<div class="slotMachineContainer" />').parent(),this.$container.css("transition","1s ease-in-out"),this._maxTop=-this.$container.height(),this._initFakeTiles(),this._minTop=-this._$fakeFirstTile.outerHeight(),this._initDirection(),this.resetPosition(),this.settings.auto!==!1&&(this.settings.auto===!0?this.shuffle():this.auto())}return _createClass(c,[{key:"_initFakeTiles",value:function(){this._$fakeFirstTile=this.$tiles.last().clone(),this._$fakeLastTile=this.$tiles.first().clone(),this.$container.prepend(this._$fakeFirstTile),this.$container.append(this._$fakeLastTile)}},{key:"_initDirection",value:function(){this._direction={selected:"down"===this.settings.direction?"down":"up",up:{key:"up",initial:this.getTileOffset(this.active),first:0,last:this.getTileOffset(this.$tiles.length),to:this._maxTop,firstToLast:this.getTileOffset(this.$tiles.length),lastToFirst:0},down:{key:"down",initial:this.getTileOffset(this.active),first:this.getTileOffset(this.$tiles.length),last:0,to:this._minTop,firstToLast:this.getTileOffset(this.$tiles.length),lastToFirst:0}}}},{key:"_changeTransition",value:function(){var a=this._delay||this.settings.delay,b=this._transition||this.settings.transition;this.$container.css("transition",a+"s "+b)}},{key:"_animate",value:function(a){this.$container.css("transform","matrix(1, 0, 0, 1, 0, "+a+")")}},{key:"_isGoingBackward",value:function(){return this.futureActive>this.active&&0===this.active&&this.futureActive===this.$tiles.length-1}},{key:"_isGoingForward",value:function(){return this.futureActive<=this.active&&this.active===this.$tiles.length-1&&0===this.futureActive}},{key:"raf",value:function(a,c){var d=b.requestAnimationFrame||b.mozRequestAnimationFrame||b.webkitRequestAnimationFrame||b.msRequestAnimationFrame,e=(new Date).getTime(),f=function g(){var b=(new Date).getTime(),f=b-e;c>f?d(g):"function"==typeof a&&a()};d(f)}},{key:"getTileOffset",value:function(a){for(var b=0,c=0;a>c;c++)b+=this.$tiles.eq(c).outerHeight();return this._minTop-b}},{key:"resetPosition",value:function(a){this.$container.toggleClass(h),this._animate(a===d?this.direction.initial:a),this.$container[0].offsetHeight,this.$container.toggleClass(h)}},{key:"setRandomize",value:function(a){this.settings.randomize=a,"number"==typeof a&&(this.settings.randomize=function(){return a})}},{key:"prev",value:function(){return this.futureActive=this.prevIndex,this.running=!0,this.stop(),this.futureActive}},{key:"next",value:function(){return this.futureActive=this.nextIndex,this.running=!0,this.stop(),this.futureActive}},{key:"getDelayFromSpins",value:function(a){var b=this.settings.delay;switch(this._transition="linear",a){case 1:b/=.5,this._transition="ease-out",this._animationFX=l;break;case 2:b/=.75,this._animationFX=k;break;case 3:b/=1,this._animationFX=j;break;case 4:b/=1.25,this._animationFX=j;break;default:b/=1.5,this._animationFX=i}return b}},{key:"shuffle",value:function(a,b){var c=this;if("function"==typeof a&&(b=a),this.running=!0,this.visible||this.settings.stopHidden!==!0){var d=this.getDelayFromSpins(a);this.delay=d,this._animate(this.direction.to),this.raf(function(){if(!c.stopping&&c.running){var d=a-1;c.resetPosition(c.direction.first),1>=d?c.stop(b):c.shuffle(d,b)}},d)}else this.stop(b);return this.futureActive}},{key:"stop",value:function(a){var b=this;if(!this.running||this.stopping)return this.futureActive;this.running=!0,this.stopping=!0,null===this.futureActive&&(this.futureActive=this.custom),this._isGoingBackward()?this.resetPosition(this.direction.firstToLast):this._isGoingForward()&&this.resetPosition(this.direction.lastToFirst),this.active=this.futureActive;var c=this.getDelayFromSpins(1);return this.delay=c,this._animationFX=n,this._animate(this.getTileOffset(this.active)),this.raf(function(){b.stopping=!1,b.running=!1,b.futureActive=null,"function"==typeof b.settings.complete&&b.settings.complete.apply(b,[b.active]),"function"==typeof a&&a.apply(b,[b.active])},c),this.active}},{key:"auto",value:function(){var a=this;this.running||(this._timer=new o(function(){"function"!=typeof a.settings.randomize&&(a.settings.randomize=function(){return a._nextIndex}),a.visible||a.settings.stopHidden!==!0?a.shuffle(a.settings.spins,a._timer.reset.bind(a._timer)):a.raf(a._timer.reset.bind(a._timer),500)},this.settings.auto))}},{key:"destroy",value:function(){this._$fakeFirstTile.remove(),this._$fakeLastTile.remove(),this.$tiles.unwrap(),a.data(this.element[0],"plugin_"+f,null)}},{key:"active",get:function(){return this._active},set:function(a){this._active=a,(0>a||a>=this.$tiles.length)&&(this._active=0)}},{key:"visibleTile",get:function(){var a=this.$tiles.first().height(),b=this.$container.css("transform"),c=/^matrix\(-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?(-?\d+)\)$/,d=parseInt(b.replace(c,"$1"),10);return Math.abs(Math.round(d/a))-1}},{key:"random",get:function(){return Math.floor(Math.random()*this.$tiles.length)}},{key:"custom",get:function(){var a=void 0;if("function"==typeof this.settings.randomize){var b=this.settings.randomize.call(this,this.active);(0>b||b>=this.$tiles.length)&&(b=0),a=b}else a=this.random;return a}},{key:"direction",get:function(){return this._direction[this._direction.selected]},set:function(a){this.running||(this.direction="down"===a?"down":"up")}},{key:"_prevIndex",get:function(){var a=this.active-1;return 0>a?this.$tiles.length-1:a}},{key:"_nextIndex",get:function(){var a=this.active+1;return a<this.$tiles.length?a:0}},{key:"prevIndex",get:function(){return"up"===this.direction?this._nextIndex:this._prevIndex}},{key:"nextIndex",get:function(){return"up"===this.direction?this._prevIndex:this._nextIndex}},{key:"visible",get:function(){var c=a(b),d=this.$slot.offset().top>c.scrollTop()+c.height(),e=c.scrollTop()>this.$slot.height()+this.$slot.offset().top;return!d&&!e}},{key:"_fxClass",set:function(a){var b=[i,j,k,l].join(" ");this.$tiles.add(this._$fakeFirstTile).add(this._$fakeLastTile).removeClass(b).addClass(a)}},{key:"_animationFX",set:function(a){var b=this.settings.delay/4,c=this.$slot.add(this.$tiles).add(this._$fakeFirstTile).add(this._$fakeLastTile);this.raf(function(){this._fxClass=a,a===n?c.removeClass(m):c.addClass(m)}.bind(this),b)}},{key:"delay",set:function(a){a/=1e3,this._delay=a,this._changeTransition()}},{key:"transition",set:function(a){a=a||"ease-in-out",this._transition=a,this._changeTransition()}}]),c}();a.fn[f]=function(b){var c=this,d=void 0;return 1===this.length?d=e(this,b):!function(){var f=c;d=a.map(f,function(a,c){var d=f.eq(c);return e(d,b)})}(),d}}(jQuery,window,document);