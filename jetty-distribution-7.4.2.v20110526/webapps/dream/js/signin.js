$("document").ready(function () {
    //$("#form-signin").submit(function () {

    /*	
    $("#login_button").click(function () {	
    	//$("#form-signin").validation();
        //http://tomwork.sinaapp.com
       
    });
*/
    function checkAndSubmit(){
         $.post($basedomain+"json/login.action",
            {
                user_name    :   ($("#user_name")[0].value),
                user_password  :   ($("#user_password")[0].value)
            },
            function (data) {
                //alert(data);
                if (data.error_type==0) {
                    self.location = $basedomain+"publish.html";
                } else {
                    alert("登录失败，英雄请重新来过！");
                   // $("#result").show(1000);
                }
            }
        );
    }
    $("#form-signin").validate({
        rules: {
           user_name: {
            required: true,
            minlength: 4
           },
           user_password: {
            required: true,
            minlength: 4
           }
        },
        messages: {
           user_name: {
            required: "请输入您的昵称",
            minlength: jQuery.format("昵称至少为{0}个字 符")
           },
           user_password: {
            required: "请输入密码",
            minlength: jQuery.format("密码不能小于{0}个字 符")
           }
        },/*
        errorPlacement: function(error, element) {
            
            if ( element.is(":radio") )
                
                error.appendTo( element.parent().next().next() );
            else if ( element.is(":checkbox") )
                error.appendTo ( element.next() );
            else
                error.appendTo( element.parent().next() );
        },*/
        submitHandler:function(form){
            //alert("submitted");   
            //form.submit();
            checkAndSubmit();
        }    
    });
});

