var firstInput = document.querySelector("#firstInput");
var secondInput = document.querySelector("#secondInput");
var submitBtn = document.querySelector("#submitBtn");

var settings = {
  method: "GET",
  headers: {
    "x-api-key": "cc8fc21c337a4399b94e9e11e7d908b8"
  }
};

function getFirstMembershipId(firstName, secondName) {
  var newName = encodeURIComponent(firstName);

  var fetchUrl =
    "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/" +
    newName +
    "/";

  fetch(fetchUrl, settings)
    .then(r => {
      return r.json();
    })
    .then(res => {
      return getSecondMembershipId(res.Response[0].membershipId, secondName);
    });
}

function getSecondMembershipId(firstId, secondName) {
  var newName = encodeURIComponent(secondName);

  var fetchUrl =
    "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/" +
    newName +
    "/";

  fetch(fetchUrl, settings)
    .then(r => {
      return r.json();
    })
    .then(res => {
      return getProfile(firstId, res.Response[0].membershipId);
    });
}

function getProfile(firstId, secId) {
  var fetchUrl =
    "https://www.bungie.net/Platform/Destiny2/4/Profile/" +
    firstId +
    "/?components=100";
  fetch(fetchUrl, settings)
    .then(r => {
      return r.json();
    })
    .then(res => {
      console.log(res);
      console.log(res.Response.profile.data.characterIds[0]);
      return getActivityHistory(
        res.Response.profile.data.userInfo.membershipType,
        res.Response.profile.data.userInfo.membershipId,
        res.Response.profile.data.characterIds[0],
        secId
      );
    });
}

function getActivityHistory(membType, destinyMembershipId, characterId, secId) {
  var fetchUrl =
    "https://www.bungie.net/Platform/Destiny2/" +
    membType +
    "/Account/" +
    destinyMembershipId +
    "/Character/" +
    characterId +
    "/Stats/Activities/?count=2&mode=32";

  fetch(fetchUrl, settings)
    .then(r => {
      return r.json();
    })
    .then(res => {
      console.log(res);

      res.Response.activities.forEach(element =>
        getPostGameCarnageReport(element.activityDetails.instanceId, secId)
      );
    });
}

function getPostGameCarnageReport(activityId, secId) {
  var fetchUrl =
    "https://www.bungie.net/Platform/Destiny2/Stats/PostGameCarnageReport/" +
    activityId +
    "/";

  fetch(fetchUrl, settings)
    .then(r => {
      return r.json();
    })
    .then(res => {
      console.log(res);

      //getting the team were the frist name is, and saving it in the standing variable
      var standing = 0;
      res.Response.entries.forEach(e => {
        if (e.player.destinyUserInfo.displayName == "Bax") {
          standing = e.standing;
        }
      });

      //foreach person in the match create a link and do the check if they played togheter
      res.Response.entries.forEach(element => {
        //checking if is in the enemy team
        if (element.standing != standing) {
          //checking if someone in the enemy team is the second input value given
          if (element.player.destinyUserInfo.membershipId == secId) {
            console.log("played");
          }
        }
      });
    });
}

function showStatsOfMatch(obj) {
  console.log(obj);
}
