<?php

	$serverName = "localhost";
   	$userName = "root";
   	$password = "";
   	$fileName=$_POST['modelName'];

   	$conn = mysqli_connect($serverName,$userName,$password);
   	if(!$conn){
   		die("Connection Failed: ".mysqli_connect_error());
   	}
   	//echo "链接成功\n";

   	$search_sql = "";
   	$search_sql .= "SELECT * FROM viewer_data.basicinfo WHERE modelName = '".$fileName."';";

   	$result = mysqli_query($conn,$search_sql);

   	if(mysqli_num_rows($result)>0){
   		while($row = mysqli_fetch_assoc($result)){
   			$initial_fileName = $row["modelName"];
   			$i = $row["screenShotID"];
   			$initial_imgDirArr[$i] = $row["screenShot"];
   			$initial_viewpointArr[$i] = json_encode($row["viewPoint"]);
   			$initial_markArr[$i] = json_encode($row["markingInfo"]);

   		}
   	}


   	$search_sql = "SELECT * FROM viewer_data.commentlist WHERE modelName = '".$fileName."';";
   	$result = mysqli_query($conn,$search_sql);
   	if(mysqli_num_rows($result)>0){
   		while($row = mysqli_fetch_assoc($result)){
   			$n = $row["screenShotID"];
   			$m = $row["commentID"];
   			$initial_commentorArr[$n][$m] = $row["commentor"];
   			$initial_commentArr[$n][$m] =  $row["comment"];
   			$initial_timeArr[$n][$m] = $row["commentTime"];
   		}
   	}

   	for($i=0;$i<count($initial_imgDirArr);$i++){
   		$handle = fopen($initial_imgDirArr[$i], "r");
   		$content = fread($handle, filesize($initial_imgDirArr[$i]));
   		//echo $content;
   		$initial_imgArr[$i]=$content;
   	}
   	fclose($handle);

   	$handle = fopen("../img/EMSD_header.txt","r");
   	$content = fread($handle,filesize("../img/EMSD_header.txt"));
   	$emsd_header = $content;
   	$handle = fopen("../img/LPC_footer.txt","r");
   	$content = fread($handle,filesize("../img/LPC_footer.txt"));
   	$lpc_footer = $content;

   
   	$info = array();
   	$info["fileName"] = $initial_fileName;
   	$info["imgArr"] = $initial_imgArr;
   	$info["viewpointArr"] = $initial_viewpointArr;
   	$info["markArr"] = $initial_markArr;
   	$info["commentorArr"] = $initial_commentorArr;
   	$info["comment"] = $initial_commentArr;
   	$info["timeArr"] = $initial_timeArr;
   	$info["emsdHeader"] = $emsd_header;
   	$info["lpcFooter"] = $lpc_footer;
   	echo json_encode($info);

?>