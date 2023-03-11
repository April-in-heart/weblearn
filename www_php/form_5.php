<meta charset="utf-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/10/30
 *Time: 10:16
 *
 */

if(isset($_POST["ok"])){
    $name=$_POST["name"];

//$_FILES['myFile']['name'] 客户端文件的原名称。 
//$_FILES['myFile']['tmp_name'] 文件被上传后在服务端储存的临时文件名，
//一般是系统默认。可以在php.ini的upload_tmp_dir 指定，但 用 putenv() 函数设置是不起作用的。

    var_dump($_POST);//输出接收到的信息
    var_dump($_FILES);//输出文件信息
    $source=$_FILES["photo"]["tmp_name"];//来源，tmp_name可以在FILES信息里查看
    $dest="./upload/".$_FILES["photo"]["name"];//目标，name可以在FILES信息里查看
    //文件上传安全判断
    $fileDeny=array(".asp",".jsp",".php",".exe");
    foreach ($fileDeny as $key=>$value){
		//strpos() 函数查找字符串在另一字符串中第一次出现的位置。
        if(strpos($_FILES["photo"]["name"],$value)>0){
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

//显示上传文件列表
$dir=opendir("./upload");
while($file=readdir($dir)){
    echo "<a href='./upload/$file'>'$file'</a>"."<br>";
}

?>
<!--enctype:封装类型;multipart/form-data:二进制封装-->
<form action="" method="post" enctype="multipart/form-data">
    <label for="name">姓名</label>
    <input type="text" id="name" name="name" value=""/><br>
<!--    file 不能设置初值，安全性问题-->
    <input type="file" id="photo" name="photo" value=""/><br>
    <input type="submit" id="ok" name="ok" value="ok"/><br>
</form>
