import DayDropdown from "../day/day-dropdown";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl">Dimitri Hector Workout Application</h1>

      <DayDropdown />
    </div>
  );
};

export default Home;
