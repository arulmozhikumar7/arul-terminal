import { useState, useRef, useEffect } from "react";

interface Command {
  name: string;
  description: string;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<Command[]>([
    {
      name: "Hello Human",
      description: "I am Arulmozhikumar. Type help for more information",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1); // To track the current position in history
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        // Navigate to the previous command
        if (historyIndex > 0) {
          setHistoryIndex(historyIndex - 1);
          setInput(commandHistory[historyIndex - 1]);
        }
      } else if (e.key === "ArrowDown") {
        // Navigate to the next command
        if (historyIndex < commandHistory.length - 1) {
          setHistoryIndex(historyIndex + 1);
          setInput(commandHistory[historyIndex + 1]);
        } else {
          setHistoryIndex(commandHistory.length);
          setInput(""); // Clear input if it's the most recent
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [historyIndex, commandHistory]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return; // Prevent empty command submission

    handleCommand(input);
    setCommandHistory([...commandHistory, input]); // Save the command to history
    setHistoryIndex(commandHistory.length + 1); // Reset the index to the end of the command history
    setInput("");
  };

  const handleCommand = (command: string) => {
    switch (command) {
      case "youtube":
        setHistory((prev) => [
          ...prev,
          {
            name: "youtube",
            description: ``,
          },
        ]);
        break;
      case "whoami":
        setHistory((prev) => [
          ...prev,
          {
            name: "whoami",
            description: "Arulmozhikumar",
          },
        ]);
        break;
      case "about":
        setHistory((prev) => [
          ...prev,
          {
            name: "about",
            description: "Associate Software Engineer @Presidio",
          },
        ]);
        break;
      case "projects":
        setHistory((prev) => [
          ...prev,
          {
            name: "projects",
            description: "Fullstack Developer",
          },
        ]);
        break;
      case "date":
        setHistory((prev) => [
          ...prev,
          {
            name: "date",
            description: new Date().toString(),
          },
        ]);
        break;
      case "clear":
        setHistory([]);
        break;
      case "help":
        setHistory((prev) => [
          ...prev,
          {
            name: "help",
            description:
              "Available commands: whoami, about, projects, date, clear, help, web",
          },
        ]);
        break;
      case "skills":
        setHistory((prev) => [
          ...prev,
          {
            name: "skills",
            description:
              "JavaScript, TypeScript, React, Node.js, PostgreSQL, Git, HTML, CSS",
          },
        ]);
        break;
      case "web":
        setHistory((prev) => [
          ...prev,
          {
            name: "web",
            description: "https://www.arulmozhikumar.online",
          },
        ]);
        break;
      default:
        setHistory((prev) => [
          ...prev,
          {
            name: command,
            description: "Command not found",
          },
        ]);
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="bg-black text-white font-mono p-4 w-full h-screen overflow-auto"
      onClick={handleTerminalClick}
    >
      {history.map((line, index) => (
        <div key={index}>
          <p className="mr-2">
            <span className="text-green-300">arul@portfolio</span>:
            <span className="text-blue-500">~</span>$ {line.name}
          </p>
          <div className="mb-2">{line.description}</div>
        </div>
      ))}
      <form onSubmit={handleCommandSubmit} className="flex">
        <p className="mr-2">
          <span className="text-green-300">arul@portfolio</span>:
          <span className="text-blue-500">~</span>$
        </p>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent focus:outline-none w-full"
          type="text"
        />
      </form>
    </div>
  );
};

export default Terminal;
