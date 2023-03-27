
//         var selector = '.round';

//         $(selector).on('click', function () {
//             $(selector).removeClass('active');
//             $(this).addClass('active');
//         });

// {/* #################### */}

//         jQuery(document).ready(function () {
//             ImgUpload();
//         });

//         function ImgUpload() {
//             var imgWrap = "";
//             var imgArray = [];

//             $('.upload__inputfile').each(function () {
//                 $(this).on('change', function (e) {
//                     imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
//                     var maxLength = $(this).attr('data-max_length');

//                     var files = e.target.files;
//                     var filesArr = Array.prototype.slice.call(files);
//                     var iterator = 0;
//                     filesArr.forEach(function (f, index) {

//                         if (!f.type.match('image.*')) {
//                             return;
//                         }

//                         if (imgArray.length > maxLength) {
//                             return false
//                         } else {
//                             var len = 0;
//                             for (var i = 0; i < imgArray.length; i++) {
//                                 if (imgArray[i] !== undefined) {
//                                     len++;
//                                 }
//                             }
//                             if (len > maxLength) {
//                                 return false;
//                             } else {
//                                 imgArray.push(f);

//                                 var reader = new FileReader();
//                                 reader.onload = function (e) {
//                                     var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
//                                     imgWrap.append(html);
//                                     iterator++;
//                                 }
//                                 reader.readAsDataURL(f);
//                             }
//                         }
//                     });
//                 });
//             });

//             $('body').on('click', ".upload__img-close", function (e) {
//                 var file = $(this).parent().data("file");
//                 for (var i = 0; i < imgArray.length; i++) {
//                     if (imgArray[i].name === file) {
//                         imgArray.splice(i, 1);
//                         break;
//                     }
//                 }
//                 $(this).parent().parent().remove();
//             });
//         }
//     // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//         $(document).ready(function(){ 
//             $('.tab-a').click(function(){  
//             $(".dPage").removeClass('active');
//             $(".dPage[data-id='"+$(this).attr('data-id')+"']").addClass("active");
//             $(".tab-a").removeClass('active');
//             $(this).parent().find(".tab-a").addClass('active-a');
//             });
//         });

// include sidebar
$(function(){
  $("#sidebar").load("layout/sidebar.html"); 
    $("#navbar").load("layout/header.html"); 
  });

// ##################################### alert Js #####################
//////////////////////////////////////// playlist start/////////////////////////////////////////
init();

function init(){
    var videoplaylist = document.getElementById('videoplaylist');
    var playlist = document.getElementById('playlist');
    var tracks = playlist.getElementsByTagName('a');
    videoplaylist.volume = 0.10;
    videoplaylist.play();
    
    for(var track in tracks) {
      var link = tracks[track];
      if(typeof link === "function" || typeof link === "number") continue;
      
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var song = this.getAttribute('href');
         run(song, videoplaylist, this);
      });
    }
    
    videoplaylist.addEventListener('ended',function(e) {
        for(var track in tracks) {
          var link = tracks[track];
          var nextTrack = parseInt(track) + 1;
          if(typeof link === "function" || typeof link === "number") continue;
          if(!this.src) this.src = tracks[0];
          if(track == (tracks.length - 1)) nextTrack = 0;
                                  console.log(nextTrack);
          if(link.getAttribute('href') === this.src) {
            var nextLink = tracks[nextTrack];
            run(nextLink.getAttribute('href'), videoplaylist, nextLink);
            break;
          }
        }
    });
}

function run(song, videoplaylist, link){
        var parent = link.parentElement;

        //quitar el active de todos los elementos de la lista
        var items = parent.parentElement.getElementsByTagName('li');
        for(var item in items) {
          if(items[item].classList)
            items[item].classList.remove("active");
        }
        
        //agregar active a este elemento
        parent.classList.add("active");
        
        //tocar la cancion
        videoplaylist.src = song;
        videoplaylist.load();
        videoplaylist.play();
}
// increse and Derese btn

$('.btn-number').click(function(e){
  e.preventDefault();
  
  fieldName = $(this).attr('data-field');
  type      = $(this).attr('data-type');
  var input = $("input[name='"+fieldName+"']");
  var currentVal = parseInt(input.val());
  if (!isNaN(currentVal)) {
      if(type == 'minus') {
          
          if(currentVal > input.attr('min')) {
              input.val(currentVal - 1).change();
          } 
          if(parseInt(input.val()) == input.attr('min')) {
              $(this).attr('disabled', true);
          }

      } else if(type == 'plus') {

          if(currentVal < input.attr('max')) {
              input.val(currentVal + 1).change();
          }
          if(parseInt(input.val()) == input.attr('max')) {
              $(this).attr('disabled', true);
          }

      }
  } else {
      input.val(0);
  }
});
$('.input-number').focusin(function(){
 $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
  
  minValue =  parseInt($(this).attr('min'));
  maxValue =  parseInt($(this).attr('max'));
  valueCurrent = parseInt($(this).val());
  
  name = $(this).attr('name');
  if(valueCurrent >= minValue) {
      $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
  } else {
      alert('Sorry, the minimum value was reached');
      $(this).val($(this).data('oldValue'));
  }
  if(valueCurrent <= maxValue) {
      $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
  } else {
      alert('Sorry, the maximum value was reached');
      $(this).val($(this).data('oldValue'));
  }
  
  
});
$(".input-number").keydown(function (e) {
      // Allow: backspace, delete, tab, escape, enter and .
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
           // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) || 
           // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
               // let it happen, don't do anything
               return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
      }
  });