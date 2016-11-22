/**
 * Created by Winglau on 2016/11/22.
 */
var fs = require('fs');
var bastPath = './src/';//图片初始目录
var distPath = './dist/';//图片新的目录
var reName = 'test';//图片更改的名字

//copyFile
var copyFile = function (bastPath,distPath) {
    fs.readdir(bastPath,function(err,files){
        files.forEach(function(item,index){
            var reg = /\.jpg$|\.png$|\.gif$|\.jpeg$/gi;
            var fileExtensions = item.match(reg)[0];
            var readStream = fs.createReadStream(bastPath+item);
            var writeStream = fs.createWriteStream(distPath+item);
            readStream.on('data',function(data){
                writeStream.write(data);
            }).on('end',function(){
                //copy完执行rename
                reNameFn(distPath+item,distPath+reName+'_'+index+fileExtensions);
                console.log('done!');
            });

        })
    });
};
//reNameFile
var reNameFn = function(oldPath,newPath){
    fs.rename(oldPath,newPath,function(err){
        err && console.log(err);
    });
};

//批量实现图片修改
copyFile(bastPath,distPath);
