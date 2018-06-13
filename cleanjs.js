var view = false;
var toggleView = function () {
    if (!view) {
        document.getElementById('porta').style = document.getElementById('porta').style = 'position:absolute; bottom:0px; left:0; border: 1px solid #000; width:360px; background-color:#303030; color:#fff; font-family: arial; height:600px;'
    }
    else {
        document.getElementById('porta').style = document.getElementById('porta').style = 'position:absolute; bottom:-555px; left:0; border: 1px solid #000; width:360px; background-color:#303030; color:#fff; font-family: arial; height:600px;'
    }
    view = !view;
};

(function () {

    var timerTitle, eventdatetime, eventdatedisplay, playlistid, mainquesttitle, myquestdisclaimer, trophyhtml, rewardheaderlabeltext, myrewardlabel;
    function getPortaJSON(callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
        };
        xhttp.open('GET', 'http://www.switchmagic.com:4111/api/getporta');
        xhttp.send();
    }
    var processPortaJSON = function (json) {

        var portajson = JSON.parse(json);
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
    getPortaJSON(processPortaJSON);
    var buildPage = function () {
        var portacontainer = document.createElement('DIV');
        portacontainer.setAttribute('style', 'position:absolute; bottom:50px; left:20px; width:360px; height:600px; overflow:hidden;');

        var porta = document.createElement('DIV');
        porta.setAttribute('style', 'position:absolute; bottom:-555px; left:0; border: 1px solid #000; width:360px; background-color:#303030; color:#fff; font-family: arial; height:600px;');
        porta.id = 'porta';

        var portaheader = document.createElement('DIV');
        portaheader.id = 'portaHeader';
        portaheader.setAttribute('onclick', 'toggleView()');
        portaheader.setAttribute('style', 'position:relative; height:40px; width:100%; border-bottom:1px solid #696060; z-index:0; cursor:pointer;');
        portaheader.innerHTML = "<ul style=\"margin:5px; list-style-type: none;\"><li style=\"float:left; border-radius:50%; border:1px solid red; position: relative;left: -33px; top:7px; padding:3px; background-color:red; height:15px; width:15px; text-align:center; font-weight: 700;\">3</li><li style=\"float:left;position: relative;left: -25px; top:11px; font-weight:700;\">APP-XPERIENCE</li><li style=\"float:left; position: relative;top:6px; left:90px; z-index:1;\"><img src=\"http://switchmagic.com:4111/assets/images/desktop/crown.svg\" style=\"width:25px;\"></li><li style=\"float:left; position: relative;top:5px; left: 100px;\"><i _ngcontent-c2=\"\" class=\"fa fa-play-circle play-icon\" style=\"font-size: 28px;\"></i></li></ul>";
        porta.appendChild(portaheader);
        var portajson = {
            timer: {
                timertitle: ' E3 2018 Awesomeness',
                eventdatetime: 'jul 11,2018 17:00:00 GMT-08:00',
                eventdatedisplay: '<span style=\"opacity:.5;\">July 11th, 2018 9PM (EDT)</span>'
            },
            playlist: {
                playlistid: 'PLKmxlt7z7bU_9U6Ko0q17K9h7ZQJpZ2xx',
            },
            quest: {
                mainquesttitle: 'My Main Quest Title',
                questdisclaimer: 'My Quest Disclaimer <br /><hr>',
                trophyhtml: '<i class=\"fa fa-trophy\" style=\"font-size: 30px; position: relative; left: -30px; position:relative; float:left;\"></i>',
                rewardheaderlabeltext: 'Reward',
                rewardlabel: 'My Reward Label'
            }

        }

        var deadline = new Date(eventdatetime);
        var now = new Date().getTime();
        var t = deadline - now;
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        var countdown = document.createElement('DIV');
        countdown.id = 'countdown';
        countdown.setAttribute('style', 'position:relative; text-align:center; width:60%; margin:10px auto;');
        var countdownheader = document.createElement('DIV');
        countdownheader.id = 'countdownHeader';
        countdownheader.setAttribute('style', 'position:relative; width:100%; margin:10px auto; text-align:left; padding-left:10px;');
        var clock = document.createElement('i');
        clock.setAttribute('class', 'fa fa-clock-o fa-lg');
        clock.setAttribute('style', 'color:#0074d1');
        countdownheader.appendChild(clock);
        var clocklabel = document.createElement('SPAN');
        clocklabel.id = 'clockLabel';
        clocklabel.setAttribute('style', 'color:#0074d1; font-weight:700;')
        clocklabel.innerHTML = timerTitle;
        countdownheader.appendChild(clocklabel);
        porta.appendChild(countdownheader);

        var timerholder = document.createElement('DIV');
        timerholder.setAttribute('style', 'position:relative; padding:15px; background-color:#000; font-size: larger;');
        timerholder.id = 'timerHolder';
        var ddays, dhours, dminutes, dseconds;
        days !== 0 ? ddays = days + '<span style=\"opacity:.5;\">D </span>' : ddays = '';
        hours !== 0 ? dhours = hours + '<span style=\"opacity:.5;\">H </span>' : dhours = '';
        minutes !== 0 ? dminutes = minutes + '<span style=\"opacity:.5;\">M </span>' : dminutes = '';
        seconds !== 0 ? dseconds = seconds + '<span style=\"opacity:.5;\">S </span>' : dseconds = '';
        var counttimer = document.createTextNode(ddays + dhours + dminutes + dseconds);
        timerholder.appendChild(counttimer);
        countdown.appendChild(timerholder);
        var eventdate = document.createElement('DIV');
        eventdate.id = 'eventDate';
        eventdate.setAttribute('style', 'width:100%; text-align:center; padding-top:3px; position: relative; padding-bottom: 10px; top: -5px;')
        eventdate.innerHTML = eventdatedisplay;
        porta.appendChild(countdown);
        porta.appendChild(eventdate);
        portacontainer.appendChild(porta);
        document.body.appendChild(portacontainer);
        var adder = 0;
        function updateTimer() {
            var deadline = new Date(eventdatetime);
            var now = new Date().getTime();
            var t = deadline - now;
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((t % (1000 * 60)) / 1000);
            var ddays, dhours, dminutes, dseconds;
            days !== 0 ? ddays = days + '<span style=\"opacity:.5;\">D </span>' : ddays = '';
            hours !== 0 ? dhours = hours + '<span style=\"opacity:.5;\">H </span>' : dhours = '';
            minutes !== 0 ? dminutes = minutes + '<span style=\"opacity:.5;\">M </span>' : dminutes = '';
            seconds !== 0 ? dseconds = seconds + '<span style=\"opacity:.5;\">S </span>' : dseconds = '';
            document.getElementById('timerHolder').innerHTML = ddays + dhours + dminutes + dseconds;
            adder++;
            setTimeout(updateTimer, 1000);
        }
        updateTimer();

        var playlist = [];
        var apiKey = 'AIzaSyAwvSsb58T7r_Q8mrRPXqhdd8ZxD1XbBTE';
        function getThumbnail(callback, playlistID) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    callback(this.responseText);
                }
            };
            xhttp.open('GET', 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=\" + playlistID + \"&key=AIzaSyAwvSsb58T7r_Q8mrRPXqhdd8ZxD1XbBTE&part=snippet&maxResults=50', true);
            xhttp.send();
        }

        getThumbnail(processTYResponse, playlistid);
        var adderplaylist = 1;
        var playlistcontainer = document.createElement('DIV');
        playlistcontainer.id = 'playlistContainer';
        playlistcontainer.setAttribute('style', 'width:100%; overflow-y:auto; overflow-x: hidden; height:341px; display:none;');
        var playlistheader = document.createElement('DIV');
        playlistheader.id = 'playListHeader';
        playlistheader.setAttribute('style', 'position:relative; height:28px;  border-bottom:1px solid #696060; padding:10px 0px 3px 5px; background-color:#0074d1; font-weight: 700;');
        playlistheader.innerHTML = 'E3 2018 Playlist';
        porta.appendChild(playlistheader);
        var addPlayList = function (item) {
            var playlistdoc = document.createElement('DIV');
            playlistdoc.id = 'playListDoc';
            playlistdoc.setAttribute('style', 'position:relative; width:100%; height:60px;  border-bottom:1px solid #696060; padding-bottom:3px;');
            var playlistitem = document.createElement('DIV');
            playlistitem.id = 'playListItem' + adderplaylist;
            playlistitem.setAttribute('style', 'width:100%; height:60px; cursor:pointer; overflow:hidden;');
            playlistitem.innerHTML = '<img src=\"' + item.snippet.thumbnails.medium.url + '\" style=\"height:60px; background-color:#303030;\">';
            playlistdoc.appendChild(playlistitem);
            var playlisttitle = document.createElement('DIV');
            playlisttitle.innerHTML = '<span style=\"position:absolute; right:0; top:0; width:65%; padding-top:5px; overflow:hidden;\">' + item.snippet.title + '</span>';
            playlistdoc.appendChild(playlisttitle);
            playlistcontainer.appendChild(playlistdoc);
            porta.appendChild(playlistcontainer);
            if (adderplaylist === playlist.length) {
                portacontainer.appendChild(porta);
                document.body.appendChild(portacontainer);
            }
        }
        function processTYResponse(res) {
            var data = JSON.parse(res);
            playlist = data.items;
            playlist.forEach(addPlayList);
        }
        var chatcontainer = document.createElement('DIV');
        chatcontainer.id = 'chatContainer';
        chatcontainer.setAttribute('style', 'display:none; position:absolute;');
        chatcontainer.innerHTML = 'CHAT';
        porta.appendChild(chatcontainer);
        portacontainer.appendChild(porta);
        document.body.appendChild(portacontainer);

        document.getElementById('playListHeader').innerHTML = 'Quests'; 
        questcontainer = document.createElement('DIV');
        questcontainer.id = 'questContainer';
        questcontainer.setAttribute('style', 'position:absolute; padding:10px;');

        var questtitleblock = document.createElement('DIV');
        questtitleblock.id = 'questTitleBlock';

        var questtitlemain = document.createElement('DIV');
        questtitlemain.id = 'questTitleMain';
        questtitlemain.innerHTML = mainquesttitle;
        questtitleblock.appendChild(questtitlemain);
        var questdisclaimer = document.createElement('DIV');
        questdisclaimer.id = 'questDisclaimer';
        questdisclaimer.setAttribute('style', 'opacity:.5;')
        questdisclaimer.innerHTML = myquestdisclaimer;
        questtitleblock.appendChild(questdisclaimer);
        var trohpyimg = document.createElement('LI');
        trohpyimg.innerHTML = trophyhtml;
        var questrewardheader = document.createElement('UL');
        questrewardheader.setAttribute('style', 'list-style-type: none;');
        questrewardheader.id = 'questRewardHeader';
        questrewardheader.appendChild(trohpyimg);
        var rewardheader = document.createElement('LI');
        rewardheader.setAttribute('style', 'list-style-type: none; width: 300px;');
        var rewaredheaderlabel = document.createElement('DIV');
        rewaredheaderlabel.setAttribute('style', 'opacity:.5;')
        rewaredheaderlabel.id = 'rewardHeaderLabel';
        rewaredheaderlabel.innerHTML = rewardheaderlabeltext;
        var rewaredlabel = document.createElement('DIV');
        rewaredlabel.id = 'rewardLabel';
        rewaredlabel.innerHTML = myrewardlabel;
        rewardheader.appendChild(rewaredheaderlabel);
        rewardheader.appendChild(rewaredlabel);
        questrewardheader.appendChild(rewardheader);
        questtitleblock.appendChild(questrewardheader);
        questcontainer.appendChild(questtitleblock);

        porta.appendChild(questcontainer);
        portacontainer.appendChild(porta);
        document.body.appendChild(portacontainer);
        var footer = document.createElement('DIV');
        footer.id = 'footer';
        footer.setAttribute('style', 'width:100%; height:40px; background-color:#000; color:#fff; position:absolute; bottom:0;');
        footer.innerHTML = '<ul style=\"margin:5px; list-style-type: none; font-size:14px; text-align:center; font-weight:500; \"><li style=\"float:left; margin:0 10px; cursor:pointer; position:relative; left:-25px; \"><div><i style=\"font-weight: 700;\" class=\"fa fa-question\" aria-hidden=\"true\"></i></div><div>Quests</div></li><li style=\"float:left; margin:0 10px; cursor:pointer; position:relative; left:-5px;\"><div><i style=\"font-weight: 700;\" class=\"fa fa-comments-o\" aria-hidden=\"true\"></i></div><div>Chat</div></li><li style=\"float:left; margin:0 10px; cursor:pointer; position:relative; left: 6px;\"><div><i style=\"font-weight: 700;\" class=\"fa fa-play\" aria-hidden=\"true\" style=\"color:#fff;\"></i></div><div>Play List</div></li><li style=\"float:left; margin:0 10px; cursor:pointer; position:relative; left:8px;\"><div><i style=\"font-weight: 700;\" class=\"fa fa-youtube-play\" aria-hidden=\"true\"></i></div><div>Now Playing</div></li></ul>';
        porta.appendChild(footer);
        portacontainer.appendChild(porta);
        document.body.appendChild(portacontainer);
    }
})();
