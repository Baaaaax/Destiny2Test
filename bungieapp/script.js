var input = document.querySelector("#searchInput");
var submitBtn = document.querySelector("#submitBtn");
var settings = {
  method: "GET",
  headers: {
    "x-api-key": "cc8fc21c337a4399b94e9e11e7d908b8"
  }
};

function createLiAndA(name, link) {
  var li = document.createElement("li");
  document.querySelector("#ulList").appendChild(li);
  //create A

  var a = document.createElement("a");
  a.setAttribute("href", link);
  a.style.textDecoration = "none";
  a.style.color = "#0000FF";
  a.appendChild(document.createTextNode(name));
  li.appendChild(a);
}

function getMembershipId(name) {
  var fetchUrl =
    "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/" +
    name +
    "/";
  fetch(fetchUrl, settings)
    .then(r => {
      return r.json();
    })
    .then(res => {
      console.log(res.Response[0].membershipId);

      console.log(res.Response);
      return getProfile(res.Response[0].membershipId);
    });
}

function getProfile(id) {
  var fetchUrl =
    "https://www.bungie.net/Platform/Destiny2/2/Profile/" +
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
    "/Stats/Activities/?page=5";

  fetch(fetchUrl, settings)
    .then(r => {
      return r.json();
    })
    .then(res => {
      console.log(res);
      return getPostGameCarnageReport(
        res.Response.activities[0].activityDetails.instanceId
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
      var playersArr = JSON.parse(JSON.stringify(res.Response.entries));
      playersArr.forEach(element => {
        createLiAndA(
          element.player.destinyUserInfo.displayName,
          "https://www.google.it/"
        );
      });
    });
}

submitBtn.addEventListener("click", () => getMembershipId(input.value));
