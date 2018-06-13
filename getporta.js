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
    var processPorta = function (json) {
        var portajson = JSON.parse(json);
        console.log('portajson: ', portajson.fn[0]);
        var myeval = eval(portajson.fn[0]);
        runporta(myeval);
    };
    getPorta(processPorta);
})();