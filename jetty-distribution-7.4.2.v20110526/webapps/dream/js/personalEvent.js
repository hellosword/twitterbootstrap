$(document).ready(function() {
	//vendor script
	  $('[data-toggle=offcanvas]').click(function () {
	    $('.row-offcanvas').toggleClass('active')
	  });

	  function getList(){
	  	//showEvent.action?mode=singleperson&num=2913（mode代表事件类型：singleperson、group;num代表事件ID,原理同上）
         $.post("json/showEvent.action",
            {
                mode    :   "group"//,
                //num     :   2913 
            },
            function (data) {
                if (data.error_type==0) {
                    var evntlist=data.events;
					var i;
					
					
					var $eventPanel = $("#container");
                    evntlist.map(function (oneEvnt) {
						var $evntBox=$("#templateEvent>div").clone(true);
						$evntBox.find("img").attr("src",oneEvnt.event_image);
						$evntBox.find("strong").text(oneEvnt.event_title);
						$evntBox.find("p").text(oneEvnt.event_content);
						$evntBox.find("div.meta").text("by "+oneEvnt.user_name);
						$eventPanel.prepend($evntBox);
                    });
					$('#container').BlocksIt({
						numOfCol: 5,
						offsetX: 8,
						offsetY: 8
					});
                } else {
                    alert("请求失败");
                }
            }
        );

	  }

	
	//blocksit define
	$(window).load( function() {
		$('#container').BlocksIt({
			numOfCol: 5,
			offsetX: 8,
			offsetY: 8
		});
	});
	
	//window resize
	var currentWidth = 1100;
	$(window).resize(function() {
		var winWidth = $(window).width();
		var conWidth;
		if(winWidth < 660) {
			conWidth = 440;
			col = 2
		} else if(winWidth < 880) {
			conWidth = 660;
			col = 3
		} else if(winWidth < 1100) {
			conWidth = 880;
			col = 4;
		} else {
			conWidth = 1100;
			col = 5;
		}
		
		if(conWidth != currentWidth) {
			currentWidth = conWidth;
			$('#container').width(conWidth);
			$('#container').BlocksIt({
				numOfCol: col,
				offsetX: 8,
				offsetY: 8
			});
		}
	});
	/**/
	$('#top')
	.css({ 'top':-50 })
	.delay(1000)
	.animate({'top': 0}, 800);
	
	$('footer')
	.css({ 'bottom':-15 })
	.delay(1000)
	.animate({'bottom': 0}, 800);
	  getList();
});