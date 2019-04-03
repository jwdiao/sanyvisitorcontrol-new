<template>
	<div>
    <div class="index">
      <img class="logoimg" src="../../assets/images/layout_logo.jpg" />
      <div style="font-size: 24px">请扫二维码进出园区</div>
      <img class='qrcodeimg' :src="imgUrlUpload" />
      <!--<img class='qrcodeimg' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAEzUlEQVR4Xu2dy44cIRAEd/7/o8eSb81KGwplMXhx+kpTBRn1oOmx/Xq/3++v/rlGgVeBXsPy70YK9C6eBXoZzwIt0NsUuGw/7aEFepkCl22nGVqglylw2XaaoQV6mQKXbacZWqCXKXDZdpqhBXqZApdtJ87Q1+v1UUmmP9+u61/t/7b9FegSkAXaDB2tUGkFaoY2Q58BST0oDd9p+9aefd7ud9r+eIamJWMVZHzDkJG7/e+2X6Dwo8fpgCpQmVFU8iwg+zz5//VA7XscvTbYcRKYgNlx8je9/m8Bkv4u9/SGyT8JTPPtOPkrUPlaYQ9lFhgBKdBFARLMjpPABbooZAUhgS0w26NX/5TRp/dHel3fQ60ABdoMfShgK4StQDZAt18s7N6wtd+SCyFyuscQ0OmSShlGGUXzab1k//oMJYFsQBIQEpzm03rJfoGG77lUIajEU0ARwP/ulEsRT4LacQLw6zOUNkjjVtAU4O7L8932t5dcAkbjBUoKPccLtN9Dl4gY/l5pSxJlsLWXPu/y6evLrp/sj2coOUzH7aGCBLPj6fppPp0BaH6BytcWEjQdL1AJJM3wFBjNL9ACfcRIXHIp4naP001NGvG71z9tv0CnFT1sr0APA5h2X6DTih62FwP99Huc7Ylpj6X5lp9dv7VfoPLqzwq8Pl+giyJWEMowskfzLWDyZ+19u6r81345TxuyghAQskfzab2/PkPTDdie/OmbHwqAbxkTXnzYgBnvoQX6VCAN0AKVGWEFa4bK/0UkjWg7v0AXBayAaYQTgNQ+9eS0pdgeS/s9fspNBacNpvYLVPasVPAC/VmB8VMuRXiBulMwBfB4yaWeYHtO2pOnLwLs+kkPG9AFuvmfqrNAKEAtMHo+LrkUkTbCSQA7TgLY8QJdFCNBLDDq2RYYPU/rpwC382k923soLWC6x5FAaYBYQOn+aD+ob/q1hRyQIHb+p0s4rX+6QhSo/EBNAEhQm/E2YMk/2Rs/FKHD4VMoCWABTNsjPWzFIXsfB0oLsuO2Z+3OULv+6ecLVP7tOcr4aUDWXoEWqI2Zvc+35D71jTPUCprinT60TPdUe8iZLuEFurz2WIEpoNMAtAlQoAW61Ozh90qKyDTiKQNpnG6Oriu5JDgBI8Go51lB0/Wk/mwA0XrHS26Bvknzx3iBQs9LM4ZopIcgW4FoPd/spV9bpiPMbnhaYBJw2t+0fttLLglAGUUbtuOpvzTgplvSxzO0QJ//YW6Bhr/7pYCiUzMBsBWC7FHJp/GW3OGLhTRACBiNXwfU9kgSiMZPA7y+hxZoWNRtD5mO+LRH0npovBkKClmBCvQp6HU91BactMJYf5Tx6XiBytci6tEpkHR+gRboUrNDQSjibUm0JdDap/WmGZbO356h8QKHf5VHhyi7Xgog8kfz7XoK1Cq2PE9ACnQRjEpi+vUj5PlVoFLBAnWCjZdc594/TRcP9tCyO2Aog70CP88o0M2HrgINrwaboWEI0SluuqS05G4uudPAai9TIO6hmfvOnlagQKcVPWyvQA8DmHZfoNOKHrZXoIcBTLsv0GlFD9sr0MMApt0X6LSih+0V6GEA0+4LdFrRw/YK9DCAafcFOq3oYXsFehjAtPsCnVb0sL0CPQxg2v0fxrUnDuOUSlAAAAAASUVORK5CYII=" />-->
    </div>
    <div v-show="false">
      <canvas  style="width:300px;height:300px" id="canvas" ref="canvas"></canvas>
    </div>
  </div>
</template>


<script>
  import QRCode from 'qrcode'
  export default {
    name: 'Index',
    data(){
      return{
        imgUrlUpload:'',
      }
    },

    mounted(){

      // this.imgUrlUpload = `http://${window.location.href}.png`
      // this.imgUrlUpload = `http://222.240.233.67/erweima/9d845f01770f468e991afd26921d481c.png`
      //0329修改
      // this.imgUrlUpload = `http://10.19.8.21/erweima/${window.location.href.substr(window.location.href.length-32,32)}.png`
      this.imgUrlUpload = `http://222.240.233.67:80/erweima/${window.location.href.substr(window.location.href.length-32,32)}.png`
      // console.log('12132:',window.location.href.substr(window.location.href.length-32,32))

    /*  // var imgUrlUploadArr = JSON.parse(localStorage.getItem('getQrCodeImg'))
      var imgUrlUploadArr = this.$store.state.qrCodeImage

      //根据返回值qrcode生成二维码
      let canvasID = this.$refs.canvas
      QRCode.toCanvas(canvasID, imgUrlUploadArr[this.$route.params.id], function (error) {
        if (error) console.error(error)
      })
      this.imgUrlUpload = canvasID.toDataURL("image/png");
      // var qrcodeurl = window.decodeURI(this.imgUrlUpload)
      var qrcodeurl = window.encodeURI(this.imgUrlUpload)


      console.log('生成二维码地址02020202：', this.imgUrlUpload)
      console.log('qrcodeurl0000000000：', qrcodeurl)
      console.log('imgUrlUploadArr：', imgUrlUploadArr)*/
    }
  }
</script>



<style lang="scss" scoped>
	.index{
    width: 100%;height:80%;
		box-sizing: border-box;text-align:center;padding-top:100px;
    .logoimg{display:block;width:60%;height:auto;margin: 0 auto;margin-bottom: 30px}
    .qrcodeimg{display:block;width:80%;height:auto;margin: 0 auto;margin-bottom: 50px}
	}
</style>
