export var hello='hello1';
export function getName(){
    console.log("getName里的"+hello)
}
export default function get(){
    console.log("默认导出的方法");
}