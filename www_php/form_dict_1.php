<meta charset="UTF-8">
<?php

//数据字典
$_dict=array(
    "gender"=>array(
        "01"=>"男","02"=>"女","09"=>"未知"
    ),
    "hometown"=>array(
        "-9"=>"请选择","bj"=>"北京","cd"=>"成都","cq"=>"重庆"
    ),
    "course"=>array(
        "asp"=>"ASP","jsp"=>"JSP","php"=>"PHP","python"=>"PYTHON"
    )
);

if(isset($_POST["ok"])){
    $name=$_POST["name"];
    $gender=$_POST["gender"];
    $hometown=$_POST["hometown"];
    $course=$_POST["course"];
}else{
    $name="";
    $gender="";
    $hometown="";
    $course="";
}

$genderString="";
$courseString="";
foreach ($_dict["gender"] as $k=>$v) {
    $id="gender_".$k;//gener_01,gender_02...
    //<input type="radio" id="gender" name="gender" value="01">男
    if($k==$gender){
        $genderString=$genderString."<input type='radio' id='$id' name='gender' value='$k' checked>$v";
    }else{
        $genderString=$genderString."<input type='radio' id='$id' name='gender' value='$k'>$v";
    }

}

foreach ($_dict["course"] as $k=>$v){
    $id="course_".$k;
    //in_array($k,$course)判断$k是否在$course(即点击ok后选中的)内
    if(in_array($k,$course)){
        $courseString=$courseString."<input type='checkbox' id='$id' name='course[]' value='$k' checked>$v";
    }else{
        $courseString=$courseString."<input type='checkbox' id='$id' name='course[]' value='$k'>$v";
    }

}

$hometownString="<select id='hometown' name='hometown'>";
foreach ($_dict["hometown"] as $k=>$v) {
    if($k==$hometown){
        $hometownString=$hometownString."<option value='$k' selected>$v</option>";
    }else{
        $hometownString=$hometownString."<option value='$k'>$v</option>";
    }

}
$hometownString=$hometownString."</select>";

?>

<form action="" method="post">
    name:<input type="text" id="name" name="name" value=""><br>
<!--    动态生成界面-->
    gender:<?php echo $genderString;?><br>
    course:<?php echo $courseString;?><br>
    hometown:<?php echo $hometownString;?><br>
    <input type="submit" id="ok" name="ok" value="ok">
</form>
