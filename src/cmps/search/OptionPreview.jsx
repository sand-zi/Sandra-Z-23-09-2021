
export const OptionPreview = ({ option, onSelectLocation }) => {

    const optionName = `${option.localizedName} - ${option.country}`

    const selectLocation = () => {
        onSelectLocation(option)
    }

    return (
        <div className="option-preview" key={option.id} onClick={selectLocation}>
            <p>{optionName}</p>
        </div>
    )
}