var userId;
var right_func_fold = true;
var indraw;
var ownerhtml;
$().ready(function() {
	$("#say_box .tools").hide();
	$("#say_box #count").hide();
	$("#say_box #say_it").hide();
	$("#say_box").click(function() {
		showSayBox();
	});
	$("#footer").mouseleave(function() {
		hideSayBox();
	});
	$("#say_area").keyup(function() {
		checkSayingWords();
	});
	var width = $("body").width() - 450;
	$("#footer").width(width);
	$("#say_area").width(width - 70);

	// init userId
	userId = $("#userID_record").val();
	ownerhtml = $("#ownerspace").html();

	// load tags
	loadTags();

	// load mbog list
	loadMbloglist();

	// load my fans
	loadfancomp();

});

function getRandomColor() {
	return "hsl(" + Math.random() * 360 + ", 70%, 70%)";
}

function getRandomFontSize() {
	return 12 + Math.random() * 20;
}

function loadfriendspace(uId) {
	if (uId == undefined) {
		uId = userId;
	}
	var load = function(msg) {
		$("#ownerspace").fadeOut(function() {
			$("#ownerspace").empty();
			$(msg).appendTo("#personnal_space");
			loadTags(uId);
			loadimpressioncomp(uId);
		});
	};
	$.ajax({
		type : "POST",
		url : "viewUser",
		data : {
			userID : uId
		}
	}).done(load);
}

function backToOwner() {
	$("#friendspace").fadeOut(function() {
		$("#friendspace").remove();
		$("#ownerspace").html(ownerhtml);
		loadTags();
		loadfancomp();
		$("#ownerspace").fadeIn();
	});
}

function showSayBox() {
	$("#footer").animate({
		height : 160
	});
	$("#say_area").animate({
		height : 60
	});
	$("#say_box .tools").show();
	$("#say_box #count").show();
	$("#say_box #say_it").show();
}

function hideSayBox() {
	$("#footer").animate({
		height : 80
	});
	$("#say_area").animate({
		height : 30
	});
	$("#say_box .tools").hide();
	$("#say_box #count").hide();
	$("#say_box #say_it").hide();
}

function checkSayingWords() {
	var maxlimit = 140;
	var content = $("#say_area").val();
	var length = content.length;
	if (length > 140) {
		$("#say_area").val(content.substring(0, maxlimit));
	} else {
		$("#count span").text(maxlimit - length);
	}
}

function loadPersonnalSpace() {
	var content = $("#say_area").val();
	$("#say_area").val("");
	var loadmblogs = function(msg) {
		$("#new_things").html(msg);
		// hide comment container
		$(".comment_container").hide();
	};
	$.ajax({
		type : "POST",
		url : "m/add",
		data : {
			content : content
		}
	}).done(loadmblogs);
}

function loadTags(uId) {
	if (uId == undefined) {
		uId = userId;
	}
	var load = function(msg) {
		$("#taglist").html(msg);
	};
	$.ajax({
		type : "POST",
		url : "t/view",
		data : {
			userID : uId
		}
	}).done(load);
}

function addTag() {
	var tag = $("#new_tag").val();
	$("#new_tag").val("");
	var loadtags = function(msg) {
		$("#taglist").html(msg);
	};
	$.ajax({
		type : "POST",
		url : "t/add",
		data : {
			userID : userId,
			tag : tag
		}
	}).done(loadtags);
}

var isEditingTag;
function editTag() {
	if (isEditingTag) {
		$("a.delete_tag").remove();
		isEditingTag = false;
	} else {
		$(
				"<a class='delete_tag' href='javascript: void(0)' onclick='deleteTag(this)'>x</a>")
				.appendTo("#taglist li");
		isEditingTag = true;
	}
}

function deleteTag(a) {
	if (confirm("确定删除标签？")) {
		var markId = $(a).parent().find("input").val();
		var remove = function(msg) {
			$(a).parent().remove();
		};
		$.ajax({
			type : "POST",
			url : "t/no",
			data : {
				markID : markId,
			}
		}).done(remove);
	}
}

