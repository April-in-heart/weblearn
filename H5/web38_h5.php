<?php
	$imageData=$_POST['photo'],
	$imageData=base64.decode($imageData);
	$fileName='myphoto_'.time().".png";
	$fp=fopen($fileName,"w");
	fwrite($fp,$imageData);
	fclose($fp);
	echo"upload ok";