<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="mblog.Bean.*"%>
<%
	User user = (User) request.getSession().getAttribute("user");
	if (user == null) {
		response.sendRedirect("mblog/login.jsp");
		return;
	}

	List<Comment> comments = (List<Comment>) request.getSession()
			.getAttribute("commentlist");
%>
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
			我的标签<span>+</span><span>-</span>
		</div>
		<ul>
			<li>音乐</li>
			<li>文艺范</li>
			<li>校园风</li>
			<li>90后</li>
			<li>小清新</li>
			<li>二次元</li>
		</ul>
	</div>
</div>
<div id="p_menu">
	<div id="avatar">
		<img id="avatar_border" alt="border"
			src="images/img/owner_avatar_border.png" /> <img id="avatar_img"
			alt="avatar" src="images/avatar/a.jpg" />
	</div>
	<a class="p_menu_item" id="fans_item" href="javascript:loadfancomp();">关注</a>
	<a class="p_menu_item" id="impression_item"
		href="javascript:loadimpressioncomp();">印象</a> <a class="p_menu_item"
		id="settings" href="javascript:void(0);">设置</a>
</div>
<div id="p_container"></div>