# conFusion-NativeScript


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


NativeScript explicitly expects that if you are using any icon fonts, the corresponding icon font files will be stored in this folder named fonts, in your app folder.


----------------------------

注意process-httpmsg.service.ts的用法是值得借鉴的

<Image [src]="BaseURL + dish.image"></Image> 的用法值得借鉴

favorites.component.ts 中deleteFavorite的逻辑值得学习

这个例子中subscribe都放在service外了，一般应该放在service内



