import { useCVStore } from '@/store/useCVStore'
import { useUIStore } from '@/store/useUIStore'

export function AwardsForm() {
  const { awards, addAward, updateAward, removeAward } = useCVStore()
  const { triggerSaved } = useUIStore()

  const handleAdd = () => {
    addAward({ id: crypto.randomUUID(), title: '', organization: '', year: '', description: '' })
    triggerSaved()
  }

  const handleRemove = (id: string) => {
    if (window.confirm('Remove this award?')) {
      removeAward(id)
      triggerSaved()
    }
  }

  const handleUpdate = (id: string, field: string, value: string) => {
    updateAward(id, { [field]: value } as any)
    triggerSaved()
  }

  if (awards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
        <div className="text-3xl mb-2">🥇</div>
        <p className="font-medium text-sm mb-1">No awards added yet</p>
        <p className="text-xs text-muted-foreground mb-4">Recognitions, honours, and achievements</p>
        <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md font-medium hover:bg-primary/90 transition-colors">
          + Add Award
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {awards.map((award) => (
        <div key={award.id} className="p-4 border border-border rounded-md relative bg-muted/30">
          <button
            onClick={() => handleRemove(award.id)}
            className="absolute top-3 right-3 text-xs text-destructive border border-destructive/30 px-2 py-1 rounded hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            Remove
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Award Title</label>
              <input
                value={award.title}
                onChange={e => handleUpdate(award.id, 'title', e.target.value)}
                placeholder="Best Innovation Award"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Organization</label>
              <input
                value={award.organization}
                onChange={e => handleUpdate(award.id, 'organization', e.target.value)}
                placeholder="IEEE, Google, MIT..."
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Year</label>
              <input
                value={award.year}
                onChange={e => handleUpdate(award.id, 'year', e.target.value)}
                placeholder="2023"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Description <span className="text-muted-foreground font-normal">(optional)</span></label>
              <textarea
                value={award.description}
                onChange={e => handleUpdate(award.id, 'description', e.target.value)}
                rows={2}
                placeholder="Brief description of the award and why you received it..."
                className="w-full border border-border rounded-md p-2 bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleAdd} className="w-full py-2.5 border-2 border-dashed border-border rounded-md text-sm font-medium hover:bg-muted transition-colors">
        + Add Award
      </button>
    </div>
  )
}
