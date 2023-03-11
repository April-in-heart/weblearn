
<meta charset="UTF-8">
<?php
require_once  "./config.php";
$count=1;
$queryString="select count(name) as counter from user_70";
$rs=mysqli_query($link,$queryString);
$row=mysqli_fetch_assoc($rs);
$maxRow=$row['counter'];
$rowOfPage=10;
if(isset($_GET['offset'])){
    $offset=$_GET['offset'];
    if($_GET['action']=="top"){
        $offset=0;
    }
    if($_GET['action']=="next"){
        $offset=$offset+$rowOfPage;
        if($offset>$maxRow){
            $offset=$offset-$rowOfPage;
        }
    }
    if($_GET['action']=="previous"){
        $offset=$offset-$rowOfPage;
        if ($offset<0){
            $offset=0;
        }
    }
    if($_GET['action']=="bottom"){
        if($maxRow==0){
            $offset=$maxRow-$rowOfPage;
        }else{
            $offset=$maxRow-$maxRow%$rowOfPage;
        }
    }
}else{
    $offset=0;
}
$queryString="select * from user_70 order by '$count' asc limit $offset,$rowOfPage";
$rs=mysqli_query($link,$queryString);
//输出错误提示
if (!$rs) {
    printf("Error: %s\n", mysqli_error($link));
    exit();
}
echo "<table border=1>";
echo "<tr><td colspan='2'>姓名列表</td></tr>";
while($row=mysqli_fetch_assoc($rs)){
    echo "<tr>";
    echo "<td>".$count."</td>";
    echo "<td>".$row['name']."</td>";
    echo "</tr>";
    $count+=1;
}
echo "<tr>";
echo "<td colspan='10'>
<a href='test.php?action=top&offset=$offset'>首页</a>
<a href='test.php?action=previous&offset=$offset'>上一页</a>
<a href='test.php?action=next&offset=$offset'>下一页</a>
<a href='test.php?action=bottom&offset=$offset'>末页</a>
</td>";

echo "</tr>";
echo "</table>";
