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
$message="";
//1、url进入还是ok进入 2、有没有id，没有id为新增
if (isset($_POST["ok"])){
    $id=$_POST['id'];
    $name=$_POST['name'];
    $gender=$_POST['gender'];
    $score=$_POST['score'];
    $offset=$_POST['offset'];
    if($id==""){
        //没有id则新增
        $id=uniqid($id);//unique+id：唯一的id,产生一个随机id
        $id=getMaxId($link);//自定义函数
        $queryString="insert into student(id,name,gender,score)values('$id','$name','$gender','$score')";
        $message="新增成功";
    }else{
        //有id则编辑
        //按ok提交数据，接收数据修改数据
        $queryString="update student set name='$name',gender='$gender',score='$score' where id='$id'";
        $message="编辑成功";
    }

    if(mysqli_query($link,$queryString)){

    }
    else{
        echo "更新数据失败";
    }
}

else{
    $id=@$_GET['id'];//@表示有警告或者错误不提示
    if($id==""){
        //没有id则新增
        $name="please input";
        $score=0;
        $gender="01";
        $offset=0;
    }else{
        //有id则编辑
        //sql从表中读取数据
        $queryString="select * from student where id='$id'";
        $rs=mysqli_query($link,$queryString);
        //mysqli_fetch_assoc从结果中取出一行作为关联数组赋值给row
        $row=mysqli_fetch_assoc($rs);
        $name=$row['name'];
        $score=$row['score'];
        $gender=$row['gender'];
        $offset=@$_GET['offset'];
    }
}

?>

<form action="edit_2.php" method="post">
    <!-- hidden不能变 -->
    <input type="hidden" id="id" name="id" value="<?php echo $id;?>"><br>
    <input type="hidden" id="offset" name="offset" value="<?php echo $offset?>">
    姓名：<input type="text" id="name" name="name" value="<?php echo $name;?>"><br>
    性别：<input type="radio" id="boy" name="gender" value="01"<?php echo $gender=="01"?"checked":"" ?>>男
    <input type="radio" id="girl" name="gender" value="02"<?php echo $gender=="02"?"checked":"" ?>>女<br>
    成绩：<input type="text" id="score" name="score" value="<?php echo $score;?>">
    <input type="submit" id="ok" name="ok" value="ok">
</form>
<a href="list_3.php?action=&offset=<?php echo $offset;?>">返回列表</a>
<br>
<?php
echo "$message";
?>
<?php

function getMaxId($link){
    $queryString="select id from student order by id desc limit 0,1";//desc降序排列，取一个，下标为0，即第一个最大的id。
    $rs=mysqli_query($link,$queryString);
    $row=mysqli_fetch_assoc($rs);
    $maxId=$row["id"];//得到当前最大的id号，有风险，要锁表
    $maxId=intval($maxId)+1;//intval得到数值
    $length=strlen($maxId);//得到maxId长度
    $zeroNum=3-$length;//算出补零的个数
    $maxId=str_repeat('0',$zeroNum).$maxId;//str_repeat:把input重复后面指定次数
    return $maxId;
}

?>