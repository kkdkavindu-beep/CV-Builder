import { useCVStore } from '@/store/useCVStore'
import { useUIStore } from '@/store/useUIStore'

export function PersonalInfoForm() {
  const { personalInfo, updatePersonalInfo } = useCVStore()
  const { triggerSaved } = useUIStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updatePersonalInfo({ [e.target.name]: e.target.value })
    triggerSaved()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Full Name</label>
          <input
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Job Title</label>
          <input
            name="jobTitle"
            value={personalInfo.jobTitle}
            onChange={handleChange}
            placeholder="Software Engineer"
            className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
            className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium">Location</label>
          <input
            name="location"
            value={personalInfo.location}
            onChange={handleChange}
            placeholder="New York, NY, USA"
            className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">LinkedIn</label>
          <input
            name="linkedin"
            value={personalInfo.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/janesmith"
            className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">GitHub</label>
          <input
            name="github"
            value={personalInfo.github}
            onChange={handleChange}
            placeholder="github.com/janesmith"
            className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium">Website / Portfolio</label>
          <input
            name="website"
            value={personalInfo.website}
            onChange={handleChange}
            placeholder="https://janesmith.dev"
            className="w-full border border-border rounded-md p-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Professional Summary</label>
        <textarea
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          rows={4}
          placeholder="A brief 2-3 sentence summary highlighting your experience, key skills, and career goals..."
          className="w-full border border-border rounded-md p-2 bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <p className="text-xs text-muted-foreground">{personalInfo.summary.length} characters</p>
      </div>
    </div>
  )
}
