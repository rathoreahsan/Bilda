$(function(){

    $('#HpTabs li a:not(".LäsMer")').on('tap', function(){
        var title = $(this).data('tabname');
        $('#P1Title').text(title);

        $.getJSON("data/Page1Data.json", function(info) {
            var li = "";
            $.each(info, function (i, obj) {
                if(i === title) {
                    $.each(obj, function (i, name) {
                        $("#P1Tabs").empty();
                        li += '<li><a href="#three" onclick="P1TabClick(this);" class="ui-btn" data-transition="slide" data-pagetitle="' + title + '" data-tabname="' + name.Title + '" id="P1Tab-' + i + '">' + name.Title + '</a></li>';                       
                        $("#P1Tabs").append(li);
                    });
                   return false; 
                }
            });
        });
    });

    $('.ui-next-btn').on('tap', function(){
        var DivID = $(this).attr('href');
         $(DivID).find('#P1Title').text(title);

        // $.getJSON("data/Page1Data.json", function(info) {
        //     var li = "";
        //     $.each(info, function (i, obj) {
        //         if(i === title) {
        //             $.each(obj, function (i, name) {
        //                 $("#P1Tabs").empty();
        //                 li += '<li><a href="#three" onclick="P1TabClick(this);" class="ui-btn" data-transition="slide" data-pagetitle="' + title + '" data-tabname="' + name.Title + '" id="P1Tab-' + i + '">' + name.Title + '</a></li>';                       
        //                 $("#P1Tabs").append(li);
        //             });
        //            return false; 
        //         }
        //     });
        // });
    });


});

function P1TabClick(el) {


    var title = $(el).data('tabname');
    $('.P2Title').text(title);

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
    
}

// $.ajaxStart(function() {
//     $("img#loading").show();
// });

// $.ajaxComplete(function() {
//     $("img#loading").hide();
// });