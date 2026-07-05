import { useCVStore } from '@/store/useCVStore'

export function MinimalTheme() {
  const { personalInfo, education, experience, projects, skills, publications, certifications, awards, languages, sectionOrder, visibility } = useCVStore()

  return (
    <div className="p-12 font-sans text-gray-700 min-h-full bg-white">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-light text-gray-900 mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="text-gray-500 text-sm mb-3">{personalInfo.jobTitle}</p>}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-10">
          <p className="text-sm leading-relaxed text-gray-500 text-center max-w-2xl mx-auto">{personalInfo.summary}</p>
        </section>
      )}

      <div className="space-y-10">
        {sectionOrder.map((sectionId) => {
          if (sectionId === 'experience' && visibility.experience && experience.length > 0) {
            return (
              <section key="experience">
                <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5 text-center">Experience</h2>
                <div className="space-y-7">
                  {experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-base font-medium text-gray-900">{exp.position}</h3>
                        <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate}{exp.startDate && ' – '}{exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      <div className="text-sm text-gray-500 mb-1">{exp.company}</div>
                      {exp.description && <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'education' && visibility.education && education.length > 0) {
            return (
              <section key="education">
                <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5 text-center">Education</h2>
                <div className="space-y-5">
                  {education.map(edu => (
                    <div key={edu.id} className="text-center">
                      <h3 className="text-base font-medium text-gray-900">{edu.degree}</h3>
                      <div className="text-sm text-gray-500">{edu.institution}{edu.field && `, ${edu.field}`}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{edu.startDate}{edu.startDate && ' – '}{edu.current ? 'Present' : edu.endDate}{edu.gpa && ` | GPA: ${edu.gpa}`}</div>
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'skills' && visibility.skills && skills.length > 0) {
            return (
              <section key="skills">
                <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5 text-center">Skills</h2>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                  {skills.map(skill => (
                    <span key={skill.id} className="text-sm text-gray-600">
                      {skill.name}{skill.level && <span className="text-gray-400 text-xs ml-1">({skill.level})</span>}
                    </span>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'projects' && visibility.projects && projects.length > 0) {
            return (
              <section key="projects">
                <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5 text-center">Projects</h2>
                <div className="space-y-7">
                  {projects.map(proj => (
                    <div key={proj.id}>
                      <h3 className="text-base font-medium text-gray-900">
                        {proj.name}
                        {proj.link && <a href={proj.link} className="ml-2 text-xs text-blue-400 font-normal hover:underline">↗</a>}
                      </h3>
                      {proj.technologies && <div className="text-xs text-gray-400 mb-1">{proj.technologies}</div>}
                      {proj.description && <p className="text-sm text-gray-400 leading-relaxed">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'certifications' && visibility.certifications && certifications.length > 0) {
            return (
              <section key="certifications">
                <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5 text-center">Certifications</h2>
                <div className="space-y-2 text-center">
                  {certifications.map(cert => (
                    <div key={cert.id}>
                      <span className="text-sm text-gray-700 font-medium">{cert.name}</span>
                      {cert.issuer && <span className="text-xs text-gray-400"> — {cert.issuer}</span>}
                      {cert.date && <span className="text-xs text-gray-400"> ({cert.date})</span>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'publications' && visibility.publications && publications.length > 0) {
            return (
              <section key="publications">
                <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5 text-center">Publications</h2>
                <div className="space-y-3">
                  {publications.map(pub => (
                    <div key={pub.id} className="text-sm text-center">
                      <span className="text-gray-700 font-medium">{pub.title}</span>
                      {pub.journal && <span className="text-gray-400 italic"> — {pub.journal}</span>}
                      {pub.year && <span className="text-gray-400"> ({pub.year})</span>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'awards' && visibility.awards && awards.length > 0) {
            return (
              <section key="awards">
                <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5 text-center">Awards</h2>
                <div className="space-y-2 text-center">
                  {awards.map(award => (
                    <div key={award.id}>
                      <span className="text-sm text-gray-700 font-medium">{award.title}</span>
                      {award.organization && <span className="text-xs text-gray-400"> — {award.organization}</span>}
                      {award.year && <span className="text-xs text-gray-400"> ({award.year})</span>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'languages' && visibility.languages && languages.length > 0) {
            return (
              <section key="languages">
                <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5 text-center">Languages</h2>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
                  {languages.map(lang => (
                    <span key={lang.id} className="text-sm text-gray-600">
                      {lang.name}{lang.proficiency && <span className="text-gray-400 text-xs ml-1">({lang.proficiency})</span>}
                    </span>
                  ))}
                </div>
              </section>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
