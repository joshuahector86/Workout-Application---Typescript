import DayDisplay from "../day/day-display";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-3xl">
        <p>Workout Application</p>
      </h1>
      <DayDisplay />
    </div>
  );
};

export default Home;
