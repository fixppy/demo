/**
 * [mcDropdown]
 * @基于layui dropdown
 * @ver: 1.3
 * @date: 2020-3-19
 * @author: cm.yu
 */
layui.define(['jquery'],function (exports) {
	var $ =  layui.$;
	/**
	 *  mcDropdown.render();
	 * 	mcDropdown.render({
	 *	 anim:false,
	 *	 link:{
	 *		bg:'#188ae2',
	 *		color:'#fff'
	 *	 },
	 *	 zIndex:1000,
	 *	})
	 */
    var mcDropdown = {
    	render: function (options) {
    		layui.link('./js/lay-module/mcDropdown/mcDropdown.css');
    		var defaults = {
    			anim:1,		//动画类型 params:1/2/false,默认1
    			delay:300,	//anim:false 时，会移除延迟时间
    		};
    		var option = $.extend({},defaults,options);
			if(option.anim != false || option.anim.toString() == 0){
				if(option.anim != 2 || option.anim === 0) {
					option.anim = 1;
				}else{
					$('.mc-dropdown').attr('anim','2');
				}
			}
			option.anim == false ? option.delay = 0 : '';
			if(option.zIndex) {
				$('head').append('<style>.mc-dropdown-menu{z-index:'+option.zIndex+'}</style>');
			}
			if(option.link != undefined) {
				$('head').append('<style>.mc-dropdown-menu-list>li.current>a,.mc-dropdown-menu-list>li a:not([disabled]):hover{background-color:'+option.link.bg+';color:'+option.link.color+';}.mc-dropdown-menu-list>li.current a:not([disabled]):after,.mc-dropdown-menu-list>li a:not([disabled]):hover:after{border-color:'+option.link.color+'}</style>');
			}
    		mcDropdown.listen(option);
    	},
        /**
         * 监听
         * @param options
         */
        listen: function (option) {
			var timer1,timer2,
				_childTitle = $('.mc-dropdown-menu-title'),
				_animInClass  = 'mc-dropdown-menu-show',
				_animOutClass = 'mc-dropdown-menu-hide',
				_direction = 'down',	//下拉层展开位置,down|up,计算显示位置
				_hoverDelay;
			
			$('.mc-dropdown[type*="hover"]').hover(function(e){
				e.stopPropagation();
				var _t = $(this),
					_m = _t.find('.mc-dropdown-menu'),
					_o = $('.mc-dropdown[type="hover"]'),
					_w = _m.width(),
					_h = _t.height(),
					_placement = _t.attr('placement');
				_hoverDelay = setTimeout(function(){
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
					_m.removeClass(_animOutClass);
					clearTimeout(timer1);
					_t.addClass('show');
					_m.addClass(_animInClass);
					setTimeout(function(){
						_m.removeClass(_animInClass);
						_o.not('.show').find('.mc-dropdown-menu').removeClass(_animOutClass).css({display:'none'});
					},option.delay);
					_m.find('.mc-dropdown-menu-title + ul').css({left:(_w + 3)+'px'});
				},200);
			},function(){
				clearTimeout(_hoverDelay);
				var _t = $(this),
					_m = _t.find('.mc-dropdown-menu:visible');	
				_t.removeClass('show');
				if(_m){
					_m.removeClass(_animInClass).addClass(_animOutClass);
				}	
				timer1 = setTimeout(function(){
					_m.removeClass(_animOutClass);
				},option.delay)
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
						_m.css({left:_p.width()/2-_w/2+'px'})
						break;
					case 'topLeft': case 'topRight':
						_direction = 'up';
						_m.css({bottom:_h+'px'});
						break;
					case 'topCenter':
						_direction = 'up';
						_m.css({bottom:_h+'px',left:_p.width()/2-_w/2+'px'});
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
							$(item).find('.mc-dropdown-menu').addClass(_animOutClass);
						}else{
							$(item).find('.mc-dropdown-menu').addClass(_animOutClass);
						}
						setTimeout(function(){
							$(item).find('.mc-dropdown-menu').removeClass(_animOutClass);
						},option.delay)
					}			
				})
				if(_p.is('.show')){
					_p.removeClass('show');
					_m.addClass(_animOutClass);
					setTimeout(function(){
						_m.removeClass(_animOutClass);
					},option.delay)
				}else{
					_p.addClass('show');
					_m.addClass(_animInClass);
					setTimeout(function(){
						_m.removeClass(_animInClass);
					},option.delay)
				}
				_m.find('.mc-dropdown-menu-title + ul').css({left:(_w + 3)+'px'});
			});

			//child menu
			_childTitle.parent().hover(function(){
				$(this).addClass('current');
				$(this).find('ul').fadeIn(200);
				var l = $(this).offset().left,w = document.body.clientWidth,w1 = $(this).width(),w2 = $(this).find('ul').width();
				if((l + w1 + w2) > w) {
					$(this).find('ul').css({marginLeft:-(w1+w2+8)+'px'});
				}else{
					$(this).find('ul').css({marginLeft:0});
				}
			},function() {
				$(this).removeClass('current');
				$(this).find('ul').fadeOut(200);
			});

			// close dropdown menu
		    $(document).on('click',function(e){
		        var _A = $('.mc-dropdown>a');
		        var _B = $('.mc-dropdown.show');
		        var _C = $('.mc-dropdown .mc-dropdown-menu:visible');
		        var _D = $('.mc-dropdown-disabled');
		        var _T = $('.mc-dropdown-menu-title');
		        var flag = false;
		        if(!_A.is(e.target) && _A.has(e.target).length === 0 && !_D.is(e.target) && _D.has(e.target).length === 0 && !_T.is(e.target) && _T.has(e.target).length === 0){
		        	layui.each($('.mc-dropdown'),function(i,d){
		        		if($(d).hasClass('show')){
		        			flag = true;
		        		}
		        	})
		        	if(flag) {
			        	_B.find('.mc-dropdown-menu').addClass(_animOutClass);
			        	_B.removeClass('show');
			        	timer2 = setTimeout(function(){
			        		_C.removeClass(_animOutClass);
			        	},option.delay);
		        	}
		        }
		    });
        },
    };
	exports("mcDropdown", mcDropdown);
})