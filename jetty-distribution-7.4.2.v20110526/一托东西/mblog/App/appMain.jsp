<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page language="java" import="mblog.Bean.User"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
<base href="<%=basePath%>" />
<meta charset="utf-8">
<title>Paint</title>
<link rel="stylesheet" href="styles/Paint.css">
<link rel="stylesheet" id="roomCSS" href="styles/room.css">
<script src="scripts/main.js"></script>
</head>

<body>
	<div id="paintContainer">

		<div class="mainBox" id="mainBox">
			<div class="rooms" id="roomsDiv">
				<table id="rooms">

				</table>
				<div id="loading">加载中···</div>
			</div>
		</div>
		<%
			User user = (User) request.getSession().getAttribute("user");
		%>

		<div class="sideBox" id="sideBox">
			<div class="logo"><img src="images/img/logo.png" /></div>
			<div class="myOperations" id="myOperations">
				<div class="createRoom" id="createRoom">创建房间</div>
			</div>
			<div class="saying" id="saying">
				<div class="sayingTitle">聊天信息：</div>
				<div class="sayingItems" id="console">
					<%--        <div class="sayingItem"><span class="username">aaa</span>:<span class="content">傻逼</span></div>--%>
				</div>
				<div class="sayingBox" id="sayingBox">
					<input type="text" id="sayingInput" /> <input type="button"
						value="发送" id="sayingButton" />
				</div>
			</div>
		</div>
		<input type="hidden" id="hiddenUserID" value="<%=user.getUserId()%>" />
	</div>
</body>
</html>