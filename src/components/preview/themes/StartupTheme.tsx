import { useCVStore } from '@/store/useCVStore'

export function StartupTheme() {
  const { personalInfo, education, experience, projects, skills, publications, certifications, awards, languages, sectionOrder, visibility } = useCVStore()

  return (
    <div className="p-10 font-sans text-gray-200 min-h-full bg-gray-900">
      <header className="mb-10 flex items-end justify-between border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-1">{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.jobTitle && <h2 className="text-lg font-medium text-emerald-400">{personalInfo.jobTitle}</h2>}
        </div>
        <div className="text-right text-sm text-gray-400 space-y-0.5">
          {personalInfo.email && <div className="text-emerald-400 font-medium">{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="text-gray-300">{personalInfo.linkedin}</div>}
          {personalInfo.github && <div className="text-gray-300">{personalInfo.github}</div>}
          {personalInfo.website && <div className="text-emerald-400">{personalInfo.website}</div>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-10">
          <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50">
            <p className="text-sm text-gray-300 leading-relaxed">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      <div className="space-y-10">
        {sectionOrder.map((sectionId) => {
          if (sectionId === 'experience' && visibility.experience && experience.length > 0) {
            return (
              <section key="experience">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-5 flex items-center">
                  <span className="w-8 h-px bg-gray-700 mr-3" /> Experience
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {experience.map(exp => (
                    <div key={exp.id} className="bg-gray-800 p-5 rounded-lg border border-gray-700/50">
                      <div className="text-emerald-400 text-xs font-bold mb-1">{exp.startDate}{exp.startDate && ' — '}{exp.current ? 'Present' : exp.endDate}</div>
                      <h4 className="text-lg font-bold text-white mb-0.5">{exp.position}</h4>
                      <div className="text-gray-400 text-sm font-medium mb-3">{exp.company}</div>
                      {exp.description && <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'projects' && visibility.projects && projects.length > 0) {
            return (
              <section key="projects">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-5 flex items-center">
                  <span className="w-8 h-px bg-gray-700 mr-3" /> Shipped
                </h3>
                <div className="space-y-3">
                  {projects.map(proj => (
                    <div key={proj.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-base font-bold text-white">{proj.name}</h4>
                        {proj.link && <a href={proj.link} className="text-xs text-emerald-400 hover:text-emerald-300">Live ↗</a>}
                      </div>
                      {proj.technologies && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {proj.technologies.split(',').map((tech, i) => (
                            <span key={i} className="bg-gray-800 text-xs font-medium px-2 py-0.5 rounded text-gray-300">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      {proj.description && <p className="text-sm text-gray-400">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'skills' && visibility.skills && skills.length > 0) {
            return (
              <section key="skills">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-5 flex items-center">
                  <span className="w-8 h-px bg-gray-700 mr-3" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill.id} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-bold">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'education' && visibility.education && education.length > 0) {
            return (
              <section key="education">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-5 flex items-center">
                  <span className="w-8 h-px bg-gray-700 mr-3" /> Education
                </h3>
                <div className="space-y-3">
                  {education.map(edu => (
                    <div key={edu.id} className="flex justify-between items-baseline border border-gray-700 rounded-lg p-3">
                      <div>
                        <h4 className="font-bold text-white text-sm">{edu.institution}</h4>
                        <div className="text-gray-400 text-xs">{edu.degree}{edu.field && ` in ${edu.field}`}{edu.gpa && ` · GPA: ${edu.gpa}`}</div>
                      </div>
                      <div className="text-xs text-gray-500 font-medium shrink-0 ml-4">{edu.startDate}{edu.startDate && ' — '}{edu.current ? 'Present' : edu.endDate}</div>
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'certifications' && visibility.certifications && certifications.length > 0) {
            return (
              <section key="certifications">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-5 flex items-center">
                  <span className="w-8 h-px bg-gray-700 mr-3" /> Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {certifications.map(cert => (
                    <div key={cert.id} className="border border-gray-700 rounded-lg px-3 py-2">
                      <div className="text-xs font-bold text-white">{cert.name}</div>
                      {cert.issuer && <div className="text-xs text-gray-500">{cert.issuer}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'publications' && visibility.publications && publications.length > 0) {
            return (
              <section key="publications">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-5 flex items-center">
                  <span className="w-8 h-px bg-gray-700 mr-3" /> Publications
                </h3>
                <div className="space-y-2">
                  {publications.map(pub => (
                    <div key={pub.id} className="text-sm border border-gray-700 rounded-lg p-3">
                      <span className="font-semibold text-white">{pub.title}</span>
                      {pub.journal && <span className="text-gray-400 italic"> — {pub.journal}</span>}
                      {pub.year && <span className="text-gray-500"> ({pub.year})</span>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'awards' && visibility.awards && awards.length > 0) {
            return (
              <section key="awards">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-5 flex items-center">
                  <span className="w-8 h-px bg-gray-700 mr-3" /> Awards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {awards.map(award => (
                    <div key={award.id} className="border border-emerald-700/30 bg-emerald-500/5 rounded-lg px-3 py-2">
                      <div className="text-xs font-bold text-emerald-400">{award.title}</div>
                      {award.organization && <div className="text-xs text-gray-500">{award.organization}{award.year && ` · ${award.year}`}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'languages' && visibility.languages && languages.length > 0) {
            return (
              <section key="languages">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-5 flex items-center">
                  <span className="w-8 h-px bg-gray-700 mr-3" /> Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map(lang => (
                    <span key={lang.id} className="border border-gray-700 text-gray-300 px-3 py-1 rounded-lg text-xs font-medium">
                      {lang.name}{lang.proficiency && ` · ${lang.proficiency}`}
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
