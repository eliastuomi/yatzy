//Generate randon numbes
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//Create dices object
var dices = { "values": [1, 1, 1, 1, 1], "rollsleft": 2 };

//Get current dice values
dices.getcurrent = function () { return this.values; };

//Helper functions for calculating current dice combinations

//Gives amount of dices with given value
dices.hassame = function (z) {
    var a = this.values.slice();
    var x = a.filter((n) => n === z);
    return x.length;
};

//Return highest pair or 0
dices.haspair = function () {
    for (var i = 6; i > 0; i--) {
        let a = this.values.slice();
        let x = a.filter((n) => n === i);
        if (x.length >= 2) {
            return x[0] * 2;
        }
    }
    return 0;
};


//Return highest three of a kind or 0
dices.hasthreeofkind = function () {
    for (var i = 6; i > 0; i--) {
        var a = this.values.slice();
        var x = a.filter((n) => n === i);
        if (x.length >= 3) {
            return x[0] * 3;
        }
    }
    return 0;
};

//Return highest four of a kind or 0
dices.hasfourofkind = function () {
    for (var i = 6; i > 0; i--) {
        var a = this.values.slice();
        var x = a.filter((n) => n === i);
        if (x.length >= 4) {
            return x[0] * 4;
        }
    }
    return 0;
};

//Return true or false if yatzy
dices.hasyatzy = function () {
    for (var i = 6; i > 0; i--) {
        var a = this.values.slice();
        var x = a.filter((n) => n === i);
        if (x.length === 5) {
            return true;
        }
    }
    return false;
};

//Check for straight, return 0 for no straight, 1 for small, 2 for big
dices.hasstraight = function () {
    var hassmall = true;
    var hasbig = true;
    var a = this.values.slice().sort((a, b) => a - b);
    for (var i = 0; i < 5; i++) {
        if (a[i] !== i + 1) { hassmall = false; }
        if (a[i] !== i + 2) { hasbig = false; }
    }
    //alert(hassmall)
    if (hassmall === true) return 1;
    if (hasbig === true) return 2;
    return 0;

};


//Return sum of all dices
dices.sumall = function () {
    var arrSum = this.values.reduce((a, b) => a + b, 0);
    return arrSum;
};

//Return highest two pairs or 0
dices.hastwopairs = function () {
    for (var i = 6; i > 0; i--) {
        for (var j = 6; j > 0; j--) {
            if (i !== j) {
                var x = this.values.slice().filter((n) => n === i);
                var y = this.values.slice().filter((n) => n === j);
                if (x.length >= 2 && y.length >= 2) {
                    return x[0] * 2 + y[0] * 2;
                }
            }
        }
    }
    return 0;
};

//Return value of full house or 0
dices.hasfullhouse = function () {
    for (var i = 6; i > 0; i--) {
        for (var j = 6; j > 0; j--) {
            if (i !== j) {
                var x = this.values.slice().filter((n) => n === i);
                var y = this.values.slice().filter((n) => n === j);
                if (x.length >= 3 && y.length >= 2) {
                    return x[0] * 3 + y[0] * 2;
                }
            }
        }
    }
    return 0;
};

//Create array for table objects
var tables = [];


//Create table objects
var ones = { "id": "ones", "played": false };
ones.getvalue = function () { return dices.hassame(1); };
tables.push(ones);

var twos = { "id": "twos", "played": false };
twos.getvalue = function () { return dices.hassame(2) * 2; };
tables.push(twos);

var threes = { "id": "threes", "played": false };
threes.getvalue = function () { return dices.hassame(3) * 3; };
tables.push(threes);

var fours = { "id": "fours", "played": false };
fours.getvalue = function () { return dices.hassame(4) * 4; };
tables.push(fours);

var fives = { "id": "fives", "played": false };
fives.getvalue = function () { return dices.hassame(5) * 5; };
tables.push(fives);

var sixes = { "id": "sixes", "played": false };
sixes.getvalue = function () { return dices.hassame(6) * 6; };
tables.push(sixes);

var pair = { "id": "pair", "played": false };
pair.getvalue = function () { return dices.haspair(); };
tables.push(pair);

var twopairs = { "id": "twopairs", "played": false };

tables.push(twopairs);

var threeofkind = { "id": "threeofkind", "played": false };

tables.push(threeofkind);

var fourofkind = { "id": "fourofkind", "played": false };
fourofkind.getvalue = function () { return dices.hasfourofkind(); };
tables.push(fourofkind);

var smallstraight = { "id": "smallstraight", "played": false };
smallstraight.getvalue = function () {
    if (dices.hasstraight() === 1) { return 15; }
    return 0;
};
tables.push(smallstraight);

var bigstraight = { "id": "bigstraight", "played": false };
bigstraight.getvalue = function () {
    if (dices.hasstraight() === 2) { return 20; }
    return 0;
};
tables.push(bigstraight);

var fullhouse = { "id": "fullhouse", "played": false };
fullhouse.getvalue = function () { return dices.hasfullhouse(); };
tables.push(fullhouse);

var chance = { "id": "chance", "played": false };
chance.getvalue = function () { return dices.sumall(); };
tables.push(chance);

var yatzy = { "id": "yatzy", "played": false };
yatzy.getvalue = function () {
    if (dices.hasyatzy() === true) { return 50; }
    return 0;
};
tables.push(yatzy);


