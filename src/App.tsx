/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  Terminal, 
  Cpu, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  Wallet,
  Globe,
  Lock,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  CreditCard,
  Target
} from 'lucide-react';

// --- Types ---

type AppPhase = 'landing' | 'scraping' | 'results' | 'withdraw' | 'success';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <div className="bg-blue-600 p-1.5 rounded-lg">
        <Zap className="text-white w-5 h-5 fill-white" />
      </div>
      <span className="text-xl font-bold tracking-tight text-white italic">CHAIN<span className="text-blue-500 font-sans not-italic">SCRAPE</span></span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
      <a href="#" className="hover:text-white transition-colors">Platform</a>
      <a href="#" className="hover:text-white transition-colors">Technology</a>
      <a href="#" className="hover:text-white transition-colors">Security</a>
      <a href="#" className="hover:text-white transition-colors">Pricing</a>
    </div>
    <button className="bg-white text-black text-sm font-bold px-5 py-2 rounded-full hover:bg-gray-200 transition-all">
      Login
    </button>
  </nav>
);

const LandingPage = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6 flex flex-col items-center">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl text-center"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        v4.1 Network Active
      </div>
      <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tighter">
        Extract Value from the <span className="text-blue-500">Global Digital Economy.</span>
      </h1>
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
        Join over 1.2M users utilizing our autonomous scraping nodes to identify and capture micro-arbitrage opportunities across decentralized markets.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
        <button 
          onClick={onStart}
          className="group relative bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          Start Node Extraction
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all">
          View Live Ledger
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left border-t border-white/10 pt-12">
        <div>
          <div className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-2">Total Yield</div>
          <div className="text-2xl font-mono font-bold text-white">$4.82B+</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-2">Active Nodes</div>
          <div className="text-2xl font-mono font-bold text-white">842,912</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-2">Network Load</div>
          <div className="text-2xl font-mono font-bold text-white">12.4%</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-2">Uptime</div>
          <div className="text-2xl font-mono font-bold text-white">99.99%</div>
        </div>
      </div>
    </motion.div>

    <div className="mt-20 w-full max-w-5xl grid md:grid-cols-3 gap-8">
      {[
        { 
          icon: Shield, 
          title: "Enterprise Grade", 
          desc: "Multi-layer encryption ensures your extracted assets remain strictly under your control." 
        },
        { 
          icon: TrendingUp, 
          title: "Adaptive Scraping", 
          desc: "Our AI adjusts parameters in real-time to maximize yield across varying market conditions." 
        },
        { 
          icon: Globe, 
          title: "Global Reach", 
          desc: "Access nodes in 52 regions for redundant, high-uptime extraction capabilities." 
        }
      ].map((feature, i) => (
        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-blue-500/30 transition-all group">
          <feature.icon className="text-blue-500 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
          <p className="text-gray-400 font-light leading-relaxed">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const ScrapingProcess = ({ onComplete }: { onComplete: (balance: number) => void }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [balance, setBalance] = useState(0);
  const balanceRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const logSteps = [
    "Initializing secure node connection...",
    "Bypassing gateway protocols...",
    "Scanning mempool for arbitrage pairs...",
    "Found pair: BTC/USDT (Binance -> Kraken) +0.42%",
    "Executing flash extraction node #742...",
    "Success. Extracted 0.0042 ETH equivalent.",
    "Updating decentralized ledger...",
    "Found pair: SOL/USDC (Raydium -> Orca) +1.12%",
    "Intercepting high-frequency data packets...",
    "Node optimization complete. Increasing throughput...",
    "Scraping global liqudity pools...",
    "Finalizing batch transaction...",
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(balanceRef.current), 1000);
          return 100;
        }
        return prev + 1;
      });

      if (Math.random() > 0.7 && currentLog < logSteps.length) {
        setLogs(prev => [...prev, logSteps[currentLog]]);
        currentLog++;
      }

      setBalance(prev => {
        const next = prev + (Math.random() * 45);
        balanceRef.current = next;
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="text-xs font-mono text-gray-500 ml-2">extraction_service.py — 80x24</div>
          </div>
          <div className="text-xs font-mono text-blue-500 font-bold animate-pulse">LIVE EXTRACTION</div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Extraction Source</div>
              <div className="flex items-center gap-2 text-white font-mono">
                <Globe className="w-4 h-4 text-blue-500" />
                Node_Region: Frankfurt_DE_v4
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Total Extracted</div>
              <div className="text-4xl font-mono font-bold text-green-500">
                ${balance.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="relative h-4 bg-white/5 rounded-full overflow-hidden mb-8 border border-white/5">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white mix-blend-difference">
              {progress}% SYSTEM LOAD
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="bg-black/50 rounded-xl p-4 h-48 overflow-y-auto border border-white/5 font-mono text-xs text-gray-400 space-y-1 scrollbar-hide"
          >
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>
                <span className={log?.includes('Success') ? 'text-green-500' : log?.includes('Found') ? 'text-blue-400' : ''}>
                  {log}
                </span>
              </div>
            ))}
            <div className="flex gap-2 animate-pulse">
              <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>
              <span>Running probabilistic model...</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border-t border-white/10 p-4 px-8 flex justify-between text-[10px] font-mono text-gray-500">
          <span>THROUGHPUT: 42.8 GB/S</span>
          <span>LATENCY: 4.2ms</span>
          <span>ENCRYPTION: AES-256-GCM</span>
        </div>
      </div>
      
      <p className="mt-8 text-gray-500 text-sm font-light italic">
        "Advanced extraction in progress. Do not close this window or disconnect from the node."
      </p>
    </div>
  );
};

