export default function ProductOptions({
  name,
  values,
  selectedOptions,
  setOptions,
}) {
  return (
    // need to make a grid
    <fieldset className="flex border border-cream p-2 m-2 ml-0">
      <legend className="text-md font-semibold col-span-1 px-1">{name}</legend>
      <div className="items-center">
        {values.map((value) => {
          const id = `option-${name}-${value}`;
          const checked = selectedOptions[name] === value;
          return (
            <div key={id} className="inline">
              <label key={id} htmlFor={id} className="inline">
                <input
                  className="sr-only inline"
                  type="radio"
                  id={id}
                  name={`option-${name}`}
                  value={value}
                  checked={checked}
                  onChange={() => {
                    setOptions(name, value);
                  }}
                />
                <div
                  className={`inline text-md mr-3 ${
                    checked ? "text-almostBlack" : "text-gray-600 bg-gray-100"
                  }`}
                >
                  <span className="inline px-2">{value}</span>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
