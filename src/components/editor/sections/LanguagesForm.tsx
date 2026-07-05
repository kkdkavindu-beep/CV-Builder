import { useCVStore } from '@/store/useCVStore'
import { useUIStore } from '@/store/useUIStore'

const PROFICIENCY_LEVELS = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic']

export function LanguagesForm() {
  const { languages, addLanguage, updateLanguage, removeLanguage } = useCVStore()
  const { triggerSaved } = useUIStore()

  const handleAdd = () => {
    addLanguage({ id: crypto.randomUUID(), name: '', proficiency: 'Fluent' })
    triggerSaved()
  }

  const handleRemove = (id: string) => {
    if (window.confirm('Remove this language?')) {
      removeLanguage(id)
      triggerSaved()
    }
  }

  const handleUpdate = (id: string, field: string, value: string) => {
    updateLanguage(id, { [field]: value } as any)
    triggerSaved()
  }

  if (languages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
        <div className="text-3xl mb-2">🌐</div>
        <p className="font-medium text-sm mb-1">No languages added yet</p>
        <p className="text-xs text-muted-foreground mb-4">Languages are a great differentiator</p>
        <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md font-medium hover:bg-primary/90 transition-colors">
          + Add Language
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {languages.map((lang) => (
        <div key={lang.id} className="flex gap-2 items-center p-3 border border-border rounded-md bg-muted/30">
          <input
            value={lang.name}
            onChange={e => handleUpdate(lang.id, 'name', e.target.value)}
            placeholder="English, Spanish, Mandarin..."
            className="flex-1 border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <select
            value={lang.proficiency}
            onChange={e => handleUpdate(lang.id, 'proficiency', e.target.value)}
            className="border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {PROFICIENCY_LEVELS.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <button
            onClick={() => handleRemove(lang.id)}
            className="text-destructive hover:text-destructive/70 text-lg leading-none px-1"
            title="Remove language"
          >
            ×
          </button>
        </div>
      ))}
      <button onClick={handleAdd} className="w-full py-2.5 border-2 border-dashed border-border rounded-md text-sm font-medium hover:bg-muted transition-colors">
        + Add Language
      </button>
    </div>
  )
}
