import { OptionPreview } from "./OptionPreview";

export const OptionList = ({ options, onSelectLocation }) => {
  return (
    <div className="option-list flex column auto-center">
      {options.map((option) => (
        <OptionPreview
          option={option}
          key={option.locationId}
          onSelectLocation={onSelectLocation}
        />
      ))}
    </div>
  );
};
