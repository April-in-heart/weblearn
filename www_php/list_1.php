<meta charset="UTF-8">
<style>

    table{
        border-collapse: collapse;
    }
    .title{
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

$link=mysqli_connect("localhost","root","","student");
mysqli_query($link,"set names utf8");
$queryString="SELECT * FROM student ORDER BY id ASC";
$rs=mysqli_query($link,$queryString);//rs=resultSet

//border:边框
echo "<table border=1>";
//tr表的行，td单元格
echo "<tr class='title'><td>学号</td><td>姓名</td><td>性别</td><td>课程</td><td>籍贯</td><td>成绩</td></tr>";
//fetch取出，assoc封装
while($row=mysqli_fetch_assoc($rs)){
    echo "<tr>";
    echo "<td>".$row['id']."</td>";
    echo "<td>".$row['name']."</td>";
    echo "<td>".$row['gender']."</td>";
    echo "<td>".$row['course']."</td>";
    echo "<td>".$row['hometown']."</td>";
    echo "<td>".$row['score']."</td>";
    echo "</tr>";
    //echo $row['name'].$row['gender'].$row['course']."<br>";
}
echo "</table>";