const ResultsPage = ({ balance, onWithdraw }: { balance: number, onWithdraw: () => void }) => (
  <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-10 text-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-600/20 blur-[100px] -z-10"></div>
      
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
        <CheckCircle2 className="text-green-500 w-10 h-10" />
      </div>

      <h2 className="text-3xl font-bold mb-2 tracking-tight">Extraction Complete</h2>
      <p className="text-gray-400 mb-10 font-light">Assets successfully captured and verified on-chain.</p>

      <div className="bg-black/40 rounded-2xl p-6 mb-10 border border-white/5">
        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Withdrawable Balance</div>
        <div className="text-6xl font-bold tracking-tighter text-white mb-2">${balance.toFixed(2)}</div>
        <div className="inline-flex items-center gap-1.5 text-xs text-green-500 font-bold px-2 py-0.5 rounded-full bg-green-500/10">
          <TrendingUp className="w-3 h-3" />
          +100% Guaranteed 
        </div>
      </div>

      <button 
        onClick={onWithdraw}
        className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
      >
        Withdraw to Wallet
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500 font-medium">
        <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Encrypted</span>
        <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Insured</span>
        <span className="flex items-center gap-1 text-blue-400"><ExternalLink className="w-3 h-3" /> Verified</span>
      </div>
    </motion.div>
  </div>
);

