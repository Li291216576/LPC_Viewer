function reviseAddComment(){
	
$("span[id='creatorTag']").each(function(){
	creator=$(this).text();
	creator=creator.slice(9,creator.length);
	if(creator==userName){
		$(this).siblings("#commentRevise").show();
	}
});

$("button[name='comment']").click(function(){
	$("#commentPanel").show();
	$("button[name='commentSubmit']").show().attr("disabled",true);
	$(this).hide();
});

$("#commentPanelarea").bind("input propertychange",function(){
	console.log($(this).val());
	if($(this).val()!="")$("button[name='commentSubmit']").attr("disabled",false);
});

$("button[name='commentSubmit']").click(function(){
	//alert($("#commentPanel").val());
	comment=addComment($("#commentPanelarea").val());
	$("#commentList").append(comment);
	$("#commentPanelarea").val('');
	$("#commentPanel").hide();
	$("button[name='comment']").show();
	$(this).hide();
});

$("#commentList").on("click","button[id='commentRevise']",function(){
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


$("#commentList").on("click","button[id='commentSave']",function(){
	comment=$(this).siblings("textarea").val();
	
	var span=$("<span>");
	span.attr("id","comment").css("position","relative");
	span.html(comment);
		
	$(this).siblings("textarea").after(span);
	$(this).siblings("textarea").remove();
	$(this).siblings("#commentRevise").show();
	$(this).hide();
});

function addComment(comment){
	var htmlStr='';
	htmlStr+='<div style="border-bottom: 2px solid #666;">';
	htmlStr+='<span id="creatorTag" class="creator_time" ><strong>Creator: </strong>'+userName+'</span><br/>';
	htmlStr+='<span id="timeTag" class="creator_time" ><strong>Time:</strong> 2022.04.18 18:26:52</span><br/>';
	htmlStr+='<span id="commentTag" class="creator_time"><strong>Comment:</strong></span>';
	htmlStr+='<button id="commentRevise" class="button_revise">Revise</button>';
	htmlStr+='<button id="commentSave" class="button_revise" style="display:none;">Revise</button>';
	htmlStr+='<br/><span id="comment" style="position: relative;">'+comment+'</span></div>';
	return htmlStr;

}
}