(() => {
  window.addEventListener('load', () => {
    fetch('https://opentdb.com/api.php?amount=1')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        //console.log(data.results);
      })
      .catch((err) => {
        //alert(err);
      });

  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').
      then((registration) => {
        console.log('registered is done');
        console.log(registration);
        document.getElementById('requestButton').addEventListener('click', () => {
          registration.sync.register('image-fetch').then(() => {
            console.log('Sync registered');
          });
        });
        registration.periodicSync.register({
          tag: 'image-fetch', // default: ''
          minPeriod: 60 * 1000, // default: 0
          powerState: 'avoid-draining', // default: 'auto'
          networkState: 'avoid-cellular' // default: 'online'
        }).then(function (periodicSyncReg) {
          console.log('Periodic Sync registered');
        }, function () {
          console.log('Periodic Sync failed');
        })
      }, (err) => {
        console.log(err);
      });
      navigator.serviceWorker.controller.postMessage("Satish");
      navigator.serviceWorker.controller.postMessage("Hi!");
      const channel = new BroadcastChannel('sw-messages');
      channel.addEventListener('message', event => {
        console.log('Received', event.data);
      });
    });
  } else {
    console.log(' No service worker support in this browser');
    document.getElementById('requestButton').addEventListener('click', () => {
      console.log('Fallback to fetch the image as usual');
    });
  }
  // Connection Status
  function isOnline() {
    var connectionStatus = document.getElementById('connectionStatus');

    if (navigator.onLine) {
      connectionStatus.innerHTML = 'You are currently online!';
    } else {
      connectionStatus.innerHTML = 'You are currently offline..';
    }
  }

  //  Synchronous way
  // window.addEventListener('beforeinstallprompt', (event) => {
  //   event.userChoice.then((result) => {
  //     console.log(result.outcome);
  //     if(result.outcome === 'dismissed') {
  //         console.log('The app was not added to the home screen');
  //     } else {
  //         console.log('The app was added to home screen');
  //     }
  //   });
  // });

  //  Defered way
  var deferredPrompt;
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
  });
  document.getElementById('install-to-home-screen').addEventListener('click',
    () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((result) => {
          console.log(result.outcome);
          if (result.outcome === 'dismissed') {
            console.log('The app was not added to the home screen');
          } else {
            console.log('The app was added to home screen');
          }
        });
        delete deferredPrompt;
      }
    });

  window.addEventListener('online', isOnline);
  window.addEventListener('offline', isOnline);
  isOnline();
  localforage.setItem('test1', 'value', function (err) {
    // if err is non-null, we got an error
    localforage.getItem('test1', function (err, value) {
      // if err is non-null, we got an error. otherwise, value is the value
    });
  });
  var store = localforage.createInstance({
    name: "Anantha"
  });

  var otherStore = localforage.createInstance({
    name: "Satish"
  });

  // Setting the key on one of these doesn't affect the other.
  store.setItem("test1", "value");
  otherStore.setItem("test2", "value2");




  localforage.config({
    driver: localforage.INDEXEDDB, // [localforage.WEBSQL, localforage.INDEXEDDB], // Force WebSQL; same as using setDriver()
    name: 'myApp',
    version: 1.0,
    size: 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: 'satish', // Should be alphanumeric, with underscores.
    description: 'satish description'
  });

  // localforage.clear().then(function() {
  //     // Run this code once the database has been entirely deleted.
  //         console.log('Database is now empty.');
  //     }).catch(function(err) {
  //         // This code runs if there were any errors
  //         console.log(err);
  //     });

  // Next Example
  localforage.setItem('name', 'Sathish', function (err, value) {
    if (err)
      console.error(err);
    else
      console.log('Set value ', value);
  });
  localforage.setItem('perfume', 'Spencer').then(function (value) {
    console.log(value);
  });
  localforage.setItem('key', ["Anantha", "Satish", "Kumar"], function (err, value) {
    if (err)
      console.error(err);
    else
      console.log('Set value ', value);
  });
  localforage.getItem('key', function (err, value) {
    if (err)
      console.error(err);
    // else
    //   console.log('Got yay value ====>', value[1]);
  });

  localforage.iterate(function (value, key, iterationNumber) {
    console.log([key, value, iterationNumber]);
  }, function () {
    console.log('finished iterating');
  });
  localforage.setItem('kite', 'Germany').then(function () {
    return localforage.getItem('kite');
  }).then(function (value) {
    console.log([key, value]);
  }).catch(function (err) {
    console.log('We got error...!');
  });
  localforage.setItem('animal', 'Pig').then(function () {
    return localforage.getItem('animal');
  }).then(function (value) {
    console.log([key, value]);
  }).catch(function (err) {
    console.log('We got error...!');
  });
  //   localforage.removeItem('animal').then(function() {
  //     // Run this code once the key has been removed.
  //     console.log('Key is cleared!');
  // }).catch(function(err) {
  //     // This code runs if there were any errors
  //     console.log(err);
  // });
  localforage.length().then(function (numberOfKeys) {
    // Outputs the length of the database.
    console.log(numberOfKeys);
  }).catch(function (err) {
    // This code runs if there were any errors
    console.log(err);
  });
  localforage.key(2).then(function (keyName) {
    // Name of the key.
    console.log(keyName);
  }).catch(function (err) {
    // This code runs if there were any errors
    console.log(err);
  });
  // localforage.driver();
  localforage.ready().then(function () {
    // This code runs once localforage
    // has fully initialized the selected driver.
    console.log(localforage.driver()); // LocalStorage
    console.log(localforage.supports(localforage.INDEXEDDB));
  }).catch(function (e) {
    console.log(e); // `No available storage method found.`
    // One of the cases that `ready()` rejects,
    // is when no usable storage driver is found
  });

  localforage.dropInstance({
    name: "otherStore",
  }).then(function () {
    console.log('Dropped otherStore');
  });

  // let’s create that notification:
  document.addEventListener('DOMContentLoaded', initPage, false);
  let notificationsBtn = document.getElementById("notificationsBtn");

  function sendNotification(opacityRemaining) {
    let options = {
    body: 'Peggy wants a pretzel! You have ' + opacityRemaining  + ' seconds to feed her!',
    icon: './images/icons/icon-72x72.png'
    };
    console.log(opacityRemaining)
    let notification = new Notification('Peggy says', options);
  }

  function initPage() {
    if (!('Notification' in window)) {
    // this browser does not support notifications
    } else if (Notification.permission === 'denied') {
    // the user denied notification permission!
     console.log("Denied")
    } else if (Notification.permission === 'granted') {
    // setup UI to show notifications already enabled
     console.log("Granted");
     sendNotification();
    }
    notificationsBtn.addEventListener('click', () => {
      Notification.requestPermission();
    });
  }


  function makeParrotHungry() {
    let parrotPic = document.getElementById('parrot');
    let interval = setInterval(() => {
        parrotPic.style.opacity -= .1;
        if (parrotPic.style.opacity <= 0) {
        clearInterval(interval);
        parrotPic.style.display = "none";
        // Peggy has flown away to find food
        } else if (parrotPic.style.opacity < .5) {
          sendNotification(+parrotPic.style.opacity);
        }
    }, 1000 * 3);
    }
    function feedParrot() {
      let parrotPic = document.getElementById('parrot');
      parrotPic.style.opacity = 1.0;
    }

      function sendNotification(secondsLeft) {
        let options = {
        body: 'Peggy wants a pretzel! You have ' + (secondsLeft * 10 * 3) + 'seconds to feed her!',
        icon: './images/icons/icon-72x72.png',
        actions: [
        {
        action: "feed", title: "Feed Peggy"
        },
        {
        action: "wait", title: "Wait to Feed Peggy"
        }
        ]
        };
          navigator.serviceWorker.ready.then((sw) => {
              sw.showNotification('Peggy says', options);
          });
        }

        makeParrotHungry();

})();