(function(){
    function getPorta(callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("this.responseText: ", this.responseText);
                callback(this.responseText);
            }
            else{
                console.log('Network connections issues. Please try again later :-)')
            }
        };
        xhttp.open('GET', 'http://www.switchmagic.com:4111/api/gettransit');
        xhttp.send();
    }
    var processPorta = function (script) {
        console.log('HELLO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', script.fa);
        var myeval = eval(script.fa);
        runporta(myeval);
    };
    getPorta(processPorta);
})();