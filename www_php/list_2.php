<meta charset="UTF-8">
<style>

    table{
        /*折叠*/
        border-collapse: collapse;
    }
    .title{
        /*橘黄色*/
        background-color: bisque;
    }

</style>
<?php
/**
 *
 *User: Administrator
 *Date: 2020/11/6
 *Time: 10:47
 *
 */

//引入配置文件   require_once消除循环依赖,只引入一次
require_once "./config/db_config.php";

$queryString="SELECT * FROM student ORDER BY id ASC";
$rs=mysqli_query($link,$queryString);//rs=resultSet

//border:边框
echo "<table border=1>";
echo "<tr class='title'><td>学号</td><td>姓名</td><td>性别</td><td>课程</td><td>籍贯</td><td>成绩</td><td>操作</td></tr>";
//fetch取出，assoc封装
while($row=mysqli_fetch_assoc($rs)){
    $id=$row['id'];
    echo "<tr>";
    echo "<td>".$row['id']."</td>";
    echo "<td>".$row['name']."</td>";
    echo "<td>".$row['gender']."</td>";
    echo "<td>".$row['course']."</td>";
    echo "<td>".$row['hometown']."</td>";
    echo "<td>".$row['score']."</td>";
    echo "<td>
        <a href='edit_1.php?id=$id'>编辑1</a>
        <a href='edit_2.php?id=$id'>编辑2</a>
        |<a href='delete.php?id=$id'>删除</a>
        </td>";
    echo "</tr>";
    //echo $row['name'].$row['gender'].$row['course']."<br>";
}

echo "<tr>";
echo "<td colspan='8'>
    <a href='edit_2.php?id='>新增</a>
    |上一页|下一页</td>";
echo "</tr>";

echo "</table>";
?>