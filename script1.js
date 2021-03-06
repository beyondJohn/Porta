
var view = false;
var toggleView = function () {
    if (!view) {
        document.getElementById('porta').style = 'position:absolute; bottom:0px; left:0; border: 1px solid #000; width:360px; background-color:#303030; color:#fff; font-family: arial; height:600px;';
    }
    else {
        document.getElementById('porta').style = 'position:absolute; bottom:-555px; left:0; border: 1px solid #000; width:360px; background-color:#303030; color:#fff; font-family: arial; height:600px;';
    }
    view = !view;
};

(function () {
    var headerlistitems = [];
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
        timerTitle = portajson.timer.timertitle;
        eventdatetime = portajson.timer.eventdatetime;
        eventdatedisplay = portajson.timer.eventdatedisplay;
        playlistid = 'PLol_ykYs3OQ4guC3y_DE_BExqGnHH2jd_'; //portajson.playlist.playlistid;
        mainquesttitle = portajson.quest.mainquesttitle;
        myquestdisclaimer = portajson.quest.questdisclaimer;
        trophyhtml = portajson.quest.trophyhtml;
        rewardheaderlabeltext = portajson.quest.rewardheaderlabeltext;
        myrewardlabel = portajson.quest.rewardlabel;
        buildPage(portajson);
    };
    getPortaJSON(processPortaJSON);
    var buildPage = function (myportadata) {
        var portacontainer = document.createElement('DIV');
        portacontainer.setAttribute('style', 'position:absolute; bottom:50px; left:20px; width:360px; height:600px; overflow:hidden;');

        var porta = document.createElement('DIV');
        porta.setAttribute('style', 'position:absolute; bottom:-555px; left:0; border: 1px solid #000; width:360px; background-color:#303030; color:#fff; font-family: arial; height:600px;');
        porta.id = 'porta';

        // porta header
        var portaheader = document.createElement('DIV');
        portaheader.id = 'portaHeader';
        portaheader.setAttribute('onclick', 'toggleView()');
        portaheader.setAttribute('style', 'position:relative; height:40px; width:100%; border-bottom:1px solid #696060; z-index:0; cursor:pointer;');
        // recreate header UL
        var adderheaderlistitem = 0;
        var headermenu = document.createElement('UL');
        headermenu.id = 'headermenu';
        headermenu.setAttribute('style', 'margin:5px; list-style-type: none;');
        var headerlistitems = myportadata.header;
        headerlistitems.forEach((item) => {
            for (var i = 0; i < headerlistitems.length; i++) {
                if (item.id === i) {
                    var headerlistitem = document.createElement('LI');
                    headerlistitem.id = 'headerlistitem' + adderheaderlistitem;
                    var item = headerlistitems[i];
                    if (item.type === 'rewards') {
                        headerlistitem.setAttribute('style', item.style);
                        headerlistitem.innerHTML = item.obj.value;
                    }
                    else if (item.type === 'title') {
                        headerlistitem.setAttribute('style', item.style);
                        headerlistitem.innerHTML = item.obj.text;
                    }
                    else if (item.type === 'crown') {
                        var img = document.createElement('IMG');
                        img.src = item.obj.img;
                        img.setAttribute('style', item.obj.style)
                        headerlistitem.setAttribute('style', item.style);
                        headerlistitem.appendChild(img);
                    }
                    else if (item.type === 'playicon') {
                        var icon = document.createElement('i');
                        icon.setAttribute('class', item.obj.icon.class);
                        icon.setAttribute('style', item.obj.icon.style);
                        headerlistitem.setAttribute('style', item.style);
                        headerlistitem.appendChild(icon);
                    }
                    headermenu.appendChild(headerlistitem);
                    adderheaderlistitem++;
                }
            };
        });
        portaheader.appendChild(headermenu);
        porta.appendChild(portaheader);

        // countdown

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
        var spandays = document.createElement('SPAN');
        spandays.setAttribute('style', 'opacity:.5;');
        days !== 0 ? spandays.innerHTML = days + 'D ' : spandays.innerHTML = '';
        var spanhours = document.createElement('SPAN');
        spanhours.setAttribute('style', 'opacity:.5;');
        hours !== 0 ? spanhours.innerHTML = hours + 'H ' : spanhours.innerHTML = '';
        var spanminutes = document.createElement('SPAN');
        spanminutes.setAttribute('style', 'opacity:.5;');
        minutes !== 0 ? spanminutes.innerHTML = minutes + 'M ' : spanminutes.innerHTML = '';
        var spanseconds = document.createElement('SPAN');
        spanseconds.setAttribute('style', 'opacity:.5;');
        seconds !== 0 ? spanseconds.innerHTML = seconds + 'S ' : spanseconds.innerHTML = '';
        var counttimer = document.createTextNode(spandays + spanhours + spanminutes + spanseconds);
        timerholder.appendChild(counttimer);
        countdown.appendChild(timerholder);
        var eventdate = document.createElement('DIV');
        eventdate.id = 'eventDate';
        eventdate.setAttribute('style', 'width:100%; text-align:center; padding-top:3px; position: relative; padding-bottom: 10px; top: -5px;')
        eventdate.innerHTML = eventdatedisplay;
        // add countdown to portabar
        porta.appendChild(countdown);
        porta.appendChild(eventdate);
        // add portabar to body
        portacontainer.appendChild(porta);
        document.body.appendChild(portacontainer);
        // update timer
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

            var spanday = document.createElement('SPAN');
            days !== 0 ? spanday.innerHTML = days : spanday.innerHTML = '';
            var spandays = document.createElement('SPAN');
            spandays.setAttribute('style', 'opacity:.5;');
            days !== 0 ? spandays.innerHTML = 'D ' : spandays.innerHTML = '';

            var spanhour = document.createElement('SPAN');
            hours !== 0 ? spanhour.innerHTML = hours : spanhour.innerHTML = '';
            var spanhours = document.createElement('SPAN');
            spanhours.setAttribute('style', 'opacity:.5;');
            hours !== 0 ? spanhours.innerHTML = 'H ' : spanhours.innerHTML = '';

            var spanminute = document.createElement('SPAN');
            minutes !== 0 ? spanminute.innerHTML = minutes : spanminute.innerHTML = '';
            var spanminutes = document.createElement('SPAN');
            spanminutes.setAttribute('style', 'opacity:.5;');
            minutes !== 0 ? spanminutes.innerHTML = 'M ' : spanminutes.innerHTML = '';

            var spansecond = document.createElement('SPAN');
            seconds !== 0 ? spansecond.innerHTML = seconds : spansecond.innerHTML = '';
            var spanseconds = document.createElement('SPAN');
            spanseconds.setAttribute('style', 'opacity:.5;');
            seconds !== 0 ? spanseconds.innerHTML = 'S ' : spanseconds.innerHTML = '';

            document.getElementById('timerHolder').innerHTML = '';
            document.getElementById('timerHolder').appendChild(spanday);
            document.getElementById('timerHolder').appendChild(spandays);
            document.getElementById('timerHolder').appendChild(spanhour);
            document.getElementById('timerHolder').appendChild(spanhours);
            document.getElementById('timerHolder').appendChild(spanminute);
            document.getElementById('timerHolder').appendChild(spanminutes);
            document.getElementById('timerHolder').appendChild(spansecond);
            document.getElementById('timerHolder').appendChild(spanseconds);// = spandays + spanhours + spanminutes + spanseconds;
            adder++;
            setTimeout(updateTimer, 1000);
        }
        updateTimer();
        //
        // playlist
        var playlist = [];
        var apiKey = 'AIzaSyAwvSsb58T7r_Q8mrRPXqhdd8ZxD1XbBTE';
        function getThumbnail(callback, playlistID) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    callback(this.responseText);
                }
            };
            xhttp.open('GET', 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=' + playlistID + '&key=AIzaSyAwvSsb58T7r_Q8mrRPXqhdd8ZxD1XbBTE&part=snippet&maxResults=50', true);
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
            var playlistimg = document.createElement('IMG');
            playlistimg.setAttribute('style', 'height:60px; background-color:#303030;');
            playlistimg.setAttribute('src', item.snippet.thumbnails.medium.url)
            playlistitem.appendChild(playlistimg);
            playlistdoc.appendChild(playlistitem);
            var playlisttitle = document.createElement('DIV');
            var playlisttitlespan = document.createElement('SPAN');
            playlisttitlespan.setAttribute('style', 'position:absolute; right:0; top:0; width:65%; padding-top:5px; overflow:hidden;');
            playlisttitlespan.innerHTML = item.snippet.title;
            playlisttitle.appendChild(playlisttitlespan);
            playlistdoc.appendChild(playlisttitle);
            playlistcontainer.appendChild(playlistdoc);
            porta.appendChild(playlistcontainer);
            if (adderplaylist === playlist.length) {
                // add portabar to body
                portacontainer.appendChild(porta);
                document.body.appendChild(portacontainer);
            }
        }
        function processTYResponse(res) {
            var data = JSON.parse(res);
            playlist = data.items;
            playlist.forEach(addPlayList);
        }
        // chat
        var chatcontainer = document.createElement('DIV');
        chatcontainer.id = 'chatContainer';
        chatcontainer.setAttribute('style', 'display:none; position:absolute;');
        chatcontainer.innerHTML = 'CHAT';
        // add chat to porta
        porta.appendChild(chatcontainer);
        portacontainer.appendChild(porta);
        document.body.appendChild(portacontainer);

        // quest
        document.getElementById('playListHeader').innerHTML = 'Quests'; // delete
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
        // add reward header to questrewardheader
        rewardheader.appendChild(rewaredheaderlabel);
        rewardheader.appendChild(rewaredlabel);
        questrewardheader.appendChild(rewardheader);
        // add questrewardheader to questtitleblock
        questtitleblock.appendChild(questrewardheader);
        // add clic

        // add quest title block to questcontainer
        questcontainer.appendChild(questtitleblock);


        // add quest to porta
        porta.appendChild(questcontainer);
        portacontainer.appendChild(porta);
        document.body.appendChild(portacontainer);

        // add footer
        var footer = document.createElement('DIV');
        footer.id = 'footer';
        footer.setAttribute('style', 'width:100%; height:40px; background-color:#000; color:#fff; position:absolute; bottom:0;');

        var adderfooterlistitem = 0;
        var footermenu = document.createElement('UL');
        footermenu.id = 'footermenu';
        footermenu.setAttribute('style', 'margin:5px; list-style-type: none;');
        var footerlistitems = myportadata.footer;
        var arrayfooter = [];
        var clickfooter = function (type) {
            arrayfooter.forEach(function (footer) {
                if (type === 'playlist') {

                    var currentstyle = document.getElementById('questContainer').style.setProperty('display','none');
                    var currentstyle = document.getElementById('playlistContainer').style.setProperty('display','block');
                    // type === footer ? document.getElementById(type).a
                    console.log(type);
                    console.log(currentstyle);
                    //console.log(document.getElementById(type).style);
                }
                else if (type === 'quests') {

                    var currentstyle = document.getElementById('questContainer').style.setProperty('display','block');
                    var currentstyle = document.getElementById('playlistContainer').style.setProperty('display','none');
                    // type === footer ? document.getElementById(type).a
                    console.log(type);
                    console.log(currentstyle);
                    //console.log(document.getElementById(type).style);
                }
            })
        };
        footerlistitems.forEach((item) => {
            for (var i = 0; i < footerlistitems.length; i++) {
                if (item.id === i) {
                    arrayfooter.push(item.type);
                    var footerlistitem = document.createElement('LI');
                    footerlistitem.id = item.type;
                    footerlistitem.addEventListener('click', function () { clickfooter(item.type) });
                    var item = footerlistitems[i];
                    footerlistitem.setAttribute('style', item.style);
                    var divicon = document.createElement('DIV');
                    var icon = document.createElement('i');
                    icon.setAttribute('class', item.obj.icon.class);
                    icon.setAttribute('style', item.obj.icon.style);
                    divicon.appendChild(icon);
                    footerlistitem.appendChild(divicon);
                    var divtext = document.createElement('DIV');
                    divtext.innerHTML = item.obj.icon.text;
                    footerlistitem.appendChild(divtext);

                    footermenu.appendChild(footerlistitem);
                    adderfooterlistitem++;
                }
            };
        });
        footer.appendChild(footermenu);
        porta.appendChild(footer);
        portacontainer.appendChild(porta);
        document.body.appendChild(portacontainer);
    }
})();
