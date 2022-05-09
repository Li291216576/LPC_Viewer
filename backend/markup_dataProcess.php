<?php

	$fileName=$_POST['modelName'];
	$viewpointArr=$_POST['viewpointArr'];
	$markArr=$_POST['markArr'];
	$imgArr=$_POST['imgArr'];
	$commentArr=$_POST['commentArr'];
	$commentorArr=$_POST['commentorArr'];
	$timeArr=$_POST['timeArr'];

    /*处理图片，将图片存成txt文件*/
    $imgDirArr = imageDataProcess($fileName,$imgArr);

    /*链接数据库*/
   	$serverName = "localhost";
   	$userName = "root";
   	$password = "";

   	$conn = mysqli_connect($serverName,$userName,$password);
   	if(!$conn){
   		die("Connection Failed: ".mysqli_connect_error());
   	}
   	echo "链接成功";
   	

   	$insert_sql = "";
   	$insert_sql .= "Delete From viewer_data.basicinfo Where modelName='".$fileName."';";
   	$insert_sql .= "Delete From viewer_data.commentlist Where modelName='".$fileName."';";
   	/*$delete_sql = $delete_basicTable.$delete_commentlist;
   	$result = mysqli_multi_query($conn,$delete_sql);*/

   	for($i=0;$i<count($imgArr);$i++){
   		$insert_sql.= "Insert into viewer_data.basicinfo (modelName, screenShotID, screenShot, markingInfo, viewPoint) VALUES ('".$fileName."',".$i.",'".$imgDirArr[$i]."','".$markArr[$i]."','".json_encode($viewpointArr[$i])."');";
   	}

   	for($i=0;$i<count($commentArr);$i++){
   		for($j=0;$j<count($commentArr[$i]);$j++){
   			$insert_sql.= "Insert into viewer_data.commentlist (modelName, screenShotID, commentID, commentor, comment, commentTime) VALUES ('".$fileName."',".$i.",".$j.",'".$commentorArr[$i][$j]."','".$commentArr[$i][$j]."','".$timeArr[$i][$j]."');";
   		}
   	}

   	echo $insert_sql;
   	if( mysqli_multi_query($conn,$insert_sql)){
   		echo "新纪录插入成功";
   	}else{
   		echo "Error:".mysqli_error($conn);
   	}



   	function imageDataProcess($fileName,$imgArr){//处理图片的函数
    	$imgDataDir_root="../data";
    	$imgDataDir_model=$imgDataDir_root."/".$fileName;
   		if(!file_exists($imgDataDir_model)){
    		mkdir($imgDataDir_model,0777,true);
    		echo "Successfully Create<br>";
    	}else{
    		$fileArr = scandir($imgDataDir_model);
    		foreach ($fileArr as $file){
    			if($file !="." && $file !=".."){
					unlink($imgDataDir_model.'/'.$file);
				}
    		}
    	}

    	$imgDirArr = array();
    	for($i=0;$i<count($imgArr);$i++){
    		$format="txt";
    		$imgPath = $imgDataDir_model."/".$i.".".$format;
    		if(file_put_contents($imgPath, $imgArr[$i])){
    			echo "Successfully Write the Image<br>";
    			array_push($imgDirArr, $imgPath);
    		}else{
    			echo "Fail to Write the Image<br>";
    		}
    	}
    	return $imgDirArr;
    }


?>