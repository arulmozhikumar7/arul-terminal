// src/components/Terminal.tsx

import React, { useState, useEffect, useRef } from 'react';
import commands from '../commands.json';
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiDotnet,
  SiAngular,
  SiPostgresql,
  SiAmazon
} from 'react-icons/si';

interface Command {
  name: string;
  description?: string | React.ReactNode;
  dynamic?: boolean;
  type?: string;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ name: string; description?: React.ReactNode }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleDynamicCommand = (name: string) => {
    switch (name) {
      case 'date':
        return new Date().toLocaleString();
      case 'help':
        return (
          <>
            <p>Available commands:</p>
            <ul className="list-disc list-inside">
              {(commands as Command[]).map((cmd) => (
                <li key={cmd.name}>{cmd.name}</li>
              ))}
            </ul>
          </>
        );
      case 'clear':
        setHistory([]);
        return null;
      default:
        return 'Unknown dynamic command.';
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    setInput('');

    const match = (commands as Command[]).find(cmd => cmd.name === command);

    if (!match) {
      setHistory(prev => [...prev, { name: command, description: 'Command not found. Type `help` to see available commands.' }]);
      return;
    }

    // Handle dynamic commands
    if (match.dynamic) {
      const result = handleDynamicCommand(command);
      if (result !== null) {
        setHistory(prev => [...prev, { name: command, description: result }]);
      }
      return;
    }

    // Special rendering for triangle layout (skills)
    if (match.type === 'triangle') {
      const triangleData = [
        [<SiJavascript title="JavaScript" key="js" />],
        [<SiHtml5 title="HTML" key="html" />, <SiCss3 title="CSS" key="css" />],
        [
          <SiReact title="React" key="react" />,
          <SiNodedotjs title="Node.js" key="node" />,
          <SiMongodb title="MongoDB" key="mongo" />
        ],
        [
          <SiDotnet title="C#" key="csharp" />,
          <SiAngular title="Angular" key="angular" />,
          <SiPostgresql title="SQL" key="sql" />,
          <SiAmazon title="AWS" key="aws" />
        ]
      ];

      setHistory(prev => [
        ...prev,
        {
          name: command,
          description: (
            <div className="flex flex-col items-center mt-4 gap-2">
              {triangleData.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-4 justify-center">
                  {row.map((icon, iconIndex) => (
                    <div
                      key={iconIndex}
                      className="text-3xl hover:scale-125 transition-transform duration-200"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ),
        },
      ]);
      return;
    }

    // Default static rendering
    setHistory(prev => [...prev, { name: command, description: match.description }]);
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
      <form onSubmit={handleCommand} className="flex">
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
