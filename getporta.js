(function(){
    function getPorta(callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
        };
        xhttp.open("GET", "http://www.switchmagic.com:4111/api/getporta");
        xhttp.send();
    }
    var processPorta = function (json) {

        var portajson = JSON.parse(json);
        console.log("portajson: ", portajson);
        console.log(portajson.timer.timertitle);
        timerTitle = portajson.timer.timertitle;
        eventdatetime = portajson.timer.eventdatetime;
        eventdatedisplay = portajson.timer.eventdatedisplay;
        playlistid = portajson.playlist.playlistid;
        mainquesttitle = portajson.quest.mainquesttitle;
        myquestdisclaimer = portajson.quest.questdisclaimer;
        trophyhtml = portajson.quest.trophyhtml;
        rewardheaderlabeltext = portajson.quest.rewardheaderlabeltext;
        myrewardlabel = portajson.quest.rewardlabel;
        buildPage();
    };
    getPorta(processPorta);
})();