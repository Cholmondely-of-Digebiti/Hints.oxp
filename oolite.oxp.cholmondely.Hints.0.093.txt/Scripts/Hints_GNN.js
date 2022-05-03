this.name           = "Education_GNN.js";
this.author         = "Cholmondely";
this.copyright      = "(C) 2022 Cholmondely";
this.licence        = "CC-NC-by-SA 4.0";
this.description    = "This .js file doesn't do anything at all yet.";
this.version        = "0.0.0";

"use strict";

//General Note. Not too sure what news items to add that would be genuinely educational and not come over as forced. But keeping this in the scripts folder just in case...

//LittleBear's comments: Needs other stuff: Under this.startupcomplete set up a news variable as 0 if not already defined. This gives you an easy way to check that each news item in your script is only given once. Under exiting.hyperspace increment a timer each time a jump is made so you can spread out the flavour news items so they don't pop up all at once.

//this.startUpComplete = function()
//{
//    if (!missionVariables.planner_planNames)
//    {
//	missionVariables.planner_plans = JSON.stringify({});
//	missionVariables.planner_planNames = JSON.stringify({"1_EXIT":
//							     "Exit."});
//    }
//    this._plans = JSON.parse(missionVariables.planner_plans);
//    this._planNames =  JSON.parse(missionVariables.planner_planNames);
//    this.$dockedCheck();
//}

//Then you just need a test like this under exiting hyperspace:- 

// Send the 2nd (Rooters) Broadcast to GNN.- Is Sent as a Priority 1 once 4 jumps have been made since Broadcast 1 was sent.
if (missionVariables.random_station_names_news === 2 &&  missionVariables.random_station_names_timer > 3) {
missionVariables.random_station_names_timer = 0;
var news = new Object;
news.ID = this.name;
news.Message = expandDescription("[random_station_names_2_news]");
news.Agency = 2;
news.Priority = 1;
this.passScreen(news,1); 
// The same method is used as above.
}

// Send the 3rd (Tionisla Chronicle) Broadcast to GNN.- Is Sent as a Priority 1 once 6 jumps have been made since Broadcast 2 was sent.
if (missionVariables.random_station_names_news === 3 &&  missionVariables.random_station_names_timer > 5) {
missionVariables.random_station_names_timer = 0;
var news = new Object;
news.ID = this.name;
news.Message = expandDescription("[random_station_names_3_news]");
news.Agency = 4;
news.Priority = 1;
this.passScreen(news,1); 
// The same method is used as above.
}

//And so on for however many news broadcasts you want to write.

// Now copy and past in the function below to send the news items to GNN when the conditions are met:

this.passScreen = function(news,mode)
{var a = worldScripts.GNN._insertNews(news);
if(!a){ if(mode) missionVariables.random_station_names_news++;  // If GNN conforms sucess, advance the News Counting variable to the next Broadcast.
return;
} else {if(a<0){ // If the buffer was full then the mission variable counting the News Broadcasts wasn't advanced. Once the player has made the required number of jumps Random Station names will check again.
return;
}}}

// In a descriptions file write the text for your news broadcasts. All you need is a:-

"random_station_names_1_news" = "Type in your text!";
"random_station_names_2_news" = "Type in your text for the next one";

And so on for however many broadcasts you want to send.

//• Interview of Chap reaching Elite status and giving manouever he used
//Usge Ceanal has just attained Elite status according to a press release from the Elite Federation. In an interview, Ceanal said that he was an advocate of the Barkanion Bounce (named after the renowned Lave Academician) - swirling in loops towards his opposition whilst varying his speed. This tactic enables a trouble-free approach to one’s targets, and accounted for many hundreds of his kills.

//• Rock hermit destroyed in anarchy (a Pirate Cove)
//A pirate-infested Rock Hermit has just been destroyed by a police viper-squad in the rodent-ridden anarchy of Riedquat. A centre for the local slave and narcotics trade, it has finally been shut down, allowing much safer travel in the Old Worlds sector! “The pirate plague has finally been eliminated” claimed the courageous Commander Reed Spar of GalCop, "the Old Worlds are now as safe as a parentally-patrolled paddling pool!".

//• Pirates nab chap on milk run Ensoreus-Ararus Furs-Computers: turns out to be a millionaire
//Reports are just coming in about Orit Ceedthse, an Ensorean trader was murdered at Ararus yesterday by marauding pirates. It turns out that the feline was phenomenally rich, due to trading in furs and computers between Ensoreus and Ararus. Was she killed for his cargo, her money or for more murky misdemeanours? Truth is, we don’t know!

//• Quirium Cascade mishap
//A quirium cascade bomb has been detonated at Qubeen. It caught some 27 ships and a rock hermit as well as the launcher of the bomb, a rodent from nearby Maesin. Inquiries are ongoing into the exact cause of the incident. GalCop is offering handsome rewards for relevant information.

//• Murgh the Munificent, the Metropolitan of Maduro, in the Middle Oceans of Aronar, has been promoted to be the Sectoral Sacerdote for the Church of Giles the Creator. A devotee of fine wines, he is rumoured to have crepuscular connections in the ship-building industry as well as having links to the "Cuban Cohort", a mysterious group of musical mayhem-makers. He has for some time been threatening to lead a crusade against the Witchspace Lobster Worshippers. Watch this space!

//• Chap who lost massive contract due to taking fewer jumps
//Arquebus the Audacious, the master trader, has finally come a cropper! After years of amassing a fortune trading in furs and computers, he took a time-sensitive contract to deliver wodgets to Ceesxe. Forgetting that fewer long jumps take much more time than many more smaller jumps, he arrived several days too late - and lost well over thirty thousand credits as a result! He is rumoured to have sold his ship in disgust and retired to a life of farming trumbles!

// Archimandrite Di Joner of Digebiti has just published a new commentary on the treatise on Theological Arithmetics by Saint Phibo Nacci. Combined with an earlier analysis of the mystical fourth codicil of the Codex of Giles the Creator, Di Joner claims to prove that the ooniverse was designed through random purposefulness, and show the numerical underpinnings of all that exists. Copies of his masterpiece have been selling like hotcakes! But does anybody actually understand it? Truth is, we don't know - and neither does anyone else!

//Police vipers at Diso have fought off another incursion of some several dozen pirates from the local anarchies, Uszaa and Reidquat. The President of Diso has appealed to GalCop for more help in stabilising the local region.

//The number of pirates armed with Electronic Counter Measures is increasing. Arch-Chandler RedSpear of GalCop's weapons research laboratory at Ceesxe has confirmed that more and more pirates are now using ECM in combat: "Do not fire missiles at pirates grouped in clusters of four or more, or you will waste them. At least one of them will be able to destroy your missiles" he told our reporters this morning.