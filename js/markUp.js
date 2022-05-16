var m=500;
var n=500;
var markArr = new Array();
var viewpointArr = new Array();
var imgArr = new Array();
var commentArr= new Array(m);
var commentorArr = new Array(m);
var timeArr = new Array(m);
for(var i=0;i<m;i++)
{
    commentorArr[i]=new Array();
    commentArr[i]=new Array();
    timeArr[i]=new Array();
}

function markUp(){

    $(".mark__button").click(function(){
        const markupAddin=getMarkupAddin();
        if(markupAddin){
            tag_value=$(this).val();
            if(tag_value!="Exit"){
                markupAddin.enterEditMode();
                $(this).css("background-color","#ddd");
                $(this).siblings().css("background-color","rgba(111, 111, 111, 0.8)");
                markupAddin.setMarkupType(tag_value);
            }else if(tag_value=="Exit" && markupAddin.isActive){
                $(this).siblings().css("background-color","");
                $(this).css("background-color","");
                markupAddin.unloadMarkupData();
                alert('Exit Markup Status');
            }
        }
    });

   $("#takeScreenShot").click(function(){
        const markupAddin=getMarkupAddin();
        if(markupAddin.isActive){
            markupAddin.takeScreenShot(400,400).then((result)=>{
                markArr.push(markupAddin.getMarkupData());
                //console.log("marking Information:\n"+typeof(markupAddin.getMarkupData()));
                viewpointArr.push(obvApi.getViewPointInfo());
                //console.log("Viewpoint Information:\n"+obvApi.getViewPointInfo());
                Markup_Length=imgArr.push(result.blobUrl);
                commentArr[Markup_Length-1].push($("#commentContent").val());
                commentorArr[Markup_Length-1].push(userName);
                timeArr[Markup_Length-1].push(getTime());
                showScreenShotInfo(Markup_Length);
            });
        }
    });

}

function showScreenShotInfo(length){
    var htmlStr="";
    for(let i=0;i<length;i++)
    {
        htmlStr+=outputCase(i);
    }
    $("#resultList .ss-content").empty().append(htmlStr);
    $("#resultList").find("#creatorTag").each(function(){
        creator = $(this).text();
        creator = creator.slice(9,creator.length);
        if(creator==userName){
            $(this).siblings("#commentRevise").show();
        }
    });

    postData();
}

function postData(){
    var settings={
        "async":false,
        "url":"http://localhost/zentaopms/module/file/ext/view/viewer/backend/markup_dataProcess.php",
        "type":"POST",
        "timeout":0,
        "data":{
            "modelName":fileName,
            "viewpointArr":viewpointArr,
            "markArr":markArr,
            "imgArr":imgArr,
            "commentArr":commentArr,
            "commentorArr":commentorArr,
            "timeArr":timeArr,
        }
    }
    $.ajax(settings).success(function(response){
        //console.log(response);
    });
}

function outputCase(id){
    var tmpStr="";
    tmpStr+='<br/>';
    tmpStr+='<div id="'+id+'" class="commentCase" style="position: relative; width:220px;height: auto; background-color: rgba(123, 123, 123, 0.5);left: 0;border-radius: 8px;border: 2.5px solid #000;">';
    tmpStr+='<a id="'+id+'" onclick="getMark('+id+')"><img id="'+id+'" class="picture_case" src="'+imgArr[id]+'" style=""  /></a>';
    tmpStr+='<div id="commentList" class="commentList" style="display: ;width: 190px;margin: 0 auto;">';
    tmpStr+=outputComment(id);
    tmpStr+='</div>';
    tmpStr+='<div id="commentPanel" style="display: none; border-bottom: 2px solid #666; height: 90px;width: 190px;margin: 0 auto;">';
    tmpStr+='<textarea id="commentPanelarea" placeholder="Drop your notice here." style="border: 0; position: relative; width: 170px; height:60px;padding: 10px;resize: none;border-radius: 8px;  top: 5px;background-color: rgba(241, 241, 241, 1);" /></textarea></div>';
    tmpStr+='<button name="comment" class="button_case" style="left: 10px;width: 80px;">Comment</button>';
    tmpStr+='<button name="commentSubmit" class="button_case" style="left: 10px;width: 80px; display: none;">Submit</button>';
    tmpStr+='<button class="button_case" onclick="deleteMark('+id+')">Delete</button></div>';
    return tmpStr;
}

function outputComment(id){
    comment_length = commentArr[id].length;
    var commentStr="";
    for(var i=0;i<comment_length;i++)
    {
        commentStr+='<div id="'+i+'" style="border-bottom: 2px solid #666;">';
        commentStr+='<span id="creatorTag" class="creator_time" ><strong>Creator:</strong> '+commentorArr[id][i]+'</span><br/>';
        commentStr+='<span id="timeTag" class="creator_time" ><strong>Time:</strong> '+timeArr[id][i]+'</span><br/><span id="commentTag" class="creator_time"><strong>Comment:</strong></span>';
        commentStr+='<button id="commentRevise" class="button_revise" style="display:none;">Revise</button><button id="commentSave" class="button_revise" style="display:none;">Save</button><br/>';
        commentStr+='<span id="comment" style="position: relative;">'+commentArr[id][i]+'</span></div>';
    }
    return commentStr;
}

function getMarkupAddin () {
        let markupAddin;
        const markupAddinId = 'OBVAddins.Markup';
        // 获取管理插件的addinManager
        const addinManager = obvApi.getAddinManager();
        // 通过addinManager获取插件
        markupAddin = addinManager.getAddin(markupAddinId);
        return markupAddin;
}

function getMark(id){
    const markupAddin=getMarkupAddin();
    if(markupAddin){
        markupAddin.unloadMarkupData();
        obvApi.setViewPointInfo(viewpointArr[id]);
        markupAddin.loadMarkupData(markArr[id]);
        $("#mark_arrow").css("background-color","#ddd");
        $("#mark_arrow").siblings().css("background-color","rgba(111, 111, 111, 0.8)");
    }
}

function deleteMark(id){
    markArr.splice(id,1);
    viewpointArr.splice(id,1);
    imgArr.splice(id,1);
    Markup_length=imgArr.length;
    commentorArr.splice(id,1);
    timeArr.splice(id,1);
    commentArr.splice(id,1);
    showScreenShotInfo(Markup_length);
}

function getTime(){
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var date = myDate.getDate();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    //alert(typeof(hour));
    var myTime = myDate.toTimeString();
    myTime = myTime.substr(0,8)
    var time = year+"-"+month+"-"+date+" "+myTime;
    return time;
}

function markupInfoTable(){
    var str = "<div>";
    for(var i=0;i<imgArr.length;i++){
        str += "<p>Note "+(i+1)+"</p>";
        str += "<table align='center'>"
        str += "<tr><th>Screen Capture</th><td><img width='350' height='350' src='"+imgArr[i]+"'></td></tr>";
        str += "<tr><th>Content</th><td>"+commentArr[i][0]+"</td></tr>";
        str += "<tr><th>Content</th><td><div>"
        for(var j=1;j<commentArr[i].length;j++){               
            str += "<p>"+ commentorArr[i][j]+" "+timeArr[i][j]+"</p>";
            str += "<p>"+ commentArr[i][j]+"</p>";
            str += "<br>";
        }
        str += "</div></td></tr>"
        str += "<tr><th>Originator/Author</th><td>"+commentorArr[i][0]+"</td></tr>";
        str += "<tr><th>Updated Time</th><td>"+timeArr[i][0]+"</td></tr>";
        str += "<tr><th>Upload Version</th><td>null</td></tr>";
        str += "</table></div>"
    }
    return str;
}



