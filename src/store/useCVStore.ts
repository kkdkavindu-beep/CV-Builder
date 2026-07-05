import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeType = 'modern' | 'academic' | 'corporate' | 'minimal' | 'executive' | 'creative' | 'ats' | 'startup'

export interface PersonalInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  website: string
  summary: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
  gpa: string
  description: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link: string
  startDate: string
  endDate: string
}

export interface Skill {
  id: string
  category: string
  name: string
  level: string // Beginner, Intermediate, Advanced, Expert
}

export interface Publication {
  id: string
  title: string
  authors: string
  journal: string
  year: string
  url: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url: string
}

export interface Award {
  id: string
  title: string
  organization: string
  year: string
  description: string
}

export interface Language {
  id: string
  name: string
  proficiency: string // Native, Fluent, Intermediate, Basic
}

export interface SectionVisibility {
  personal: boolean
  education: boolean
  experience: boolean
  projects: boolean
  skills: boolean
  publications: boolean
  certifications: boolean
  awards: boolean
  languages: boolean
}

interface CVState {
  theme: ThemeType
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
  publications: Publication[]
  certifications: Certification[]
  awards: Award[]
  languages: Language[]
  visibility: SectionVisibility
  sectionOrder: string[]

  // Actions
  setTheme: (theme: ThemeType) => void
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void

  addEducation: (edu: Education) => void
  updateEducation: (id: string, edu: Partial<Education>) => void
  removeEducation: (id: string) => void

  addExperience: (exp: Experience) => void
  updateExperience: (id: string, exp: Partial<Experience>) => void
  removeExperience: (id: string) => void

  addProject: (proj: Project) => void
  updateProject: (id: string, proj: Partial<Project>) => void
  removeProject: (id: string) => void

  addSkill: (skill: Skill) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void

  addPublication: (pub: Publication) => void
  updatePublication: (id: string, pub: Partial<Publication>) => void
  removePublication: (id: string) => void

  addCertification: (cert: Certification) => void
  updateCertification: (id: string, cert: Partial<Certification>) => void
  removeCertification: (id: string) => void

  addAward: (award: Award) => void
  updateAward: (id: string, award: Partial<Award>) => void
  removeAward: (id: string) => void

  addLanguage: (lang: Language) => void
  updateLanguage: (id: string, lang: Partial<Language>) => void
  removeLanguage: (id: string) => void

  toggleVisibility: (section: keyof SectionVisibility) => void
  reorderSections: (startIndex: number, endIndex: number) => void
  resetCV: () => void
}

const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  website: '',
  summary: '',
}

const defaultState = {
  theme: 'modern' as ThemeType,
  personalInfo: defaultPersonalInfo,
  education: [],
  experience: [],
  projects: [],
  skills: [],
  publications: [],
  certifications: [],
  awards: [],
  languages: [],
  visibility: {
    personal: true,
    education: true,
    experience: true,
    projects: true,
    skills: true,
    publications: true,
    certifications: true,
    awards: true,
    languages: true,
  },
  sectionOrder: ['experience', 'education', 'skills', 'projects', 'publications', 'certifications', 'awards', 'languages'],
}

export const useCVStore = create<CVState>()(
  persist(
    (set) => ({
      ...defaultState,

      setTheme: (theme) => set({ theme }),
      updatePersonalInfo: (info) => set((state) => ({ personalInfo: { ...state.personalInfo, ...info } })),

      addEducation: (edu) => set((state) => ({ education: [...state.education, edu] })),
      updateEducation: (id, edu) => set((state) => ({
        education: state.education.map(e => e.id === id ? { ...e, ...edu } : e)
      })),
      removeEducation: (id) => set((state) => ({ education: state.education.filter(e => e.id !== id) })),

      addExperience: (exp) => set((state) => ({ experience: [...state.experience, exp] })),
      updateExperience: (id, exp) => set((state) => ({
        experience: state.experience.map(e => e.id === id ? { ...e, ...exp } : e)
      })),
      removeExperience: (id) => set((state) => ({ experience: state.experience.filter(e => e.id !== id) })),

      addProject: (proj) => set((state) => ({ projects: [...state.projects, proj] })),
      updateProject: (id, proj) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...proj } : p)
      })),
      removeProject: (id) => set((state) => ({ projects: state.projects.filter(p => p.id !== id) })),

      addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
      updateSkill: (id, skill) => set((state) => ({
        skills: state.skills.map(s => s.id === id ? { ...s, ...skill } : s)
      })),
      removeSkill: (id) => set((state) => ({ skills: state.skills.filter(s => s.id !== id) })),

      addPublication: (pub) => set((state) => ({ publications: [...state.publications, pub] })),
      updatePublication: (id, pub) => set((state) => ({
        publications: state.publications.map(p => p.id === id ? { ...p, ...pub } : p)
      })),
      removePublication: (id) => set((state) => ({ publications: state.publications.filter(p => p.id !== id) })),

      addCertification: (cert) => set((state) => ({ certifications: [...state.certifications, cert] })),
      updateCertification: (id, cert) => set((state) => ({
        certifications: state.certifications.map(c => c.id === id ? { ...c, ...cert } : c)
      })),
      removeCertification: (id) => set((state) => ({ certifications: state.certifications.filter(c => c.id !== id) })),

      addAward: (award) => set((state) => ({ awards: [...state.awards, award] })),
      updateAward: (id, award) => set((state) => ({
        awards: state.awards.map(a => a.id === id ? { ...a, ...award } : a)
      })),
      removeAward: (id) => set((state) => ({ awards: state.awards.filter(a => a.id !== id) })),

      addLanguage: (lang) => set((state) => ({ languages: [...state.languages, lang] })),
      updateLanguage: (id, lang) => set((state) => ({
        languages: state.languages.map(l => l.id === id ? { ...l, ...lang } : l)
      })),
      removeLanguage: (id) => set((state) => ({ languages: state.languages.filter(l => l.id !== id) })),

      toggleVisibility: (section) => set((state) => ({
        visibility: { ...state.visibility, [section]: !state.visibility[section] }
      })),
      reorderSections: (startIndex, endIndex) => set((state) => {
        const newOrder = Array.from(state.sectionOrder)
        const [removed] = newOrder.splice(startIndex, 1)
        newOrder.splice(endIndex, 0, removed)
        return { sectionOrder: newOrder }
      }),
      resetCV: () => set({ ...defaultState }),
    }),
    {
      name: 'cv-builder-storage',
    }
  )
)