var isEditingImp;
function editImp() {
	if (isEditingImp) {
		$("a.delete_imp").remove();
		isEditingImp = false;
	} else {
		$(
				"<a class='delete_imp' href='javascript: void(0)' onclick='deleteImp(this)'>x</a>")
				.appendTo("#impressionlist li");
		isEditingImp = true;
	}
}

function deleteImp(a) {
	if (confirm("确定删除印象？")) {
		var impId = $(a).parent().find("input").val();
		var remove = function(msg) {
			$(a).parent().remove();
		};
		$.ajax({
			type : "POST",
			url : "i/no",
			data : {
				impressionID : impId,
			}
		}).done(remove);
	}
}

function addImp(uId) {
	if (uId == undefined) {
		uId = userId;
	}
	var imp = $("#new_imp").val();
	$("#new_imp").val("");
	$.ajax({
		type : "POST",
		url : "i/add",
		data : {
			userID : uId,
			impression : imp
		}
	}).done(function() {
		loadimpressioncomp(uId);
	});
}

function addFocus(a, uId) {
	$(a).text("解除关注");
	$(a).attr("onclick", "");
	$(a).click(function() {
		removeFocusinsearch(a, uId);
	});
	$.ajax({
		type : "POST",
		url : "l/add",
		data : {
			userID : uId
		}
	});
}

function removeFan(uId) {
	if (confirm("确定移除该粉丝？")) {
		var loadmyfans = function(msg) {
			$("#p_container").html(msg);
			$(".p_menu_item").css({
				"border-bottom" : "none"
			});
			$("#fans_item").css({
				"border-bottom" : "2px #8EB800 solid"
			});
			$("#fans_menu a").css({
				"border-bottom" : "none"
			});
			$("#my_fans").css({
				"border-bottom" : "2px #8EB800 solid"
			});
		};
		$.ajax({
			type : "POST",
			url : "l/nofan",
			data : {
				userID : uId
			}
		}).done(loadmyfans);
	}
}

function removeFaninsearch(a, uId) {
	if (confirm("确定移除该粉丝？")) {
		$(a).remove();
		$.ajax({
			type : "POST",
			url : "l/nofan",
			data : {
				userID : uId
			}
		});
	}
}

function removeFocus(uId) {
	if (confirm("确定解除关注？")) {
		var loadmyfans = function(msg) {
			$("#p_container").html(msg);
			$("#fans_menu a").css({
				"border-bottom" : "none"
			});
			$("#my_listen").css({
				"border-bottom" : "2px #8EB800 solid"
			});
		};
		$.ajax({
			type : "POST",
			url : "l/no",
			data : {
				userID : uId
			}
		}).done(loadmyfans);
	}
}

function removeFocusinsearch(a, uId) {
	$(a).text("添加关注");
	$(a).attr("onclick", "");
	$(a).click(function() {
		addFocus(a, uId);
	});
	$.ajax({
		type : "POST",
		url : "l/no",
		data : {
			userID : uId
		}
	});
}

function addMblog() {
	var content = $("#say_area").val();
	$("#say_area").val("");
	var loadmblogs = function(msg) {
		$("#new_things").html(msg);
		// hide comment container
		$(".comment_container").hide();
	};
	$.ajax({
		type : "POST",
		url : "m/add",
		data : {
			content : content
		}
	}).done(loadmblogs);
}

function loadMbloglist() {
	var loadmblogs = function(msg) {
		$("#new_things").html(msg);
		// hide comment container
		var width = $("body").width() - 450;
		$("#mblog_list").width(width);
		$(".comment_container").hide();
	};
	$.ajax({
		type : "POST",
		url : "m/view",
		data : undefined
	}).done(loadmblogs);
}

function loadfancomp() {
	var loadmyfans = function(msg) {
		$("#p_container").html(msg);
		$(".p_menu_item").css({
			"border-bottom" : "none"
		});
		$("#fans_item").css({
			"border-bottom" : "2px #8EB800 solid"
		});
		$("#fans_menu a").css({
			"border-bottom" : "none"
		});
		$("#my_fans").css({
			"border-bottom" : "2px #8EB800 solid"
		});
	};
	$.ajax({
		type : "POST",
		url : "l/viewfan",
		data : undefined
	}).done(loadmyfans);
}

