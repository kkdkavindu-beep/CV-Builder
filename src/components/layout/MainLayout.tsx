import { EditorPanel } from '../editor/EditorPanel'
import { PreviewPanel } from '../preview/PreviewPanel'
import { TopBar } from './TopBar'

export function MainLayout() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <TopBar />
      <main id="layout-main" className="flex-1 flex overflow-hidden">
        <aside
          id="editor-sidebar"
          className="w-[42%] min-w-[320px] max-w-[520px] border-r border-border overflow-y-auto bg-card flex-shrink-0"
        >
          <EditorPanel />
        </aside>
        <section className="flex-1 bg-muted/30 overflow-y-auto flex justify-center print:p-0 print:m-0 print:bg-white print:block">
          <PreviewPanel />
        </section>
      </main>
    </div>
  )
}
