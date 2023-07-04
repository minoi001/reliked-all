export default function ProductOptions({
  name,
  values,
  selectedOptions,
  setOptions,
}) {
  return (
    <fieldset>
      <legend className="text-md font-semibold">{name}</legend>
      <div className="  items-center inline-flex">
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
                  className={`inline p-2 my-3 text-md cursor-pointer mr-3 ${
                    checked ? "text-white bg-rose" : "text-gray-600 bg-gray-100"
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
