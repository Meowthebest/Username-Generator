
import React, { useState, useEffect, useCallback } from 'react';
import { 
  UsernameOptions, 
  CategoryType, 
  StylePreset,
  HistoryItem
} from './types';
import { generateBatch } from './utils/generatorUtils';
import { 
  RefreshCw, 
  User, 
  History as HistoryIcon, 
  Moon, 
  Sun,
  Check,
  Copy,
  LayoutGrid,
  Settings,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [toasts, setToasts] = useState<{id: number, message: string}[]>([]);

  const [options, setOptions] = useState<UsernameOptions>({
    category: 'clean',
    style: 'cute',
    batchSize: 10,
    minLength: 3,
    maxLength: 18,
    includePrefix: false,
    includeSuffix: false,
    avoidAmbiguous: true,
    keyword: ''
  });

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');
    generate();
  }, []);

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2000);
  };

  const copyToClipboard = (val: string) => {
    navigator.clipboard.writeText(val);
    addToast('Copied to clipboard!');
  };

  const generate = useCallback(() => {
    const batch = generateBatch(options);
    setResults(batch);
    
    // Update history with first item for variety
    if (batch.length > 0) {
      const newItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        value: batch[0],
        timestamp: Date.now()
      };
      setHistory(prev => [newItem, ...prev].slice(0, 20));
    }
  }, [options]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'clean', label: 'Clean' },
    { id: 'fruit', label: 'Fruit' },
    { id: 'cat', label: 'Cats' },
    { id: 'anime', label: 'Anime' },
    { id: 'league', label: 'League' },
    { id: 'genshin', label: 'Genshin' },
    { id: 'sanrio', label: 'Sanrio' },
    { id: 'miscellaneous', label: 'Misc' }
  ];

  const styles: { id: StylePreset; label: string }[] = [
    { id: 'cute', label: 'Cute' },
    { id: 'clean', label: 'Clean' },
    { id: 'gamer', label: 'Gamer' },
    { id: 'professional', label: 'Pro' }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Toast Overlay */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
            <Check size={16} className="text-emerald-400" />
            <span className="text-sm font-semibold">{toast.message}</span>
          </div>
        ))}
      </div>

      <header className="w-full max-w-6xl flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <div className="bg-primary-600 p-2.5 rounded-2xl shadow-xl shadow-primary-500/20">
            <User className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
            Cat's Username Generator
          </h1>
        </div>
        <button 
          onClick={toggleDarkMode}
          className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
        >
          {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
        </button>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-2 mb-8 text-primary-600 dark:text-primary-400 font-bold uppercase tracking-widest text-xs">
              <Settings size={16} />
              Configuration
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setOptions({...options, category: cat.id})}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                        options.category === cat.id 
                          ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/20' 
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Style Preset</label>
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  {styles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setOptions({...options, style: style.id})}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        options.style === style.id 
                          ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                          : 'text-slate-400'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyword */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Optional Keyword</label>
                <input 
                  type="text"
                  placeholder="e.g. dragon, magic"
                  value={options.keyword}
                  onChange={(e) => setOptions({...options, keyword: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>

              {/* Batch & Length */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2">Batch Size</label>
                  <select 
                    value={options.batchSize}
                    onChange={(e) => setOptions({...options, batchSize: Number(e.target.value)})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold outline-none"
                  >
                    {[1, 5, 10, 20, 50, 100].map(n => <option key={n} value={n}>{n} Names</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2">Max Length</label>
                  <input 
                    type="number"
                    value={options.maxLength}
                    onChange={(e) => setOptions({...options, maxLength: Number(e.target.value)})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                {[
                  { key: 'includePrefix', label: 'Include Prefix' },
                  { key: 'includeSuffix', label: 'Include Suffix' },
                  { key: 'avoidAmbiguous', label: 'Safe Characters Only' },
                ].map(opt => (
                  <label key={opt.key} className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {opt.label}
                    </span>
                    <input 
                      type="checkbox"
                      checked={options[opt.key as keyof UsernameOptions] as boolean}
                      onChange={(e) => setOptions({...options, [opt.key]: e.target.checked})}
                      className="w-5 h-5 rounded-lg border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={generate}
              className="w-full mt-10 bg-primary-600 hover:bg-primary-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary-500/25 transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              Generate Batch
            </button>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm min-h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <LayoutGrid size={20} className="text-primary-600" />
                <h2 className="text-lg font-black text-slate-800 dark:text-white">Results</h2>
              </div>
              <button 
                onClick={() => copyToClipboard(results.join(', '))}
                className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                <Copy size={14} />
                Copy All
              </button>
            </div>

            {results.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4 opacity-50">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <User size={40} />
                </div>
                <p className="font-bold">No results yet. Click generate!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {results.map((name, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(name)}
                    className="group relative flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-2xl transition-all hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none hover:-translate-y-0.5 active:scale-95 overflow-hidden"
                  >
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-200 truncate pr-4">
                      {name}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary-600 text-white p-1.5 rounded-lg shadow-lg">
                      <Copy size={12} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* History Sidebar/Bottom */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <HistoryIcon size={18} className="text-slate-400" />
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">History</h3>
              </div>
              <button 
                onClick={() => setHistory([])}
                className="text-[10px] font-black text-slate-300 hover:text-red-500 uppercase transition-colors"
              >Clear All</button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {history.length === 0 ? (
                <p className="text-xs text-slate-300 font-bold italic">No history records</p>
              ) : (
                history.map(item => (
                  <button
                    key={item.id}
                    onClick={() => copyToClipboard(item.value)}
                    className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 transition-all border border-slate-100 dark:border-slate-800"
                  >
                    {item.value}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 mb-8 text-center space-y-4">
        <div className="flex items-center justify-center gap-4 text-slate-300 dark:text-slate-700">
           <ShieldCheck size={16} />
           <span className="text-[10px] font-black uppercase tracking-tighter">Client-Side Encryption Enabled</span>
           <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
           <span className="text-[10px] font-black uppercase tracking-tighter">No Data Collection</span>
        </div>
        <p className="text-xs font-bold text-slate-400">
          Professional Identity Tool &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;
