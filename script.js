$(function() {

  var finish1 = $('#finish1');
  var finish2 = $('#finish2');
  var input3 = $('#input3');
  var finish3 = $('#finish3');
  var finish4 = $('#finish4');
  var finish5 = $('#finish5');

  //first way to initialize: just   
  var requestUrl='https://api.github.com/users'
  //var requestStream = Rx.Observable.just(requestUrl);
  /*requestStream.subscribe(function(requestUrl) {
      finish1.text(requestUrl);
  });*/
  
  //Second way to initialize: create 
  var requestStream2 = Rx.Observable.create(function (observer) {
    jQuery.getJSON(requestUrl)
    .done(function(response) { 
      observer.next(response); })
    .fail(function(jqXHR, status, error) { observer.error(error); })
    .always(function() { observer.complete(); });
  });
  requestStream2.subscribe(function(users) {
      finish2.text("users on github: " + users.length);
  });
  
  //Third way to initialize: from event 
  var keyupsInput3 = Rx.Observable.fromEvent(input3, 'keyup')
    .map(e => e.target.value);
  keyupsInput3.subscribe(function(value) {
      finish3.text("text: " + value);
  });
  
  //Fourth way to initialize: from one promise/xhr 
  var requestStream4 = Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  requestStream4.subscribe(function(users) {
      finish4.text("users on github: " + users.length);
  });
  
  //Fifth way to initialize: from some observables 
  
  var obs1 = Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  var obs2 = Rx.Observable.range(0, 20)
  var obs3 = Rx.Observable.range(0, 10)
  var prom4 = jQuery.getJSON(requestUrl).promise();
  

  var requestStream5 = Rx.Observable.forkJoin(
    obs1, obs3, obs3, prom4
 );
  requestStream5.subscribe(function(r1, r3, r4) {
      finish5.text("users on github: " + r1.length);
  });

});