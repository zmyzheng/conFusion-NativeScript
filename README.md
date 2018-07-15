# conFusion-NativeScript

video demo: https://youtu.be/Yz8BetVmavQ

![image](demo.gif)

backend server: https://github.com/zmyzheng/json-server

-----------------------------

git init

git pull https://github.com/zmyzheng/conFusion-NativeScript.git

git remote add origin https://github.com/zmyzheng/conFusion-NativeScript.git

git status

git add .

git commit -m "Initial Setup"

git push -u origin master

-----------------------------
 tns plugin add nativescript-telerik-ui
 
npm install font-awesome --save

npm install --save nativescript-ngx-fonticon

tns plugin add nativescript-couchbase

tns plugin add nativescript-local-notifications

tns plugin add nativescript-email

tns plugin add nativescript-social-share

tns plugin add nativescript-camera

NativeScript explicitly expects that if you are using any icon fonts, the corresponding icon font files will be stored in this folder named fonts, in your app folder.


----------------------------

注意process-httpmsg.service.ts的用法是值得借鉴的

<Image [src]="BaseURL + dish.image"></Image> 的用法值得借鉴

favorites.component.ts 中deleteFavorite的逻辑值得学习

这个例子中subscribe都放在service外了，一般应该放在service内

reservation 和 dishditail 的animation是不同的，dishdetail是两个view一起运行，reservation是一个结束接另一个



