/**
 * [fcDropdown]
 * @基于layui dropdown
 * @ver: 1.3
 * @date: 2020-3-19
 * @author: cm.yu
 */
layui.link('./js/lay-module/fcDropdown/fcDropdown.css');
layui.define(['jquery'],function (exports) {
	var $ =  layui.$;
	/**
	 *  fcDropdown.render();
	 * 	fcDropdown.render({
	 *	 anim:false,
	 *	 link:{
	 *		bg:'#188ae2',
	 *		color:'#fff'
	 *	 },
	 *	 zIndex:1000,
	 *	})
	 */
    var fcDropdown = {
    	render: function (options) {
    		var defaults = {
    			anim:1,		//动画类型 params:1/2/false,默认1
    			delay:300,	//anim:false 时，会移除延迟时间
    		};
    		var option = $.extend({},defaults,options);
			if(option.anim != false || option.anim.toString() == 0){
				if(option.anim != 2 || option.anim === 0) {
					option.anim = 1;
				}else{
					$('.fc-dropdown').attr('anim','2');
				}
			}
			option.anim == false ? option.delay = 0 : '';
			if(option.zIndex) {
				$('head').append('<style>.fc-dropdown-menu{z-index:'+option.zIndex+'}</style>');
			}
			if(option.link != undefined) {
				$('head').append('<style>.fc-dropdown-menu-list>li.childOpen>a,.fc-dropdown-menu-list>li a:not([disabled]):hover{background-color:'+option.link.bg+';color:'+option.link.color+';}.fc-dropdown-menu-list>li.childOpen a:not([disabled]):after,.fc-dropdown-menu-list>li a:not([disabled]):hover:after{border-color:'+option.link.color+'}</style>');
			}
    		fcDropdown.listen(option);
    	},
        /**
         * 监听
         * @param options
         */
        listen: function (option) {
			var timer1,timer2,
				_childTitle = '.fc-dropdown-menu-title',
				_animInClass  = 'fc-dropdown-menu-show',
				_animOutClass = 'fc-dropdown-menu-hide',
				_direction = 'down',	//下拉层展开位置,down|up,计算显示位置
				_hoverDelay;
			$('body').on('mouseenter','.fc-dropdown[type*="hover"]',function(e){
				e.stopPropagation();
				var _t = $(this),
					_m = _t.find('.fc-dropdown-menu'),
					_o = $('.fc-dropdown[type="hover"]'),
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
						_o.not('.show').find('.fc-dropdown-menu').removeClass(_animOutClass).css({display:'none'});
					},option.delay);
					_m.find('.fc-dropdown-menu-title + ul').css({left:(_w + 3)+'px'});
				},200);
			});

			$('body').on('mouseleave','.fc-dropdown[type*="hover"]',function(e){
				clearTimeout(_hoverDelay);
				var _t = $(this),
					_m = _t.find('.fc-dropdown-menu:visible');	
				_t.removeClass('show');
				if(_m){
					_m.removeClass(_animInClass).addClass(_animOutClass);
				}	
				timer1 = setTimeout(function(){
					_m.removeClass(_animOutClass);
				},option.delay)
			});

			$('body').on('click','.fc-dropdown:not([type="hover"]) > a',function(e){
				var _t = $(this),
					_p = _t.parent(),
					_m = _t.next(),
					_o = $('.fc-dropdown:not([type="hover"])').not(_p),
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
					if($(item).find('.fc-dropdown-menu').is(':visible')){
						var op = $(item).attr('placement');
						if(op != 'left' && op != 'center' && op != 'right' && op != undefined){
							$(item).find('.fc-dropdown-menu').addClass(_animOutClass);
						}else{
							$(item).find('.fc-dropdown-menu').addClass(_animOutClass);
						}
						setTimeout(function(){
							$(item).find('.fc-dropdown-menu').removeClass(_animOutClass);
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
				_m.find('.fc-dropdown-menu-title + ul').css({left:(_w + 3)+'px'});
			});

			//child menu
			$('body').on('mouseenter','.fc-dropdown.show .fc-dropdown-menu-title',function(){
				var _parent = $(this).parent();
				_parent.addClass('childOpen');
				$(this).next('ul').fadeIn(200);
				var l = _parent.offset().left,w = document.body.clientWidth,w1 = _parent.width(),w2 = _parent.find('ul').width();
				if((l + w1 + w2) > w) {
					_parent.find('ul').css({marginLeft:-(w1+w2+8)+'px'});
				}else{
					_parent.find('ul').css({marginLeft:0});
				}
			});
			$('body').on('mouseleave','.fc-dropdown .childOpen',function(){
				$(this).removeClass('childOpen');
				$(this).children('.fc-dropdown-menu-title + ul').fadeOut(200);
			});

			// close dropdown menu
		    $(document).on('click',function(e){
		        var _A = $('.fc-dropdown>a');
		        var _B = $('.fc-dropdown.show');
		        var _C = $('.fc-dropdown .fc-dropdown-menu:visible');
		        var _D = $('.fc-dropdown-disabled');
		        var _T = $('.fc-dropdown-menu-title');
		        var flag = false;
		        if(!_A.is(e.target) && _A.has(e.target).length === 0 && !_D.is(e.target) && _D.has(e.target).length === 0 && !_T.is(e.target) && _T.has(e.target).length === 0){
		        	layui.each($('.fc-dropdown'),function(i,d){
		        		if($(d).hasClass('show')){
		        			flag = true;
		        		}
		        	})
		        	if(flag) {
			        	_B.find('.fc-dropdown-menu').addClass(_animOutClass);
			        	_B.removeClass('show');
			        	timer2 = setTimeout(function(){
			        		_C.removeClass(_animOutClass);
			        	},option.delay);
		        	}
		        }
		    });
        },
    };
	exports("fcDropdown", fcDropdown);
})