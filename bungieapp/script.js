var firstInput = document.querySelector("#firstInput");
var secondInput = document.querySelector("#secondInput");
var submitBtn = document.querySelector("#submitBtn");

var settings = {
  method: "GET",
  headers: {
    "x-api-key": "cc8fc21c337a4399b94e9e11e7d908b8"
  }
};

function createLiAndA(name, link, teamMateBool) {
  var li = document.createElement("li");
  if (teamMateBool) {
    document.querySelector("#ulList").appendChild(li);
  } else {
    document.querySelector("#ulList2").appendChild(li);
  }

  var a = document.createElement("a");
  a.setAttribute("href", link);
  a.style.textDecoration = "none";
  a.style.color = "#0000FF";
  a.appendChild(document.createTextNode(name));
  li.appendChild(a);
}

///////////////////////////////////////////////////////////////////////////

function getMembershipId(name) {
  var newName = encodeURIComponent(name);

  var fetchUrl =
    "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/" +
    newName +
    "/";

  fetch(fetchUrl, settings)
    .then(r => {
      return r.json();
    })
    .then(res => {
      return getProfile(res.Response[0].membershipId);
    });
}

function getProfile(id) {
  var fetchUrl =
    "https://www.bungie.net/Platform/Destiny2/4/Profile/" +
    id +
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
        res.Response.profile.data.characterIds[0]
      );
    });
}

function getActivityHistory(membType, destinyMembershipId, characterId) {
  var fetchUrl =
    "https://www.bungie.net/Platform/Destiny2/" +
    membType +
    "/Account/" +
    destinyMembershipId +
    "/Character/" +
    characterId +
    "/Stats/Activities/?count=40&mode=32";

  fetch(fetchUrl, settings)
    .then(r => {
      return r.json();
    })
    .then(res => {
      console.log(res);

      res.Response.activities.forEach(element =>
        getPostGameCarnageReport(element.activityDetails.instanceId)
      );
    });
}

function getPostGameCarnageReport(activityId) {
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

      res.Response.entries.forEach(element => {
        createLiAndA(
          element.player.destinyUserInfo.displayName,
          "https://www.google.it/",
          element.standing == 0
        );
        //checking if is in the enemy team
        if (element.standing == 1) {
          compareIfPlayed(element.player.destinyUserInfo.membershipId, secId);
        }
      });
    });
}

function compareIfPlayed(firstId, secondId) {
  if (firstId == secondId) {
    console.log("played tog");
  }
}

submitBtn.addEventListener("click", () => getMembershipId("bax#21629"));
