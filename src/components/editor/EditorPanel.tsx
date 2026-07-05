import { useCVStore } from '@/store/useCVStore'
import { useUIStore } from '@/store/useUIStore'
import { PersonalInfoForm } from './sections/PersonalInfoForm'
import { EducationForm } from './sections/EducationForm'
import { ExperienceForm } from './sections/ExperienceForm'
import { ProjectsForm } from './sections/ProjectsForm'
import { SkillsForm } from './sections/SkillsForm'
import { PublicationsForm } from './sections/PublicationsForm'
import { CertificationsForm } from './sections/CertificationsForm'
import { AwardsForm } from './sections/AwardsForm'
import { LanguagesForm } from './sections/LanguagesForm'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const SECTION_META: Record<string, { label: string; icon: string }> = {
  experience: { label: 'Experience', icon: '💼' },
  education: { label: 'Education', icon: '🎓' },
  skills: { label: 'Skills', icon: '⚡' },
  projects: { label: 'Projects', icon: '🚀' },
  publications: { label: 'Publications', icon: '📄' },
  certifications: { label: 'Certifications', icon: '🏆' },
  awards: { label: 'Awards', icon: '🥇' },
  languages: { label: 'Languages', icon: '🌐' },
}

interface SortableSectionProps {
  id: string
  isActive: boolean
  isVisible: boolean
  itemCount: number
  onToggle: () => void
  onToggleVisibility: () => void
  children: React.ReactNode
}

function SortableSection({ id, isActive, isVisible, itemCount, onToggle, onToggleVisibility, children }: SortableSectionProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  const meta = SECTION_META[id] ?? { label: id, icon: '•' }

  return (
    <div ref={setNodeRef} style={style} className="border border-border rounded-lg overflow-hidden bg-background mb-3 shadow-sm">
      <div className="flex items-center bg-muted/40 hover:bg-muted/70 transition-colors">
        <div
          {...attributes}
          {...listeners}
          className="px-3 py-3 cursor-grab active:cursor-grabbing text-muted-foreground select-none text-lg"
          title="Drag to reorder"
        >
          ⠿
        </div>
        <button
          className="flex-1 px-2 py-3 text-left text-sm font-semibold flex items-center gap-2"
          onClick={onToggle}
        >
          <span>{meta.icon}</span>
          <span>{meta.label}</span>
          {itemCount > 0 && (
            <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
              {itemCount}
            </span>
          )}
        </button>
        <button
          onClick={onToggleVisibility}
          className={`px-2 py-1 text-xs rounded mr-1 transition-colors ${
            isVisible
              ? 'text-primary hover:bg-primary/10'
              : 'text-muted-foreground line-through hover:bg-muted'
          }`}
          title={isVisible ? 'Hide from CV' : 'Show in CV'}
        >
          {isVisible ? '👁 Visible' : '🚫 Hidden'}
        </button>
        <button onClick={onToggle} className="px-3 text-muted-foreground text-xs">
          {isActive ? '▼' : '▶'}
        </button>
      </div>
      {isActive && (
        <div className="p-4 border-t border-border bg-background">
          {children}
        </div>
      )}
    </div>
  )
}

export function EditorPanel() {
  const { sectionOrder, reorderSections, education, experience, projects, skills, publications, certifications, awards, languages, visibility, toggleVisibility } = useCVStore()
  const { activeTab, setActiveTab } = useUIStore()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const itemCounts: Record<string, number> = {
    experience: experience.length,
    education: education.length,
    projects: projects.length,
    skills: skills.length,
    publications: publications.length,
    certifications: certifications.length,
    awards: awards.length,
    languages: languages.length,
  }

  const renderSection = (id: string) => {
    switch (id) {
      case 'education': return <EducationForm />
      case 'experience': return <ExperienceForm />
      case 'projects': return <ProjectsForm />
      case 'skills': return <SkillsForm />
      case 'publications': return <PublicationsForm />
      case 'certifications': return <CertificationsForm />
      case 'awards': return <AwardsForm />
      case 'languages': return <LanguagesForm />
      default: return null
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id as string)
      const newIndex = sectionOrder.indexOf(over.id as string)
      reorderSections(oldIndex, newIndex)
    }
  }

  return (
    <div className="p-5">
      {/* Personal Info — always first, not draggable */}
      <div className="border border-border rounded-lg overflow-hidden bg-background mb-3 shadow-sm">
        <button
          className="w-full px-4 py-3 text-left font-semibold text-sm bg-muted/40 hover:bg-muted/70 transition-colors flex items-center gap-2"
          onClick={() => setActiveTab(activeTab === 'personal' ? '' : 'personal')}
        >
          <span>👤</span>
          <span>Personal Info</span>
          <span className="ml-auto text-muted-foreground text-xs">{activeTab === 'personal' ? '▼' : '▶'}</span>
        </button>
        {activeTab === 'personal' && (
          <div className="p-4 border-t border-border">
            <PersonalInfoForm />
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground mb-3 px-1">Drag sections to reorder • Click eye to show/hide in CV</p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          {sectionOrder.map((sectionId) => (
            <SortableSection
              key={sectionId}
              id={sectionId}
              isActive={activeTab === sectionId}
              isVisible={visibility[sectionId as keyof typeof visibility] ?? true}
              itemCount={itemCounts[sectionId] ?? 0}
              onToggle={() => setActiveTab(activeTab === sectionId ? '' : sectionId)}
              onToggleVisibility={() => toggleVisibility(sectionId as any)}
            >
              {renderSection(sectionId)}
            </SortableSection>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
