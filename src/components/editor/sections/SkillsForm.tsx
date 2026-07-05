import { useCVStore } from '@/store/useCVStore'
import { useUIStore } from '@/store/useUIStore'

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

export function SkillsForm() {
  const { skills, addSkill, updateSkill, removeSkill } = useCVStore()
  const { triggerSaved } = useUIStore()

  const handleAdd = () => {
    addSkill({
      id: crypto.randomUUID(),
      name: '',
      category: '',
      level: 'Intermediate',
    })
    triggerSaved()
  }

  const handleRemove = (id: string) => {
    if (window.confirm('Remove this skill?')) {
      removeSkill(id)
      triggerSaved()
    }
  }

  const handleUpdate = (id: string, field: string, value: string) => {
    updateSkill(id, { [field]: value } as any)
    triggerSaved()
  }

  if (skills.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
          <div className="text-3xl mb-2">⚡</div>
          <p className="font-medium text-sm mb-1">No skills added yet</p>
          <p className="text-xs text-muted-foreground mb-4">List your technical and soft skills</p>
          <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md font-medium hover:bg-primary/90 transition-colors">
            + Add First Skill
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex gap-2 items-center p-3 border border-border rounded-md bg-muted/30">
            <input
              value={skill.name}
              onChange={e => handleUpdate(skill.id, 'name', e.target.value)}
              placeholder="Skill name (e.g. React)"
              className="flex-1 border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              value={skill.category}
              onChange={e => handleUpdate(skill.id, 'category', e.target.value)}
              placeholder="Category (e.g. Frontend)"
              className="flex-1 border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <select
              value={skill.level}
              onChange={e => handleUpdate(skill.id, 'level', e.target.value)}
              className="border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {SKILL_LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <button
              onClick={() => handleRemove(skill.id)}
              className="text-destructive hover:text-destructive/70 text-lg leading-none px-1"
              title="Remove skill"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleAdd}
        className="w-full py-2.5 border-2 border-dashed border-border rounded-md text-sm font-medium hover:bg-muted transition-colors"
      >
        + Add Skill
      </button>
    </div>
  )
}
