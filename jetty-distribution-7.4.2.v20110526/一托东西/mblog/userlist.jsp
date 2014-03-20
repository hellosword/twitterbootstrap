<%@page import="javax.management.relation.Relation"%>
<%@page import="mblog.Bean.*"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	//request.setCharacterEncoding("UTF-8");
	User currentUser = (User) request.getSession().getAttribute("user");
	if (currentUser == null) {
		response.sendRedirect("login.jsp");
		return;
	}

	List<User> userList = (List<User>) request.getSession()
			.getAttribute("userlist");
	String userlist_type = (String) request.getSession().getAttribute(
			"userlist_type");
%>
<div id="fans_menu">
	<a id="my_fans" href="javascript:loadfancomp()">关注我的</a> <a
		id="my_listen" href="javascript:loadlistencomp()">我关注的</a>
</div>
<div id="userlist">
	<%
		for (User user : userList) {
			//System.out.println(user.getUserId() + user.getNickname());
	%>

	<div class="user">
		<div class="user_info">
			<a href="javascript:loadfriendspace(<%=user.getUserId()%>);;"><img
				class="avatar_border" alt=""
				src="images/img/owner_avatar_border.png"><img
				class="avatar_img" alt="" src="images/avatar/<%=user.getAvatar()%>"><span><%=user.getNickname()%></span>
			</a>

		</div>
		<div class="op">
			<%
				if (userlist_type.equals("fans")) {
			%>
			<a href="javascript:removeFan(<%=user.getUserId()%>);">移除粉丝</a>
			<%
				} else {
			%>
			<a href="javascript:removeFocus(<%=user.getUserId()%>);">解除关注</a>
			<%
				}
			%>
		</div>
	</div>
	<%
		}
	%>
</div>