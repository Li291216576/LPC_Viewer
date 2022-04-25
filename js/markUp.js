var markArr = new Array();
var viewpointArr = new Array();
var userNameArr = new Array();
var timeArr = new Array();
var imgArr = new Array();
var commentArr= new Array();

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
                viewpointArr.push(obvApi.getViewPointInfo());
                Markup_Length=imgArr.push(result.blobUrl);
                userNameArr[Markup_Length-1] = new Array();
                timeArr[Markup_Length-1] = new Array();
                commentArr[Markup_Length-1] = new Array();
                
                userNameArr[Markup_Length-1].push(userName);
                timeArr[Markup_Length-1].push(getTime());

                
                var htmlStr="";
                for(let i=0;i<Markup_Length;i++)
                {
                    htmlStr+=outputCase(i);
                }
                $(".ss-content").empty().append(htmlStr);
            });
        }
    });

}

function outputCase(id){
    var tmpStr="";
    tmpStr+='<br/>';
    tmpStr+='<div id="example_block" class="commentCase" style="position: relative; width:220px;height: 270px; background-color: rgba(123, 123, 123, 0.5);left: 0;border-radius: 8px;border: 2.5px solid #000;">';
    tmpStr+='<a id="'+id+'" onclick="getMark('+id+')"><img id="'+id+'" class="picture_case" src="'+imgArr[id]+'" style=""  /></a>';
    tmpStr+='<span class="creator_time" ><strong>Creator:</strong> '+userNameArr[id][0]+'</span><br/>';
    tmpStr+='<span class="creator_time" ><strong>Time:</strong> '+timeArr[id][0]+'</span>';
    tmpStr+='<button id="'+id+'" name="Comments" class="button_case" style="left: 10px;">Comments</button>';
    tmpStr+='<button id="'+id+'" name="Edit" class="button_case" style="left: 5px;">Edit</button>';
    tmpStr+='<button id="'+id+'" onclick="deleteMark(id)" name="Delete" class="button_case">Delete</button></div><br/>';
    return tmpStr;
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
    userNameArr.splice(id,1);
    timeArr.splice(id,1);
    imgArr.splice(id,1);
    Markup_length=imgArr.length;
    var htmlStr="";
    for(let i=0;i<Markup_length;i++)
    {
        htmlStr+=outputCase(i);
    }
    $(".ss-content").empty().append(htmlStr);
}



function getTime(){
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var date = myDate.getDate();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    alert(typeof(hour));
    var myTime = myDate.toTimeString();
    myTime = myTime.substr(0,8)
    var time = year+"-"+month+"-"+date+" "+myTime;
    return time;
}
