import { useCVStore } from '@/store/useCVStore'
import { useUIStore } from '@/store/useUIStore'

export function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation } = useCVStore()
  const { triggerSaved } = useUIStore()

  const handleAdd = () => {
    addEducation({
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: '',
    })
    triggerSaved()
  }

  const handleRemove = (id: string) => {
    if (window.confirm('Remove this education entry?')) {
      removeEducation(id)
      triggerSaved()
    }
  }

  const handleUpdate = (id: string, field: string, value: string | boolean) => {
    updateEducation(id, { [field]: value } as any)
    triggerSaved()
  }

  if (education.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
          <div className="text-3xl mb-2">🎓</div>
          <p className="font-medium text-sm mb-1">No education added yet</p>
          <p className="text-xs text-muted-foreground mb-4">Add your academic background</p>
          <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md font-medium hover:bg-primary/90 transition-colors">
            + Add Education
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {education.map((edu) => (
        <div key={edu.id} className="p-4 border border-border rounded-md relative bg-muted/30">
          <button
            onClick={() => handleRemove(edu.id)}
            className="absolute top-3 right-3 text-xs text-destructive border border-destructive/30 px-2 py-1 rounded hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            Remove
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Institution</label>
              <input
                value={edu.institution}
                onChange={e => handleUpdate(edu.id, 'institution', e.target.value)}
                placeholder="MIT, Harvard University..."
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Degree</label>
              <input
                value={edu.degree}
                onChange={e => handleUpdate(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Field of Study</label>
              <input
                value={edu.field}
                onChange={e => handleUpdate(edu.id, 'field', e.target.value)}
                placeholder="Computer Science"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Start Date</label>
              <input
                value={edu.startDate}
                onChange={e => handleUpdate(edu.id, 'startDate', e.target.value)}
                placeholder="Sep 2018"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">End Date</label>
              <input
                value={edu.current ? 'Present' : edu.endDate}
                onChange={e => handleUpdate(edu.id, 'endDate', e.target.value)}
                disabled={edu.current}
                placeholder="Jun 2022"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`current-edu-${edu.id}`}
                checked={edu.current}
                onChange={e => handleUpdate(edu.id, 'current', e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor={`current-edu-${edu.id}`} className="text-sm font-medium cursor-pointer select-none">
                Currently studying
              </label>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">GPA <span className="text-muted-foreground font-normal">(optional)</span></label>
              <input
                value={edu.gpa}
                onChange={e => handleUpdate(edu.id, 'gpa', e.target.value)}
                placeholder="3.8 / 4.0"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Additional Details <span className="text-muted-foreground font-normal">(optional)</span></label>
              <textarea
                value={edu.description}
                onChange={e => handleUpdate(edu.id, 'description', e.target.value)}
                rows={2}
                placeholder="Relevant coursework, honours, thesis, activities..."
                className="w-full border border-border rounded-md p-2 bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="w-full py-2.5 border-2 border-dashed border-border rounded-md text-sm font-medium hover:bg-muted transition-colors"
      >
        + Add Education
      </button>
    </div>
  )
}
