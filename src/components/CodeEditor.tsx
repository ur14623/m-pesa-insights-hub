import { Textarea } from '@/components/ui/textarea';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
}

export function CodeEditor({ value, onChange, readOnly = false, placeholder }: CodeEditorProps) {
  return (
    <div className="relative">
      <div className="absolute top-3 left-4 flex items-center gap-2 pointer-events-none">
        <div className="w-3 h-3 rounded-full bg-destructive/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-primary/80" />
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder || "// Write your Playwright test code here..."}
        className="code-editor min-h-[400px] pt-10 px-4 pb-4 resize-none font-mono text-sm leading-relaxed placeholder:text-muted-foreground/50"
        spellCheck={false}
      />
    </div>
  );
}
