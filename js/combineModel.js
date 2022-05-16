$("#addModelBlock .chosen-drop").on("mouseover","li",function(){
        $(this).addClass("highlighted");
    }).on("mouseout","li",function(){
        $(this).removeClass("highlighted");
    });


/*输入框的聚焦和失焦*/
    originalValue = "Please input here...";

    $("#addModelBlock .chosen-container").on("focus","input",function(){
      if($(this).val()==originalValue){
        $(this).val("");
      }
      $(this).parents(".chosen-container").addClass("chosen-with-drop chosen-container-active");
    }).on("blur","input",function(){
      //console.log("input value:"+$(this).val());
      if($(this).val()==""){
        $(this).val(originalValue);
      }
      $(this).parents(".chosen-container").removeClass("chosen-with-drop chosen-container-active");
    });

/*将选中的文件名添加到信息板*/
    $("#addModelBlock .chosen-drop").on("click","input",function(){
      if($(this).prop("checked")){
          $(this).siblings("label").css("color","rgb(211,211,211)");
          filename = $(this).attr("id");
          addFilename_Combine(filename);
        }else{
          $(this).siblings("label").css("color","#444");
          filename = $(this).attr("id");
          removeFilename_Combine(filename);
        }
    });

    function addFilename_Combine(filename){
      var html="";
      html += '<div id="'+filename+'" style="position: relative;width: 100%;height: 24px;">';
      html += '<div style="position: relative;width: 80%;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;float: left; font-size: 13px;line-height: 24px; vertical-align: top;" title="'+filename+'">'+filename+'</div>';
      html += '<button id="cancleFile"><img width="16" height="16" src="./icon/cancle-24.png"></button>';
      html += '</div>';
      $("#addModelPanel .ss-content").append(html);
    }
    function removeFilename_Combine(filename){
      var property = "[id='"+filename+"']";
      $("#addModelPanel .ss-content").children(property).remove();
    }

/*对信息板中的文件进行删除*/
$("#addModelPanel").on("click","#cancleFile",function(){
      var idFilename = $(this).parent().attr("id");
      $(".chosen-results input[id='"+idFilename+"']").prop('checked',false).siblings("label").css("color","#444");
      $(this).parent().remove();     
  });

/*进行字符串模糊搜索*/
    $("#addModelBlock .chosen-container input").keyup(function(){
      var search_str = $.trim($(this).val());
      if(search_str!=""){
        var search_str_length=search_str.length;
        $("#addModelBlock .chosen-results li").each(function(){
          var search_name = $(this).children("input").attr("id");
          var indexArr = new Array();
          if(typeof($(this).children("input").attr("id"))!="undefined"){
            $(this).hide();
            var regex = RegExp(search_str,"gi");
            while((info = regex.exec(search_name))!==null)
            {
              console.log(info);
              indexArr.push(info["index"]);
            }
            console.log(search_name+" indexArr:"+indexArr);

            for(var i=0;i<indexArr.length;i++){
              head = search_name.substring(0,indexArr[i]);
              body = search_name.substring(indexArr[i],indexArr[i]+search_str_length);
              foot = search_name.substring(indexArr[i]+search_str_length,search_name.length);
              search_name = head+"<u>"+body+"</u>"+foot;
              for(var j = i; j<indexArr.length;j++){
                indexArr[j]+=7;
              }
            }
            $(this).children("label").html(search_name);
            if(indexArr.length!=0){$(this).show();}
          }
        });
      }else{
        $("#addModelBlock .chosen-results li").each(function(){
          var search_name = $(this).children("input").attr("id");
          console.log("empty search_name:"+search_name);
          $(this).children("label").html(search_name);
          $(this).show();
        });
      }
    });

    /*combine按钮和refresh按钮*/
    $("#addModelBlock #combineModel").click(function(){
          var titleChose = new Array();
          $("#addModelPanel .ss-content").children().each(function(){
            titleChose.push($(this).attr("id"));
          });
          var fileNameChose = new Array();
          for(var i=0;i<titleChose.length;i++){
            fileNameChose.push(fileNameArr[titleArr.indexOf(titleChose[i])]);
          }
          console.log(fileNameChose);
          obvApi.uninitializeViewer();
          loadModel_3D(fileNameChose,fileNameChose.length);
        });
        
        $("#addModelBlock #restoreModel").click(function(){
          var deleteFileId = new Array();
          $("#addModelPanel .ss-content #cancleFile").each(function(){
            deleteFileId.push($(this).parent().attr("id"));
            $(this).parent().remove();
          });
          for(var i=0;i<deleteFileId.length;i++){
            $("#addModelBlock .chosen-results input[id='"+deleteFileId[i]+"']").prop('checked',false).siblings("label").css("color","#444");
          }

          obvApi.uninitializeViewer();
          loadModel_3D(fileNameArr,1);
        });