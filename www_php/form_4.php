<meta charset="utf-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/10/30
 *Time: 9:34
 *
 */
//点击ok接收数据
if(isset($_POST["ok"])){
    $name=$_POST['name'];
    $hometown=$_POST["hometown"];
    echo $name."是".$hometown."人";
    $note=$_POST["note"];
}else{
    //初次进入页面初始化变量
    $name="";
    $hometown="";
    $note="请开始你的表演";
}
?>

<form action="" method="post">
    name:<input type="text" id="name" name="name" value="<?php echo $name; ?>"/><br>
    hometown:<select id="hometown" name="hometown">
        <option value="bj"<?php echo($hometown=='bj')?"selected":""; ?>>北京</option>
        <option value="cd"<?php echo($hometown=='cd')?"selected":""; ?>>成都</option>
        <option value="cq"<?php echo($hometown=='cq')?"selected":""; ?>>重庆</option>
    </select><br>
    <textarea id="note" name="note" cols="30" rows="8">
        <?php echo $note;?>
    </textarea><br>
    <input type="submit" id="ok" name="ok" value="ok"><br>
</form>
