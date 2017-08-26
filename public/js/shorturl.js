// add an event listener to the shorten button for when the user clicks it
$('.btn-shorten').on('click', function(){
  $('#error-message').hide()
  // AJAX call to /api/shorten with the URL that the user entered in the input box
  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#url-field').val()},
    success: function(data){
      var resultHTML = '';
      if(data.error) {
         // display the shortened URL to the user that is returned by the server
        resultHTML =  'Error: ' + data.message;
        $('#error-message').html(resultHTML);
        $('#error-message').hide().fadeIn('slow');
      } else {
        // display the shortened URL to the user that is returned by the server
        resultHTML = '<a class="result" href="' + data.shortUrl + '">'
            + data.shortUrl + '</a>';
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');
      }
        
        
    }
  });

});