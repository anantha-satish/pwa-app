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
            }, (err) => {
                console.log(err);
            });         
        });
    } else {
        console.log(' No service worker support in this browser');
    }
})();