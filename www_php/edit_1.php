<meta charset="UTF-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/11/13
 *Time: 9:30
 *
 */

$link=mysqli_connect("localhost","root","","student");
mysqli_query($link,"set names utf8");

if (isset($_POST["ok"])){
    $id=$_POST['id'];
    $name=$_POST['name'];
    $gender=$_POST['gender'];
    $score=$_POST['score'];
    //按ok提交数据，接收数据修改数据
    $queryString="update student set name='$name',gender='$gender',score='$score' where id='$id'";
    if(mysqli_query($link,$queryString)){

    }
    else{
        echo "更新数据失败";
    }
}
else{
    $id=@$_GET['id'];//@表示有警告或者错误不提示
    $name="";
    $score=0;
    //sql从表中读取数据
    $queryString="select * from student where id='$id'";
    $rs=mysqli_query($link,$queryString);
    //mysqli_fetch_assoc从结果中取出一行作为关联数组
    $row=mysqli_fetch_assoc($rs);
    $name=$row['name'];
    $score=$row['score'];
    $gender=$row['gender'];
}

?>

<form action="edit_1.php" method="post">
<!-- hidden不能变 -->
    <input type="hidden" id="id" name="id" value="<?php echo $id;?>"><br>
    姓名：<input type="text" id="name" name="name" value="<?php echo $name;?>"><br>
    性别：<input type="radio" id="boy" name="gender" value="01"<?php echo $gender=="01"?"checked":"" ?>>男
    <input type="radio" id="girl" name="gender" value="02"<?php echo $gender=="02"?"checked":"" ?>>女<br>
    成绩：<input type="text" id="score" name="score" value="<?php echo $score;?>">
    <input type="submit" id="ok" name="ok" value="ok">
</form>
<a href="list_2.php">返回列表</a>