<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
    <form method="post" enctype="multipart/form-data" action="json/completeInf.action">
      <input type="file" name="image"/>
      <input type="text" name="user_email">
      <input type="text" name="user_gender">
      <input type="text" name="user_id">
      <!--<input type="text" name="user_id" value="1">
      <input type="text" name="email" value="1">
      <input type="text" name="telephone" value="1">
      <input type="text" name="name" value="1">
      <input type="text" name="total" value="100">
      --><input type="submit" value="tijiao">
    </form>
    <form method="post" enctype="multipart/form-data" action="json/pubEvent.action">
      <input type="file" name="image"/>
      <input type="text" name="event_title">
      <input type="text" name="event_content">
      <!--<input type="text" name="user_id" value="1">
      <input type="text" name="email" value="1">
      <input type="text" name="telephone" value="1">
      <input type="text" name="name" value="1">
      <input type="text" name="total" value="100">
      --><input type="submit" value="tijiao">
    </form>
  </body>
</html>
