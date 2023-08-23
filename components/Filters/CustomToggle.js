import { useToggleRefinement } from "react-instantsearch";

export const CustomToggleRefinement = (props) => {
  const { value, refine } = useToggleRefinement({
    attribute: "inventory_available",
  });

  const handleToggle = () => {
    refine(!value); // Toggle the value and trigger refinement
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value={value}
        className="sr-only peer"
        onChange={handleToggle} // Call handleToggle on checkbox change
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-600"></div>
      <span className="ml-3 text-sm font-medium">In stock</span>
    </label>
  );
};
