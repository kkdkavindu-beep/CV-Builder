import { useCVStore } from '@/store/useCVStore'

export function ExecutiveTheme() {
  const { personalInfo, education, experience, projects, skills, publications, certifications, awards, languages, sectionOrder, visibility } = useCVStore()

  return (
    <div className="p-10 font-serif text-gray-900 min-h-full bg-white border-8 border-double border-gray-200">
      <header className="mb-8 border-b-4 border-gray-900 pb-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight uppercase mb-3">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <div className="text-base font-sans font-medium text-gray-600 uppercase tracking-widest mb-3">{personalInfo.jobTitle}</div>}
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs font-sans font-medium text-gray-600 uppercase tracking-wider">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-sm leading-relaxed text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {sectionOrder.map((sectionId) => {
        if (sectionId === 'experience' && visibility.experience && experience.length > 0) {
          return (
            <section key="experience" className="mb-8">
              <h2 className="text-base font-bold uppercase tracking-widest border-b-2 border-gray-300 mb-4 pb-1">Professional Experience</h2>
              <div className="space-y-6">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-end mb-0.5">
                      <h3 className="text-base font-bold">{exp.position}</h3>
                      <span className="text-xs font-sans font-semibold text-gray-600 uppercase shrink-0 ml-3">{exp.startDate}{exp.startDate && ' – '}{exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="text-sm italic text-gray-700 mb-1.5">{exp.company}</div>
                    {exp.description && <p className="text-sm font-sans leading-relaxed text-justify whitespace-pre-line">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'education' && visibility.education && education.length > 0) {
          return (
            <section key="education" className="mb-8">
              <h2 className="text-base font-bold uppercase tracking-widest border-b-2 border-gray-300 mb-4 pb-1">Education</h2>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold">{edu.institution}</h3>
                      <div className="text-sm italic text-gray-700">{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                      {edu.gpa && <div className="text-xs font-sans text-gray-500">GPA: {edu.gpa}</div>}
                    </div>
                    <span className="text-xs font-sans font-semibold text-gray-600 uppercase shrink-0 ml-4">{edu.startDate}{edu.startDate && ' – '}{edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'skills' && visibility.skills && skills.length > 0) {
          return (
            <section key="skills" className="mb-8">
              <h2 className="text-base font-bold uppercase tracking-widest border-b-2 border-gray-300 mb-4 pb-1">Core Competencies</h2>
              <div className="flex flex-wrap gap-x-8 gap-y-1 font-sans text-sm font-medium">
                {skills.map(skill => (
                  <div key={skill.id} className="min-w-[140px]">• {skill.name}</div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'projects' && visibility.projects && projects.length > 0) {
          return (
            <section key="projects" className="mb-8">
              <h2 className="text-base font-bold uppercase tracking-widest border-b-2 border-gray-300 mb-4 pb-1">Key Initiatives & Projects</h2>
              <div className="space-y-4">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <h3 className="text-base font-bold">{proj.name}</h3>
                    {proj.technologies && <div className="text-sm italic text-gray-700 mb-1">{proj.technologies}</div>}
                    {proj.description && <p className="text-sm font-sans leading-relaxed text-justify">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'certifications' && visibility.certifications && certifications.length > 0) {
          return (
            <section key="certifications" className="mb-8">
              <h2 className="text-base font-bold uppercase tracking-widest border-b-2 border-gray-300 mb-4 pb-1">Certifications</h2>
              <div className="space-y-1 font-sans text-sm">
                {certifications.map(cert => (
                  <div key={cert.id} className="flex justify-between">
                    <span className="font-semibold">{cert.name}{cert.issuer && ` — ${cert.issuer}`}</span>
                    {cert.date && <span className="text-gray-600 shrink-0 ml-4">{cert.date}</span>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'publications' && visibility.publications && publications.length > 0) {
          return (
            <section key="publications" className="mb-8">
              <h2 className="text-base font-bold uppercase tracking-widest border-b-2 border-gray-300 mb-4 pb-1">Publications</h2>
              <div className="space-y-2 font-sans text-sm">
                {publications.map(pub => (
                  <div key={pub.id}>
                    <span className="font-semibold">"{pub.title}"</span>
                    {pub.journal && <span className="italic text-gray-600"> — {pub.journal}</span>}
                    {pub.year && <span className="text-gray-500"> ({pub.year})</span>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'awards' && visibility.awards && awards.length > 0) {
          return (
            <section key="awards" className="mb-8">
              <h2 className="text-base font-bold uppercase tracking-widest border-b-2 border-gray-300 mb-4 pb-1">Awards & Recognition</h2>
              <div className="space-y-1 font-sans text-sm">
                {awards.map(award => (
                  <div key={award.id} className="flex justify-between">
                    <span className="font-semibold">{award.title}{award.organization && ` — ${award.organization}`}</span>
                    {award.year && <span className="text-gray-600 shrink-0 ml-4">{award.year}</span>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'languages' && visibility.languages && languages.length > 0) {
          return (
            <section key="languages" className="mb-8">
              <h2 className="text-base font-bold uppercase tracking-widest border-b-2 border-gray-300 mb-4 pb-1">Languages</h2>
              <div className="flex flex-wrap gap-x-8 gap-y-1 font-sans text-sm">
                {languages.map(lang => (
                  <span key={lang.id}>{lang.name}{lang.proficiency && ` (${lang.proficiency})`}</span>
                ))}
              </div>
            </section>
          )
        }
        return null
      })}
    </div>
  )
}
