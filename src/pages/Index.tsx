
import { useState, useEffect } from 'react';
import { Settings, Terminal, Shield, Activity, Wifi, HardDrive, Cpu, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [language, setLanguage] = useState('en');
  const [matrixEffect, setMatrixEffect] = useState(true);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const languages = {
    en: {
      title: 'HACKER DASHBOARD',
      settings: 'Settings',
      language: 'Language',
      matrixEffect: 'Matrix Effect',
      systemStats: 'System Stats',
      networkMonitor: 'Network Monitor',
      securityStatus: 'Security Status',
      terminal: 'Terminal',
      commands: 'Recent Commands'
    },
    es: {
      title: 'PANEL DE HACKER',
      settings: 'Configuración',
      language: 'Idioma',
      matrixEffect: 'Efecto Matrix',
      systemStats: 'Estadísticas del Sistema',
      networkMonitor: 'Monitor de Red',
      securityStatus: 'Estado de Seguridad',
      terminal: 'Terminal',
      commands: 'Comandos Recientes'
    },
    fr: {
      title: 'TABLEAU DE BORD HACKER',
      settings: 'Paramètres',
      language: 'Langue',
      matrixEffect: 'Effet Matrix',
      systemStats: 'Statistiques Système',
      networkMonitor: 'Moniteur Réseau',
      securityStatus: 'Statut Sécurité',
      terminal: 'Terminal',
      commands: 'Commandes Récentes'
    }
  };

  const t = languages[language as keyof typeof languages];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const commands = [
      'nmap -sS target.com',
      'sudo wireshark -i eth0',
      'hydra -l admin -P wordlist.txt ssh://192.168.1.1',
      'metasploit > use exploit/windows/smb/ms17_010_eternalblue',
      'john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt',
      'sqlmap -u "http://target.com/page.php?id=1" --dbs'
    ];

    const terminalTimer = setInterval(() => {
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setTerminalLines(prev => {
        const newLines = [...prev, `root@kali:~# ${randomCommand}`];
        return newLines.slice(-8); // Keep only last 8 lines
      });
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(terminalTimer);
    };
  }, []);

  const MatrixRain = () => {
    if (!matrixEffect) return null;
    
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono animate-pulse"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <div key={j} className="mb-1">
                {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <MatrixRain />
      
      {/* Header */}
      <div className="relative z-10 border-b border-green-400/30 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">
            {t.title}
          </h1>
          <div className="text-green-400 text-sm">
            {currentTime.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Settings Panel */}
          <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-cyan-400">{t.settings}</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-green-300 mb-2 block">{t.language}</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-black/40 border-green-400/30 text-green-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-green-400/30">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-green-300">{t.matrixEffect}</label>
                <Switch 
                  checked={matrixEffect} 
                  onCheckedChange={setMatrixEffect}
                  className="data-[state=checked]:bg-green-400"
                />
              </div>
            </div>
          </Card>

          {/* System Stats */}
          <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-cyan-400">{t.systemStats}</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-300">CPU</span>
                  <span className="text-green-400">67%</span>
                </div>
                <Progress value={67} className="h-2 bg-green-900/30" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-300">RAM</span>
                  <span className="text-green-400">42%</span>
                </div>
                <Progress value={42} className="h-2 bg-green-900/30" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-300">Disk</span>
                  <span className="text-green-400">78%</span>
                </div>
                <Progress value={78} className="h-2 bg-green-900/30" />
              </div>
            </div>
          </Card>

          {/* Network Monitor */}
          <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wifi className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-cyan-400">{t.networkMonitor}</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-300">Status:</span>
                <span className="text-green-400">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">IP:</span>
                <span className="text-green-400">192.168.1.101</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">Upload:</span>
                <span className="text-green-400">2.4 MB/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">Download:</span>
                <span className="text-green-400">15.7 MB/s</span>
              </div>
            </div>
          </Card>

          {/* Security Status */}
          <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-cyan-400">{t.securityStatus}</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-300">Firewall:</span>
                <span className="text-green-400">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">VPN:</span>
                <span className="text-green-400">CONNECTED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">Intrusions:</span>
                <span className="text-red-400">3 BLOCKED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">Encryption:</span>
                <span className="text-green-400">AES-256</span>
              </div>
            </div>
          </Card>

          {/* Terminal */}
          <Card className="lg:col-span-2 bg-black/60 border-green-400/30 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-cyan-400">{t.terminal}</h2>
            </div>
            
            <div className="bg-black/40 p-4 rounded border border-green-400/20 min-h-[200px] font-mono text-sm">
              {terminalLines.map((line, index) => (
                <div key={index} className="text-green-400 mb-1">
                  {line}
                </div>
              ))}
              <div className="text-green-400 flex">
                root@kali:~# <span className="animate-pulse ml-1">█</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-2 bg-black/60 border-green-400/30 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-cyan-400">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-green-900/30 border border-green-400/30 text-green-400 hover:bg-green-900/50">
                Port Scan
              </Button>
              <Button className="bg-green-900/30 border border-green-400/30 text-green-400 hover:bg-green-900/50">
                SQL Inject
              </Button>
              <Button className="bg-green-900/30 border border-green-400/30 text-green-400 hover:bg-green-900/50">
                Crack Hash
              </Button>
              <Button className="bg-green-900/30 border border-green-400/30 text-green-400 hover:bg-green-900/50">
                Sniff Traffic
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
