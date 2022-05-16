$("#compareBlock .chosen-drop").on("mouseover","li",function(){
        $(this).addClass("highlighted");
    }).on("mouseout","li",function(){
        $(this).removeClass("highlighted");
    });


/*输入框的聚焦和失焦*/
    originalValue_Compare = "Please choose to compare...";

    $("#compareBlock .chosen-container").on("focus","input",function(){
      //alert("11333");
      if($(this).val()===originalValue_Compare){
        $(this).val("");
      }
      $(this).parents(".chosen-container").addClass("chosen-with-drop chosen-container-active");
    }).on("blur","input",function(){
      //alert("2222");
      //console.log("input value:"+$(this).val());
      if($(this).val()==""){
        $(this).val(originalValue_Compare);
      }
      $(this).parents(".chosen-container").removeClass("chosen-with-drop chosen-container-active");
    });

/*将选中的文件名添加到信息板*/
    $("#compareBlock .chosen-drop").on("click","input",function(){
      if($(this).prop("checked")){
          var checkNum = countCheckNum();
          if(checkNum<=2){
            $(this).siblings("label").css("color","rgb(211,211,211)");
            filename = $(this).attr("id");
            addFilename_Compare(filename);
          }else if(checkNum>2){
            alert("Compare function requires no more than two versions");
            $(this).prop("checked",false);
          }
        }else{
          $(this).siblings("label").css("color","#444");
          filename = $(this).attr("id");
          removeFilename_Compare(filename);
        }
    });

    function countCheckNum(){
      var count = 0;
      $("#compareBlock .chosen-drop input").each(function(){
        if($(this).prop("checked"))count++;
      });
      return count;
    }

    function addFilename_Compare(filename){
      var html="";
      html += '<div id="'+filename+'" style="position: relative;width: 100%;height: 30px;">';
      html += '<div style="position: relative;width: 80%;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;float: left; font-size: 13px;line-height: 20px; vertical-align: top;margin: 5px;" title="'+filename+'">'+filename+'</div>';
      html += '<button id="cancleFile"><img width="16" height="16" src="./icon/cancle-24.png"></button>';
      html += '</div>';
      $("#compareModelPanel").append(html);
    }
    function removeFilename_Compare(filename){
      var property = "[id='"+filename+"']";
      $("#compareModelPanel").children(property).remove();
    }

/*对信息板中的文件进行删除*/
$("#compareModelPanel").on("click","#cancleFile",function(){
      var idFilename = $(this).parent().attr("id");
      $(".chosen-results input[id='"+idFilename+"']").prop('checked',false).siblings("label").css("color","#444");
      $(this).parent().remove();     
  });

/*进行字符串模糊搜索*/
    $("#compareBlock .chosen-container input").keyup(function(){
      var search_str = $.trim($(this).val());
      if(search_str!=""){
        var search_str_length=search_str.length;
        $("#compareBlock .chosen-results li").each(function(){
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
        $("#compareBlock .chosen-results li").each(function(){
          var search_name = $(this).children("input").attr("id");
          console.log("empty search_name:"+search_name);
          $(this).children("label").html(search_name);
          $(this).show();
        });
      }
    });

    /*combine按钮和refresh按钮*/
    $("#compareBlock #compareModel").click(function(){
        var checkNum = countCheckNum();
        if(checkNum == 2){
          var titleChose = new Array();
          $("#compareModelPanel").children().each(function(){
            titleChose.push($(this).attr("id"));
          });
          var fileNameChose = new Array();
          for(var i=0;i<titleChose.length;i++){
            fileNameChose.push(fileNameArr[titleArr.indexOf(titleChose[i])]);
          }
          console.log(fileNameChose);
          //obvApi.uninitializeViewer();
          //loadModel_3D(fileNameChose,fileNameChose.length);
        }else if(checkNum < 2){
          alert("Unable to compare. Please choose two version to compare."); 
        }
          
        });
        
        $("#compareBlock #restoreModel").click(function(){
          var deleteFileId = new Array();
          $("#compareModelPanel #cancleFile").each(function(){
            deleteFileId.push($(this).parent().attr("id"));
            $(this).parent().remove();
          });
          console.log(deleteFileId);
          for(var i=0;i<deleteFileId.length;i++){
            $("#compareBlock .chosen-results input[id='"+deleteFileId[i]+"']").prop('checked',false).siblings("label").css("color","#444");
          }

          //obvApi.uninitializeViewer();
          //loadModel_3D(fileNameArr,1);
        });