import React, { useEffect, useRef, useState } from "react";

const WpmComponent = () => {
  const [placeholderText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis aliquam metus. Praesent id ante vitae diam condimentum feugiat. Mauris gravida, ligula et dignissim laoreet, lectus ligula elementum velit, tristique tincidunt massa neque non libero. Proin ipsum enim, fringilla quis neque vel, accumsan convallis sem. Vestibulum scelerisque vestibulum nulla. Maecenas placerat eleifend tempor. Quisque ornare erat in sollicitudin porta. Sed placerat, sem accumsan iaculis dignissim, risus dolor mollis sapien, eget rutrum odio tellus quis risus. Donec venenatis vestibulum sem at dictum. Quisque fringilla ligula tortor, et ultrices leo mattis at. Donec vel aliquet arcu. Curabitur ut lacinia ligula, at auctor velit. Curabitur interdum risus ac eros blandit, efficitur ullamcorper arcu luctus. Donec molestie maximus diam, at dignissim lacus tincidunt vitae."
  );
  const [userInput, setUserInput] = useState("");
  const [started, setStarted] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [timeDuration, setTimeDuration] = useState(30);
  const [disabledText, setDisabledText] = useState(false);
  const [secondsTimer, setSecondsTimer] = useState(timeDuration);
  const userInputRef = useRef(userInput);
  const [errorCount, setErrorCount] = useState(0);

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
    const elapsedTime = (new Date() - started) / 60000;
    const wordsTyped = userInputRef.current.length / 5;
    const calculatedWpm = Math.floor(wordsTyped / elapsedTime);
    setWpm(calculatedWpm);
  };

  const handleInputChange = (e) => {
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
              setStarted(null),
                setDisabledText(false),
                setUserInput(""),
                setSecondsTimer(timeDuration);
            }}
          >
            restart/reset
          </div>
          {disabledText && <h1 className="text-2xl">WPM: {wpm}</h1>}
          {disabledText && <div className="text-red-500">Errors: {errorCount}</div>}
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
      <div className="w-[80%] h-96 p-4 text-2xl relative">
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
