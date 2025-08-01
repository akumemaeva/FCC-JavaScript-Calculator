import { useState, useEffect } from "react";
import type { DisplayState } from "./aid";
import TimeSetter from "./TimeSetter";
import Display from "./Display";
import AlarmSound from "./AlarmSound.mp3";
import "./App.css"

const defaultBreak = 5 * 60;
const defaultSession = 25 * 60;
const minVal = 60;
const maxVal = 60 * 60;
const interval = 60;

function App() {
    const [breakTime, setBreakTime] = useState(defaultBreak);
    const [sessionTime, setSessionTime] = useState(defaultSession);  // Set to defaultSession
    const [displayState, setDisplayState] = useState<DisplayState>({
        time: sessionTime,
        timeType: "Session",
        timeRunning: false,
    });

    useEffect(() => {
        let timerId: number;
        if (!displayState.timeRunning) return;

        if (displayState.timeRunning) {
            timerId = window.setInterval(decrementDisplay, 1000);
        }

        return () => {
            window.clearInterval(timerId);
        };
    }, [displayState.timeRunning]);

    useEffect(() => {
        if (displayState.time === 0) {
            const audio = document.getElementById("beep") as HTMLAudioElement;
            audio.currentTime = 2;
            audio.play().catch((err) => console.log(err));

            setDisplayState((prev) => ({
                ...prev,
                timeType: prev.timeType === "Session" ? "Break" : "Session",
                time: prev.timeType === "Session" ? breakTime : sessionTime,
            }));
        }
    }, [displayState, breakTime, sessionTime]);

    const reset = () => {
        setBreakTime(defaultBreak);
        setSessionTime(defaultSession);
        setDisplayState({
            time: defaultSession,
            timeType: "Session",
            timeRunning: false,
        });
        const audio = document.getElementById("beep") as HTMLAudioElement;
        audio.pause();
        audio.currentTime = 0;
    };

    const startStop = () => {
        setDisplayState((prev) => ({
            ...prev,
            timeRunning: !prev.timeRunning,
        }));
    };

    const changeBreakTime = (time: number) => {
        if (displayState.timeRunning) return;
        setBreakTime(time);
    };

    const decrementDisplay = () => {
        setDisplayState((prev) => ({
            ...prev,
            time: prev.time - 1,
        }));
    };

    const changeSessionTime = (time: number) => {
        if (displayState.timeRunning) return;
        setSessionTime(time);
        setDisplayState({
            time: time,
            timeType: "Session",
            timeRunning: false,
        });
    };

    return (
        <div className="clock">
            <div className="setters">
                <div className="break">
                    <h4 id="break-label">Break Length</h4>
                    <TimeSetter 
                        time={breakTime}
                        setTime={changeBreakTime}
                        min={minVal}
                        max={maxVal}
                        interval={interval}
                        type="break" 
                    />
                </div>
                <div className="session">
                    <div id="session-label">Session Length</div>
                    <TimeSetter
                        time={sessionTime}
                        setTime={changeSessionTime}
                        min={minVal}
                        max={maxVal}
                        interval={interval}
                        type="session" 
                    />
                </div>
            </div>
            <Display
                displayState={displayState}
                reset={reset}
                startStop={startStop} 
            />
            <audio src={AlarmSound} id="beep"></audio>
        </div>
    );
}

export default App;
