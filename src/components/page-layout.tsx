import { ChevronLeft } from "lucide-react";

export type Accent = "red" | "cyan" | "purple" | "none";

interface PageLayoutProps {
  title: string;
  accent?: Accent;
  onBack?: () => void;
  subtitle?: string;
  children: React.ReactNode;
}

const accentMap: Record<
  Accent,
  { text: string; border: string; button: string }
> = {
  red: {
    text: "text-red-400",
    border: "border-red-500/40",
    button: "hover:text-red-400 hover:bg-red-500/10",
  },
  cyan: {
    text: "text-cyan-400",
    border: "border-cyan-500/40",
    button: "hover:text-cyan-400 hover:bg-cyan-500/10",
  },
  purple: {
    text: "text-purple-400",
    border: "border-purple-500/40",
    button: "hover:text-purple-400 hover:bg-purple-500/10",
  },
  none: {
    text: "text-white",
    border: "border-zinc-800",
    button: "hover:text-white hover:bg-white/5",
  },
};

const PageLayout = ({
  title,
  accent = "none",
  onBack,
  subtitle,
  children,
}: PageLayoutProps) => {
  const colors = accentMap[accent];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <header
        className={`sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md border-b ${colors.border}`}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className={`flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 transition-colors ${colors.button}`}
              aria-label="Go back"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <div className="flex-1 min-w-0">
            <h1 className={`display-font text-3xl leading-none ${colors.text}`}>
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] tracking-[0.18em] uppercase text-zinc-500 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 border border-zinc-800 px-2.5 py-1 rounded-md">
            Program
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
