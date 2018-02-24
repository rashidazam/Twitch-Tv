$(function() {
  // array of regular Twitch.tv streamers
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb",
    "noobs2ninjas", "freecodecamp", "Starladder5", "ThijsHS", "imaqtpie",
    "AdmiralBulldog", "brunofin", "comster404"
  ];

  //iterating through streamers array
  channels.forEach(function(channel) {
    function URL(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };
    //first JSON call("streams") to check if streamers are online or not
    $.getJSON(URL("streams", channel), function(data1) {
      //console.log(data1);
      var game,
        user;
      //storing the data in game and user variables resp.
      //accounting for "null", "404" and "online" responses
      if (data1.stream === null) {
        game = "offline";
        user = "offline";
      } else if (data1.status === 404) {
        game = channel + " does not exist";
        user = "offline";
      } else {
        game = data1.stream.game;
        user = "online";
      };
      //another JSON call("channels") to get more info about each channel
      // also if streamer is online getting "current game" info
      $.getJSON(URL("channels", channel), function(data) {
        //console.log(data2);
        var displayName = data.display_name != null ? data.display_name : channel,
          logo = data.logo != null ? data.logo : "https://i.imgur.com/7ndt7Cl.png",
          currentStatus = user === "online" ? data.status + "<div class='online'" : "<div class='offline'",
          html = "";
        //appending received data to display on screen
        html = '<div class="result"><div class="row ' +
          user + '"><div class="result"><div class="col-md-4 col-sm-4 col-xs-4" id="icon"><img src="' +
          logo + '" class="logo"></div><div class="col-md-4 col-sm-4 col-xs-4" id="name"><a href="' +
          data.url + '" target="_blank">' +
          displayName + '</a></div><div class="col-md-4 col-sm-4 col-xs-4" id="streaming">' +
          game + '<span class="hidden-xs">' +
          currentStatus + '</span></div></div></div></div>';
        user === "online" ? $("#display").prepend(html) : $("#display").append(html);
      });

    });

  });
  //activating all 3 buttons for online, offline and all users resp.
  var allBtn = $("#allBtn"),
    onlineBtn = $("#onlineBtn"),
    offlineBtn = $("#offlineBtn");

  allBtn.click(function() {
    $('.online').show();
    $('.offline').show();
    $('.not-exist').show();
  })

  onlineBtn.click(function() {
    $('.online').show();
    $('.offline').hide();
    $('.not-exist').hide();
  })

  offlineBtn.click(function() {
    $('.offline').show();
    $('.online').hide();
    $('.not-exist').hide();
  })

});