const WithdrawForm = ({ balance, onComplete }: { balance: number, onComplete: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    method: 'paypal',
    address: '',
    fullName: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24 pb-12">
      <div className="max-w-xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold mb-3 tracking-tight">Final Settlement</h2>
          <p className="text-gray-400 font-light leading-relaxed">Choose your preferred withdrawal method. Standard processing takes 2-4 minutes depending on network congestion.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-3 block">Withdrawal Method</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'paypal', icon: CreditCard, label: 'PayPal' },
                  { id: 'crypto', icon: Wallet, label: 'Crypto' },
                  { id: 'bank', icon: Globe, label: 'Bank' },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, method: method.id }))}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                      formData.method === method.id 
                      ? 'bg-blue-600/20 border-blue-600 text-blue-400' 
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <method.icon className="w-6 h-6 mb-2" />
                    <span className="text-xs font-bold">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 mb-2 block">Full Name (KYC Verified)</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-all font-mono"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 mb-2 block">
                  {formData.method === 'paypal' ? 'PayPal Email Address' : formData.method === 'crypto' ? 'Wallet Address (BEP-20 / ERC-20)' : 'Account Number / IBAN'}
                </label>
                <input 
                  required
                  type="text" 
                  placeholder={formData.method === 'paypal' ? 'email@example.com' : formData.method === 'crypto' ? '0x...' : 'Routing/Account info'}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-all font-mono"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-600/20 rounded-2xl p-4 flex gap-4 items-start">
              <Shield className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-blue-400 leading-relaxed">
                <span className="font-bold">Security Note:</span> You are withdrawing <span className="font-bold">${balance.toFixed(2)}</span>. Please ensure your details are correct. Incorrect information may result in permanent asset loss on the blockchain.
              </p>
            </div>
          </div>

          <button 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all ${
              loading ? 'bg-gray-800 text-gray-500' : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                Processing Settlement...
              </>
            ) : (
              <>
                Finalize Withdrawal
                <ChevronRight className="w-6 h-6" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const SuccessPage = ({ onRestart }: { onRestart: () => void }) => (
  <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center text-center">
    <div className="max-w-md">
      <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-blue-600/30">
        <Target className="text-blue-500 w-12 h-12" />
      </div>
      <h2 className="text-4xl font-bold mb-6 tracking-tight">Settlement Initiated</h2>
      <p className="text-gray-400 mb-2 leading-relaxed">Your withdrawal request has been queued in the extraction ledger. High-priority nodes are now processing your transaction.</p>
      <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-10 text-xs font-mono text-blue-400">
        TX_ID: {Math.random().toString(36).substring(2, 12).toUpperCase()} — PENDING_CONFIRMATION
      </div>
      
      <div className="space-y-4">
        <button 
          onClick={onRestart}
          className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
        >
          Return to Dashboard
        </button>
        <p className="text-gray-600 text-xs">A confirmation receipt has been sent to your primary node email. If you don't receive it in 15 minutes, please contact node support.</p>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('landing');
  const [balance, setBalance] = useState(0);

  const handleStart = () => setPhase('scraping');
  const handleScrapeComplete = (extractedBalance: number) => {
    setBalance(extractedBalance);
    setPhase('results');
  };
  const handleGoToWithdraw = () => setPhase('withdraw');
  const handleWithdrawComplete = () => setPhase('success');
  const handleRestart = () => {
    setBalance(0);
    setPhase('landing');
  };

  return (
    <div className="min-h-screen bg-black selection:bg-blue-500/30 selection:text-blue-200 antialiased font-sans">
      <Navbar />
      
      <main>
        <AnimatePresence mode="wait">
          {phase === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage onStart={handleStart} />
            </motion.div>
          )}

          {phase === 'scraping' && (
            <motion.div
              key="scraping"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ScrapingProcess onComplete={handleScrapeComplete} />
            </motion.div>
          )}

          {phase === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsPage balance={balance} onWithdraw={handleGoToWithdraw} />
            </motion.div>
          )}

          {phase === 'withdraw' && (
            <motion.div
              key="withdraw"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WithdrawForm balance={balance} onComplete={handleWithdrawComplete} />
            </motion.div>
          )}

          {phase === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SuccessPage onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer (Simplified) */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <Zap className="text-white w-4 h-4" />
            <span className="text-sm font-bold tracking-tight text-white uppercase italic">CHAIN<span className="not-italic">SCRAPE</span></span>
          </div>
          <div className="flex gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Terms of Extraction</a>
            <a href="#" className="hover:text-white transition-colors">GDPR Protocol</a>
            <a href="#" className="hover:text-white transition-colors">System Status</a>
          </div>
          <div className="text-[10px] text-gray-700 font-mono">
            © 2026 CHAINSCRAPE ALGORITHMIC SYSTEMS. ALL ASSETS PROTECTED BY NODE_ENC_V4.
          </div>
        </div>
      </footer>
    </div>
  );
}
