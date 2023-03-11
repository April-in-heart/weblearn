<template>
	<view class="content">
		<view>
				<button @click="StartBluetoothDeviceDiscovery">搜索蓝牙</button>
				<view v-for="(item, index) in devices" :key="item.id" :data-index="index" class="menu2" @click="choose">
					<button style="color: #0081FF;">设备{{index+1}}：{{item[0].name}}{{item[0].deviceId}}</button>
				</view>
				<button style="margin-top: 300upx;" @click="StopBluetoothDevicesDiscovery">停止搜索</button>
				<button style="margin-top: 300upx;" @click="WriteBLECharacteristicValue">打印</button>
				<button style="margin-top: 100upx;" @click="back">返回</button>
				
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				devices:[],
				DeviceID:'',
				bluetooth:'',
				isLink:'',
				serviceId:'',
				characteristicId:'',
				macAddress:'',
				macvalue:'',
				readCode:'',
				readCodeMsg:'',
				ServiceUUID:''
			}
		},
		onLoad() {
			/**
			 * 第一步 在页面显示的时候判断是否已经初始化完成蓝牙适配器若成功，则开始查找设备
			 */
			uni.openBluetoothAdapter({
				success:(res) => {
					console.log('第一步初始化蓝牙成功:' + res.errMsg);
					// 初始化完毕开始搜索
					this.StartBluetoothDeviceDiscovery()
				},
				fail:(res) => {
					console.log('初始化蓝牙失败: '+JSON.stringify(res));
					if (res.errCode == 10001) {
						uni.showToast({
							title: '蓝牙未打开',
							duration: 2000,
						})
					} else {
						uni.showToast({
							title: res.errMsg,
							duration: 2000,
						})
					}
				}
			});
		},
		methods: {
			choose(e){
				console.log("选择了下标为"+e.currentTarget.dataset.index+"的设备")//默认地址在地址表的下标
			},
		/**
		 * 第二步 在页面显示的时候判断是都已经初始化完成蓝牙适配器若成功，则开始查找设备
		 */
		 StartBluetoothDeviceDiscovery() {
			uni.startBluetoothDevicesDiscovery({
				// services: ['0000FFE0'],
				success: res => {
					console.log('第二步 开始搜寻附近的蓝牙外围设备：startBluetoothDevicesDiscovery success', res)
					this.OnBluetoothDeviceFound();
				},
				fail: res => {
					uni.showToast({
						icon: "none",
						title: "查找设备失败！",
						duration: 3000
					})
				}
			});
		},
		/**
		 * 第三步  发现外围设备
		 */
		 OnBluetoothDeviceFound() {
			console.log("监听寻找新设备");
			uni.onBluetoothDeviceFound(res => {
				console.log("第三步 监听寻找到新设备的事件:",JSON.stringify(res))
				console.log("第三步 监听寻找到新设备列表:",res.devices)
				//设置扫描设备数量
				if(this.devices.length<60){
					this.devices.push(res.devices);
					console.log('数据：',this.devices)
					res.devices.forEach(device => {//这一步就是去筛选找到的蓝牙中,有没有你匹配的名称
						console.log("这一步就是去筛选找到的蓝牙中,有没有你匹配的名称:",JSON.stringify(device))
						if (device.name == 'YP10S') {//匹配蓝牙名称
							uni.setStorageSync("DeviceID",device.deviceId)//把已经连接的蓝牙设备信息放入缓存
							this.DeviceID = device.deviceId
							let DeviceID = device.deviceId//这里是拿到的uuid
					
							this.StopBluetoothDevicesDiscovery()//当找到匹配的蓝牙后就关掉蓝牙搜寻,因为蓝牙搜寻很耗性能
					
							console.log("匹配到的蓝牙this.DeviceID：",this.DeviceID)
							this.CreateBLEConnection(DeviceID)//创建蓝牙连接,连接低功耗蓝牙设备
					
						}
					})
				}else{
					console.log('停止搜索')
					this.StopBluetoothDevicesDiscovery();
				}
			});
		},
		/**
		 * 第四步 停止搜索蓝牙设备
		 */
		StopBluetoothDevicesDiscovery() {
			uni.stopBluetoothDevicesDiscovery({
				success: res => {
					console.log("第四步 找到匹配的蓝牙后就关掉蓝牙搜寻:",JSON.stringify(res))
				},
				fail: res => {
					console.log('第四步 停止搜索蓝牙设备失败，错误码：' + res.errCode);
				}
			});
		},
		// 第五步 创建蓝牙连接,连接低功耗蓝牙设备
		CreateBLEConnection(DeviceID,index){
			let doc = this
			uni.createBLEConnection({//创建蓝牙连接,连接低功耗蓝牙设备
				deviceId: DeviceID,//传入刚刚获取的uuid
				success(res) {
					console.log("第五步 创建蓝牙连接成功:",JSON.stringify(res))
					doc.GetBLEDeviceServices(DeviceID) //获取蓝牙设备所有服务(service)。

				},
				fail(res) {
					console.log(res)
				}
			})
		},

		//第六步 获取蓝牙设备所有服务(service)。
		GetBLEDeviceServices(DeviceID,index){
			let doc = this
			setTimeout(function () {//这里为什么要用setTimeout呢,等等下面会解释
				uni.getBLEDeviceServices({//获取蓝牙设备所有服务
					deviceId: DeviceID,
					success(res) {//为什么要用延时,因为不用延时就拿不到所有的服务,在上一步,连接低功耗蓝牙
						//设备的时候,需要一个600-1000毫秒的时间后,再去获取设备所有服务,不给延时就会一直返回错误码10004

						console.log("第六步 获取蓝牙设备所有服务:",res)
						uni.setStorageSync("ServiceUUID",res.services[1].uuid)//把已经连接的蓝牙设备信息放入缓存
						uni.setStorageSync("ServiceUUIDNew",res.services[1].uuid)//把已经连接的蓝牙设备信息放入缓存
						let ServiceUUIDNew = res.services[1].uuid
						doc.ServiceUUID = res.services[1].uuid

						console.log("doc.ServiceUUID:",doc.ServiceUUID);
						//console.log("uuid：",res.services[5].uuid)
						doc.GetBLEDeviceCharacteristics(DeviceID)//获取蓝牙设备某个服务中所有特征值

					},
					fail(res) {
						console.log(res)
					}
				})
			}, 1000)

		},
		
		// 第七步 获取蓝牙特征值
		GetBLEDeviceCharacteristics(DeviceID){
			let doc=this;
			console.log("第七步 获取蓝牙特征值DeviceID:",DeviceID,"serviceId:",uni.getStorageSync('ServiceUUIDNew'));
			setTimeout(()=>{
				uni.getBLEDeviceCharacteristics({//获取蓝牙设备某个服务中所有特征值
					deviceId: DeviceID,
					serviceId: uni.getStorageSync('ServiceUUIDNew'),//这个serviceId可以在上一步获取中拿到,也可以在
					//蓝牙文档中(硬件的蓝牙文档)拿到,我这里是通过文档直接赋值上去的,一般有两个,一个是收的uuid,一个是发的uuid,我们这边是发
					success(res) {
						console.log("第七步 获取蓝牙设备某个服务中所有特征值成功:",res)
						uni.showToast({
							title: '开启蓝牙连接',
							duration: 2000
						});
						// let i=0;
						// for(i=0;i<res.characteristics.length;i++){
						// 	if(res.characteristics[i].properties.write==true&&res.characteristics[i].properties.indicate==true){
						// 		console.log("可用特征值：",res.characteristics[i].uuid);
						// 		uni.setStorageSync("CharacteristicId",res.characteristics[i].uuid)//把某个服务中所有特征值信息放入缓存
						// 		doc.characteristicId = res.characteristics[i].uuid
						// 		break;
						// 	}else if(res.characteristics[i].properties.write==true&&res.characteristics[i].properties.notify==true){
						// 		console.log("可用特征值：",res.characteristics[i].uuid);
						// 		uni.setStorageSync("CharacteristicId",res.characteristics[i].uuid)//把某个服务中所有特征值信息放入缓存
						// 		doc.characteristicId = res.characteristics[i].uuid
						// 		break;
						// 	}
						// }
								console.log("可用特征值：",res.characteristics[1].uuid);
								uni.setStorageSync("CharacteristicId",res.characteristics[1].uuid)//把某个服务中所有特征值信息放入缓存
								doc.characteristicId = res.characteristics[1].uuid
					},
					fail(res) {
						console.log("获取蓝牙设备某个服务中所有特征值失败:",JSON.stringify(res))
					}
				})
			},2000)
		},
		//字符串转换为arraybuffer
		string2buffer(str) {
			let val = ""
			if (!str) return;
			let length = str.length;
			let index = 0;
			let array = []
			while (index < length) {
				array.push(str.substring(index, index + 2));
				index = index + 2;
			}
			val = array.join(",");
			// 将16进制转化为ArrayBuffer
			return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function(h) {
				return parseInt(h, 16)
			})).buffer
		},
		//arraybuffer转化为字符串
		ab2hex(buffer) {
			const hexArr = Array.prototype.map.call(
				new Uint8Array(buffer),
				function (bit) {
					return ('00' + bit.toString(16)).slice(-2)
				}
			)
			return hexArr.join('')
		},
		// 第八步 发送二进制数据
		WriteBLECharacteristicValue(){
			let doc = this
			const buffer1 = this.string2buffer('21');
			const buffer2 = this.string2buffer('20');
			doc.defaultVal = [
				buffer1,buffer2
			]
			/* 数据格式如下：
			doc.defaultVal = [
				["0x21", "0x20", "0x30", "0x4E", "0x54", "0x0A"],//第一张出纸数据
				["0x21", "0x20", "0x30", "0x4E", "0x54", "0x0A"]//第二张出纸数据
				。。。。。。。
			] */
			for (let i = 0; i < doc.defaultVal.length; i++) {

				uni.writeBLECharacteristicValue({
					// 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
					deviceId: uni.getStorageSync('DeviceID'),
					// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					serviceId: uni.getStorageSync('ServiceUUIDNew'),
					// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
					characteristicId: uni.getStorageSync('CharacteristicId'),
					// 这里的value是ArrayBuffer类型
					value: doc.defaultVal[i],

					success(res) {
						console.log('writeBLECharacteristicValue success', res)
						console.log("开始打印第" + (i + 1) + "张：",doc.ab2hex(doc.defaultVal[i]));
						if (doc.defaultVal.length != 0) {
							uni.showToast({
								title: "正在打印第" + (i + 1) + "张",
								// duration: 2000
								mask: true
							});

						}else{
							uni.hideLoading()

						}
					},
					fail(res) {
						console.log(JSON.stringify(res))
						doc.errorCodeTip(res.code);

						// console.log(JSON.stringify(buffer))
					}
				})
			}
		},

		//错误码提示
		errorCodeTip(code) {
			let doc = this
			if (code == 0) {
				//正常
			} else if (code == 10000) {
				uni.showToast({
					title: '未初始化蓝牙适配器',
					icon: 'none'
				})
			} else if (code == 10001) {
				uni.showToast({
					title: '当前蓝牙适配器不可用',
					icon: 'none'
				})
			} else if (code == 10002) {
				uni.showToast({
					title: '没有找到指定设备',
					icon: 'none'
				})
			} else if (code == 10003) {
				uni.showToast({
					title: '连接失败',
					icon: 'none'
				})
			} else if (code == 10004) {
				uni.showToast({
					title: '没有找到指定服务',
					icon: 'none'
				})
			} else if (code == 10005) {
				uni.showToast({
					title: '没有找到指定特征值',
					icon: 'none'
				})
			} else if (code == 10006) {
				uni.showToast({
					title: '当前连接已断开',
					icon: 'none'
				})
			} else if (code == 10007) {
				uni.showToast({
					title: '当前特征值不支持此操作',
					icon: 'none'
				})
			} else if (code == 10008) {
				uni.showToast({
					title: '其余所有系统上报的异常',
					icon: 'none'
				})
			} else if (code == 10009) {
				uni.showToast({
					title: 'Android 系统特有，系统版本低于 4.3 不支持 BLE',
					icon: 'none'
				})
			}
			if (code != 0) {
				//正常
				//在页面加载时候初始化蓝牙适配器
				uni.openBluetoothAdapter({
					success:(res) => {
						console.log('第一步初始化蓝牙成功:' + res.errMsg);
						// 初始化完毕开始搜索
						this.StartBluetoothDeviceDiscovery()
					},
					fail:(res) => {
						console.log('初始化蓝牙失败: '+JSON.stringify(res));
						if (res.errCode == 10001) {
							uni.showToast({
								title: '蓝牙未打开',
								duration: 2000,
							})
						} else {
							uni.showToast({
								title: res.errMsg,
								duration: 2000,
							})
						}
					}
				});
			}
		},
		// *********************暂时未用 start   根据情况调用吧************************************************************
		/**
		 * 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
		 */
		getBluetoothDevices() {
			console.log("获取蓝牙设备");
			uni.getBluetoothDevices({
				success: res => {
					console.log('获取蓝牙设备成功:' + res);
					this.bluetooth = res.devices;
					console.log('获取蓝牙设备成功this.bluetooth:' + this.bluetooth);
					this.bluetooth.forEach((item)=>{
						this.isLink.push(0)
					})

				}
			});
		},
		//断开蓝牙连接
		closeBLEConnection(deviceId,index){
			uni.closeBLEConnection({
			  deviceId:deviceId,
			  success:res=> {
				  this.isLink.splice(index,1,4)
				console.log(res)
			  }
			})
		},




		// 启用 notify 功能
		notifyBLECharacteristicValueChange(deviceId){
			uni.notifyBLECharacteristicValueChange({
			  state: true, // 启用 notify 功能
			  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
			  deviceId:deviceId,
			  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
			  serviceId:this.serviceId,
			  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
			  characteristicId:this.characteristicId,
			  success:(res)=> {
				console.log('notifyBLECharacteristicValueChange success', res.errMsg)
				// this.onBLECharacteristicValueChange(this.deviceId);
			  },
			  fail:(res)=> {
				  console.log('notifyBLECharacteristicValueChange success', res.errMsg)
			  }
			})
		},
		// 监听低功耗蓝牙设备的特征值变化
		onBLECharacteristicValueChange(deviceId){
			uni.onBLECharacteristicValueChange((res)=> {
			  console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
			  console.log(this.ab2hex(res.value))
			  this.macAddress = res.deviceId;
			  this.macValue = this.ab2hex(res.value);
			  // this.readBLECharacteristicValue(this.deviceId)
			})
		},
		// 读取设备二进制数据
		readBLECharacteristicValue(){
			// console.log('进入读取');
			// setTimeout(()=>{
				uni.readBLECharacteristicValue({
				  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				  deviceId:this.deviceId,
				  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
				  serviceId:this.serviceId,
				  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
				  characteristicId:this.characteristicId,
				  success:(res)=> {
					 console.log('readBLECharacteristicValue:', res)
					 this.readCode = res.errCode;
					 this.readCodeMsg = res.errMsg;
					 this.onBLECharacteristicValueChange(this.deviceId);
				  },
				  fail:(res)=> {
					   console.log('readBLECharacteristicValue:', res)
					 this.readCode = res.errCode;
					 this.readCodeMsg = res.errMsg;
					 this.onBLECharacteristicValueChange(this.deviceId);
				  }
				})
			// },200)

		}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
