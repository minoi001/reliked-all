export default function ProductOptions({
  name,
  values,
  selectedOptions,
  setOptions,
}) {
  const handleSelectChange = (event, name) => {
    setOptions(name, event.target.value); // Update the state with the selected value
  };
  return (
    // need to make a grid
    <fieldset className="flex border border-cream p-2 m-2 ml-0">
      <legend className="text-sm font-semibold col-span-1 px-1">
        {name.toUpperCase()}
      </legend>
      <div className="items-center">
        {values.length <= 1 ? (
          values.map((value) => {
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
                      // console.log(name, value);
                      setOptions(name, value);
                    }}
                  />
                  <div className={`inline text-md mr-3 text-almostBlack`}>
                    <span className="inline px-2">{value}</span>
                  </div>
                </label>
              </div>
            );
          })
        ) : (
          <select
            name={name}
            id={name}
            value={selectedOptions.name}
            onChange={(e) => handleSelectChange(e, name)}
            className="border-none py-0 ring-0 focus:ring-0"
          >
            {values.map((value) => {
              const id = `option-${name}-${value}`;
              const checked = selectedOptions[name] === value;
              return (
                <option
                  key={id}
                  name={`option-${name}`}
                  id={id}
                  value={value}
                  checked={checked}
                >
                  {value}
                </option>
              );
            })}
          </select>
        )}
      </div>
    </fieldset>
  );
}
