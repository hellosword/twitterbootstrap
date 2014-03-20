<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="mblog.Bean.*"%>
<%
	request.setCharacterEncoding("UTF-8");
	User user = (User) request.getSession().getAttribute("user");
	if (user == null) {
		response.sendRedirect("login.jsp");
		return;
	}

	List<Mblog> mblogs = (List<Mblog>) request.getSession()
			.getAttribute("mbloglist");
	for (Mblog mblog : mblogs) {
%>
<div class="new_item">
	<div class="sayer">
		<img class="avatar_border" alt=""
			src="images/img/owner_avatar_border.png"><img
			class="avatar_img" alt=""
			src="images/avatar/<%=mblog.getUser().getAvatar()%>">
	</div>
	<div class="saying">
		<div class="saying_left"></div>
		<div class="saying_box">
			<p>
				<span><%=mblog.getUser().getNickname()%>：</span><%=mblog.getContent()%>
			</p>
			<div class="saying_func">
				<div class="saying_info">
					<span><%=mblog.getPubTime()%></span>
				</div>
				<div class="saying_operation">
					<a href="javascript: void(0)"
						onclick="loadComments(this,'<%=mblog.getMblogId()%>')">评论[<span><%=mblog.getComments().size()%></span>]</a>
				</div>
			</div>
		</div>
		<div class="comment_container"></div>
		<input type="hidden" value="<%=mblog.getMblogId()%>" />
	</div>
</div>
<%
	}
%>