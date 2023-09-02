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
        onChange={handleToggle} // Call handleToggle on checkbox change
      />
      <span className="ml-3 text-sm font-medium">In stock</span>
    </label>
  );
};
