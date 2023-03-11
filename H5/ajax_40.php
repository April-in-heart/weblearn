<?php
//告诉服务器文档类型
header("content-type:text/xml");
//服务器端最后要加分号，不然会报错
$student="<student><name>mike</name><age>18</age></student>";
// 把数组转码，转成json格式
echo $student;//xml