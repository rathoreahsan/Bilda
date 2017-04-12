$(function(){
    // To Show the Progress Bar before each AJAX Call
    $(document).ajaxStart(function() {
        $.mobile.loading('show');
    });
    // Hide the Progress Bar when ajaxComplete
    $(document).ajaxStop(function() {
        $.mobile.loading('hide');
    });

    //Some global vaiables
    var ageId = "";
    var lessonId = "";
    var lessonName = ""; //Store the selected lesson name in this
    var serverUrl = "http://konsultrum.net/";
    var apiUrl_GetLessonsByAgeId = 'http://konsultrum.net/api/SSK/GetLessonsByAgeId';
    var apiUrl_GetLessonDetailByID = 'http://konsultrum.net/api/SSK/GetLessonDetailByID';
    var apiUrl_GetHomeworksByLessonID = 'http://konsultrum.net/api/SSK/GetHomeworksByLessonID';
    var apiUrl_GetQuestionsByHomeworkID = 'http://konsultrum.net/api/SSK/GetQuestionsByHomeworkID';

    // Agegroup button tab handler
    // Load the lesson list based on agegroup ID
    $(".agegroup").on("tap", function(){ 
        //alert("Agegroup button is touch."); 
        var title = $(this).data('tabname');
        $('#LessonTitle').text(title);  
        ageId = "";  
        ageId = $(this).attr('id');
        // Clean the lesson tab before calling
        $("#LessonTab").empty();
        //$('#pTest').empty();
        //Call AJAX
        if(parseInt(ageId) >= 1)
        {
            $('#pTest').append('Before Ajax');
            $.getJSON(apiUrl_GetLessonsByAgeId + "/" + ageId, function(info) {
                var li = "";
                $.each(info, function (i, obj) {
                    //$('#pTest').append('Ajax result.');
                    if(i === "Table") {
                        $.each(obj, function (i, value) {
                            $("#LessonTab").empty();
                            li += '<li><a  href="#three" class="lessonItem ui-btn" data-transition="slide" data-pagetitle="' + value.Name + '" data-tabname="' + value.Name + '" id="' + value.ID + '">' + value.Name + '</a></li>';                       
                            $("#LessonTab").append(li);
                        });
                        return false; 
                    }
                });
            });  
            //$('#pTest').append('After Ajax.');         
        }
    });

    // Lesson tap handler
    // Load the Homeworks list based on Lesson ID
     $(".LessonTab").on("tap", "a", function(event){ 

        lessonName = $(this).data('tabname');
        $('.LessonName').text(lessonName);
        lessonId = "";
        lessonId = $(this).attr('id');          // Get the selected lesson ID
        $(".lessonIdhw").attr("id", lessonId);  //Set the Lesson ID for open Homeworks
        $("#LessonContent").empty();            // Clean the UL before loading
        //Call AJAX
        if(parseInt(lessonId) >= 1)
        {
            $.getJSON(apiUrl_GetLessonDetailByID + "/" + lessonId, function(info) {
                var li = "";
                $.each(info, function (i, obj) {
                    if(i === "Table") {
                        $.each(obj, function (i, value) {
                            $("#LessonContent").empty();
                            var imgpath = value.ImageUrl; 
                            if (imgpath.indexOf("AttachedDocuments") >= 0) 
                            {
                                imgpath = imgpath.substring(imgpath.indexOf("AttachedDocuments"), imgpath.length);
                                imgpath = serverUrl +imgpath; 
                            }
                            if(imgpath.length > 0){
                                li += '<li><p class="lessonParagraph">' + value.Text + '</p><img class="lessonImage" src="'+ imgpath +'" alt="'+value.ImageName +'"/></li>';                       
                            }else{
                                li += '<li><p class="lessonParagraph">' + value.Text + '</p></li>';                       
                            }                           
                            $("#LessonContent").append(li);
                        });
                        return false; 
                    }
                });
            });           
        }        
    });
    
    //Lesson Detail tap handler
    //Load all the questions based on lessonId
    $('.lessonIdhw').on('tap', function(){
        //alert($('.LessonName').attr("text"));
        lessonId = $(this).attr("id");
        $('.homeworkTitle').text(lessonName);
        $("#UPGTabs").empty();            // Clean the UL before loading
        if(parseInt(ageId) >= 1)
        {
            $.getJSON(apiUrl_GetHomeworksByLessonID + "/" + lessonId, function(info) {
                var li = "";
                $.each(info, function (i, obj) {
                    if(i === "Table") {
                        $.each(obj, function (i, value) {
                            $("#UPGTabs").empty();
                            li += '<li><a  href="#upgifter-details" class="questionItem ui-btn" data-transition="slide" data-pagetitle="' + value.Name + '" data-tabname="' + value.Name + '" id="' + value.ID + '">' + value.Name + '</a></li>';                       
                            $("#UPGTabs").append(li);
                        });
                        return false; 
                    }
                });
            });
        }
    });


    //Question Detail tap handler
    //Load all the questions based on Question Id
     $("#UPGTabs").on("tap", "a", function(event){ 
        
        $('#divStudentInfo').hide();
        $('#divQuestion').hide();
        $('.qLessonTitle').text(lessonName);
        var qid = $(this).attr("id");        
        $("#divQuestion").empty();

        if(parseInt(qid) >= 1)
        {
            $.getJSON(apiUrl_GetQuestionsByHomeworkID + "/" + qid, function(info) {
                
                $.each(info, function (i, obj) {
                    if(i === "Table") {
                        var li = "";
                        if(obj.length == 0) //If no question 
                        {
                          return;   
                        }
                        else //If question then load them
                        {
                            $.each(obj, function (i, value) {
                                
                                li = "";
                                li += '<fieldset class="form-fieldset"><label class="form-label">'+ value.Text +'</label><span class="form-control"><textarea class="txtAnswer" placeholder="Ditt svar..." id="'+ value.ID +'"></textarea></span></fieldset>';
                                $("#divQuestion").append(li);
                                //after loading show the question and studentinfo divs
                                $('#divStudentInfo').show();
                                $('#divQuestion').show();
                            });
                        }
                        return false; 
                    }
                });
            });
        }
    });

    //Submit the answer by the student
    $('.submitBtn').on("tap",function(event){

        alert(' --------- submit --------- ');
    });

    $('.ui-next-btn').on('tap', function(){
        var DivID = $(this).attr('href');
         $(DivID).find('#P1Title').text(title);
    });  
});


 
// Lesson tap handler
//function LessonClick(el) {

  //  var title = $(el).data('tabname');
  //  $('.P2Title').text(title);
