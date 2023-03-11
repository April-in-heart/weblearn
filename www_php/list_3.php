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
 *分页操作
 * 延迟加载
 * 状态恢复
 */

//引入配置文件   require_once消除循环依赖,只引入一次
require_once "./config/db_config.php";
//count计算该字段总记录数
$queryString="select count(id) as counter from student";
$rs=mysqli_query($link,$queryString);
$row=mysqli_fetch_assoc($rs);
$maxrows=$row["counter"];
echo "总数：".$maxrows;

$rowsOfPage=10;
//有offset则点了翻页
if (isset($_GET["offset"])){
    $offset=$_GET["offset"];
    //判断上一页或者下一页
    if($_GET["action"]=="next"){
        if($maxrows%$rowsOfPage==0){
            if($offset!=$maxrows+$rowsOfPage)
            $offset=$offset+$rowsOfPage;
        }else{
            if($offset!=$maxrows-$maxrows%$rowsOfPage)
            $offset=$offset+$rowsOfPage;
        }
    }
    if ($_GET["action"]=="pre"){
        if($offset!=0)
        $offset-=$rowsOfPage;
    }
    //首尾页
    if ($_GET["action"]=="top"){
            $offset=0;
    }
    if ($_GET["action"]=="bottom"){
        //判断是否为满页，否则到最后一页再点上一页顺序会乱
            if($maxrows%$rowsOfPage==0){
                $offset=$maxrows-$rowsOfPage;
            }else{
                $offset=$maxrows-$maxrows%$rowsOfPage;
            }
    }
}else{
    $offset=0;
}

$queryString="select * from student order by id asc limit $offset,$rowsOfPage";
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
        <a href='edit_2.php?id=$id&offset=$offset'>编辑2</a>
        |<a href='delete.php?id=$id'>删除</a>
        </td>";
    echo "</tr>";
    //echo $row['name'].$row['gender'].$row['course']."<br>";
}

echo "<tr>";
echo "<td colspan='8'>
    <a href='edit_2.php?id='>新增</a>
    |<a href='list_3.php?action=top&offset=$offset'>首页</a>
    |<a href='list_3.php?action=pre&offset=$offset'>上一页</a>
    |<a href='list_3.php?action=next&offset=$offset'>下一页</a>
    |<a href='list_3.php?action=bottom&offset=$offset'>尾页</a>
    </td>";
echo "</tr>";

echo "</table>";
?>