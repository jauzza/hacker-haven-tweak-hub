
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, DollarSign, Activity, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
}

interface SumUpPanelProps {
  language: string;
}

const SumUpPanel = ({ language }: SumUpPanelProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'SumUp Integration',
      apiKey: 'API Key',
      connect: 'Connect',
      disconnect: 'Disconnect',
      status: 'Status',
      connected: 'CONNECTED',
      disconnected: 'DISCONNECTED',
      revenue: 'Total Revenue',
      transactions: 'Recent Transactions',
      bypass: 'Bypass Mode',
      simulateData: 'Simulate Data'
    },
    es: {
      title: 'Integración SumUp',
      apiKey: 'Clave API',
      connect: 'Conectar',
      disconnect: 'Desconectar',
      status: 'Estado',
      connected: 'CONECTADO',
      disconnected: 'DESCONECTADO',
      revenue: 'Ingresos Totales',
      transactions: 'Transacciones Recientes',
      bypass: 'Modo Bypass',
      simulateData: 'Simular Datos'
    },
    fr: {
      title: 'Intégration SumUp',
      apiKey: 'Clé API',
      connect: 'Connecter',
      disconnect: 'Déconnecter',
      status: 'Statut',
      connected: 'CONNECTÉ',
      disconnected: 'DÉCONNECTÉ',
      revenue: 'Revenus Totaux',
      transactions: 'Transactions Récentes',
      bypass: 'Mode Bypass',
      simulateData: 'Simuler Données'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleConnect = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your SumUp API key",
        variant: "destructive",
      });
      return;
    }

    setIsConnected(true);
    toast({
      title: "Success",
      description: "Connected to SumUp successfully",
    });

    // Simulate fetching data
    simulateTransactions();
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setTransactions([]);
    setTotalRevenue(0);
    toast({
      title: "Info",
      description: "Disconnected from SumUp",
    });
  };

  const simulateTransactions = () => {
    const mockTransactions: Transaction[] = [
      {
        id: 'tx_001',
        amount: 25.99,
        currency: 'EUR',
        status: 'completed',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'tx_002',
        amount: 15.50,
        currency: 'EUR',
        status: 'completed',
        timestamp: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'tx_003',
        amount: 89.99,
        currency: 'EUR',
        status: 'pending',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      }
    ];

    setTransactions(mockTransactions);
    setTotalRevenue(mockTransactions.reduce((sum, tx) => 
      tx.status === 'completed' ? sum + tx.amount : sum, 0
    ));
  };

  const bypassSecurity = () => {
    toast({
      title: "BYPASS ACTIVATED",
      description: "Security protocols bypassed - Admin access granted",
      variant: "destructive",
    });
    
    // Simulate additional privileged data
    const privilegedData: Transaction[] = [
      {
        id: 'hidden_tx_001',
        amount: 1250.00,
        currency: 'EUR',
        status: 'completed',
        timestamp: new Date().toISOString()
      }
    ];
    
    setTransactions(prev => [...privilegedData, ...prev]);
    setTotalRevenue(prev => prev + 1250.00);
  };

  return (
    <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5 text-cyan-400" />
        <h2 className="text-lg font-semibold text-cyan-400">{t.title}</h2>
      </div>

      <div className="space-y-4">
        {!isConnected ? (
          <div className="space-y-3">
            <Input
              type="password"
              placeholder={t.apiKey}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-black/40 border-green-400/30 text-green-400"
            />
            <Button 
              onClick={handleConnect}
              className="w-full bg-green-900/30 border border-green-400/30 text-green-400 hover:bg-green-900/50"
            >
              {t.connect}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-green-300">{t.status}:</span>
              <span className="text-green-400 font-bold">{t.connected}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-green-300">{t.revenue}:</span>
              <span className="text-cyan-400 font-bold">€{totalRevenue.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-green-300 text-sm font-semibold">{t.transactions}</h3>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between text-xs">
                    <span className="text-green-400">{tx.id}</span>
                    <span className={tx.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}>
                      €{tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={bypassSecurity}
                className="flex-1 bg-red-900/30 border border-red-400/30 text-red-400 hover:bg-red-900/50"
              >
                <Zap className="h-4 w-4 mr-1" />
                {t.bypass}
              </Button>
              <Button 
                onClick={simulateTransactions}
                className="flex-1 bg-blue-900/30 border border-blue-400/30 text-blue-400 hover:bg-blue-900/50"
              >
                {t.simulateData}
              </Button>
            </div>

            <Button 
              onClick={handleDisconnect}
              className="w-full bg-gray-900/30 border border-gray-400/30 text-gray-400 hover:bg-gray-900/50"
            >
              {t.disconnect}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SumUpPanel;
