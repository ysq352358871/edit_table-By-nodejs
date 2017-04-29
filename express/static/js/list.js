$(document).ready(function () {
    var arr=["num","name","sex","age"];
    $(".btn").on("click",function () {
        $.ajax({
            url:"/addTable/",
            type:"POST",
            dataType:"json",
            success:function (obj) {
                if(!isNaN(obj.id)){
                    var tr=$("<tr>");
                    tr.attr("attr",obj.id);
                    for(var i=0;i<arr.length;i++){
                        var td = $("<td>");
                        td.addClass("first");
                        td.attr("attr",arr[i]);

                        tr.append(td);
                    }
                    var td =$("<td>");
                    td.html("<div class='del'>删除</div>");
                    tr.append(td);
                    $("tbody").append(tr);
                }else{
                    alert(obj);
                }

            }
        })
    })

    $("tbody").delegate(".del","click",function () {

         var parent=this.parentNode.parentNode
        $.ajax({
            url:"/del/",
            type:"post",
            data:{id:$(parent).attr("attr")},
            success:function (obj) {
                if(obj==="yes"){
                    $("tbody")[0].removeChild(parent);
                    parent="";
                }
            }
        })
    })
    $("tbody").delegate(".first:not(:has(input))","click",function () {
        var input=$("<input>");
        var value=$(this).html();
        input.val(value);
        $(this).html("");
        input.appendTo($(this));
        input.focus();
        var that=this;	//注意this指向问题；
        input.blur(function(){
            if(input.val()==""||input.val()==value){
                $(that).html(value);
            }else{
                $(that).html(input.val());
                var id=$(that).parent().attr("attr");
                console.log(id);
                $.ajax({
                    url:"/update/",
                    type:"post",
                    data:{id:id,attr:$(that).attr("attr"),value:$(that).html()},
                    success:function(obj){
                        console.log(obj);
                    }
                })
            }
            input.remove();
            input=null;
        })
    })


})
