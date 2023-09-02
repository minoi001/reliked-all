import { useToggleRefinement } from "react-instantsearch";

export const CustomToggleRefinement = (props) => {
  const { value, refine } = useToggleRefinement({
    attribute: "inventory_available",
  });

  const handleToggle = () => {
    console.log("8888", value.isRefined);
    refine(value); // Toggle the value and trigger refinement
  };

  return (
    <div className="absolute bg-cream rounded-none p-4 overflow-auto min-h-min w-130px">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          value={value}
          onChange={handleToggle}
          className="h-4 w-4 bg-taupe focus:ring-rose flex items-center space-x-2"
          style={{
            backgroundColor: value.isRefined ? "#EC516B" : "",
          }}
        />
        <span
          className="ml-3 font-medium"
          style={{ fontWeight: value.isRefined ? "bold" : "" }}
        >
          In stock
        </span>
      </label>
    </div>
  );
};
