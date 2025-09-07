import partyImage from '/src/assets/party.png';

export const backgrounds = {
  airport: "https://images.unsplash.com/photo-1583224964978-2264a142bb1b?auto=format&fit=crop&q=80",
  airplane: "https://wallpapers.com/images/hd/4k-plane-taking-off-pr0e0lwl3pshaszh.jpg",
  goa_arrival: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80",
  goa_thunder: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&q=80",
  goa_street: "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?auto=format&fit=crop&q=80",
  airport_int: "https://media.gettyimages.com/id/2093070447/video/4k-footage-time-lapse-long-exposure-of-crowded-commuter-tourist-walking-in-doha-international.jpg?s=640x640&k=20&c=9l7b19MHnjAfp0xQnyndUD8OOCPEnguKld3dZV5r_40=",
  sassy_home: partyImage,
};

export const dialogueScenes = [
  {
    background: backgrounds.airport_int,
    sfx: "WHOOSH!",
    characters: [
      { speaker: "nitesh", text: "Yaar itne bde airport m ise kaise dhundu!!", expression: "excited", position: "left", action: "wave" },
      { speaker: "jahanvi", text: "Nitesh! kha h yrr, mai to kho gyi hoon yha 🎉", expression: "happy", position: "right", action: "jump" },
      { speaker: "nitesh", text: "Vo rhi mil gyi!! idhr deekhhhhhhh jhaaaanviiii", expression: "excited", position: "left", action: "wave" },
      { speaker: "jahanvi", text: "Niteshhhhhhhhhh 🎉", expression: "happy", position: "right", action: "jump" },
    ],
  },
  {
    background: backgrounds.airplane,
    sfx: "ZOOM!",
    characters: [
      { speaker: "jahanvi", text: "ye plane Udne vali h!", expression: "enthusiastic", position: "right", action: "sparkle" },
      { speaker: "nitesh", text: "Bhagwan ji land kra dena...Jai mata di 🛫", expression: "happy", position: "left", action: "excited" },
    ],
  },
  {
    background: backgrounds.goa_arrival,
    sfx: "TADA!",
    characters: [
      { speaker: "jahanvi", text: "Finally in Goa! Nitesh, you have Sassy's address right?", expression: "happy", position: "right", action: "excited" },
      { speaker: "nitesh", text: "Uhh... hehe", expression: "surprised", position: "left", action: "nervous" },
    ],
  },
  {
    background: backgrounds.goa_thunder,
    sfx: "CRACK!",
    backgroundEffect: "thunder",
    characters: [
      { speaker: "jahanvi", text: "WHAT?! Yarr tere pass address kaise nhi h uska, tu marega ab mere haatho se! 😠", expression: "angry", position: "right", action: "shake" },
      { speaker: "nitesh", text: "Wait wait! phone check krne de!", expression: "nervous", position: "left", action: "search" },
    ],
  },
  {
    background: backgrounds.goa_street,
    sfx: "PHEW!",
    characters: [
      { speaker: "nitesh", text: "Mil gya!! discord chat me tha", expression: "happy", position: "left", action: "victory" },
      { speaker: "jahanvi", text: "Bach gya tu! chl fataft chlte h! 😅", expression: "relieved", position: "right", action: "laugh" },
    ],
  },
  {
    background: backgrounds.sassy_home,
    sfx: "SURPRISE!",
    characters: [
      { speaker: "nitesh", text: "HAPPY BIRTHDAY SASSY! 🎉", expression: "overjoyed", position: "left", action: "celebration" },
      { speaker: "jahanvi", text: "🎂 Happy birthday Sassyyyyyyyy!", expression: "overjoyed", position: "right", action: "celebration" },
      { speaker: "sassy", text: "OMG! WTF tum log yha kaise?! 😱", expression: "surprised", position: "center", action: "celebration" },
    ],
  },

  // CELEBRATION SCENES START HERE
  {
    background: backgrounds.sassy_home,
    sfx: "CHEERS!",
    characters: [
      { speaker: "nitesh", text: "Let's raise a toast to our lazy ass dumbfuck baby girl!", expression: "happy", position: "left", action: "toast" },
      { speaker: "jahanvi", text: "To Sassy - the most annoying person! 🥂", expression: "happy", position: "right", action: "toast" },
      { speaker: "sassy", text: "Aww you guys! This is so sweet! I'm gonna cry! 🥂✨", expression: "emotional", position: "center", action: "toast" },
    ],
  },
  {
    background: backgrounds.sassy_home,
    sfx: "♥️",
    characters: [
      { speaker: "nitesh", text: "We have something special to read to you...", expression: "emotional", position: "left", action: "letter" },
      { speaker: "sassy", text: "Really? What is it? You're making me curious! 💕", expression: "excited", position: "center", action: "excited" },
      { speaker: "jahanvi", text: "It's a letter we wrote together for you!", expression: "happy", position: "right", action: "letter" },
    ],
    specialContent: "letter",
  },
  {
    background: backgrounds.sassy_home,
    sfx: "CAKE TIME!",
    characters: [
      { speaker: "jahanvi", text: "Time to cut the cake! Make a wish, Sassy! 🎂", expression: "excited", position: "right", action: "cake" },
      { speaker: "sassy", text: "This is the best birthday surprise ever! *closes eyes and makes wish* ✨", expression: "overjoyed", position: "center", action: "cake" },
      { speaker: "nitesh", text: "What did you wish for?", expression: "curious", position: "left", action: "excited" },
    ],
  },
  {
    background: backgrounds.sassy_home,
    sfx: "MEMORIES!",
    characters: [
      { speaker: "nitesh", text: "Remember when we first met? What an amazing journey it's been!", expression: "nostalgic", position: "left", action: "reminisce" },
      { speaker: "sassy", text: "Yes! From strangers to best friends... I can't believe how far we've come! 🥺", expression: "nostalgic", position: "center", action: "reminisce" },
      { speaker: "jahanvi", text: "And we're just getting started! More adventures ahead!", expression: "happy", position: "right", action: "excited" },
    ],
  },
  {
    background: backgrounds.sassy_home,
    sfx: "GROUP HUG!",
    characters: [
      { speaker: "jahanvi", text: "This surprise was totally worth the crazy airport adventure! 😄", expression: "happy", position: "right", action: "laugh" },
      { speaker: "nitesh", text: "Best friends forever, Sassy! Happy Birthday! 🎉❤️", expression: "overjoyed", position: "left", action: "celebration" },
      { speaker: "sassy", text: "I love you both so much! Come here for the biggest group hug ever! 🤗💖", expression: "overjoyed", position: "center", action: "celebration" },
    ],
  },
];

// Export individual celebration scenes if needed
export const celebrationScenes = dialogueScenes.slice(6); // Gets scenes from index 6 onwards (celebration scenes)
export const mainStoryScenes = dialogueScenes.slice(0, 6); // Gets the first 6 scenes (main story)
