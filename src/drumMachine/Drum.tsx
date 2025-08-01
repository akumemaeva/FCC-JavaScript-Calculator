import React, { useEffect, useRef } from "react";
import type { AudioClip } from "./type";


interface DrumProps {
  audioClip: AudioClip;
  setDisplayText: (text: string) => void;
}

export default function Drum({ audioClip, setDisplayText }: DrumProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
      setDisplayText(audioClip.id); // update display from click too
    }
  };

  return (
    <div className="drum-pad" id={audioClip.id} onClick={handleClick}>
      {audioClip.keyTrigger}
      <audio
        ref={audioRef}
        className="clip"
        id={audioClip.keyTrigger}
        src={audioClip.url}
      />
    </div>
  );
}