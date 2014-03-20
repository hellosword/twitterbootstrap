<%@ page language="java" import="dream.util.config.ApplicationConfiguration" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>查看大图</title>

    <!-- Bootstrap core CSS -->
    <link href="dist/css/bootstrap.min.css" rel="stylesheet">

  </head>
  <body style="background-color:black;">
    
    <div class="row" >
   		 <div class="col-md-12">
    	<%
    		String image = request.getParameter("image");
    		if(image != null){
    			image = image.substring(image.lastIndexOf("images/")+7);
    			image = ApplicationConfiguration.SAE_IMAGES_PATH + image;
    	%>
    		<img width="100%" src="<%=image %>"/>
    	<%
    		}else{
    	 %>
    	 	<div>图片不存在</div>
    	 <%
    		}
    	 %>
  		</div>
	</div>
  </body>
</html>
