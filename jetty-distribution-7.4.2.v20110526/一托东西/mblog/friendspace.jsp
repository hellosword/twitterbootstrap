<%@page import="javax.management.relation.Relation"%>
<%@page import="mblog.Bean.*"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	//request.setCharacterEncoding("UTF-8");
	User user = (User) request.getSession().getAttribute("otherUser");
%>
<div id="friendspace">
	<div id="info">
		<div id="text">
			<p id="nickname"><%=user.getNickname()%></p>
			<p id="other_info">
				<span><%=(user.getGender().equals("male")) ? "男" : "女"%></span><span>
					<%=user.getComeFrom()%> </span>
			</p>
		</div>
		<div id="friendOP">
			<a id="back_to_owner" href="javascript: backToOwner()">返回我的个人主页</a>
			<%
				if (user.isFocused()) {
			%>
			<a id="add_focus" href="javascript: void(0)"
				onclick="removeFocusinsearch(this,<%=user.getUserId()%>)">解除关注</a>


			<%
				} else {
			%>
			<a id="add_focus" href="javascript: void(0)"
				onclick="addFocus(this,<%=user.getUserId()%>)">添加关注</a>

			<%
				}
			%>
		</div>
		<div id="tags">
			<div id="tag_title">TA的标签</div>
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
		<a style="width: 260px" class="p_menu_item" id="impression_item"
			href="javascript:loadimpressioncomp(<%=user.getUserId()%>);">印象</a>
	</div>
	<div id="p_container"></div>
</div>