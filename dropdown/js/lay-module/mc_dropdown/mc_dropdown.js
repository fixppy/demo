/* * mc-dropdown v1.2 2020-3-13 by cm.yu */
layui.define([],function (exports) {
	var $ =  layui.$;
    layui.link('./js/lay-module/mc_dropdown/mc_dropdown.css');

	var timer1,timer2,
		delay = 200,//动画过渡时间
		_a = $('.mc-dropdown-menu-title'),
		_animUpOut = 'mc-slide-up-out',
		_animDownOut = 'mc-slide-down-out',
		_animOutClass = _animUpOut +' '+ _animDownOut,
		_direction = 'down',	//下拉层展开位置,down|up
		_ht;
	$('.mc-dropdown[type*="hover"]').hover(function(e){
		e.stopPropagation();
		var _t = $(this),
			_m = _t.find('.mc-dropdown-menu'),
			_o = $('.mc-dropdown[type="hover"]'),
			_w = _m.width(),
			_h = _t.height(),
			_placement = _t.attr('placement');
		_ht = setTimeout(function(){
			switch (_placement) {
				case 'center':
					_direction = 'down';
					_m.css({left:_t.width()/2-_w/2+'px'});
					break;
				case 'topLeft': case 'topRight':
					_direction = 'up';
					_m.css({bottom:_h+'px'});
					break;
				case 'topCenter':
					_direction = 'up';
					_m.css({bottom:_h+'px',left:_t.width()/2-_w/2+'px'});
					break;
				default:
					_direction = 'down';
					break;
			}
			if(_m.is(':visible')){
				clearTimeout(timer2);
			}
			_m.removeClass(_animOutClass).css({display:'none'});
			clearTimeout(timer1);
			_t.addClass('show');
			_m.addClass('mc-slide-'+_direction+'-in').css({display:'block'});
			setTimeout(function(){
				_m.removeClass('mc-slide-'+_direction+'-in');
				_o.not('.show').find('.mc-dropdown-menu').removeClass('mc-slide-'+_direction+'-out').css({display:'none'});
			},delay);
			_m.find('ul').css({left:(_w + 5)+'px'});
		},260);
	},function(){
		clearTimeout(_ht);
		var _t = $(this),
			_m = _t.find('.mc-dropdown-menu');	
		_t.removeClass('show');		
		_m.addClass('mc-slide-'+_direction+'-out');
		timer1 = setTimeout(function(){
			_m.removeClass('mc-slide-'+_direction+'-out').css({display:'none'});
		},delay)
	});

	$('body').on('click','.mc-dropdown:not([type="hover"]) > a',function(e){
		var _t = $(this),
			_p = _t.parent(),
			_m = _t.next(),
			_o = $('.mc-dropdown:not([type="hover"])').not(_p),
			_w = _m.width(),
			_h = _p.height(),
			_placement = _p.attr('placement');
		e.stopPropagation();
		switch (_placement) {
			case 'center':
				_m.css({left:_t.width()/2-_w/2+'px'})
				break;
			case 'topLeft': case 'topRight':
				_direction = 'up';
				_m.css({bottom:_h+'px'});
				break;
			case 'topCenter':
				_direction = 'up';
				_m.css({bottom:_h+'px',left:_t.width()/2-_w/2+'px'});
				break;				
			default:
				_direction = 'down';
				break;				
		}		
		_o.removeClass('show');
		_o.each(function(i,item){
			if($(item).find('.mc-dropdown-menu').is(':visible')){
				var op = $(item).attr('placement');
				if(op != 'left' && op != 'center' && op != 'right' && op != undefined){
					$(item).find('.mc-dropdown-menu').addClass(_animUpOut);
				}else{
					$(item).find('.mc-dropdown-menu').addClass(_animDownOut);
				}
				setTimeout(function(){
					$(item).find('.mc-dropdown-menu').removeClass(_animOutClass).css({display:'none'});
				},delay)
			}			
		})
		if(_p.is('.show')){
			_p.removeClass('show');
			_m.addClass('mc-slide-'+_direction+'-out');
			setTimeout(function(){
				_m.removeClass('mc-slide-'+_direction+'-out').css({display:'none'});
			},delay)
		}else{
			_p.addClass('show');
			_m.addClass('mc-slide-'+_direction+'-in').css({display:'block'});
			setTimeout(function(){
				_m.removeClass('mc-slide-'+_direction+'-in');
			},delay)
		}
		_m.find('ul').css({left:(_w + 5)+'px'});
	});

	//二级菜单
	_a.parent().hover(function(){
		$(this).addClass('current');
		$(this).find('ul').fadeIn(200);
		var l = $(this).offset().left,w = document.body.clientWidth,w1 = $(this).width(),w2 = $(this).find('ul').width();
		if((l + w1 + w2) > w) {
			$(this).find('ul').css({marginLeft:-(w1+w2+10)+'px'});
		}else{
			$(this).find('ul').css({marginLeft:0});
		}
	},function() {
		$(this).removeClass('current');
		$(this).find('ul').fadeOut(200);
	})

	// 关闭下拉菜单
    $(document).on('click',function(e){
        var _A = $('.mc-dropdown>a');
        var _ALL = $('.mc-dropdown');
        var _M = $('.mc-dropdown .mc-dropdown-menu');
        var _D = $('.mc-dropdown-disabled');
        var _B = $('.mc-dropdown *');
        var _C = $('.mc-dropdown:not([type="hover"]) .mc-dropdown-menu');
        var _T = $('.mc-dropdown-menu-title');
        var flag = false;
        if(!_A.is(e.target) && _A.has(e.target).length === 0 && !_D.is(e.target) && _D.has(e.target).length === 0 && !_T.is(e.target) && _T.has(e.target).length === 0){
        	layui.each($('.mc-dropdown'),function(i,d){
        		if($(d).hasClass('show')){
        			flag = true;
        		}
        	})
        	if(flag) {
	        	$('.mc-dropdown').removeClass('show');
	        	layui.each(_ALL,function(i,item){
	        		var type = $(item).attr('type'),
	        			op = $(item).attr('placement');
	        		// if(type == 'click' || type == undefined) {
	        			if(op != 'left' && op != 'center' && op != 'right' && op != undefined){
	        				$(item).find('.mc-dropdown-menu').addClass(_animUpOut);
	        			}else{
	        				$(item).find('.mc-dropdown-menu').addClass(_animDownOut);
	        			}
	        		// }else{
	        		// 	if(op != 'left' && op != 'center' && op != 'right' && op != undefined){
	        		// 		$(item).find('.mc-dropdown-menu').addClass('mc-slide-up-out');
	        		// 	}else{
	        		// 		$(item).find('.mc-dropdown-menu').addClass('mc-slide-down-out');
	        		// 	}
	        		// }
	        	})
	        	/*
	        	 *	区分点击区域 mc-dropdown 是否hover状态，如果是在hover状态结构中，需要停止延迟事件。
	        	 *	click触发的结构，在关闭过程中，触发hover结构，延迟事件还会继续执行，不会因为hover而停止。
	        	 */
	        	if(!_B.is(e.target) && _B.has(e.target).length === 0){
		        	timer2 = setTimeout(function(){
		        		_C.removeClass(_animOutClass).css({display:'none'});
		        	},delay)	        		
	        	}else{
		        	setTimeout(function(){
		        		_C.removeClass(_animOutClass).css({display:'none'});
		        	},delay)	        		
	        	}
        	}
        }
    });
	exports('mcdropdown' , null);
})