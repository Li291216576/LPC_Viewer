function reviseAddComment(){
	
$("#resultList").on("each","span[id='creatorTag']",function(){
	creator=$(this).text();
	creator=creator.slice(9,creator.length);
	if(creator==userName){
		$(this).siblings("#commentRevise").show();
	}
});

$("#resultList").on("click","button[name='comment']",function(){
	$(this).siblings("#commentPanel").show();
	$(this).siblings("button[name='commentSubmit']").show().attr("disabled",true);
	$(this).hide();
});

$("#resultList").on("input propertychange","#commentPanelarea",function(){
	console.log($(this).val());
	if($(this).val()!="")$(this).parents("#commentPanel").siblings("button[name='commentSubmit']").attr("disabled",false);
});

$("#resultList").on("click","button[name='commentSubmit']",function(){
	comment=$(this).siblings("#commentPanel").children("#commentPanelarea").val();
	$(this).siblings("#commentPanel").children("#commentPanelarea").val('');
	$(this).siblings("#commentPanel").hide();
	$(this).siblings("button[name='comment']").show();
	$(this).hide();
	addComment_id=$(this).parent().attr("id");
	addComment_id=parseInt(addComment_id);
	commentArr[addComment_id].push(comment);
	commentorArr[addComment_id].push(userName);
	timeArr[addComment_id].push(getTime());
	showScreenShotInfo(imgArr.length);
});

$("#resultList").on("click","button[id='commentRevise']",function(){
	comment=$(this).siblings("#comment").text();
	var textarea=$("<textarea>");
	textarea.attr("value",comment);
	textarea.attr("rows",3);
	textarea.css("resize","none").css("width",185);
	$(this).siblings("#comment").after(textarea);
	$(this).siblings("#comment").remove();
	$(this).siblings("#commentSave").show();
	$(this).hide();
});


$("#resultList").on("click","button[id='commentSave']",function(){
	comment=$(this).siblings("textarea").val();
	screenShotID=$(this).parents(".commentCase").attr("id");
	commentID=$(this).parent().attr("id");
	screenShotID=parseInt(screenShotID);
	commentID=parseInt(commentID);
	commentArr[screenShotID][commentID]=comment;
	timeArr[screenShotID][commentID]=getTime();
	showScreenShotInfo(imgArr.length);
});

}