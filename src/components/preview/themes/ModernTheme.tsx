import { useCVStore } from '@/store/useCVStore'

export function ModernTheme() {
  const { personalInfo, education, experience, projects, skills, publications, certifications, awards, languages, sectionOrder, visibility } = useCVStore()

  return (
    <div className="p-10 font-sans text-gray-800 min-h-full bg-white">
      {/* Header */}
      <header className="mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <h2 className="text-xl text-gray-600 mt-1">{personalInfo.jobTitle}</h2>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {sectionOrder.map((sectionId) => {
        if (sectionId === 'experience' && visibility.experience && experience.length > 0) {
          return (
            <section key="experience" className="mb-6">
              <h3 className="text-base font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 mb-3 pb-1">Experience</h3>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                      <span className="text-sm text-gray-500 shrink-0 ml-2">{exp.startDate}{exp.startDate && ' – '}{exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-600 mb-1">{exp.company}</div>
                    {exp.description && <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'education' && visibility.education && education.length > 0) {
          return (
            <section key="education" className="mb-6">
              <h3 className="text-base font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 mb-3 pb-1">Education</h3>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-gray-900">{edu.degree}{edu.field && ` in ${edu.field}`}</h4>
                      <span className="text-sm text-gray-500 shrink-0 ml-2">{edu.startDate}{edu.startDate && ' – '}{edu.current ? 'Present' : edu.endDate}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-600">{edu.institution}</div>
                    {edu.gpa && <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>}
                    {edu.description && <p className="text-xs text-gray-500 mt-0.5">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'skills' && visibility.skills && skills.length > 0) {
          return (
            <section key="skills" className="mb-6">
              <h3 className="text-base font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 mb-3 pb-1">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill.id} className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded">
                    {skill.name}{skill.level && <span className="text-gray-500 font-normal"> ({skill.level})</span>}
                  </span>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'projects' && visibility.projects && projects.length > 0) {
          return (
            <section key="projects" className="mb-6">
              <h3 className="text-base font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 mb-3 pb-1">Projects</h3>
              <div className="space-y-4">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <h4 className="font-semibold text-gray-900">
                      {proj.name}
                      {proj.link && <a href={proj.link} className="ml-2 text-xs text-blue-600 font-normal hover:underline">↗ Link</a>}
                    </h4>
                    {proj.technologies && <div className="text-xs font-medium text-gray-600 mb-1">{proj.technologies}</div>}
                    {proj.description && <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'certifications' && visibility.certifications && certifications.length > 0) {
          return (
            <section key="certifications" className="mb-6">
              <h3 className="text-base font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 mb-3 pb-1">Certifications</h3>
              <div className="space-y-2">
                {certifications.map(cert => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <div>
                      <span className="font-medium text-sm text-gray-900">{cert.name}</span>
                      {cert.issuer && <span className="text-sm text-gray-600"> — {cert.issuer}</span>}
                    </div>
                    {cert.date && <span className="text-xs text-gray-500 shrink-0 ml-2">{cert.date}</span>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'publications' && visibility.publications && publications.length > 0) {
          return (
            <section key="publications" className="mb-6">
              <h3 className="text-base font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 mb-3 pb-1">Publications</h3>
              <div className="space-y-3">
                {publications.map(pub => (
                  <div key={pub.id} className="text-sm">
                    <span className="font-medium text-gray-900">{pub.title}</span>
                    {pub.authors && <span className="text-gray-600"> — {pub.authors}</span>}
                    {pub.journal && <span className="text-gray-500 italic">, {pub.journal}</span>}
                    {pub.year && <span className="text-gray-500"> ({pub.year})</span>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'awards' && visibility.awards && awards.length > 0) {
          return (
            <section key="awards" className="mb-6">
              <h3 className="text-base font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 mb-3 pb-1">Awards & Honours</h3>
              <div className="space-y-2">
                {awards.map(award => (
                  <div key={award.id} className="flex justify-between items-baseline">
                    <div>
                      <span className="font-medium text-sm text-gray-900">{award.title}</span>
                      {award.organization && <span className="text-sm text-gray-600"> — {award.organization}</span>}
                    </div>
                    {award.year && <span className="text-xs text-gray-500 shrink-0 ml-2">{award.year}</span>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'languages' && visibility.languages && languages.length > 0) {
          return (
            <section key="languages" className="mb-6">
              <h3 className="text-base font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 mb-3 pb-1">Languages</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                {languages.map(lang => (
                  <span key={lang.id} className="text-sm text-gray-800">
                    {lang.name}{lang.proficiency && <span className="text-gray-500"> ({lang.proficiency})</span>}
                  </span>
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
