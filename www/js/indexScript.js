//Global Variables
var allAreas = new Array();
var allSpecficSpecialities = new Array();
var allGenSpecialities = new Array();

//When Document is ready
$(document).ready(function() {
    getCities();
    $("#sel-city").bind("change", getAreas);
    getPlaces();
    $("#sel-place").bind("change", getGeneralSpecialities);
    $("#sel-spec1").bind("change", getSpecialistSpecialities);
    $("#search-btn").bind("click", getResults);

});


/*Parsing Data and adding it to  non-dependent drop down list*/
function parseAppendGeneralJSONData(jsonFileName, selectID) {


    $.getJSON(jsonFileName, null, function(json) {

        for (var i in json) {
            $(selectID)
                    .append($('<option>', {value: json[i].id})
                            .text(json[i].name));
        }

    });
}

/*Parsing Data and adding it to dependent drop down lists*/
function parseAppendDependentJSONData(jsonFileName, selectID, optionParamter, parentID, isEmpty) {
    /*OptionParameter 
     * 2-- Areas
     * 4-- GSpec
     * 5-- SSpec 
     */

    if (isEmpty) {
        $.getJSON(jsonFileName, function(json) {

            for (var i in json) {
                if (optionParamter == 2) {
                    allAreas.push(json[i]);
                }
                if (optionParamter == 4) {
                    allGenSpecialities.push(json[i]);
                }
                if (optionParamter == 5) {
                    allSpecficSpecialities.push(json[i]);
                }

            }

            //Add specific data by their parent ID
            var dataByParentID = new Array();
            if (optionParamter == 2) {
                for (var i in allAreas) {
                    if (allAreas[i].city_id == parentID) {
                        dataByParentID.push(allAreas[i]);
                    }
                }
            }
            if (optionParamter == 4) {
                window.localStorage.setItem("gsps", JSON.stringify(allGenSpecialities));
                for (var i in allGenSpecialities) {
                    if (allGenSpecialities[i].place_id == parentID) {
                        dataByParentID.push(allGenSpecialities[i]);
                    }
                }
            }
            if (optionParamter == 5) {

                window.localStorage.setItem("sps", JSON.stringify(allSpecficSpecialities));

                for (var i in allSpecficSpecialities) {
                    if (allSpecficSpecialities[i].gspecialist_id == parentID) {
                        dataByParentID.push(allSpecficSpecialities[i]);
                    }
                }
            }


            //Append Options
            for (var k in dataByParentID) {

                $(selectID)
                        .append($('<option>', {value: dataByParentID[k].id})
                                .text(dataByParentID[k].name));

            }

        });
    }
    //remove any data
    $('option', $(selectID)).remove();


    //Add specific data by their parent ID
    var dataByParentID = new Array();
    if (optionParamter == 2) {
        for (var i in allAreas) {
            if (allAreas[i].city_id == parentID) {
                dataByParentID.push(allAreas[i]);
            }
        }
    }
    if (optionParamter == 4) {
        window.localStorage.setItem("gsps", JSON.stringify(allGenSpecialities));
        for (var i in allGenSpecialities) {
            if (allGenSpecialities[i].place_id == parentID) {
                dataByParentID.push(allGenSpecialities[i]);
            }
        }
    }
    if (optionParamter == 5) {

        window.localStorage.setItem("sps", JSON.stringify(allSpecficSpecialities));

        for (var i in allSpecficSpecialities) {
            if (allSpecficSpecialities[i].gspecialist_id == parentID) {
                dataByParentID.push(allSpecficSpecialities[i]);
            }
        }
    }


    //Append Options
    for (var k in dataByParentID) {

        $(selectID)
                .append($('<option>', {value: dataByParentID[k].id})
                        .text(dataByParentID[k].name));

    }

}

//get Cities on event change
function getCities() {


    // parseAppendGeneralJSONData("http://doctoory.com/front/api/cities?callback=?", "#sel-city");
    parseAppendGeneralJSONData("cities.json", "#sel-city");

}

//get Areas on event change
function getAreas() {
    //remove any data
    resetAll();

    //get parent id
    var parentID = $(this).val();
    var isEmpty = 0;


    if (allAreas.length == 0) {
        isEmpty = 1;
    }

    parseAppendDependentJSONData("areas.json", "#sel-area", 2, parentID, isEmpty);
    // parseAppendDependentJSONData("http://doctoory.com/front/api/areas?callback=?", "#sel-area", 2, parentID, isEmpty);

}

//get Places on event change
function getPlaces() {

    parseAppendGeneralJSONData("places.json", "#sel-place");
    //parseAppendGeneralJSONData("http://doctoory.com/front/api/places?callback=?", "#sel-place");
}

//get General Specialities on event change
function getGeneralSpecialities() {

    resetSpec1();
    var parentID = $(this).val();
    var isEmpty = 0;


    if (allGenSpecialities.length == 0) {
        isEmpty = 1;
    }

    parseAppendDependentJSONData("gsps.json", "#sel-spec1", 4, parentID, isEmpty);
    // parseAppendDependentJSONData("http://doctoory.com/front/api/gsps?callback=?", "#sel-spec1", 4, parentID, isEmpty);



}

//get Specific Specialities on event change
function getSpecialistSpecialities() {
    resetSpec2();
    var parentID = $(this).val();
    var isEmpty = 0;

    if (allSpecficSpecialities.length == 0) {
        isEmpty = 1;
    }

    parseAppendDependentJSONData("ssps.json", "#sel-spec2", 5, parentID, isEmpty);
    // parseAppendDependentJSONData("http://doctoory.com/front/api/ssps?callback=?", "#sel-spec2", 5, parentID, isEmpty);

}


//get selected Results on Button Get Results
function getResults() {

    var city = $('#sel-city :selected').val();
    var areas = $('#sel-area :selected').val();
    var places = $('#sel-place :selected').val();
    var generalSpec = $('#sel-spec1 :selected').val();
    var specificSpec = $('#sel-spec2 :selected').val();
    var docValue = $("#doc-name").val();
    var passValue = 'result.html?city=' + city + '&area=' + areas + '&name=' + docValue + '&place=' + places + '&gsps=' + generalSpec + '&ssps=' + specificSpec;
    
    $("#search-btn").prop("href",passValue);

}

/*Reset Values when Parent Changes */

function resetAll() {

    $('option', $("#sel-area")).remove();

    $("#sel-area").append($('<option>'));
    $("#sel-city").select2({
        placeholder: "إختر المدينة"
    });

    $("#sel-area").select2({
        placeholder: "إختر المنطقة"
    });

    resetPlaces();


}

function resetPlaces() {

    $("#sel-place").select2({
        placeholder: "المنشأة العلاجية"
    });

    resetSpec1();
}

function resetSpec1() {

    $('option', $("#sel-spec1")).remove();
    $("#sel-spec1").append($('<option>'));
    $("#sel-spec1").select2({
        placeholder: "التخصص العام"
    });
    resetSpec2();
}

function resetSpec2() {
    $('option', $("#sel-spec2")).remove();
    //there has to be one option for placeholder to appear
    $("#sel-spec2").append($('<option>'));
    $("#sel-spec2").select2({
        placeholder: "التخصص الخاص"
    });
}