//    $(el).text($(el).attr("id"));

//     var newPage = '<div data-role="page" id="three" data-theme="a">' +
    

// 	<div data-role="header">
// 		<a href="#two" data-direction="reverse" class="ui-btn ui-btn-b" data-transition="slide" title="Go back">
//             <i class="fa fa-angle-left" aria-hidden="true"></i>
//             <i class="fa fa-angle-left" aria-hidden="true" style="margin-left: -8px;"></i>
//         </a>
//         <h1 class="P2Title"></h1>
//         <a href="#three" data-direction="reverse" class="ui-btn ui-btn-b ui-next-btn" data-count="1" data-transition="slide" title="Go back">
//             <i class="fa fa-angle-right" aria-hidden="true"></i>
//             <i class="fa fa-angle-right" aria-hidden="true" style="margin-left: -8px;"></i>
//         </a>
// 	</div>

// 	<div role="main" class="ui-content" style="padding: 0px;">
//         <h3 class="sub-head">
//             <a href="#upgifter" class="ui-btn" data-transition="slide">
//                 GA TILL UPPGIFTER &nbsp;&nbsp; 
//                 <i class="fa fa-angle-right" aria-hidden="true"></i>
//             </a>
//         </h3>
//         <p style="color:#fff;font-size:22px; line-height: 25px; font-weight: 400; margin-bottom: 15px; text-align: center;">
//             Valkommen! Nedan hittar du alla lektioner for denna aldersgrupp.
//         </p>
// 	</div>

// </div>



    //debugger;
    
//}

// $.ajaxStart(function() {
//     $("img#loading").show();
// });

// $.ajaxComplete(function() {
//     $("img#loading").hide();
// });