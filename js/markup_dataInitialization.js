var emsd_header;
var lpc_footer;
function dataInit(){
	var settings = {
		"async":false,
		"url":"http://localhost/zentaopms/module/file/ext/view/viewer/backend/markup_dataInitialization.php",
		"type":"POST",
		"dataType":"json",
		"timeout":0,
		 "data":{
            "modelName":fileName,
        }
		
	};
	$.ajax(settings).success(function(response){

		for (var i=0;i<response["imgArr"].length;i++){
			imgArr[i] = response["imgArr"][i];
			markArr[i] = JSON.parse(response["markArr"][i]);
			viewpointArr[i] = strToObject(JSON.parse(response["viewpointArr"][i]));
		}

		for(var i=0;i<response["comment"].length;i++){
			for(var j=0;j<response["comment"][i].length;j++){
				commentArr[i][j]=response["comment"][i][j];
				commentorArr[i][j]=response["commentorArr"][i][j];
				timeArr[i][j]=response["timeArr"][i][j]; 
			}
		}

		emsd_header = response["emsdHeader"];
		lpc_footer = response["lpcFooter"];

		showScreenShotInfo(imgArr.length);

	});

	function strToObject(text){
		var info_arr = JSON.parse(text);
		for(let key in info_arr){
			if(typeof(info_arr[key])=="string")
			{
				if(info_arr[key].indexOf(".")!=-1){info_arr[key]=parseFloat(info_arr[key]);}
				else if(info_arr[key].indexOf("false")!=-1){info_arr[key]=false;}
				else if(info_arr[key].indexOf("true")!=-1){info_arr[key]=true;}
				else{info_arr[key]=parseInt(info_arr[key]);}
			}
			else if(typeof(info_arr[key]=="object")){
				for(let key_2 in info_arr[key])
				{
					if(info_arr[key][key_2].indexOf(".")!=-1){info_arr[key][key_2]=parseFloat(info_arr[key][key_2]);}
					else{info_arr[key][key_2]=parseInt(info_arr[key][key_2]);}
				}
			}
		}
		return info_arr;
	}
}