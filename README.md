# express_lecture

## setup
1.  clone this repository  
`cd <your working directory>`  
`git clone https://github.com/kento-nkr/express_lecture`
2. open this program  
`cd express_lecture`
3. check node is installed  
`node -v`  
result will be `v18.xx.x`  
if node is not installed, you must [install it](https://qiita.com/echolimitless/items/83f8658cf855de04b9ce) before after lecture.  
5. install dependecy files  
just run `npm install`

## test run  
1. check current directory  
`pwd`  
-> result will be `<your working directory>/express_lecture`  
if you not in /express_lecture, move to it.
2. run server  
`node src/app.js`  
3. send request to server  
open your using browser and visit `http://localhost:3000`

## read src/app.js

## exercise 1
- add /hello endpoint with get method
- this endpoint returns simple text "hello".
- this endpoint shows `requested from ${ipaddr}` for server console.  

> [!TIP]
> client ip address is sotored in `req`

## exercise 2
- send and receive json data.
