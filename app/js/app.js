var unixtime = (function() {

   const {clipboard} = require('electron');
   var exports = {};

   /*
    * Display and refresh current time
    */
   var realtime = function () {
      var print = function () {
         $('#current-unixtime').html(moment().unix());
         $('#current-datetime').html(moment().format('ddd, D. MMM YYYY – HH:mm:ss'));
      };
      print();
      setInterval(print, 1000);
   };

   /*
    * Bind click actions
    */
   var bindClicks = function () {
      $('#current-unixtime').click(function () {
         clipboard.writeText($('#current-unixtime').text());
         $('#unixtime-copied').fadeIn(100);
         setTimeout(function () {
            $('#unixtime-copied').fadeOut(300);
         }, 2000);
      });
      $('#current-datetime').click(function () {
         clipboard.writeText($('#current-datetime').text());
         $('#datetime-copied').fadeIn(100);
         setTimeout(function () {
            $('#datetime-copied').fadeOut(300);
         }, 2000);
      });
   };

   /*
    * Startup
    */
   $(document).ready(function () {
      realtime();
      bindClicks();
   });

   return exports;
})();
