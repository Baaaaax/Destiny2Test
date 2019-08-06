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

function createEntryMatch(string) {
  var entryDiv = document.createElement("div");
  entryDiv.setAttribute("class", "match-entry");
  document.querySelector("#matchs-listing").appendChild(entryDiv);

  var p = document.createElement("p");
  p.textContent = string;
  entryDiv.appendChild(p);
}

///////////////////////////////////////////////////////////////////////////

submitBtn.addEventListener("click", () =>
  getFirstMembershipId("bax#21629", "duke#23539")
);
