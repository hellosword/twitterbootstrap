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

	List<Mark> markList = (List<Mark>) request.getSession()
			.getAttribute("marksList");
	for (Mark mark : markList) {
%>
<li><%=mark.getTag().getTag()%><input type="hidden"
	value="<%=mark.getMarkId()%>" />
</li>
<%
	}
%>