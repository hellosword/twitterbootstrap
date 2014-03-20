<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="mblog.Bean.*"%>
<%
	User user = (User) request.getSession().getAttribute("user");
	if (user == null) {
		response.sendRedirect("login.jsp");
		return;
	}

	List<Comment> comments = (List<Comment>) request.getSession()
			.getAttribute("commentlist");
%>
<div class="comment_box">
	<textarea class="comment_area"></textarea>
	<a href="javascript:void(0);" onclick="addComment(this)" type="button"
		class="reply"></a>

	<%
		for (Comment comment : comments) {
	%>

	<p>
		<span><%=comment.getUser().getNickname()%>：</span><%=comment.getContent()%>
	</p>
	<%
		}
	%>
	<a class="fold" href="javascript: void(0)">收起</a>
</div>