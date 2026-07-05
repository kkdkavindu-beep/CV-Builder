import { useCVStore } from '@/store/useCVStore'
import { useUIStore } from '@/store/useUIStore'

export function ExperienceForm() {
  const { experience, addExperience, updateExperience, removeExperience } = useCVStore()
  const { triggerSaved } = useUIStore()

  const handleAdd = () => {
    addExperience({
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    })
    triggerSaved()
  }

  const handleRemove = (id: string) => {
    if (window.confirm('Remove this experience entry?')) {
      removeExperience(id)
      triggerSaved()
    }
  }

  const handleUpdate = (id: string, field: string, value: string | boolean) => {
    updateExperience(id, { [field]: value } as any)
    triggerSaved()
  }

  if (experience.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
          <div className="text-3xl mb-2">💼</div>
          <p className="font-medium text-sm mb-1">No experience added yet</p>
          <p className="text-xs text-muted-foreground mb-4">Add your work history to stand out</p>
          <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md font-medium hover:bg-primary/90 transition-colors">
            + Add First Experience
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {experience.map((exp) => (
        <div key={exp.id} className="p-4 border border-border rounded-md relative bg-muted/30">
          <button
            onClick={() => handleRemove(exp.id)}
            className="absolute top-3 right-3 text-xs text-destructive border border-destructive/30 px-2 py-1 rounded hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            Remove
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Company</label>
              <input
                value={exp.company}
                onChange={e => handleUpdate(exp.id, 'company', e.target.value)}
                placeholder="Acme Inc."
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Position</label>
              <input
                value={exp.position}
                onChange={e => handleUpdate(exp.id, 'position', e.target.value)}
                placeholder="Senior Engineer"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Start Date</label>
              <input
                value={exp.startDate}
                onChange={e => handleUpdate(exp.id, 'startDate', e.target.value)}
                placeholder="Jan 2022"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">End Date</label>
              <input
                value={exp.current ? 'Present' : exp.endDate}
                onChange={e => handleUpdate(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
                placeholder="Dec 2023"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={e => handleUpdate(exp.id, 'current', e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor={`current-${exp.id}`} className="text-sm font-medium cursor-pointer select-none">
                I currently work here
              </label>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Description / Achievements</label>
              <textarea
                value={exp.description}
                onChange={e => handleUpdate(exp.id, 'description', e.target.value)}
                rows={4}
                placeholder="• Led a team of 5 engineers to deliver a new payment platform&#10;• Reduced API response time by 40% through caching strategies&#10;• Mentored 3 junior developers"
                className="w-full border border-border rounded-md p-2 bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <p className="text-xs text-muted-foreground">Tip: Use bullet points (•) for each achievement</p>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="w-full py-2.5 border-2 border-dashed border-border rounded-md text-sm font-medium hover:bg-muted transition-colors"
      >
        + Add Experience
      </button>
    </div>
  )
}
