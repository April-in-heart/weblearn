<meta charset="utf-8">
<?php

// 文件名为upload_1.php
// 建立文件上传表单与处理程序,表单与处理程序一体化
// 文件上传控件的id与name的值为my_upload_file
// 提交按钮的id与name的值为ok
// 文件上传到网站根的upload文件夹下(此文件夹由考生自建)

if(isset($_POST["ok"])){
    $name=$_POST["name"];

    var_dump($_POST);//输出接收到的信息
    var_dump($_FILES);//输出文件信息
    $source=$_FILES["my_upload_file"]["tmp_name"];//来源，tmp_name可以在FILES信息里查看
    $dest="../upload/".$_FILES["my_upload_file"]["name"];//目标，name可以在FILES信息里查看
    //文件上传安全判断
    $fileDeny=array(".asp",".jsp",".php",".exe");
    foreach ($fileDeny as $key=>$value){
		//strpos() 函数查找字符串在另一字符串中第一次出现的位置。
        if(strpos($_FILES["my_upload_file"]["name"],$value)>0){
            //strpos大于0说明出现过
            echo "非法文件类型,不能上传";
            exit();
        }
        else{

        }
    }
    //移动上传成功的文件,从source传到dest
    if(move_uploaded_file($source,$dest)){
        echo "upload success";
    }else{
        echo "upload error";
    }
}
else{
    $name="";
}



?>
<!--enctype:封装类型;multipart/form-data:二进制封装-->
<form action="" method="post" enctype="multipart/form-data">
    <label for="name">姓名</label>
    <input type="text" id="name" name="name" value=""/><br>
<!--    file 不能设置初值，安全性问题-->
    <input type="file" id="my_upload_file" name="my_upload_file" value=""/><br>
    <input type="submit" id="ok" name="ok" value="ok"/><br>
</form>
