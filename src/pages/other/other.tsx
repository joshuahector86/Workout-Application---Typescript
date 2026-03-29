import PageLayout from "@/components/page-layout";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OtherActivities = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      title="Other Activities"
      accent="purple"
      onBack={() => navigate("/")}
      subtitle="Cardio + Recreation"
    >
      <div className="flex flex-col items-center justify-center text-center py-24 gap-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Zap size={38} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="display-font text-5xl leading-none text-white mb-2">
            No activities added yet
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Cardio sessions, sports, recreation and more will live here. Content
            for this section is coming soon.
          </p>
        </div>
        <span className="text-xs font-semibold tracking-widest uppercase text-purple-500/60 border border-purple-500/20 px-4 py-2 rounded-full">
          Coming soon
        </span>
      </div>
    </PageLayout>
  );
};

export default OtherActivities;
