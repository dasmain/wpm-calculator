import React, { useEffect, useRef, useState } from "react";
import { textSamples } from "@/utils/textSamples";

const WpmComponent = () => {
  const [placeholderText, setPlaceholderText] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [started, setStarted] = useState<Date | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [timeDuration, setTimeDuration] = useState<number>(30);
  const [disabledText, setDisabledText] = useState<boolean>(false);
  const [secondsTimer, setSecondsTimer] = useState<number>(timeDuration);
  const userInputRef = useRef<string>(userInput);
  const [errorCount, setErrorCount] = useState<number>(0);
  const errorInputRef = useRef<number>(errorCount);

  const randomText = () => {
    const index = Math.floor(Math.random() * textSamples.length);
    setPlaceholderText(textSamples[index]);
  };

  useEffect(() => {
    randomText();
  }, []);

  useEffect(() => {
    if (!started) return;

    const timerInterval = setInterval(() => {
      setSecondsTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          calculateWPM();
          setDisabledText(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [started]);

  const calculateWPM = () => {
    if (!started) return;

    const elapsedTime = (new Date().getTime() - started.getTime()) / 60000;
    const wordsTyped = (userInputRef.current.length - errorInputRef.current) / 5;
    const calculatedWpm = Math.floor(wordsTyped / elapsedTime);
    setWpm(calculatedWpm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!started) {
      setStarted(new Date());
      setSecondsTimer(timeDuration);
      setDisabledText(false);
    }

    const input = e.target.value;
    setUserInput(input);
    userInputRef.current = input;

    let errors = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== placeholderText[i]) {
        errors += 1;
      }
    }
    errorInputRef.current = errors;
    setErrorCount(errors);
  };

  const renderHighlightedText = () => {
    return placeholderText.split("").map((char, index) => {
      if (index < userInput.length) {
        if (userInput[index] === char) {
          return (
            <span key={index} className="text-black">
              {char}
            </span>
          );
        } else {
          return (
            <span key={index} className="text-red-500">
              {char}
            </span>
          );
        }
      }
      return (
        <span key={index} className="text-gray-500">
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-4">
      <div className="flex w-[80%] justify-between">
        <div>{secondsTimer}s</div>
        <div className="flex items-center justify-center gap-x-3 mb-4">
          <div
            className="cursor-pointer"
            onClick={() => {
              setStarted(null); // Reset started state to null
              setDisabledText(false);
              setUserInput("");
              randomText();
              setSecondsTimer(timeDuration);
            }}
          >
            restart/reset
          </div>
          {disabledText && <h1 className="text-2xl">WPM: {wpm}</h1>}
          {disabledText && (
            <div className="text-red-500">Errors: {errorCount}</div>
          )}
          <span
            onClick={() => {
              setTimeDuration(15);
              setSecondsTimer(15);
            }}
            className={`${
              timeDuration === 15 ? "text-yellow-400" : ""
            } cursor-pointer`}
          >
            15s
          </span>
          <span
            onClick={() => {
              setTimeDuration(30);
              setSecondsTimer(30);
            }}
            className={`${
              timeDuration === 30 ? "text-yellow-400" : ""
            } cursor-pointer`}
          >
            30s
          </span>
          <span
            onClick={() => {
              setTimeDuration(60);
              setSecondsTimer(60);
            }}
            className={`${
              timeDuration === 60 ? "text-yellow-400" : ""
            } cursor-pointer`}
          >
            60s
          </span>
        </div>
        <div>By Diyan {"<"}3</div>
      </div>
      <div className="w-[80%] h-96 p-4 text-xl relative">
        <div
          className="absolute inset-0 pointer-events-none text-justify leading-relaxed"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {renderHighlightedText()}
        </div>
        <textarea
          value={userInput}
          disabled={disabledText}
          onChange={handleInputChange}
          className="w-full h-full bg-transparent -mt-3 -ml-4 border-none focus:outline-none resize-none text-2xl text-justify text-transparent select-none selection:text-transparent"
          style={{
            whiteSpace: "pre-wrap",
            userSelect: "none",
          }}
        />
      </div>
    </div>
  );
};

export default WpmComponent;
