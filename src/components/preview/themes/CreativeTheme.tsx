import { useCVStore } from '@/store/useCVStore'

export function CreativeTheme() {
  const { personalInfo, education, experience, projects, skills, publications, certifications, awards, languages, sectionOrder, visibility } = useCVStore()

  return (
    <div className="flex min-h-full font-sans bg-white overflow-hidden text-gray-800">
      {/* Sidebar */}
      <aside className="w-[36%] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-8 shrink-0">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight leading-tight mb-1">
            {(personalInfo.fullName || 'Your Name').split(' ').map((name, i) => (
              <span key={i} className="block">{name}</span>
            ))}
          </h1>
          {personalInfo.jobTitle && <p className="text-white/70 text-sm font-medium mt-2">{personalInfo.jobTitle}</p>}
        </div>

        <div className="space-y-6 text-sm">
          {(personalInfo.email || personalInfo.phone || personalInfo.location) && (
            <div>
              <h3 className="font-bold text-white/60 uppercase tracking-widest text-xs mb-2">Contact</h3>
              <div className="space-y-1 font-medium">
                {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                {personalInfo.location && <div>{personalInfo.location}</div>}
              </div>
            </div>
          )}

          {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
            <div>
              <h3 className="font-bold text-white/60 uppercase tracking-widest text-xs mb-2">Web</h3>
              <div className="space-y-1 font-medium break-all">
                {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
                {personalInfo.github && <div>{personalInfo.github}</div>}
                {personalInfo.website && <div>{personalInfo.website}</div>}
              </div>
            </div>
          )}

          {visibility.skills && skills.length > 0 && (
            <div>
              <h3 className="font-bold text-white/60 uppercase tracking-widest text-xs mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill.id} className="bg-white/20 backdrop-blur px-2.5 py-1 rounded-full text-xs font-semibold">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {visibility.languages && languages.length > 0 && (
            <div>
              <h3 className="font-bold text-white/60 uppercase tracking-widest text-xs mb-2">Languages</h3>
              <div className="space-y-1 font-medium">
                {languages.map(lang => (
                  <div key={lang.id} className="flex justify-between text-xs">
                    <span>{lang.name}</span>
                    <span className="text-white/60">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {visibility.certifications && certifications.length > 0 && (
            <div>
              <h3 className="font-bold text-white/60 uppercase tracking-widest text-xs mb-2">Certifications</h3>
              <div className="space-y-1 text-xs font-medium">
                {certifications.map(cert => (
                  <div key={cert.id}>
                    <div>{cert.name}</div>
                    {cert.issuer && <div className="text-white/60">{cert.issuer}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {visibility.awards && awards.length > 0 && (
            <div>
              <h3 className="font-bold text-white/60 uppercase tracking-widest text-xs mb-2">Awards</h3>
              <div className="space-y-1 text-xs font-medium">
                {awards.map(award => (
                  <div key={award.id}>
                    <div>{award.title}</div>
                    {award.organization && <div className="text-white/60">{award.organization}{award.year && ` · ${award.year}`}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50 overflow-auto">
        {personalInfo.summary && (
          <section className="mb-9">
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">Profile</h2>
            <p className="text-gray-700 leading-relaxed text-sm">{personalInfo.summary}</p>
          </section>
        )}

        {sectionOrder.map((sectionId) => {
          if (['skills', 'languages', 'certifications', 'awards'].includes(sectionId)) return null

          if (sectionId === 'experience' && visibility.experience && experience.length > 0) {
            return (
              <section key="experience" className="mb-9">
                <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">Experience</h2>
                <div className="space-y-6">
                  {experience.map(exp => (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-indigo-200">
                      <div className="absolute w-2 h-2 bg-indigo-500 rounded-full -left-[5px] top-1.5" />
                      <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                      <div className="text-xs font-semibold text-gray-500 mb-1.5">{exp.company}{exp.startDate && ` · ${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}`}</div>
                      {exp.description && <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'education' && visibility.education && education.length > 0) {
            return (
              <section key="education" className="mb-9">
                <h2 className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-4">Education</h2>
                <div className="space-y-5">
                  {education.map(edu => (
                    <div key={edu.id} className="relative pl-4 border-l-2 border-pink-200">
                      <div className="absolute w-2 h-2 bg-pink-500 rounded-full -left-[5px] top-1.5" />
                      <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                      <div className="text-xs font-semibold text-gray-500">{edu.institution}{edu.field && ` · ${edu.field}`}</div>
                      <div className="text-xs text-gray-400">{edu.startDate}{edu.startDate && ' – '}{edu.current ? 'Present' : edu.endDate}{edu.gpa && ` · GPA: ${edu.gpa}`}</div>
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'projects' && visibility.projects && projects.length > 0) {
            return (
              <section key="projects" className="mb-9">
                <h2 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-4">Projects</h2>
                <div className="grid grid-cols-1 gap-3">
                  {projects.map(proj => (
                    <div key={proj.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                        {proj.link && <a href={proj.link} className="text-xs text-indigo-500 hover:underline shrink-0 ml-2">↗</a>}
                      </div>
                      {proj.technologies && <div className="text-xs font-bold text-purple-500 mt-0.5 mb-1.5">{proj.technologies}</div>}
                      {proj.description && <p className="text-xs text-gray-500">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )
          }
          if (sectionId === 'publications' && visibility.publications && publications.length > 0) {
            return (
              <section key="publications" className="mb-9">
                <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">Publications</h2>
                <div className="space-y-2">
                  {publications.map(pub => (
                    <div key={pub.id} className="text-sm bg-white p-3 rounded-lg border border-gray-100">
                      <span className="font-semibold text-gray-900">{pub.title}</span>
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
