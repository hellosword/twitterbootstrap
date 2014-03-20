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
			.getAttribute("search_userlist");
	if (userList == null || userList.size() == 0) {
%>
<div class="user" style="color: #FFF">无符合条件用户</div>
<%
	} else {
		for (User user : userList) {
%>
<div class="user">
	<div class="user_info">
		<a href="javascript:void(0);"><img class="avatar_border" alt=""
			src="images/img/owner_avatar_border.png"><img
			class="avatar_img" alt="" src="images/avatar/<%=user.getAvatar()%>"><span><%=user.getNickname()%></span>
		</a>
	</div>
	<div class="op">
		<%
			if (user.isMyFan()) {
		%>
		<a href="javascript:void(0);"
			onclick="removeFaninsearch(this, <%=user.getUserId()%>)">除粉</a>
		<%
			}
					if (user.isFocused()) {
		%>
		<a href="javascript: void(0);"
			onclick="removeFocusinsearch(this, <%=user.getUserId()%>)">解除</a>
		<%
			} else {
		%>
		<a href="javascript:void(0);"
			onclick="addFocus(this, <%=user.getUserId()%>)">关注</a>
		<%
			}
		%>
	</div>
</div>
<%
	}
	}
%>
