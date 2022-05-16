function callViewer() /*调用API：3D/2D/3D&2D*/
{
	Format_3D=["rvt","rfa","nwd","nwc","imodel","idgndb","dwf","dwfx","skp","ifc","obj","dae","3ds","fbx","stl","ipt","rvm","3dm","pln","pla","ms3d","x3d","obmx"];
    Format_2D=["dwg","dgn","dxf"];
    Format_2D_3D=["pmodel"];

    data=window.location.href.split("?")[1];
    keyValue=data.split("&");
    obj={};
    for(var i=0;i<keyValue.length;i++){
    	var item=keyValue[i].split("=");
    	var key=item[0];
    	var value=item[1];
    	obj[key]=value;
    }

    fileNameArr = new Array();
    titleArr = new Array();

    nameTitleArr = JSON.parse(localStorage.getItem("nameTitleArr"));
    console.log(nameTitleArr);
    //console.log(nameTitleArr[0]["name"]);
    for(var i=0;i<nameTitleArr.length;i++){
    	fileNameArr.push(nameTitleArr[i]["name"]);
    	titleArr.push(nameTitleArr[i]["title"]);
    }

    userName=obj['userName'].replace("#","");
    title=titleArr[0];
    fileName=fileNameArr[0];
    format=fileNameArr[0].split('_')[2];
    modelInfoInitialize();

    $("#title").css("height",$height*0.03).css("top",$height*0.0225).css("left",$height*0.40).css("font-size",$height*0.025).html("MODEL : "+title).css("vertical-align","top");
    //html("MODEL : "+title).css("font-size",$height*0.025).css("top",$height*0.005).css("left",$height*0.55);//.css("top",$height*0.0075).css("left",$width*0.5);
    

    if(Format_3D.indexOf(format)!=-1){$("#viewer_3D").show(); loadModel_3D(fileNameArr,1);}
    else if(Format_2D.indexOf(format)!=-1){$("#viewer_2D").show();loadModel_2D(fileNameArr[0]);}
    else if(Format_2D_3D.indexOf(format)!=-1){$("#viewer_2D_3D").show();interaction_2D3D(fileNameArr[0]);}
}

function modelInfoInitialize(){
	var html= '';
	html+='<li class="active-result" ><label for="'+titleArr[0]+'" style="color: rgb(211, 211, 211);">'+titleArr[0]+'(base model)</label></li>';
	for(var i=1;i<titleArr.length;i++)
	{
		html+='<li class="active-result" ><label for="'+titleArr[i]+'">'+titleArr[i]+'</label><input type="checkbox" id="'+titleArr[i]+'" style="position: relative;float: right;"></li>'
	}
	$("#addModelBlock .chosen-results").append(html);
	
	html='';
	html+='<div id="'+titleArr[0]+'" style="position: relative;width: 100%;height: 24px;">';
	html+='<div id="baseModel" style="position: relative;width: 80%;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;float: left; font-size: 13px;line-height: 24px; vertical-align: top;" title="'+titleArr[0]+'(base model)">'+titleArr[0]+'<strong>(base model)</strong></div>';
	html+='</div>';
	$("#addModelPanel .ss-content").append(html);
            		
    html= '';
	for(var i=0;i<titleArr.length;i++)
	{
		
		html+='<li class="active-result" ><label for="'+titleArr[i]+'">'+titleArr[i]+'</label><input type="checkbox" id="'+titleArr[i]+'" style="position: relative;float: right;"></li>'
	}
	$("#compareBlock .chosen-results").append(html);		

}


function adaptiveIcon()/*调整页面icon来适应网页页面*/
{
	$width=$(window).height();
	$height=$(window).height();
	//console.log("height:"+$height);
	$("#emsd_header").css("height",$height*0.06).css("top",$height*0.0075).css("left",$width*0.06);
	$("#lpc_header").css("height",$height*0.06).css("top",$height*0.0075).css("left",$width*0.13);
	$("#help_header").css("height",$height*0.06).css("top",$height*0.01).css("right",$width*0.06);
	$("#emsd_footer").css("height",$height*0.06).css("top",$height*0.0075).css("right",$width*0.27);
	$("#lpc_footer").css("height",$height*0.06).css("top",$height*0.0075).css("right",$width*0.06);
	$("#commentBlock").css("height",$height*0.8);
	$("#markingTools").css("height",($height*0.8-60)*0.98);
	$("#commentData").css("height",($height*0.8-60)*0.98);
	$("#resultPanel").css("height",((($height*0.8-60)*0.98)-144)*0.98);

}


