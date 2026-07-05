import { useCVStore } from '@/store/useCVStore'
import { ModernTheme } from './themes/ModernTheme'
import { AcademicTheme } from './themes/AcademicTheme'
import { CorporateTheme } from './themes/CorporateTheme'
import { MinimalTheme } from './themes/MinimalTheme'
import { ExecutiveTheme } from './themes/ExecutiveTheme'
import { CreativeTheme } from './themes/CreativeTheme'
import { ATSTheme } from './themes/ATSTheme'
import { StartupTheme } from './themes/StartupTheme'

export function PreviewPanel() {
  const { theme } = useCVStore()
  
  const renderTheme = () => {
    switch (theme) {
      case 'modern': return <ModernTheme />
      case 'academic': return <AcademicTheme />
      case 'corporate': return <CorporateTheme />
      case 'minimal': return <MinimalTheme />
      case 'executive': return <ExecutiveTheme />
      case 'creative': return <CreativeTheme />
      case 'ats': return <ATSTheme />
      case 'startup': return <StartupTheme />
      default: return <ModernTheme />
    }
  }

  return (
    <div className="flex justify-center w-full my-8 print:m-0 print:w-full print:block">
      <div 
        className="bg-white shadow-xl rounded overflow-hidden"
        style={{
          width: '210mm',
          minHeight: '297mm',
          boxSizing: 'border-box'
        }}
        id="cv-preview"
      >
        {renderTheme()}
      </div>
    </div>
  )
}
