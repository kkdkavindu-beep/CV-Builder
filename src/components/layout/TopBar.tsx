import { useCVStore, ThemeType } from '@/store/useCVStore'
import { useUIStore } from '@/store/useUIStore'

const THEMES: { value: ThemeType; label: string; desc: string; color: string }[] = [
  { value: 'modern', label: 'Modern', desc: 'Bold & clean', color: 'bg-gray-900' },
  { value: 'minimal', label: 'Minimal', desc: 'Simple & elegant', color: 'bg-gray-200' },
  { value: 'corporate', label: 'Corporate', desc: 'Sidebar layout', color: 'bg-blue-600' },
  { value: 'creative', label: 'Creative', desc: 'Gradient sidebar', color: 'bg-indigo-500' },
  { value: 'executive', label: 'Executive', desc: 'Premium serif', color: 'bg-amber-800' },
  { value: 'academic', label: 'Academic', desc: 'Scholar style', color: 'bg-green-800' },
  { value: 'ats', label: 'ATS-Friendly', desc: 'Recruiter-safe', color: 'bg-slate-600' },
  { value: 'startup', label: 'Startup', desc: 'Dark & techy', color: 'bg-gray-900' },
]

export function TopBar() {
  const { toggleDarkMode, isDarkMode, showSaved } = useUIStore()
  const { theme, setTheme, resetCV } = useCVStore()

  const handleReset = () => {
    if (window.confirm('Clear all CV data and start fresh? This cannot be undone.')) {
      resetCV()
    }
  }

  return (
    <header id="top-nav" className="h-14 border-b border-border flex items-center justify-between px-5 bg-card shrink-0 gap-3">
      {/* Brand */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-sm font-bold">CV</div>
          <h1 className="font-bold text-base tracking-tight hidden sm:block">CV Builder</h1>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="flex items-center gap-2 flex-1 justify-center">
        <span className="text-xs font-medium text-muted-foreground shrink-0 hidden md:block">Theme:</span>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {THEMES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              title={t.label + ' — ' + t.desc}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all border ${
                theme === t.value
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm scale-105'
                  : 'border-border bg-muted/50 hover:bg-muted text-foreground'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${t.color} shrink-0`} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Auto-save indicator */}
        <span
          className={`text-xs text-green-600 dark:text-green-400 font-medium transition-opacity duration-300 ${
            showSaved ? 'opacity-100' : 'opacity-0'
          }`}
        >
          ✓ Saved
        </span>

        <button
          onClick={toggleDarkMode}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors text-sm"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
          title="Clear all data and reset"
        >
          Reset
        </button>

        <button
          onClick={() => window.print()}
          className="px-4 py-1.5 text-xs bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors shadow-sm"
        >
          Export PDF
        </button>
      </div>
    </header>
  )
}