//Refresh table values according to current dice values
function refresh() {
    for (var i = 0; i < tables.length; i++) {
        if (tables[i].played === false) {
            document.getElementById(tables[i].id).value = tables[i].getvalue();
        }
    }
}

//Roll unselected dices, if there are rolls left, and update dices.values
//Refresh value tables according to new dice values
dices.roll = function () {
    if (this.rollsleft > 0) {
        this.rollsleft -= 1;
        document.getElementById("left").innerHTML = this.rollsleft;

        for (var i = 0; i < 5; i++) {
            var box = document.getElementById("checkbox" + i);
            var label = document.getElementById("boxlabel" + i);

            if (box.checked === false) {
                var rnd = getRandomInt(6) + 1;
                box.value = rnd;
                label.style.backgroundImage = 'url("/static/dices/dice' + rnd + '.png")';
                this.values[i] = rnd;
            }
        }
        refresh();
    }
};

//Begin new turn by resetting rolls
dices.resetrolls = function () {
    this.rollsleft = 2;
    document.getElementById("left").innerHTML = 2;
};




//Refresh current sum
function refreshsum() {
    var newsum = 0;
    for (var i = 0; i < tables.length; i++) {
        if (tables[i].played === true) {
            newsum += parseInt(document.getElementById(tables[i].id).value);
        }
    }
    if (parseInt(document.getElementById("bonus").innerHTML) == 50) {
        newsum += 50;
    }
    document.getElementById("sum").innerHTML = newsum;
}

//Refresh bonus
function refreshbonus() {
    var upstairsum = 0;
    for (var i = 0; i < 6; i++) {
        if (tables[i].played === true) {
            upstairsum += parseInt(document.getElementById(tables[i].id).value);
        }

    }
    if (upstairsum >= 63) {
        document.getElementById("bonus").innerHTML = 50;
    }
    else {
        document.getElementById("bonus").innerHTML = upstairsum - 63;
    }
}

//Fuction for checking if all tables are played
function isgameover() {
    for (var i = 0; i < tables.length; i++) {
        if (tables[i].played === false) {
            return false;
        }
    }
    return true;
}

//List to store current game session scores
var currentscorelist = [];

//If game is over, add current score to list
function gameover() {

    currentscorelist.push(parseInt(document.getElementById("sum").innerHTML));
    document.getElementById("insert").hidden = false;
    var ul = document.getElementById("currentlist");
    ul.hidden = false;
    var li = document.createElement("li");
    li.className = "list-group-item py-1 text-center";
    li.innerHTML = parseInt(document.getElementById("sum").innerHTML);
    ul.appendChild(li);

}

//Begin new turn
function newturn() {
    dices.resetrolls();
    for (var i = 0; i < 5; i++) {
        document.getElementById("checkbox" + i).checked = false;
    }
    dices.roll();
    dices.resetrolls();
    document.getElementById("left").innerHTML = dices.rollsleft;
    refreshbonus();
    refreshsum();
    if (isgameover()) {
        gameover();
    }
}

//Start a new game
function newgame() {
    for (var i = 0; i < tables.length; i++) {
        tables[i].played = false;
        document.getElementById(tables[i].id).value = 0;
        document.getElementById(tables[i].id).disabled = false;
    }
    newturn();

}

//Add button event listeners
$("#roll").click(function () {
    dices.roll();
});
$("#newgame").click(function () {
    newgame();
});
$("#insert").click(function () {
    $.ajax({
        type: "POST",
        url: "/insertscores/",
        data: { "scores[]": currentscorelist },
        success: function (response) {
            location.reload();
        }
    });
});

$("#ones").click(function () {
    $(this).attr("disabled", true);
    ones.played = true;
    newturn();
});
$("#twos").click(function () {
    $(this).attr("disabled", true);
    twos.played = true;
    newturn();
});
$("#threes").click(function () {
    $(this).attr("disabled", true);
    threes.played = true;
    newturn();
});
$("#fours").click(function () {
    $(this).attr("disabled", true);
    fours.played = true;
    newturn();
});
$("#fives").click(function () {
    $(this).attr("disabled", true);
    fives.played = true;
    newturn();
});
$("#sixes").click(function () {
    $(this).attr("disabled", true);
    sixes.played = true;
    newturn();
});
$("#pair").click(function () {
    $(this).attr("disabled", true);
    pair.played = true;
    newturn();
});
$("#twopairs").click(function () {
    $(this).attr("disabled", true);
    twopairs.played = true;
    newturn();
});
$("#threeofkind").click(function () {
    $(this).attr("disabled", true);
    threeofkind.played = true;
    newturn();
});
$("#fourofkind").click(function () {
    $(this).attr("disabled", true);
    fourofkind.played = true;
    newturn();
});
$("#smallstraight").click(function () {
    $(this).attr("disabled", true);
    smallstraight.played = true;
    newturn();
});
$("#bigstraight").click(function () {
    $(this).attr("disabled", true);
    bigstraight.played = true;
    newturn();
});
$("#fullhouse").click(function () {
    $(this).attr("disabled", true);
    fullhouse.played = true;
    newturn();
});
$("#chance").click(function () {
    $(this).attr("disabled", true);
    chance.played = true;
    newturn();
});
$("#yatzy").click(function () {
    $(this).attr("disabled", true);
    yatzy.played = true;
    newturn();
});

//Initiate the game
dices.roll();
dices.resetrolls();




