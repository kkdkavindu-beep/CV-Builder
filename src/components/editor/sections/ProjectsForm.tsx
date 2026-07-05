import { useCVStore } from '@/store/useCVStore'
import { useUIStore } from '@/store/useUIStore'

export function ProjectsForm() {
  const { projects, addProject, updateProject, removeProject } = useCVStore()
  const { triggerSaved } = useUIStore()

  const handleAdd = () => {
    addProject({
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: '',
    })
    triggerSaved()
  }

  const handleRemove = (id: string) => {
    if (window.confirm('Remove this project?')) {
      removeProject(id)
      triggerSaved()
    }
  }

  const handleUpdate = (id: string, field: string, value: string) => {
    updateProject(id, { [field]: value } as any)
    triggerSaved()
  }

  if (projects.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
          <div className="text-3xl mb-2">🚀</div>
          <p className="font-medium text-sm mb-1">No projects added yet</p>
          <p className="text-xs text-muted-foreground mb-4">Showcase your best work</p>
          <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md font-medium hover:bg-primary/90 transition-colors">
            + Add First Project
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {projects.map((proj) => (
        <div key={proj.id} className="p-4 border border-border rounded-md relative bg-muted/30">
          <button
            onClick={() => handleRemove(proj.id)}
            className="absolute top-3 right-3 text-xs text-destructive border border-destructive/30 px-2 py-1 rounded hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            Remove
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Project Name</label>
              <input
                value={proj.name}
                onChange={e => handleUpdate(proj.id, 'name', e.target.value)}
                placeholder="My Awesome App"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Technologies</label>
              <input
                value={proj.technologies}
                onChange={e => handleUpdate(proj.id, 'technologies', e.target.value)}
                placeholder="React, Node.js, PostgreSQL"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Link <span className="text-muted-foreground font-normal">(optional)</span></label>
              <input
                value={proj.link}
                onChange={e => handleUpdate(proj.id, 'link', e.target.value)}
                placeholder="https://github.com/you/project"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={proj.description}
                onChange={e => handleUpdate(proj.id, 'description', e.target.value)}
                rows={3}
                placeholder="What did you build? What problem did it solve? What was your impact?"
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
        + Add Project
      </button>
    </div>
  )
}
