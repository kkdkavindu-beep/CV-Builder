import { useCVStore } from '@/store/useCVStore'

export function CorporateTheme() {
  const { personalInfo, education, experience, projects, skills, publications, certifications, awards, languages, sectionOrder, visibility } = useCVStore()

  return (
    <div className="flex min-h-full font-sans bg-white">
      {/* Sidebar */}
      <aside className="w-[38%] bg-gray-100 p-7 text-gray-800 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <h2 className="text-base text-blue-600 font-semibold mt-1 mb-6">{personalInfo.jobTitle}</h2>}

        <div className="space-y-5 text-sm">
          <div>
            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2 border-b border-gray-300 pb-1">Contact</h3>
            <div className="space-y-1">
              {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
            </div>
          </div>

          {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
            <div>
              <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2 border-b border-gray-300 pb-1">Links</h3>
              <div className="space-y-1 break-all">
                {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
                {personalInfo.github && <div>{personalInfo.github}</div>}
                {personalInfo.website && <div>{personalInfo.website}</div>}
              </div>
            </div>
          )}

          {visibility.skills && skills.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2 border-b border-gray-300 pb-1">Skills</h3>
              <div className="space-y-2">
                {skills.map(skill => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-gray-800">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-300 h-1 rounded overflow-hidden">
                      <div className={`h-full bg-blue-600 ${skill.level === 'Expert' ? 'w-full' : skill.level === 'Advanced' ? 'w-3/4' : skill.level === 'Intermediate' ? 'w-1/2' : 'w-1/4'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {visibility.languages && languages.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2 border-b border-gray-300 pb-1">Languages</h3>
              <div className="space-y-1">
                {languages.map(lang => (
                  <div key={lang.id} className="flex justify-between text-xs">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-gray-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {visibility.certifications && certifications.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2 border-b border-gray-300 pb-1">Certifications</h3>
              <div className="space-y-1.5">
                {certifications.map(cert => (
                  <div key={cert.id}>
                    <div className="text-xs font-semibold text-gray-800">{cert.name}</div>
                    {cert.issuer && <div className="text-xs text-gray-500">{cert.issuer}{cert.date && ` · ${cert.date}`}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {visibility.awards && awards.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2 border-b border-gray-300 pb-1">Awards</h3>
              <div className="space-y-1.5">
                {awards.map(award => (
                  <div key={award.id}>
                    <div className="text-xs font-semibold text-gray-800">{award.title}</div>
                    {award.organization && <div className="text-xs text-gray-500">{award.organization}{award.year && ` · ${award.year}`}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {personalInfo.summary && (
          <section className="mb-7">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 border-b-2 border-blue-600 inline-block pb-1">Profile</h3>
            <p className="text-sm text-gray-700 leading-relaxed mt-2">{personalInfo.summary}</p>
          </section>
        )}

        {sectionOrder.map((sectionId) => {
          if (['skills', 'languages', 'certifications', 'awards'].includes(sectionId)) return null // shown in sidebar

          if (sectionId === 'experience' && visibility.experience && experience.length > 0) {
            return (
              <section key="experience" className="mb-7">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-blue-600 inline-block pb-1">Experience</h3>
                <div className="space-y-5 mt-2">
                  {experience.map(exp => (
                    <div key={exp.id}>
                      <h4 className="font-bold text-sm text-gray-900">{exp.position}</h4>
                      <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
                        <span>{exp.company}</span>
                        <span className="shrink-0 ml-2">{exp.startDate}{exp.startDate && ' – '}{exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      {exp.description && <p className="text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'education' && visibility.education && education.length > 0) {
            return (
              <section key="education" className="mb-7">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-blue-600 inline-block pb-1">Education</h3>
                <div className="space-y-4 mt-2">
                  {education.map(edu => (
                    <div key={edu.id}>
                      <h4 className="font-bold text-sm text-gray-900">{edu.degree}{edu.field && ` in ${edu.field}`}</h4>
                      <div className="text-xs text-gray-500 font-medium">{edu.institution}</div>
                      <div className="text-xs text-gray-400">{edu.startDate}{edu.startDate && ' – '}{edu.current ? 'Present' : edu.endDate}{edu.gpa && ` | GPA: ${edu.gpa}`}</div>
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'projects' && visibility.projects && projects.length > 0) {
            return (
              <section key="projects" className="mb-7">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-blue-600 inline-block pb-1">Projects</h3>
                <div className="space-y-5 mt-2">
                  {projects.map(proj => (
                    <div key={proj.id}>
                      <h4 className="font-bold text-sm text-gray-900">
                        {proj.name}
                        {proj.link && <a href={proj.link} className="ml-2 text-xs text-blue-600 font-normal hover:underline">↗ Link</a>}
                      </h4>
                      {proj.technologies && <div className="text-xs text-gray-500 font-medium mb-1">{proj.technologies}</div>}
                      {proj.description && <p className="text-sm text-gray-700">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'publications' && visibility.publications && publications.length > 0) {
            return (
              <section key="publications" className="mb-7">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-blue-600 inline-block pb-1">Publications</h3>
                <div className="space-y-2 mt-2">
                  {publications.map(pub => (
                    <div key={pub.id} className="text-sm">
                      <span className="font-medium text-gray-900">{pub.title}</span>
                      {pub.journal && <span className="text-gray-500 italic"> — {pub.journal}</span>}
                      {pub.year && <span className="text-gray-400"> ({pub.year})</span>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          return null
        })}
      </main>
    </div>
  )
}
