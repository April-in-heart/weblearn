<meta charset="utf-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/11/6
 *Time: 9:21
 *
 */

//作业：尝试连接非本地数据库


$link=mysqli_connect("localhost","root","","test");
mysqli_query($link,"set names utf8");//names,utf8注意别打错
mysqli_query($link,"create database student");//创建数据库create的e别打掉了
echo mysqli_error($link);//如果有错，显示错误信息
mysqli_query($link,"use student");//使用、打开student数据库，因为第一句代码打开的是test，
//如果第一步打开的是student则不需要再打开
mysqli_query($link,"DROP TABLE student");//仅用于实验，现实删除数据库很危险
mysqli_query($link,"DROP TABLE user");//仅用于实验，现实删除数据库很危险

$queryString="create table user(
	id varchar(10),
	user_name varchar(20),
	password varchar(50),
	date_insert int,
	date_update int)ENGINE=MyISAM DEFAULT CHARSET=utf8
";
if (!mysqli_query($link,$queryString)){
    echo mysqli_error($link);
}
$date_insert=$date_update=time();//时间戳
$queryString="insert into user(id,user_name,password,date_insert,date_update)values('001','root',md5('123456'),'$date_insert','$date_update')";
if (!mysqli_query($link,$queryString)){
    echo mysqli_error($link);
}


//ENGINE=MyISAM DEFAULT CHARSET=utf8防止乱码
$queryString="CREATE TABLE student(id varchar(10),name varchar(20),
gender varchar(2),course varchar(20),hometown varchar(10),score int)ENGINE=MyISAM DEFAULT CHARSET=utf8";
if (!mysqli_query($link,$queryString)){
    echo mysqli_error($link);
}
$queryString="INSERT INTO student(id,name,gender,course,hometown,score)values('001','mike','01','asp,jsp,php','cd','98')";
if (!mysqli_query($link,$queryString)){
    echo mysqli_error($link);
}
$queryString="INSERT INTO student(id,name,gender,course,hometown,score)values('002','素芬','02','jsp,php','cq','89')";
if (!mysqli_query($link,$queryString)){
    echo mysqli_error($link);
}
//修改数据
$queryString="UPDATE student SET name='lisa' WHERE id='002'";
if (!mysqli_query($link,$queryString)){
    echo mysqli_error($link);
}
//循环插入数据
$number=99;
for ($i=3;$i<=$number;$i++){
    $length=strlen($i);//得到长度
    $zeroNum=3-$length;//算出补零的个数
    $id=str_repeat('0',$zeroNum).$i;//str_repeat:把input重复后面指定次数
	$nameArray=array("张","李","王","刘");
    $name=$nameArray[rand(0,3)]."_".$i;
    $gender=rand(1,10)%2==0?"01":"02";
    $course="jsp";
    $hometown="cd";
    $score=rand(0,100);
    $queryString="insert into student(id,name,gender,course,hometown,score) values ('$id','$name','$gender','$course','$hometown','$score')";
    if(mysqli_query($link,$queryString)){

    }else{
        echo "插入失败";
        echo mysqli_error($link);
    }
}

