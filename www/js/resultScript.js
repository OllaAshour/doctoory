
function toggleSlide() {
   
    var id = $(this).data('slideContent');
    $('#' + id).slideToggle();
  
 
}

$(document).ready(function() {
    //get request parameters from index
    var sPageURL=  document.URL;
    var sURLVariables = sPageURL.split('?');
    var requstPar = "http://doctoory.com/front/api/serchhome?"+sURLVariables[1]+"&callback=?";
    
    //displayResults("results.json");
    displayResults(requstPar);
    
    var sliderIDObjects = $('[id^="more"]');
    sliderIDObjects.on("click", toggleSlide);
    
      


});

var googleMapAddress = "https://www.google.com/maps/embed/v1/place?";
var googleMapKey = "&key=AIzaSyBuD_j3wZmgTb23zsC5D5woiE6vecMFAig";


function displayResults(requestParameters) {


    $.getJSON(requestParameters,null, function(json) {

        for (var i in json) {
          
            var docMap = $("#doc-map-address" + i);
            var docImage = $("#doc-image" + i);
            var docName = $("#doc-name" + i);

            var docFacebook = $("#doc-facebook" + i);
            var docTwitter = $("#doc-twitter" + i);
            var docWebsite = $("#doc-website" + i);
            var docSpeciality = $("#doc-speciality" + i);
            var docPhone = $("#doc-phone" + i);
            var docAddress = $("#doc-address" + i);
            var docSchedule = $("#doc-schedule" + i);
            
           

            docName.text(json[i].name);
            docFacebook.prop("href",json[i].facebook);
            docTwitter.prop("href",json[i].twitter);
            docWebsite.prop("href",json[i].url);
            docPhone.text(json[i].phone);
            docAddress.text(json[i].address);
            docSchedule.text(json[i].schedual);

            var gSpec = json[i].gspecialist_id;
            var sSpec = json[i].sspecialist_id;

            var speciality = getSpecialityNames(gSpec, sSpec);

            docSpeciality.text(speciality);

            var url = googleMapAddress + "&q=" + $.trim(json[i].lat) + ",+" + $.trim(json[i].lang) + googleMapKey;

            loadMapIframe(docMap, url);

            var appendMeDiv = $('#doctorResult' + i);
            var counter =  0;
            counter = parseInt(i, 10)+1;
            if(counter < json.length){
                var newOne = appendMeDiv.clone(true, true);
                
                //changing id of cloned elements
                //newOne.find(".name").prop("id", "doc-name" + counter);
                newOne.find('[id^="doc-map-address'+i+'"]').prop("id", "doc-map-address" + counter);
                newOne.find('[id^="doc-image'+i+'"]').prop("id", "doc-image" + counter);
                newOne.find('[id^="doc-name'+i+'"]').prop("id", "doc-name" + counter);
                newOne.find('[id^="doc-facebook'+i+'"]').prop("id", "doc-facebook" + counter);
                newOne.find('[id^="doc-twitter'+i+'"]').prop("id", "doc-twitter" + counter);
                newOne.find('[id^="doc-website'+i+'"]').prop("id", "doc-website" + counter);
                newOne.find('[id^="more'+i+'"]').prop("id", "more" + counter);
                newOne.find('[id^="slide'+i+'"]').prop("id", "slide" + counter);
                newOne.find('[id^="doc-speciality'+i+'"]').prop("id", "doc-speciality" + counter);
                newOne.find('[id^="doc-phone'+i+'"]').prop("id", "doc-phone" + counter);
                newOne.find('[id^="doc-address'+i+'"]').prop("id", "doc-address" + counter);
                newOne.find('[id^="doc-schedule'+i+'"]').prop("id", "doc-schedule" + counter);
                
                //add cloned element to HTML
                newOne.insertAfter(appendMeDiv).prop("id", "doctorResult" + counter);
            }

            //add attribute data to allow for sliding
            $('[id^="more'+i+'"]').attr("data-slide-content", "slide" + i);


        }

    });

}


function loadMapIframe(iframeName, url) {
    var $iframe = $(iframeName);
    if ($iframe.length) {
        $iframe.prop('src', url);
        return false;
    }
    return true;
}


function getSpecialityNames(generalID, specificID) {


    var valueGSPS = JSON.parse(window.localStorage.getItem("gsps"));
    var valueSPS = JSON.parse(window.localStorage.getItem("sps"));

    var gSpecName = "";
    var sSpecName = "";


    for (var i in valueGSPS) {
        if (valueGSPS[i].id == generalID) {
            gSpecName = valueGSPS[i].name;
        }
    }



    for (var i in valueSPS) {
        if (valueSPS[i].id == specificID) {
            sSpecName = valueSPS[i].name;
        }
    }


    var returnVal = gSpecName + "/" + sSpecName;


    return returnVal;

}