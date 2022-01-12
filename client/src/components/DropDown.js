import Select from 'react-select';

function DropDown({ planets }) {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: '#1DA1F2',
      borderBottom: '1px dotted white',
      color: state.isSelected ? 'black' : 'white',
      padding: 20
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity };
    }
  };

  const options = [];

  planets.map(planet => {
    const planetOptions = {
      value: planet['kepler_name'],
      label: planet['kepler_name']
    };
    return options.push(planetOptions);
  });

  return (
    <>
      <Select styles={customStyles} options={options}></Select>
    </>
  );
}

export default DropDown;
