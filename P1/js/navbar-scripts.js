function showCard(cardId) {
    event.stopPropagation();

    document.getElementById("notification-set1").style.display = "none";
    document.getElementById("notification-set2").style.display = "none";
    document.getElementById(cardId).style.display = "block";

    if (cardId == "notification-set1") {
      document.getElementById("btn-1").style.borderBottomWidth = "5px";
      document.getElementById("btn-2").style.borderBottomWidth = "0px";
    } else {
      document.getElementById("btn-1").style.borderBottomWidth = "0px";
      document.getElementById("btn-2").style.borderBottomWidth = "5px";
    }
  }

  