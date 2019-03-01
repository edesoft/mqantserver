# 快速使用

获取 mqantserver

> git clone https://github.com/jdomzhang/mqantserver

## 安装 yarn

https://yarnpkg.com/en/docs/install#windows-stable

## 安装 fresh

> go get github.com/jdomzhang/fresh

## 初始化

> yarn

## 编译 mqantserver

> yarn build

## 调试 Debug

必须先安装 fresh

> yarn dev

### go get golang.org/x/net 安装失败处理方案

请参考 http://www.mqant.com/topic/597714ca8f2e454b2eb1c1ee

## 运行 mqantserver

> yarn serve

敲击 Ctrl + C 关闭游戏服务器，服务器正常关闭输出：

# 访问网页版本客户端

mqantserver 已内置了一个 web 模块（源码在 server/webapp），因此进程启动成功以后就可以访问了

访问地址为：http://127.0.0.1:8080/mqant/chat/index.html

小球碰撞游戏 DEMO 访问地址为：http://127.0.0.1:8080/mqant/hitball/index.html

# 猜数字游戏

猜数字游戏无网页模块,而是实现了一个 golang 的后端机器人来模拟整个逻辑

机器人代码在 src/robot 下,需要依赖 github.com/liangdas/armyant

# Demo 演示说明

    1. 启动服务器
    2. 启动网页客户端	(默认房间名,用户名)
    3. 登陆成功后就可以聊天了

# 分布式跟踪系统功能测试

[Appdash，用 Go 实现的分布式系统跟踪神器](http://tonybai.com/2015/06/17/appdash-distributed-systems-tracing-in-go/)

客户端访问 Chat/HD_JoinChat/{msgid}时后端将会收集访问信息，通过以下地址就可以看到了
[访问地址 http://localhost:7700](http://localhost:7700)

示意图：
![示意图](https://github.com/liangdas/mqant/wiki/images/mqant_tracing.png)

# 项目目录结构

https://github.com/liangdas/mqantserver 仓库中包含了 mqant 框架,所用到的第三方库,聊天 Demo 服务端,聊天代码客户端代码

    bin
    	|-conf/server.json			服务端配置文件
    	|-public					web客户端静态文件
    	|-hitball					小球碰撞游戏DEMO客户端文件
    	|-console                   控制台web静态文件(还未完成)
    src
    	|-client
    		|-mqtt_chat_client.py 	聊天客户端 Python版本
    		|-webclient.go			聊天客户端网页版本
    	|-hitball						小球碰撞游戏DEMO客户端源码
    	|-server						聊天服务器Demo
    		|-gate						网关模块
    		|-chat						聊天模块
    		|-login						登陆模块
    		|-hitball					小球碰撞游戏模块
    		|-tracing					分布式跟踪系统服务模块
    		|-main.go					服务器启动入口

# 客户端快速测试

如果你需要测试其他语言的 mqtt 客户端，可以使用 mqant 提供的测试接口来测试

### tcp mqtt :

    host: mqant.com
    port: 3563
    protocol=mqtt.MQTTv31
    tcp:  tls/TLSv1

    如果客户端需要ca证书可以使用下面这个网站提供的
    https://curl.haxx.se/docs/caextract.html

### websocket mqtt :

    host: ws://www.mqant.com:3653/mqant
    protocol=mqtt.MQTTv31

### 测试协议

1.  登陆接口

        向服务器publish一条登陆消息

        topic:		Login/HD_Login/{msgid}

        message:	{"userName": "liangdas", "passWord": "Hello,anyone!"}

    如果 topic 添加了 msgid,则服务器会返回一条回复消息

2.  加入聊天室

        向服务器publish一条登陆消息

        topic:		Chat/HD_JoinChat/{msgid}

        message:	{"roomName": "mqant"}

        服务器会广播消息给所有聊天室成员

        topic:		Chat/OnJoin

        message:	{"users": [“liangdas”]}

3.  发送一条聊天

        向服务器publish一条登陆消息

        topic:		Chat/HD_Say/{msgid}

        message:	{"roomName": "mqant","from":"liangdas","target":"*","content": "大家好!!"}

        服务器会广播消息给所有聊天室成员

        topic:		Chat/OnChat

        message:	{"roomName": "mqant","from":"liangdas","target":"*","msg":"大家好!!"}
