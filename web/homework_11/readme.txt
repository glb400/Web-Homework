各位评审者你们好，

1.
由于我选用的mongoDB教程是version2，所以本次作业我没有采用mongoDBversion3而是降版本使用的version2。


2.
本次由于使用了数据库，
本次作业需要您安装MongoDB方可运行，安装地址：
https://www.mongodb.com/download-center#community，
当您的cmd出现：
Maybe you don't install the Mongodb server.
时便有可能是这个原因。


3.
本次的使用方法是（在安装MONGODB后）：
1)首先打开一个命令行窗口cd至/blog文件夹下输入net start MongoDB
2）待MongoDB服务启动后输入mongod -dbpath=./data
3）新开一个命令行窗口cd至/blog下输入node app.js
即可

4.本次文件结构为
|-app.js start up file
|-public static files
|-views jade
|-config configuration file
|-logs log files
|-elements some specific require blocks written by self to be used in js to create elements. 
|-requires some other require blocks written by self

谢谢您的评审！