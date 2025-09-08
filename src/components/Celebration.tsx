// celebration.tsx
import React from 'react';
import partyImage from '/assets/party.png';

// Create the backgrounds object locally
const backgrounds = {
  sassy_home: partyImage,
  // Add more backgrounds as needed
};

// Type definitions
interface Character {
  speaker: string;
  text: string;
  expression: string;
  position: 'left' | 'right' | 'center'; // ✅ Added center position
  action: string;
}

interface Scene {
  background: string;
  sfx: string;
  characters: Character[];
  backgroundEffect?: string;
  specialContent?: string;
}

export const celebrationScenes: Scene[] = [
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

// Optional: Export individual scenes if needed
export const toastScene = celebrationScenes[0];
export const letterScene = celebrationScenes[1];
export const cakeScene = celebrationScenes[2];
export const memoriesScene = celebrationScenes[3];
export const finalScene = celebrationScenes[4];
