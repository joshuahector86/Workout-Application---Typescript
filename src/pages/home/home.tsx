import ActivityCard from "@/components/activity-card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Hero header */}
      <div className="max-w-3xl mx-auto w-full px-4 pt-14 pb-8 border-b border-zinc-800">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-zinc-500 mb-2">
              Your fitness hub
            </p>
            <h1 className="display-font text-6xl sm:text-7xl leading-[0.9] text-white">
              Workout
              <br />
              <span className="text-lime-300">Navigator</span>
            </h1>
          </div>
          <div className="text-right pt-1">
            <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">
              Tracks
            </p>
            <p className="display-font text-4xl text-lime-300 leading-none">
              3
            </p>
          </div>
        </div>
        <p className="mt-5 text-zinc-400 text-sm max-w-lg">
          Choose your mode for today. Each track keeps a consistent visual
          rhythm and focused flow.
        </p>
      </div>

      {/* Activity grid */}
      <div className="max-w-3xl mx-auto w-full px-4 pb-16 pt-6 grid grid-cols-1 gap-1.5">
        <ActivityCard
          variant="weightTraining"
          onClick={() => navigate("/weight-training")}
        />
        <ActivityCard
          variant="mobility"
          onClick={() => navigate("/mobility")}
        />
        <ActivityCard variant="other" onClick={() => navigate("/other")} />
      </div>
    </div>
  );
};

export default Home;
