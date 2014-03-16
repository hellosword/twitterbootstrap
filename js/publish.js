$("document").ready(function () {
    //$("#form-signin").submit(function () {

    /*	
    $("#login_button").click(function () {	
    	//$("#form-signin").validation();
        //http://tomwork.sinaapp.com
       
    });
*/
    function show_ok(){
        $inner = $('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>干得漂亮！</strong>新活动发布成功了!!!</div>');
        $("#pub_result").append($inner)
        .removeClass("hidden")
        .addClass("show");
    }
    function show_error(){
        $inner = $('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Sorry！</strong>新活动发布失败了!!!</div>');
        $("#pub_result").append($inner)
        .removeClass("hidden")
        .addClass("show");
    }
    function clear_form(){
        $("input").val(''); 
        $("textarea").val(''); 
    }
    function checkAndSubmit(){
         $.post("json/pubEvent.action",
            {
                event_title    :   ($("#event_title")[0].value),
                event_content   :   ($("#event_content")[0].value)
            },
            function (data) {
                alert(data);
                if (data.error_type==0) {
                    show_ok();
                    clear_form();
                } else {
                    //alert(data);
                    show_error();
                   // $("#result").show(1000);
                }
            }
        );
    }
    $("#cancel").click(function(){
        clear_form();
    });
    $("#form-pub").validate({
        rules: {
           event_title: {
            required: true
           },
           event_content: {
            required: true,
            minlength: 15
           }
        },
        messages: {
           event_title: {
            required: "活动标题不能为空"
           },
           event_content: {
            required: "请编辑活动详情",
            minlength: jQuery.format("详情不能小于{0}个字 符")
           }
        }
        ,
        submitHandler:function(form){
            //alert("submitted");   
            //form.submit();
            //show_ok();
            checkAndSubmit();
        }    
    });
});

