import { useState } from 'react';
import Select, { StylesConfig, ThemeConfig } from 'react-select';

interface SingleSelectOptions {
  styles?: StylesConfig;
  theme?: ThemeConfig;
}

function uppercaseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function useSingleSelect<Type extends string | number>(
  initialValue: Type,
  selections: Type[],
  options?: SingleSelectOptions
): [Type, JSX.Element] {
  const [selected, setSelected] = useState(initialValue);

  const selectOptions = selections.map((selection: Type) => ({
    label: uppercaseFirstLetter(selection.toString()),
    value: selection,
  }));

  const SelectElement = (
    <Select
      options={selectOptions}
      defaultValue={{
        label: uppercaseFirstLetter(initialValue.toString()),
        value: initialValue,
      }}
      isSearchable={false}
      theme={options?.theme}
      styles={options?.styles}
      onChange={({ value }) => {
        setSelected(value);
      }}
    />
  );

  return [selected, SelectElement];
}
