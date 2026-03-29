import PageLayout from "@/components/page-layout";
import { PersonStanding } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Mobility = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      title="Mobility"
      accent="cyan"
      onBack={() => navigate("/")}
      subtitle="Recovery + Range"
    >
      <div className="flex flex-col items-center justify-center text-center py-24 gap-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <PersonStanding size={38} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="display-font text-5xl leading-none text-white mb-2">
            No sessions scheduled yet
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Mobility sessions will appear here. Check back soon as more content
            is added to your routine.
          </p>
        </div>
        <span className="text-xs font-semibold tracking-widest uppercase text-cyan-500/60 border border-cyan-500/20 px-4 py-2 rounded-full">
          Coming soon
        </span>
      </div>
    </PageLayout>
  );
};

export default Mobility;
