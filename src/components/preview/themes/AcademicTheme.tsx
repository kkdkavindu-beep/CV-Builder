import { useCVStore } from '@/store/useCVStore'

export function AcademicTheme() {
  const { personalInfo, education, experience, projects, skills, publications, certifications, awards, languages, sectionOrder, visibility } = useCVStore()

  return (
    <div className="p-12 font-serif text-black min-h-full bg-white">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <div className="text-base italic text-gray-600 mb-2">{personalInfo.jobTitle}</div>}
        <div className="text-sm flex flex-wrap justify-center gap-x-3 gap-y-0.5">
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
          <h2 className="text-base font-bold border-b border-black mb-2 pb-0.5 uppercase">Research Interests</h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {sectionOrder.map((sectionId) => {
        if (sectionId === 'education' && visibility.education && education.length > 0) {
          return (
            <section key="education" className="mb-6">
              <h2 className="text-base font-bold border-b border-black mb-3 pb-0.5 uppercase">Education</h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <div className="font-bold">{edu.institution}</div>
                      <div className="text-sm">{edu.degree}{edu.field && `, ${edu.field}`}</div>
                      {edu.gpa && <div className="text-sm text-gray-500">GPA: {edu.gpa}</div>}
                      {edu.description && <div className="text-xs text-gray-500 italic mt-0.5">{edu.description}</div>}
                    </div>
                    <div className="text-sm text-right shrink-0 ml-4">{edu.startDate}{edu.startDate && ' – '}{edu.current ? 'Present' : edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'experience' && visibility.experience && experience.length > 0) {
          return (
            <section key="experience" className="mb-6">
              <h2 className="text-base font-bold border-b border-black mb-3 pb-0.5 uppercase">Academic & Professional Experience</h2>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <div className="font-bold">{exp.position}</div>
                      <div className="text-sm shrink-0 ml-4">{exp.startDate}{exp.startDate && ' – '}{exp.current ? 'Present' : exp.endDate}</div>
                    </div>
                    <div className="italic text-sm mb-1">{exp.company}</div>
                    {exp.description && <p className="text-sm whitespace-pre-line">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'publications' && visibility.publications && publications.length > 0) {
          return (
            <section key="publications" className="mb-6">
              <h2 className="text-base font-bold border-b border-black mb-3 pb-0.5 uppercase">Publications</h2>
              <div className="space-y-3">
                {publications.map((pub, i) => (
                  <div key={pub.id} className="text-sm flex gap-2">
                    <span className="shrink-0 text-gray-500">[{i + 1}]</span>
                    <div>
                      {pub.authors && <span className="text-gray-700">{pub.authors}. </span>}
                      <span className="font-bold">"{pub.title}"</span>
                      {pub.journal && <span className="italic">, {pub.journal}</span>}
                      {pub.year && <span>, {pub.year}</span>}
                      {pub.url && <span>. <a href={pub.url} className="underline">{pub.url}</a></span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'projects' && visibility.projects && projects.length > 0) {
          return (
            <section key="projects" className="mb-6">
              <h2 className="text-base font-bold border-b border-black mb-3 pb-0.5 uppercase">Research Projects</h2>
              <div className="space-y-4">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-bold">{proj.name}</h3>
                      {proj.link && <a href={proj.link} className="text-sm italic text-gray-600 hover:underline">View</a>}
                    </div>
                    {proj.technologies && <div className="italic text-sm mb-1">{proj.technologies}</div>}
                    {proj.description && <p className="text-sm">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'skills' && visibility.skills && skills.length > 0) {
          return (
            <section key="skills" className="mb-6">
              <h2 className="text-base font-bold border-b border-black mb-3 pb-0.5 uppercase">Skills & Competencies</h2>
              <ul className="list-disc list-inside text-sm space-y-0.5 columns-2">
                {skills.map(skill => (
                  <li key={skill.id}>
                    <span className="font-bold">{skill.name}</span>
                    {skill.level && <span> – {skill.level}</span>}
                    {skill.category && <span className="italic text-gray-600"> ({skill.category})</span>}
                  </li>
                ))}
              </ul>
            </section>
          )
        }
        if (sectionId === 'certifications' && visibility.certifications && certifications.length > 0) {
          return (
            <section key="certifications" className="mb-6">
              <h2 className="text-base font-bold border-b border-black mb-3 pb-0.5 uppercase">Certifications</h2>
              <div className="space-y-1 text-sm">
                {certifications.map(cert => (
                  <div key={cert.id}>
                    <span className="font-bold">{cert.name}</span>
                    {cert.issuer && <span>, {cert.issuer}</span>}
                    {cert.date && <span> ({cert.date})</span>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'awards' && visibility.awards && awards.length > 0) {
          return (
            <section key="awards" className="mb-6">
              <h2 className="text-base font-bold border-b border-black mb-3 pb-0.5 uppercase">Awards & Honours</h2>
              <div className="space-y-2 text-sm">
                {awards.map(award => (
                  <div key={award.id} className="flex justify-between">
                    <div>
                      <span className="font-bold">{award.title}</span>
                      {award.organization && <span>, {award.organization}</span>}
                    </div>
                    {award.year && <span className="shrink-0 ml-4">{award.year}</span>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        if (sectionId === 'languages' && visibility.languages && languages.length > 0) {
          return (
            <section key="languages" className="mb-6">
              <h2 className="text-base font-bold border-b border-black mb-3 pb-0.5 uppercase">Languages</h2>
              <div className="text-sm flex flex-wrap gap-x-5">
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
