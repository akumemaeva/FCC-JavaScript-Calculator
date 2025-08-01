import { useEffect, useRef, useState } from "react";
import Drum from './Drum';
import type { AudioClip } from "./type";
import "./DrumApp.css"

export const audioClips: AudioClip[] = [
    {
        keyTrigger: "Q",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
        id: "Heater 1",
    },
    {
        keyTrigger: "W",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
        id: "Heater 2",
    },
    {
        keyTrigger: "E",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
        id: "Heater 3",
    },
    {
        keyTrigger: "A",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
        id: "Heater 4",
    },
    {
        keyTrigger: "S",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
        id: "Clap",
    },
    {
        keyTrigger: "D",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
        id: "Open HH",
    },
    {
        keyTrigger: "Z",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
        id: "Kick n' Hat",
    },
    {
        keyTrigger: "X",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
        id: "Kick",
    },
    {
        keyTrigger: "C",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
        id: "Closed HH",
    },
];

export function DrumApp() {
  const [displayText, setDisplayText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const playAudio = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase();
    const clip = audioClips.find((clip) => clip.keyTrigger === key);
    if (!clip) return;

    const audioElement = document.getElementById(clip.keyTrigger) as HTMLAudioElement;
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch(console.error);
      setDisplayText(clip.id); // set display text here
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", playAudio);
    return () => window.removeEventListener("keydown", playAudio);
  }, []);

  return (
    <div id="drum-machine" ref={containerRef}>
      <h1>FCC Drum Machine</h1>
      <div id="display">{displayText}</div>
      <div className="whole-drum">
        {audioClips.map((clip) => (
          <Drum
            key={clip.keyTrigger}
            audioClip={clip}
            setDisplayText={setDisplayText} // PASSING THIS CORRECTLY
          />
        ))}
      </div>
    </div>
  );
}