function textFill(input)/*搜索栏的小功能：聚焦消除提示；失焦显示提示*/
{
	var originalValue=input.val();
	input.focus(function(){
		$("#addModelBlock").css("background-color","rgba(128, 128, 128, 0.82)");
	if($.trim(input.val())==originalValue)
	{
		input.val('');
		
	}
	}).blur(function(){
		$("#addModelBlock").css("background-color","rgba(128, 128, 128, 0.8)");
	if($.trim(input.val())=='')
	{
		input.val(originalValue);
		
	}
	});
}

var drag = function(obj,block,ul,addblock,compareblock) /*FUN.构建的拖拉+点击功能*/
{

	obj.on("mousedown",start);
	function start(event){
		if(event.button==0)
		{
			gapX=event.clientX - obj.offset().left;
			gapY=event.clientY - obj.offset().top;
			//console.log("1:"+gapX+";"+gapY);
			x1=event.clientX;
			y1=event.clientY;
			console.log("1.1:"+x1+";"+y1);
			$(document).bind("mousemove",move);
			$(document).bind("mouseup",stop);
		}
		return false;
	}
	
	function move(event){
		x_tmp=event.clientX;
		y_tmp=event.clientY;
		console.log("2.1:"+x_tmp+";"+y_tmp);
		if($("#functionBtn").is(':visible'))
    	{
    		block.css({"left":(x_tmp-gapX)+"px","top":(y_tmp-gapY)+"px"});
			ul.css({"left":(x_tmp-gapX+20)+"px","top":(y_tmp-gapY)+"px"});
			addblock.css({"left":(x_tmp-gapX+20)+"px","top":(y_tmp-gapY)+"px"});
			compareblock.css({"left":(x_tmp-gapX+20)+"px","top":(y_tmp-gapY)+"px"});
    	}
    	else if($("#functionBtn_back").is(':visible'))
    	{
    		block.css({"left":(x_tmp-gapX)+"px","top":(y_tmp-gapY)+"px"});
			ul.css({"left":(x_tmp-gapX+20)+"px","top":(y_tmp-gapY)+"px"});
			addblock.css({"left":(x_tmp-gapX+20)+"px","top":(y_tmp-gapY)+"px"});
			compareblock.css({"left":(x_tmp-gapX+20)+"px","top":(y_tmp-gapY)+"px"});
    	}
		return false;
	}

	function stop(){
		x2=event.clientX;
		y2=event.clientY;
			//console.log("2:"+x2+";"+y2);
    	var _val=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    		//console.log(_val);
    	if(_val>=0 && _val<=2){
    		if($("#functionBtn").is(':visible'))
    		{
    			$("#functionBtn").click(function(){
    				var check = $("#functionPanel").is(':visible');
    				$("#functionPanel")[check?"slideUp":"slideDown"]();
    				$(this).unbind("click");
    			});
    		}
    		else if($("#functionBtn_back").is(':visible'))
    		{
    			$("#functionBtn_back").click(function(){
    				$(this).hide();
    				$("input[value='FUN.']").show();
    				$("#addModelBlock").hide();
    				$("#compareBlock").hide();
					$("#functionPanel").slideDown();
    				$(this).unbind("click");
    			});
    		}
    	}
		$(document).unbind("mousemove",move);
		$(document).unbind("mouseup",stop);
	}
}



jQuery.fn.slideLeftHide = function( speed, callback ) {  
    this.animate({  
        width : "hide",
        paddingRight : "hide",   
        paddingLeft : "hide",  
        marginRight : "hide", 
        marginLeft : "hide" 
    }, speed, callback );  
};  
jQuery.fn.slideLeftShow = function( speed, callback ) {  
    this.animate({  
        width : "show",  
        paddingLeft : "show",  
        paddingRight : "show",  
        marginLeft : "show",  
        marginRight : "show"  
    }, speed, callback );  
};  