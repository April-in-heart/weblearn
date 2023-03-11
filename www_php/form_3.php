<meta charset="utf-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/10/23
 *Time: 11:25
 *
 */


//接收客户端数据，注意POST要大写
//echo $_POST["name"]."<br>";
//echo $_POST["age"]."<br>";

if (isset($_POST["ok"])){
    //isset($_POST["ok"])判断是否提交表单
    //如果有，则提交了
    $name=$_POST["name"];
    $age=$_POST["age"];
    if(isset($_POST["gender"]))
        $gender=$_POST["gender"];
    else{
        $gender="";
    }
//    var_dump($_POST["love"]);
//    if(in_array("jsp",$_POST["love"])){
//        echo "选择了：jsp课程"."<br>";
//    }
    if(isset($_POST["love"])){
        $love=$_POST["love"];
    }
    else{
        //初始化数组
        $love=array();
    }
}

$message="数据保存成功";

//验证name是否符合规范
//strpos：string position,输出匹配的字符串的位置,如果不存在该字符串则不输出
if(strpos($_POST["name"],"请")!==false){
    echo "姓名含有非法关键字";
}
else{
    $name="请输入姓名";
    $age=0;
    $gender="";
}
//三元运算符echo 1==2?"1==2":"1!=2";
//线程恢复:在html里嵌入服务器脚本(php)代码

//echo time();
//echo "<br>";
$message="";
$date=date("Y-m-d H:i:s",time());

?>

<form action="form_3.php" method="post">
    name:<input type="text" id="name" name="name" value="<?php echo $name?>"/><br>
    age:<input type="text" id="age" name="age" value="<?php echo $age?>"/><br>
    password:<input type="password" id="password" name="password" value=""><br>
    gender:
    <input type="radio" id="male" name="gender" value="01"
        <?php echo $gender=="01"?"checked":"" ?>>男
    <input type="radio" id="famale" name="gender" value="02"
        <?php echo $gender=="02"?"checked":"" ?>>女
    <br>
    love:
    <input type="checkbox" id="ASP" name="love[]" value="asp"
        <?php echo in_array("asp",$love)?"checked":"" ?>>ASP
    <input type="checkbox" id="JSP" name="love[]" value="jsp"
        <?php echo in_array("jsp",$love)?"checked":"" ?>>JSP
    <input type="checkbox" id="PSP" name="love[]" value="psp"
        <?php echo in_array("psp",$love)?"checked":"" ?>>PSP


    <input type="submit" id="ok" name="ok" value="ok"/><br>
</form>
<div id="div_1"><?php echo $message,$date;?></div>
