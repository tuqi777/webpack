console.log('你的心有一道墙'); 
import "./assets/css/index.css"
import "./assets/css/index2.css"
import pic from "./assets/image/coast.jpg"
// import "./assets/css/pre.scss"
let img = new Image()
img.src = pic
let app =  document.getElementById('app')
app.append(img)