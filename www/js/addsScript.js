
  
$(document).ready(function() {
    setImages();
});


function parseJSON(url, imagesPlaceholder){
     $.getJSON(url, null, function(json) {
        for (var i in json) {
            //if healthoffer is 1 then they are adds
            if((json[i].healthoffer)=="1"){
             $(imagesPlaceholder)
                    .append($('<img>', {src: "http://doctoory.com/public/uploads/ads/"+json[i].photo, class:"swiper-slide"  }));
            }              
        }

    });
}

function setImages(){
   // parseJSON("ads.json", "#swiper-wrapper");
   parseJSON("http://doctoory.com/front/api/ads?callback=?", "#swiper-wrapper");
}

