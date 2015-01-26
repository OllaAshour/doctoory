//When Document is ready
$(document).ready(function() {
     $("#joinUS").bind("click", joinUS);
   
});

function joinUS(){
  
    var emailExists = false;
    var name = $("#name").val();
    var email = $("#email").val();
    var gender = $("input[name=gender]:checked").val();
    var city = $('#sel-city :selected').val();
    var area = $('#sel-area :selected').val();
    
    $.ajax({
       url: "http://doctoory.com/front/api/users/check/"+email,
       type: 'POST',
       success: function (data) {
           emailExists = true;
       },
       error: function() {
           alert("Email already exists");
      }
     
     });
     
      if (emailExists){
            $.ajax({
                    url: "http://doctoory.com/front/api/joinus",
                    type: 'POST',
                    data:{                   
                         name: name,
                         email: email,
                         city_id:city,
                         area_id:area,
                         gender: gender

                     },
                     success: function (data) {
                         alert("Thank you for signing up");
                     },
                     error: function() {
                         alert("Something went wrong, please try again later");
                    }

            });
        }

}