function loadlistencomp() {
	var loadmyfans = function(msg) {
		$("#p_container").html(msg);
		$("#fans_menu a").css({
			"border-bottom" : "none"
		});
		$("#my_listen").css({
			"border-bottom" : "2px #8EB800 solid"
		});
	};
	$.ajax({
		type : "POST",
		url : "l/viewlisten",
		data : undefined
	}).done(loadmyfans);
}

function loadimpressioncomp(uId) {
	if (uId == undefined) {
		uId = userId;
	}
	var loadimpressions = function(msg) {
		$("#p_container").html(msg);
		$(".p_menu_item").css({
			"border-bottom" : "none"
		});
		$("#impression_item").css({
			"border-bottom" : "2px #8EB800 solid"
		});
		$(".impression").each(function() {
			$(this).css({
				"font-size" : getRandomFontSize(),
				// "background-color" : getRandomColor()
				"color" : getRandomColor()
			});
		});
	};
	$.ajax({
		type : "POST",
		url : "i/view",
		data : {
			userID : uId
		}
	}).done(loadimpressions);

}

function loadComments(a, mblogId) {
	var container = $(a).parent().parent().parent().next();
	var loadCommentlist = function(msg) {
		container.html(msg);
		container.animate({
			height : 'toggle'
		});
		var width = $("#new_things").width();
		$(".comment_area").width(width - 180);
		$(".fold").click(function() {
			container.animate({
				height : 'toggle'
			});
		});
	};
	// alert(mblogId);
	$.ajax({
		type : "POST",
		url : "c/view",
		data : {
			mblogID : mblogId
		}
	}).done(loadCommentlist);
}

function addComment(a) {
	var container = $(a).parent().parent();
	var mblogId = container.next().val();
	var content = $(a).prev().val();

	var loadCommentlist = function(msg) {
		container.html(msg);
		var numspan = container.prev().find(".saying_operation span");
		numspan.text(parseInt(numspan.text()) + 1);
		var width = $("#new_things").width();
		$(".comment_area").width(width - 180);
		$(".fold").click(function() {
			container.animate({
				height : 'toggle'
			});
		});
	};
	// alert(mblogId);
	$.ajax({
		type : "POST",
		url : "c/add",
		data : {
			mblogID : mblogId,
			content : content
		}
	}).done(loadCommentlist);
}

function recFriends() {
	if (right_func_fold) {
		$("#right_func").empty();
		$("#right_container")
				.animate(
						{
							width : 300
						},
						function() {
							$("#right_func").hide();
							$("<div id='search_list'></div>").appendTo(
									"#right_func");
							$("#right_func").css({
								width : 240
							});
							$("#right_func").animate({
								width : 'toggle'
							});
							$(
									"<a id='backToMblog' href='javascript: backToMblog()'><img src='images/img/back_icon.png' /></a>")
									.appendTo("#right_tools");
							loadReclist();
						});
		right_func_fold = false;
		indraw = false;
	} else {
		if (indraw) {
			$("#right_container").animate({
				width : 300
			});
		}
		$("#right_func").empty();
		$("#right_func").animate({
			width : 'toggle'
		}, function() {
			$("<div id='search_list'></div>").appendTo("#right_func");
			$("#right_func").css({
				width : 240
			});
			$("#right_func").animate({
				width : 'toggle'
			});
			loadReclist();
		});
		indraw = false;
	}

}

function loadReclist() {
	var loadusers = function(msg) {
		$("#search_list").html(msg);
	};
	$.ajax({
		type : "POST",
		url : "recFriends",
		data : undefined
	}).done(loadusers);
}

