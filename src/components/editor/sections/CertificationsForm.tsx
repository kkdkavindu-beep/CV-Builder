import { useCVStore } from '@/store/useCVStore'
import { useUIStore } from '@/store/useUIStore'

export function CertificationsForm() {
  const { certifications, addCertification, updateCertification, removeCertification } = useCVStore()
  const { triggerSaved } = useUIStore()

  const handleAdd = () => {
    addCertification({ id: crypto.randomUUID(), name: '', issuer: '', date: '', url: '' })
    triggerSaved()
  }

  const handleRemove = (id: string) => {
    if (window.confirm('Remove this certification?')) {
      removeCertification(id)
      triggerSaved()
    }
  }

  const handleUpdate = (id: string, field: string, value: string) => {
    updateCertification(id, { [field]: value } as any)
    triggerSaved()
  }

  if (certifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
        <div className="text-3xl mb-2">🏆</div>
        <p className="font-medium text-sm mb-1">No certifications added yet</p>
        <p className="text-xs text-muted-foreground mb-4">Add professional licenses and certifications</p>
        <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md font-medium hover:bg-primary/90 transition-colors">
          + Add Certification
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {certifications.map((cert) => (
        <div key={cert.id} className="p-4 border border-border rounded-md relative bg-muted/30">
          <button
            onClick={() => handleRemove(cert.id)}
            className="absolute top-3 right-3 text-xs text-destructive border border-destructive/30 px-2 py-1 rounded hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            Remove
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Certification Name</label>
              <input
                value={cert.name}
                onChange={e => handleUpdate(cert.id, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Issuing Organization</label>
              <input
                value={cert.issuer}
                onChange={e => handleUpdate(cert.id, 'issuer', e.target.value)}
                placeholder="Amazon Web Services"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Issue Date</label>
              <input
                value={cert.date}
                onChange={e => handleUpdate(cert.id, 'date', e.target.value)}
                placeholder="March 2024"
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Credential URL <span className="text-muted-foreground font-normal">(optional)</span></label>
              <input
                value={cert.url}
                onChange={e => handleUpdate(cert.id, 'url', e.target.value)}
                placeholder="https://www.credly.com/badges/..."
                className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleAdd} className="w-full py-2.5 border-2 border-dashed border-border rounded-md text-sm font-medium hover:bg-muted transition-colors">
        + Add Certification
      </button>
    </div>
  )
}
