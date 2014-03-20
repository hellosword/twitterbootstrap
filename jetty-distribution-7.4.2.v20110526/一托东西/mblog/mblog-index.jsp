<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="mblog.Bean.User"%>
<%
	User user = (User) request.getSession().getAttribute("user");
	if (user == null) {
		response.sendRedirect("/mblog");
		return;
	}
%>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="styles/mblog_index.css" />
<link rel="stylesheet" type="text/css" href="styles/personnal_space.css" />
<link rel="stylesheet" type="text/css" href="styles/mblog.css" />
<link rel="stylesheet" type="text/css" href="styles/mblog_list.css" />
<link rel="stylesheet" type="text/css" href="styles/right_container.css" />
<script type="text/javascript" src="scripts/jquery-1.8.2.js"></script>
<script type="text/javascript" src="scripts/mblog.js"></script>
<script type="text/javascript" src="scripts/signin.js"></script>
<script type="text/javascript" src="scripts/UnityObject.js"></script>
<script type="text/javascript"
	src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>

<title>D-blog</title>
</head>
<body>
	<input id="userID_record" type="hidden" value="<%=user.getUserId()%>" />
	<div id="personnal_space">
		<div id="ownerspace">
			<div id="info">
				<div id="text">
					<p id="nickname"><%=user.getNickname()%></p>
					<p id="other_info">
						<span><%=(user.getGender().equals("male")) ? "男" : "女"%></span><span>
							<%=user.getComeFrom()%> </span>
					</p>
				</div>
				<div id="tags">
					<div id="tag_title">
						我的标签
						<div id="tag_op">
							<input type="text" placeholder="新标签" id="new_tag" /><a
								href="javascript: addTag()">+</a> <a
								href="javascript: editTag()">-</a>
						</div>
					</div>
					<ul id="taglist">

					</ul>
				</div>
			</div>
			<div id="p_menu">
				<div id="avatar">
					<img id="avatar_border" alt="border"
						src="images/img/owner_avatar_border.png" /> <img id="avatar_img"
						alt="avatar" src="images/avatar/a.jpg" />
				</div>
				<a class="p_menu_item" id="fans_item"
					href="javascript:loadfancomp();">关注</a> <a class="p_menu_item"
					id="impression_item" href="javascript:loadimpressioncomp();">印象</a>
				<a class="p_menu_item" id="settings" href="javascript:void(0);">设置</a>
			</div>
			<div id="p_container"></div>
		</div>
	</div>
	<div id="mblog_list">
		<div id="new_things"></div>
		<div id="footer">
			<div id="foot_sep1"></div>
			<div id="foot_sep2"></div>
			<div id="say_box">
				<textarea id="say_area" name="saying" placeholder="说点什么和大家分享一下吧！"></textarea>
				<div class="tools">
					<ul class="tools">
						<li class="tools"><a href="javascript:void(0);"> <img
								src="images/img/pic_icon.png" />照片</a>
						</li>
						<li class="tools"><a href="javascript:void(0);"> <img
								src="images/img/video_icon.png" />视频</a></li>
						<li class="tools"><a href="javascript:void(0);"> <img
								src="images/img/face_icon.png" />表情</a></li>
					</ul>
				</div>
				<a href="javascript:addMblog();" type="button" id="say_it"></a>
				<div id="count">
					还能输入<span>140</span>字
				</div>
			</div>
		</div>
	</div>
	<div id="right_container">
		<div id="right_tools">
			<a id="recommand_user" href="javascript: recFriends()"><img
				src="images/img/recommand_icon.png" /> </a> <a id="find_user"
				href="javascript: loadSearch()"><img
				src="images/img/search_icon.png" /> </a><a id="draw_something"
				href="javascript: gotoDraw()"><img
				src="images/img/draw_something_icon.png" /> </a> <a id="sign_in_map"
				href="javascript: initialize()"><img
				src="images/img/sign_in_icon.png" /> </a> <a id="view_map"
				href="javascript: viewMap()"><img src="images/img/map_icon.png" />
			</a> <a id="3D" href="javascript: show3D()"><img
				src="images/img/3D_icon.png" /> </a>
				<a id="3D" href="logout"><img
				src="images/img/logout.png" /> </a>

		</div>
		<div id="right_func"></div>
	</div>

</body>
</html>