function loadSearch() {
	if (right_func_fold) {
		$("#right_func").empty();
		$("#right_container")
				.animate(
						{
							width : 300
						},
						function() {
							$("#right_func").hide();
							$(
									"<input id='search_nick_input' placeholder='输入昵称搜索' />")
									.appendTo("#right_func");
							$("<div id='search_list'></div>").appendTo(
									"#right_func");
							$("#right_func").css({
								width : 240
							});
							$("#right_func").animate({
								width : 'toggle'
							});
							$("#search_nick_input").keydown(function(e) {
								if (e.which == 13) {
									loadSearchlist();
								}
							});
							$(
									"<a id='backToMblog' href='javascript: backToMblog()'><img src='images/img/back_icon.png' /></a>")
									.appendTo("#right_tools");
						});
		right_func_fold = false;
		indraw = false;
	} else {
		if (indraw) {
			$("#right_container").animate({
				width : 300
			});
		}
		$("#right_func").empty();
		$("#right_func").animate(
				{
					width : 'toggle'
				},
				function() {
					$("#right_func").empty();
					$("<input id='search_nick_input' placeholder='输入昵称搜索' />")
							.appendTo("#right_func");
					$("<div id='search_list'></div>").appendTo("#right_func");
					$("#right_func").css({
						width : 240
					});
					$("#right_func").animate({
						width : 'toggle'
					});
					$("#search_nick_input").keydown(function(e) {
						if (e.which == 13) {
							loadSearchlist();
						}
					});
				});
		indraw = false;
	}

}

function loadSearchlist() {
	var nickname = $("#search_nick_input").val();
	var loadusers = function(msg) {
		$("#search_list").html(msg);
	};
	$.ajax({
		type : "POST",
		url : "s/nick",
		data : {
			nickname : nickname
		}
	}).done(loadusers);
}

function gotoDraw() {
	var width = $("body").width() - 52;
	var height = $("body").height();
	if (right_func_fold) {
		$("#right_func").empty();
		$("#right_func").load("App/appMain.jsp", function() {
			$("#paintContainer").width(width);
			$("#paintContainer .mainBox").width(width - 302);
			$("#paintContainer .sideBox .sayingItems").height(height - 340);
		});
		$("#right_container").animate({
			width : '100%'
		});
		$(
				"<a id='backToMblog' href='javascript: backToMblog()'><img src='images/img/back_icon.png' /></a>")
				.appendTo("#right_tools");
		right_func_fold = false;
		indraw = true;
	} else {
		if (indraw) {
			return;
		} else {
			$("#right_func").animate(
					{
						width : 'toggle'
					},
					function() {
						$("#right_func").empty();
						$("#right_func").load(
								"App/appMain.jsp",
								function() {
									$("#paintContainer").width(width);
									$("#paintContainer .mainBox").width(
											width - 340);
									$("#paintContainer .sideBox .sayingItems")
											.height(height - 300);
								});
						$("#right_container").animate({
							width : '100%'
						});
						$("#right_func").width(width);
						$("#right_func").animate({
							width : 'toggle'
						});
					});
			indraw = true;
		}
	}
}

function viewMap() {
	if (right_func_fold) {
		$("#right_func").empty();
		$("<div id='map'></div>").appendTo("#right_func");
		// $("#right_func").load("App/friendsMap.jsp");

		$("#right_container").animate({
			width : '100%'
		}, function() {
			var width = $("#right_container").width() - 52;
			$("#map").css({
				"width" : width,
				"float" : "right"
			});
			load();
		});
		$(
				"<a id='backToMblog' href='javascript: backToMblog()'><img src='images/img/back_icon.png' /></a>")
				.appendTo("#right_tools");
		right_func_fold = false;
		indraw = true;
	} else {
		if (indraw) {
			return;
		} else {
			$("#right_func").empty();
			$("#right_func").animate({
				width : 'toggle'
			}, function() {
				$("<div id='map'></div>").appendTo("#right_func");

				$("#right_container").animate({
					width : '100%'
				}, function() {
					var width = $("#right_container").width() - 52;
					$("#map").css({
						"width" : width,
						"float" : "right"
					});
					load();
				});
				var width = $("body").width() - 52;
				$("#right_func").width(width);
				$("#right_func").animate({
					width : 'toggle'
				});
			});
			indraw = true;
		}
	}
}

