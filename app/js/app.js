var unixtime = (function() {

   const {clipboard} = require('electron');
   const datetime_format = 'MM/DD/YYYY HH:mm:ss';
   var exports = {};

   /*
    * Display and refresh current time
    */
   var realtime = function () {
      var print = function () {
         $('#current-unixtime').text(moment().unix());
         $('#current-datetime').text(moment().format(datetime_format));
      };
      print();
      setInterval(print, 1000);
   };

   /*
    * Bind copy click actions
    */
   var bindCopy = function () {
      var copy = function (binding_sel, copied_sel) {
         $(binding_sel).click(function () {
            clipboard.writeText($(binding_sel).text());
            $(copied_sel).fadeIn(100);
            setTimeout(function () {
               $(copied_sel).fadeOut(200);
            }, 700);
         });
      };
      copy('#current-unixtime', '#unixtime-copied');
      copy('#current-datetime', '#datetime-copied');
      copy('#unixtime-to-datetime-result', '#datetime-result-copied');
      copy('#datetime-to-unixtime-result', '#unixtime-result-copied');
   };

   /*
    * Bind changes on the unixtime input field
    */
   var bindUnixChange = function () {
      $('#input-unixtime').keyup(function () {
         var unixtime = this.value.length > 0 ? parseInt(this.value) : '';
         var result = (unixtime != '') ? moment.unix(unixtime).format(datetime_format) : '&nbsp;';
         result = (result == 'Invalid date') ? '<i class="fa fa-question"></i>' : result;
         $('#unixtime-to-datetime-result').html(result);
      });
   };

   /*
    * Bind changes on the datetime input field
    */
   var bindDatetimeChange = function () {
      $('#input-datetime').keyup(function () {
         var datetime = this.value;
         var result = (datetime != '') ? moment(datetime, datetime_format).unix() : '&nbsp;';
         result = (result != '&nbsp;' && isNaN(result)) ? '<i class="fa fa-question"></i>' : result;
         $('#datetime-to-unixtime-result').html(result);
      });
   };

   /*
    * Startup
    */
   $(document).ready(function () {
      realtime();
      bindCopy();
      bindUnixChange();
      bindDatetimeChange();
   });

   return exports;
})();
