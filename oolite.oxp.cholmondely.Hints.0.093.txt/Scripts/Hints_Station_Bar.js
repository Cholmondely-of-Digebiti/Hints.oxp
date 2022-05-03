this.name           = "Hints_Station_Bar.js";
this.author         = "Cholmondely";
this.copyright      = "(C) 2022 Cholmondely";
this.licence        = "CC-NC-by-SA 4.0";
this.description    = "Adds a station bar where you might overhear useful tips";
this.version        = "0.0.93";

"use strict";

// LittleBear's comments: This script would let you give a randomly picked item each time. Although you might want to also add a timer so the messages change over time. You could also add tests for Government type, economy or station type so different items are overheard in different systems types and station types.

// Set Up your F4 Screen Option Like this:-

this.startUpComplete = this.shipDockedWithStation = function(station) {
this.barinterface();
}
this.removebar = this.shipWillLaunchFromStation = function() {
player.ship.dockedStation.setInterface("bar_chatter",null);
}

//  Now add your Visit the Bar Interface like this:- 

this.barinterface = function() {	
player.ship.dockedStation.setInterface("bar_chatter",{
title: "Visit the Station Bar",
category: "Activity",
summary: "Useful gossip can sometimes be overheard in the Bar",
callback: this.showBar.bind(this)});	
};

// Phkb's Set up to allow colour (from http://www.aegidian.org/bb/viewtopic.php?p=283402#p283402)

//-------------------------------------------------------------------------------------------------------------
this.processText = function (text) {
    var final = [];
    var colors = [];
    var columnWidth = 32; // this is the maximum display width available
    var paras = text.split("\n");
    var color = "";
    for (var i = 0; i < paras.length; i++) {
        var line = "";
        // special case for a blank line
        if (paras[i].length == 0 && i < paras.length - 1) {
            final.push("");
            colors.push(color);
            continue;
        }
        var words = paras[i].split(" ");
        for (var j = 0; j < words.length; j++) {
            // look for a colour change
            if (words[j].indexOf("{color:") >= 0) {
                // get the color deinition
                color = words[j].substring(words[j].indexOf("{color:") + 7, words[j].indexOf("}"));
                if (color == "reset") color = ""; // check for a reset to set the color back to the default
                // remove the color definition from the word
                words[j] = words[j].substring(0, words[j].indexOf("{color:")) + words[j].substring(words[j].indexOf("}") + 1);
            }
            // can we fit this word into the line?
            if (defaultFont.measureString(line + " " + words[j]) > columnWidth) {
                final.push(line); // put the current line into the final array
                colors.push(color);
                line = ""; // clear the text
            }
            line += (line.length == 0 ? "" : " ") + words[j];
        }
        if (line.trim() != "") {
            final.push(line); // make sure any leftovers are put into the array
            colors.push(color);
            line = "";
        }
    }
    // return all the data we compiled in a dictionary
    return {
        lines: final,
        colors: colors
    };
}

//-------------------------------------------------------------------------------------------------------------
// returns true if a HUD with allowBigGUI is enabled, otherwise false
this.$isBigGuiActive = function $isBigGuiActive() {
	if (oolite.compareVersion("1.83") <= 0) {
		return player.ship.hudAllowsBigGui;
	} else {
		var bigGuiHUD = ["XenonHUD.plist", "coluber_hud_ch01-dock.plist"]; // until there is a property we can check, I'll be listing HUD's that have the allow_big_gui property set here
		if (bigGuiHUD.indexOf(player.ship.hud) >= 0) {
			return true;
		} else {
			return false;
		}
	}
}

// Now add this code so that when the Visit the Bar Option is selected Oolite will randomly pick one of the messages you have set up in descriptions. Version 0.93: This now includes PHKB's colour-tweaking additions

this.showBar = function () {
    // grab the text from the descriptions
    var text = expandDescription("[hints_bar_gossip]");
    var breakdown = this.processText(text);

    var defaultColor = "yellowColor";
    var displayLines = 26;
    if (this.$isBigGuiActive() == false) displayLines = 20;
    var choices = {};
    
    // add the text lines to the choices dictionary
    for (var i = 0; i < breakdown.lines.length; i++) {
        choices["line_" + (i < 10 ? "0" : "") + i.toString()] = {
            text: breakdown.lines[i],
            alignment: "LEFT",
            color: (breakdown.colors[i] == "" ? defaultColor : breakdown.colors[i]),
            unselectable: true
        }
    }
    // add some spacers to push the text to the top of the screen
    for (var i = 0; i < displayLines - breakdown.lines.length; i++) {
        choices["spacer" + i] = {
            text: "",
            unselectable: true
        }
    }
    // add a final choice to inform the player what to do next
    choices["z_end"] = {
        text: "Press enter to continue"
    }

    mission.runScreen({
        title: "The Local Bar",
        screenID: "show_bar",
        choices: choices,
        overlay: "litf_bg_localbar.png", //This adds the bar image behind the message
        exitScreen: "GUI_SCREEN_INTERFACES",
    })
}
