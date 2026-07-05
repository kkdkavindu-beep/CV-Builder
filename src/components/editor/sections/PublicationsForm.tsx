import { useCVStore } from '@/store/useCVStore'
import { useUIStore } from '@/store/useUIStore'

export function PublicationsForm() {
  const { publications, addPublication, updatePublication, removePublication } = useCVStore()
  const { triggerSaved } = useUIStore()

  const handleAdd = () => {
    addPublication({ id: crypto.randomUUID(), title: '', authors: '', journal: '', year: '', url: '' })
    triggerSaved()
  }

  const handleRemove = (id: string) => {
    if (window.confirm('Remove this publication?')) {
      removePublication(id)
      triggerSaved()
    }
  }

  const handleUpdate = (id: string, field: string, value: string) => {
    updatePublication(id, { [field]: value } as any)
    triggerSaved()
  }

  if (publications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
        <div className="text-3xl mb-2">📄</div>
        <p className="font-medium text-sm mb-1">No publications added yet</p>
        <p className="text-xs text-muted-foreground mb-4">Add papers, articles, or research you've authored</p>
        <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md font-medium hover:bg-primary/90 transition-colors">
          + Add Publication
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {publications.map((pub) => (
        <div key={pub.id} className="p-4 border border-border rounded-md relative bg-muted/30">
          <button
            onClick={() => handleRemove(pub.id)}
            className="absolute top-3 right-3 text-xs text-destructive border border-destructive/30 px-2 py-1 rounded hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            Remove
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Title</label>
              <input
                value={pub.title}
                onChange={e => handleUpdate(pub.id, 'title', e.target.value)}
                placeholder="Deep Learning for Image Recognition"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Authors</label>
              <input
                value={pub.authors}
                onChange={e => handleUpdate(pub.id, 'authors', e.target.value)}
                placeholder="Smith, J., Doe, A."
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Journal / Conference</label>
              <input
                value={pub.journal}
                onChange={e => handleUpdate(pub.id, 'journal', e.target.value)}
                placeholder="Nature, IEEE, NeurIPS..."
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Year</label>
              <input
                value={pub.year}
                onChange={e => handleUpdate(pub.id, 'year', e.target.value)}
                placeholder="2024"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">URL / DOI <span className="text-muted-foreground font-normal">(optional)</span></label>
              <input
                value={pub.url}
                onChange={e => handleUpdate(pub.id, 'url', e.target.value)}
                placeholder="https://doi.org/..."
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleAdd} className="w-full py-2.5 border-2 border-dashed border-border rounded-md text-sm font-medium hover:bg-muted transition-colors">
        + Add Publication
      </button>
    </div>
  )
}
