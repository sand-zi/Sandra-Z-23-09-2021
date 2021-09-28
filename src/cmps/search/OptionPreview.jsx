import { useSelector } from 'react-redux'
export const OptionPreview = ({ option, onSelectLocation }) => {
    const { isDarkMode } = useSelector(state => state.weatherModule)
    const optionName = `${option.localizedName} - ${option.country}`

    const selectLocation = () => {
        onSelectLocation(option)
    }

    return (
        <div className={`option-preview ${isDarkMode ? 'dark' : ''}`} key={option.id} onClick={selectLocation}>
            <p>{optionName}</p>
        </div>
    )
}