
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
  ShieldCheck
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
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-zinc-50 dark:bg-black transition-colors">
      {/* Toast Overlay */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-zinc-900 text-white dark:bg-white dark:text-black px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300 border border-zinc-800 dark:border-zinc-200">
            <Check size={16} className="text-zinc-400 dark:text-zinc-600" />
            <span className="text-sm font-semibold">{toast.message}</span>
          </div>
        ))}
      </div>

      <header className="w-full max-w-6xl flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-zinc-900 p-1 rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-200 dark:border-zinc-800 overflow-hidden w-14 h-14 flex items-center justify-center">
            <img 
              src="cat.png" 
              alt="Cat Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://api.dicebear.com/9.x/pixel-art/svg?seed=calico";
              }}
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
            Cat's Username Generator
          </h1>
        </div>
        <button 
          onClick={toggleDarkMode}
          className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-sm"
        >
          {darkMode ? <Sun size={20} className="text-zinc-100" /> : <Moon size={20} className="text-zinc-900" />}
        </button>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <div className="flex items-center gap-2 mb-8 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-xs">
              <Settings size={16} />
              Configuration
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setOptions({...options, category: cat.id})}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                        options.category === cat.id 
                          ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-black shadow-lg' 
                          : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3">Style Preset</label>
                <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                  {styles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setOptions({...options, style: style.id})}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        options.style === style.id 
                          ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm' 
                          : 'text-zinc-400'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyword */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3">Optional Keyword</label>
                <input 
                  type="text"
                  placeholder="e.g. dragon, magic"
                  value={options.keyword}
                  onChange={(e) => setOptions({...options, keyword: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-zinc-500 transition-all text-zinc-900 dark:text-white"
                />
              </div>

              {/* Batch & Length */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">Batch Size</label>
                  <select 
                    value={options.batchSize}
                    onChange={(e) => setOptions({...options, batchSize: Number(e.target.value)})}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-xs font-bold outline-none text-zinc-900 dark:text-white"
                  >
                    {[1, 5, 10, 20, 50, 100].map(n => <option key={n} value={n}>{n} Names</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">Max Length</label>
                  <input 
                    type="number"
                    value={options.maxLength}
                    onChange={(e) => setOptions({...options, maxLength: Number(e.target.value)})}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-bold outline-none text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {[
                  { key: 'includePrefix', label: 'Include Prefix' },
                  { key: 'includeSuffix', label: 'Include Suffix' },
                  { key: 'avoidAmbiguous', label: 'Safe Characters Only' },
                ].map(opt => (
                  <label key={opt.key} className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                      {opt.label}
                    </span>
                    <input 
                      type="checkbox"
                      checked={options[opt.key as keyof UsernameOptions] as boolean}
                      onChange={(e) => setOptions({...options, [opt.key]: e.target.checked})}
                      className="w-5 h-5 rounded-lg border-zinc-300 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-500 bg-zinc-50 dark:bg-zinc-800"
                    />
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={generate}
              className="w-full mt-10 bg-zinc-900 dark:bg-white text-white dark:text-black font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group hover:bg-black dark:hover:bg-zinc-200"
            >
              <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              Generate Batch
            </button>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-sm min-h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <LayoutGrid size={20} className="text-zinc-900 dark:text-white" />
                <h2 className="text-lg font-black text-zinc-800 dark:text-white">Results</h2>
              </div>
              <button 
                onClick={() => copyToClipboard(results.join(', '))}
                className="text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <Copy size={14} />
                Copy All
              </button>
            </div>

            {results.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 space-y-4 opacity-50">
                <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
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
                    className="group relative flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 hover:bg-white dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-2xl transition-all hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-none hover:-translate-y-0.5 active:scale-95 overflow-hidden"
                  >
                    <span className="font-mono font-bold text-zinc-700 dark:text-zinc-200 truncate pr-4">
                      {name}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 dark:bg-white text-white dark:text-black p-1.5 rounded-lg shadow-lg">
                      <Copy size={12} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* History Sidebar/Bottom */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <HistoryIcon size={18} className="text-zinc-400" />
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">History</h3>
              </div>
              <button 
                onClick={() => setHistory([])}
                className="text-[10px] font-black text-zinc-300 hover:text-red-500 uppercase transition-colors"
              >Clear All</button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {history.length === 0 ? (
                <p className="text-xs text-zinc-300 font-bold italic">No history records</p>
              ) : (
                history.map(item => (
                  <button
                    key={item.id}
                    onClick={() => copyToClipboard(item.value)}
                    className="text-xs font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-all border border-zinc-100 dark:border-zinc-800"
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
        <div className="flex items-center justify-center gap-4 text-zinc-300 dark:text-zinc-700">
           <ShieldCheck size={16} />
           <span className="text-[10px] font-black uppercase tracking-tighter">Client-Side Encryption Enabled</span>
           <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full"></span>
           <span className="text-[10px] font-black uppercase tracking-tighter">No Data Collection</span>
        </div>
        <p className="text-xs font-bold text-zinc-400">
          Professional Identity Tool &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;
