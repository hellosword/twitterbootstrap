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

	List<Impress> impressList = (List<Impress>) request.getSession()
			.getAttribute("impressionlist");
	Integer userId = (Integer) request.getSession().getAttribute("userId");
	String type = (String) request.getSession().getAttribute("type");
	if (type.equals("me")) {
%>
<div>
	<a href='javascript: editImp(<%=userId%>)' id="edit_imp">编辑印象</a>
</div>
<%
	} else {
%>
<div id="imp_op">
	<input type="text" placeholder="新标签" id="new_imp" /><a
		href="javascript: addImp(<%=userId%>)">+</a>
</div>
<%
	}
%>
<ul id="impressionlist">

	<%
		for (Impress impress : impressList) {
	%>
	<li class="impression"><%=impress.getImpression().getImpression()%><input
		type="hidden" value="<%=impress.getImpressId()%>" /></li>
	<%
		}
	%>
</ul>