(function() {
    'use strict';


    var ayayaTfu = ["ayaya" , "ehehe" , "momolewd", "nyanpls" , "rainbowpls"];
    var emotesReplace = [
        ["rarePope" , "5d52fe5925570a0ac7e85130"] ,
        ["RAREPOPE" , "5e5d774995a74a54e386036f"] ,
        ["rareCaramba" , "596b72057e71d43314a77551"],
        ["RARECARAMBA" , "5e5d7f1595a74a54e38603e0"]
    ]
	var bbttvOwnerBadgeIMGS = [
	'https://github.com/xxSkyy/BetterBTTV/raw/master/src/ownerBadge/1.png',
	'https://github.com/xxSkyy/BetterBTTV/raw/master/src/ownerBadge/2.png',
	'https://github.com/xxSkyy/BetterBTTV/raw/master/src/ownerBadge/3.png'
	]
	
	var bbttvOwnerBadge = `<span title="Twórca Better BTTV"><img alt="Twórca BetterBTTV" aria-label="Odznaka „Twórca BetterBTTV”" class="chat-badge" src="https://github.com/xxSkyy/BetterBTTV/raw/master/src/ownerBadge/1.png" srcset="https://github.com/xxSkyy/BetterBTTV/raw/master/src/ownerBadge/1.png 1x, https://github.com/xxSkyy/BetterBTTV/raw/master/src/ownerBadge/2.png 2x, https://github.com/xxSkyy/BetterBTTV/raw/master/src/ownerBadge/3.png 4x"></span>`;
	var ownerName = 'skyy_xx';
	
	
	
	var pathname = window.location.pathname;
	var channel_name = pathname.substring(1).toLowerCase();
	
	
    var removedCounter = 0;
    var removeAyaya = false;
	
	var channelEmotes = false;
	
	var globalEmotesList = [];
	var channelEmotesList = [];

    var BBTTV_menu = `<div class="bbttv-chat-settings tw-border-t tw-mg-t-2 tw-pd-t-2">
        <div class="tw-mg-y-05 tw-pd-x-05"><p class="tw-c-text-alt-2 tw-font-size-6 tw-strong tw-upcase">Better BetterTTV</p></div>
        <div class="tw-full-width tw-relative">
            <button id="switchAyayaMode" class=" tw-pd-05 tw-block tw-border-radius-medium tw-full-width tw-interactable--alpha tw-interactable--hover-enabled tw-interactable tw-interactive">No AYAYA mode : <span class="ayayaStatus"></span></button>
        </div>
</div>`;

    var EMOTE_menu = `<div class="group-header" data-emote-channel="BetterBTTV Global Emotes">
	<div class="header-info">
		BetterBTTV Global Emotes
	</div>
	<div class="emote-container bbttv-emote-container">

	</div>
</div>`;


    var EMOTE_menu_channel = `<div class="group-header" data-emote-channel="BetterBTTV Channel Emotes">
	<div class="header-info">
		BetterBTTV Channel Emotes
	</div>
	<div class="emote-container bbttv-channel-emote-container">

	</div>
</div>`;




    updateEmotes();
    initSettings();
    setInterval(bonusCheck , 5000);

    function initSettings() {
        let ayayaCookie = $.cookie("disableAyaya");
        if(ayayaCookie == 'true'){
            removeAyaya = true;
        }
        let removedAyaya = $.cookie("removedAyaya");
        if(removedAyaya > 0) {
            removedAyaya = removedCounter;
        }
    }


    function formatEmote(name , imageId) {
         return '<div class="bttv-emote-tooltip-wrapper bttv-emote bttv-channel bttv-channel-emo"> <img src="https://cdn.betterttv.net/emote/' + imageId + '/1x" srcset="https://cdn.betterttv.net/emote/' + imageId + '/2x 2x, https://cdn.betterttv.net/emote/' + imageId + '/3x 4x" alt="rarePope" class="chat-line__message--emote"> <div class="bttv-emote-tooltip bttv-emote-tooltip--up bttv-emote-tooltip--align-center"> ' + name + '<br> Better BTTV emote</div> </div>';
    }

    function formatEmoteMenu(name , imageId) {
        return '<div class="emote third-party bbttv-emote" data-emote="'+name+'" title="'+name+' (from 3rd Better BTTV)"><img class="lazy-emote" data-src="https://cdn.betterttv.net/emote/'+ imageId +'/2x" src="https://cdn.betterttv.net/emote/'+ imageId +'/2x"></div>';
    }


    function updateEmotes() {
          fetch('https://raw.githubusercontent.com/xxSkyy/BetterBTTV/master/data.json')
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        if(data.emotes){
            emotesReplace = data.emotes;
			globalEmotesList = data.emotes;
            console.log("BetterBTTV | Zaktualizowano emoty");
        }
		
		if(data.channels[channel_name]){
			let emotesToAdd = data.channels[channel_name];
			emotesReplace = emotesToAdd.concat(emotesReplace);	
			console.log("BetterBTTV | Dodano emoty kanału");
			channelEmotesList = emotesToAdd;
			channelEmotes = true;
		}
		
        if(data.ayaya){
            ayayaTfu = data.ayaya;
        }
    });
    };




    function bonusCheck() {
       $(".tw-button.tw-button--success.tw-interactive").click();
	   
	   let newButton = $("chat-input-buttons-container button.tw-align-items-center");
       console.log(newButton);
	   if($(newButton).length){
		   $(newButton).first.click();
		   console.log("CLICKED!");
	   }
    }

    function addMenuOptions() {
		let visibleMenu = false;
		let visibleBBTTVMenu = false;
		let menuClass = "div[data-a-target='chat-settings-balloon'] .simplebar-scroll-content>div>div";
		if($(menuClass).length) visibleMenu = true;
		if($(".bbttv-chat-settings").length) visibleBBTTVMenu = true;
		if(visibleMenu && !visibleBBTTVMenu){
			 $(".chat-settings__content").append(BBTTV_menu);
			 
			 $("#switchAyayaMode").click( function(){
				removeAyaya = !removeAyaya;
				updateMenuAyayaStatus();
				$.cookie("disableAyaya" , removeAyaya);
			 });
			 
             updateMenuAyayaStatus();
		}else if(visibleMenu && visibleBBTTVMenu) {
			//console.log("already added ayaya filter");
		}else{
			setTimeout(addMenuOptions , 100);
		}
		

    }



    function updateMenuAyayaStatus() {
           if(removeAyaya) {
               $(".ayayaStatus").html("<a style='color:green'>ON</a>");
            }else{
                $(".ayayaStatus").html("<a style='color:red'>OFF</a>");
            }
    }

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

    $(document).ready( function(){

        console.log("BetterBTTV - By Skyy_xx - Discord : Sky#2594");

        function checkEmoteMenu() {

            let exist = false;

            if($(".emote-menu").length) {
             exist = true;
            }

            if(exist) {
                $("#all-emotes-group").prepend(EMOTE_menu);
                for(let e = 0; e < globalEmotesList.length; e++) {
                    $(".bbttv-emote-container").append( formatEmoteMenu(globalEmotesList[e][0] , globalEmotesList[e][1] ));
                }


				
				if(channelEmotes) {
					 $("#all-emotes-group").prepend(EMOTE_menu_channel);
					for(let e = 0; e < channelEmotesList.length; e++) {
						$(".bbttv-channel-emote-container").append( formatEmoteMenu(channelEmotesList[e][0] , channelEmotesList[e][1] ));
					}
				}


                $(".bbttv-emote").click(function() {
                    let code = $(this).attr("data-emote");
                    prompt("Kod emotki (skopiuj i wklej na chat) : " , code + " " );

                });
				
                console.log("Better BTTV | Dodano emotki do menu!");





            }else{
             setTimeout(checkEmoteMenu , 2000);
            }




        }



        function checkChat() {
            var exist = false;

            if($(".chat-list__list-container").length) {
              exist = true;
            }

            if(exist) {
                console.log("BetterBTTV | Wczytano!");

                $(".chat-list__list-container").attr("id" , "watchMe");

                $("button[data-a-target='chat-settings']").click(function(){
                   setTimeout(addMenuOptions, 250);
                });



                $("#watchMe").on('DOMNodeInserted', function(e) {
				
					if($(e.target).find("span.chat-line__username>span>span").length) {
						if($(e.target).find("span.chat-line__username span span").html() == ownerName) {
							//console.log($(e.target).find("span.chat-line__username>span>span").html());
							$(e.target).prepend(bbttvOwnerBadge);
						}
					}
					
                    var text = $(e.target).find(".text-fragment");
                    if(text.length) {
                        let textHtml = $(text[0]).html();
						let textArray = textHtml.split(" ");
						
						for (let z = 0; z < textArray.length; z++) {
							for(let e = 0; e < emotesReplace.length; e++) {
								if(textArray[z] == emotesReplace[e][0]) {
									textArray[z] = formatEmote(emotesReplace[e][0],emotesReplace[e][1]);
								}
								//let regex = new RegExp(emotesReplace[e][0]  , "g")
								//textHtml = textHtml.replace(regex, formatEmote(emotesReplace[e][0],emotesReplace[e][1]));
							}
							
						}
						textHtml = textArray.join(" ");
                        $(text[0]).html(textHtml);
                    }




                    var elements = $(e.target).find(".bttv-emote");
                    for(var i = 0; i < elements.length; i++ ) {
                        let element = elements[i];
                        let ayayaFound = false;
                        for( var jd = 0; jd < ayayaTfu.length; jd++) {
                             let tfutext = ayayaTfu[jd];
                             let isAyaya = $(element).html().toLowerCase().indexOf(tfutext);
                              if(isAyaya > -1){
                                  ayayaFound = true;
                              }
                        }

                        if(ayayaFound && removeAyaya){
                            removedCounter++;
                            $.cookie("removedAyaya" , removedCounter);
                          console.log("Czat został wyleczony z " + removedCounter + " paskudnych emotek (od instalacji pluginu)");
                          $(element).remove();
                        }

                    }

                });

            }else{
                console.log("BetterBTTV | Czekanie aż wczyta się strona...");
                setTimeout( checkChat , 2000);
            }

        }

        checkChat();
        checkEmoteMenu();

    });



})();