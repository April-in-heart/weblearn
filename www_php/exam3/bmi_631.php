<meta charset="utf-8">
<?php

// 程序文件名为bmi_631.php
// 完成对BMI指数的计算，计算公式为：
// 体质指数（BMI）=体重（kg）÷身高*身高（m）
// 身高输入框的id与name为height
// 体重输入框的id与name为weight
// 确定按钮的id、name与value属性值为ok。
// 点击确定后，计算此人的BMI指数并显示在页面上。
// 显示格式为“BMI:xx.xx”,计算结果用round保留到小数点后2位(四舍五入）。
// 注：应通过提交到服务器端，由服务器端计算并显示结果。(此题用JS方法实现的不得分)
if(isset($_POST["ok"])){
	$height=$_POST["height"];
	$weight=$_POST["weight"];
	$BMI=$weight/$height/$height;
	$BMI=round($BMI,2);
	echo "BMI:".$BMI;
}else{
	$height="";
	$weight="";
	$BMI="";
}
?>
<form action="" method="post">
    <label for="height">身高</label>//显式的与id为height标签绑定，隐式就是把子标签写在父标签内部
    <input type="text" id="height" name="height" value=""/><br>
	<label for="weight">体重</label>
	<input type="text" id="weight" name="weight" value=""/><br>
    <input type="submit" id="ok" name="ok" value="ok"/><br>
</form>