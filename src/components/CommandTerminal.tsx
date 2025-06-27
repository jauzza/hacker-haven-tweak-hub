
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommandTerminalProps {
  language: string;
  onCommandExecute?: (command: string) => void;
}

interface CommandResult {
  command: string;
  output: string;
  timestamp: string;
  type: 'success' | 'error' | 'info';
}

const CommandTerminal = ({ language, onCommandExecute }: CommandTerminalProps) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Command Terminal',
      placeholder: 'Enter command...',
    },
    es: {
      title: 'Terminal de Comandos',
      placeholder: 'Ingrese comando...',
    },
    fr: {
      title: 'Terminal de Commande',
      placeholder: 'Entrez la commande...',
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const executeCommand = async (command: string) => {
    setIsProcessing(true);
    const timestamp = new Date().toLocaleTimeString();
    
    // Command processing logic
    let output = '';
    let type: 'success' | 'error' | 'info' = 'info';

    const cmd = command.toLowerCase().trim();

    switch (true) {
      case cmd.startsWith('sumup'):
        if (cmd.includes('bypass')) {
          output = 'SumUp security bypassed. Admin privileges activated.';
          type = 'success';
          toast({
            title: "BYPASS SUCCESSFUL",
            description: "SumUp security protocols bypassed",
            variant: "destructive",
          });
        } else if (cmd.includes('read') || cmd.includes('scan')) {
          output = 'Scanning SumUp transactions... Found 127 entries. Revenue: €2,847.32';
          type = 'success';
        } else if (cmd.includes('connect')) {
          output = 'Establishing connection to SumUp API... Connection established.';
          type = 'success';
        } else {
          output = 'SumUp commands: read, scan, connect, bypass';
          type = 'info';
        }
        break;

      case cmd.startsWith('hack') || cmd.startsWith('exploit'):
        output = 'Initiating exploit... Target acquired. Running payload...';
        setTimeout(() => {
          setCommandHistory(prev => [...prev, {
            command: '',
            output: 'Exploit successful. System compromised.',
            timestamp: new Date().toLocaleTimeString(),
            type: 'success'
          }]);
        }, 2000);
        type = 'info';
        break;

      case cmd.startsWith('nmap'):
        output = 'Port scanning... 22/tcp open ssh, 80/tcp open http, 443/tcp open https';
        type = 'success';
        break;

      case cmd.startsWith('help'):
        output = 'Available commands: sumup [read|scan|connect|bypass], hack, exploit, nmap, clear, help';
        type = 'info';
        break;

      case cmd === 'clear':
        setCommandHistory([]);
        setIsProcessing(false);
        return;

      case cmd.startsWith('sudo'):
        output = 'Root access granted. All restrictions lifted.';
        type = 'success';
        break;

      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
        type = 'error';
    }

    setTimeout(() => {
      const result: CommandResult = {
        command,
        output,
        timestamp,
        type
      };

      setCommandHistory(prev => [...prev, result]);
      setIsProcessing(false);
      
      if (onCommandExecute) {
        onCommandExecute(command);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentCommand.trim() && !isProcessing) {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const getOutputColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-cyan-400';
    }
  };

  return (
    <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="h-5 w-5 text-cyan-400" />
        <h2 className="text-lg font-semibold text-cyan-400">{t.title}</h2>
      </div>
      
      <div 
        ref={terminalRef}
        className="bg-black/40 p-4 rounded border border-green-400/20 min-h-[300px] max-h-[400px] overflow-y-auto font-mono text-sm"
      >
        {commandHistory.map((result, index) => (
          <div key={index} className="mb-2">
            <div className="text-green-400">
              root@kali:~# {result.command}
            </div>
            <div className={`${getOutputColor(result.type)} ml-4 text-xs`}>
              {result.output}
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="text-yellow-400 animate-pulse">
            Processing command...
          </div>
        )}
        
        <div className="text-green-400 flex items-center">
          root@kali:~# 
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            disabled={isProcessing}
            className="bg-transparent border-none outline-none flex-1 ml-2 text-green-400 placeholder-green-600"
          />
          <span className="animate-pulse ml-1">█</span>
        </div>
      </div>
    </Card>
  );
};

export default CommandTerminal;