var customIcons = {
	restaurant : {
		icon : 'http://labs.google.com/ridefinder/images/mm_20_blue.png',
		shadow : 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
	},
	bar : {
		icon : 'http://labs.google.com/ridefinder/images/mm_20_red.png',
		shadow : 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
	}
};

function load() {
	var map = new google.maps.Map(document.getElementById("map"), {
		center : new google.maps.LatLng(47.6145, -122.3418),
		zoom : 13,
		mapTypeId : 'roadmap'
	});
	var infoWindow = new google.maps.InfoWindow;

	downloadUrl("json/viewFriendsMap", function(data) {
		var xml = data.responseText;
		var markers = JSON.parse(xml);
		for ( var i = 0; i < markers.length; i++) {
			var name = markers[i].name;
			var address = markers[i].address;
			var type = markers[i].type;
			var point = new google.maps.LatLng(parseFloat(markers[i].lat),
					parseFloat(markers[i].lng));
			if (type == "bar") {
				map.setCenter(point);
			}
			var html = "<b>" + name + "</b> <br/>" + address;
			var icon = customIcons[type] || {};
			var marker = new google.maps.Marker({
				map : map,
				position : point,
				icon : icon.icon,
				shadow : icon.shadow
			});

			bindInfoWindow(marker, map, infoWindow, html);
		}
	});
}

function bindInfoWindow(marker, map, infoWindow, html) {
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(html);
		infoWindow.open(map, marker);
	});
}

function downloadUrl(url, callback) {
	var request = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP')
			: new XMLHttpRequest;

	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			request.onreadystatechange = doNothing;
			callback(request);
		}
	};

	request.open('POST', url, true);
	request.send(null);
}

function doNothing() {

}

function backToMblog() {
	$("#right_func").empty();
	if (right_func_fold) {
		return;
	}
	if (!indraw) {
		$("#right_func").animate({
			width : 'toggle'
		});
	}
	$("#right_container").animate({
		width : 50
	});
	$("#backToMblog").remove();
	right_func_fold = true;
	indraw = false;
}

function show3D() {
	if (right_func_fold) {
		$("#right_func").empty();
		$("#right_func").load(
				"App/WebPlayer.html",
				function() {
					var width = $("body").width() - 52;
					$("#paintContainer").width(width);
					if (typeof unityObject != "undefined") {
						var width = $("body").width() - 52;
						var height = $("body").height();
						unityObject.embedUnity("unityPlayer",
								"WebPlayer.unity3d", width, height);
					}
				});
		$("#right_container").animate({
			width : '100%'
		});
		$(
				"<a id='backToMblog' href='javascript: backToMblog()'><img src='images/img/back_icon.png' /></a>")
				.appendTo("#right_tools");
		right_func_fold = false;
		indraw = true;
	} else {
		if (indraw) {
			return;
		} else {
			$("#right_func").animate(
					{
						width : 'toggle'
					},
					function() {
						$("#right_func").empty();
						$("#right_func").load(
								"App/WebPlayer.html",
								function() {
									if (typeof unityObject != "undefined") {
										var width = $("body").width() - 52;
										var height = $("body").height();
										unityObject.embedUnity("unityPlayer",
												"WebPlayer.unity3d", width,
												height);
									}
								});
						$("#right_container").animate({
							width : '100%'
						});
						var width = $("body").width() - 52;
						$("#right_func").width(width);
						$("#right_func").animate({
							width : 'toggle'
						});
					});
			indraw = true;
		}
	}
}

function GetUnity() {
	if (typeof unityObject != "undefined") {
		return unityObject.getObjectById("unityPlayer");
	}
	return null;
}
/*
 * function GetUnity() { if (typeof unityObject != "undefined") { return
 * unityObject.getObjectById("unityPlayer"); } return null; } if (typeof
 * unityObject != "undefined") { unityObject.embedUnity("unityPlayer",
 * "WebPlayer.unity3d", 1350, 620); }
 */