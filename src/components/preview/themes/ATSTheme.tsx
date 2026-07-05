import { useCVStore } from '@/store/useCVStore'

export function ATSTheme() {
  const { personalInfo, education, experience, projects, skills, publications, certifications, awards, languages, sectionOrder, visibility } = useCVStore()

  return (
    <div className="p-8 font-sans text-black min-h-full bg-white">
      <header className="text-center mb-4 border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <div className="text-sm font-medium text-gray-700 mb-1">{personalInfo.jobTitle}</div>}
        <div className="text-sm">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github, personalInfo.website]
            .filter(Boolean)
            .join(' | ')}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-1">Summary</h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}

      {sectionOrder.map((sectionId) => {
        if (sectionId === 'experience' && visibility.experience && experience.length > 0) {
          return (
            <section key="experience" className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-1">Experience</h2>
              <div className="space-y-3">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between font-bold text-sm">
                      <span>{exp.position}{exp.company && `, ${exp.company}`}</span>
                      <span className="shrink-0 ml-2">{exp.startDate}{exp.startDate && ' – '}{exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    {exp.description && <div className="text-sm mt-1 whitespace-pre-line">{exp.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'education' && visibility.education && education.length > 0) {
          return (
            <section key="education" className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-1">Education</h2>
              <div className="space-y-2">
                {education.map(edu => (
                  <div key={edu.id} className="flex justify-between text-sm">
                    <div>
                      <span className="font-bold">{edu.institution}</span>
                      {(edu.degree || edu.field) && <span> — {edu.degree}{edu.field && ` in ${edu.field}`}</span>}
                      {edu.gpa && <span className="text-gray-600"> | GPA: {edu.gpa}</span>}
                    </div>
                    <span className="shrink-0 ml-2">{edu.startDate}{edu.startDate && ' – '}{edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'skills' && visibility.skills && skills.length > 0) {
          return (
            <section key="skills" className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-1">Skills</h2>
              <div className="text-sm">{skills.map(s => s.name).join(', ')}</div>
            </section>
          )
        }
        if (sectionId === 'projects' && visibility.projects && projects.length > 0) {
          return (
            <section key="projects" className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-1">Projects</h2>
              <div className="space-y-3">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <div className="font-bold text-sm">
                      {proj.name}{proj.technologies && ` (${proj.technologies})`}
                    </div>
                    {proj.description && <div className="text-sm mt-1 whitespace-pre-line">{proj.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'certifications' && visibility.certifications && certifications.length > 0) {
          return (
            <section key="certifications" className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-1">Certifications</h2>
              <div className="space-y-1">
                {certifications.map(cert => (
                  <div key={cert.id} className="text-sm">
                    <span className="font-bold">{cert.name}</span>
                    {cert.issuer && <span> — {cert.issuer}</span>}
                    {cert.date && <span> ({cert.date})</span>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'publications' && visibility.publications && publications.length > 0) {
          return (
            <section key="publications" className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-1">Publications</h2>
              <div className="space-y-2">
                {publications.map(pub => (
                  <div key={pub.id} className="text-sm">
                    <span className="font-bold">{pub.title}</span>
                    {pub.authors && <span>. {pub.authors}</span>}
                    {pub.journal && <span className="italic">. {pub.journal}</span>}
                    {pub.year && <span>. {pub.year}</span>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'awards' && visibility.awards && awards.length > 0) {
          return (
            <section key="awards" className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-1">Awards</h2>
              <div className="space-y-1">
                {awards.map(award => (
                  <div key={award.id} className="text-sm">
                    <span className="font-bold">{award.title}</span>
                    {award.organization && <span> — {award.organization}</span>}
                    {award.year && <span> ({award.year})</span>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'languages' && visibility.languages && languages.length > 0) {
          return (
            <section key="languages" className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2 pb-1">Languages</h2>
              <div className="text-sm">
                {languages.map(l => `${l.name}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(', ')}
              </div>
            </section>
          )
        }
        return null
      })}
    </div>
  )
}
