<meta charset="UTF-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/11/20
 *Time: 9:34
 *
 */
//用链接访问指定id可以删除数据，有安全隐患
$id=$_GET['id'];//得到id
$link=mysqli_connect("localhost","root","","student");
mysqli_query($link,"set names utf8");
$queryString="delete from student where id='$id'";
mysqli_query($link,$queryString);
if(mysqli_error($link)!=""){
    echo "删除失败";
}else{
    echo "删除成功";
}
?>
<a href="list_2.php">返回</a>
