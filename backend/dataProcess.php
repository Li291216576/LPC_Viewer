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

   	echo $commentArr[0][0];

   	



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