import {Box, Wrap, WrapItem} from "@chakra-ui/react";

interface ColorPickerProps {
  colors: string[]; // Available colors
  selectedColor: string;
  onColorSelect: (color: string) => void;
  id?: string; // for label
  name?: string;
}

const ColorPicker = ({ colors, selectedColor, onColorSelect, id = "", name = "" }: ColorPickerProps) => {
  return (
    <Wrap direction="row" spacing={2}>
      {/* Hidden input to hold the value and satisfy form requirements */}
      <input
        type="hidden"
        id={id}
        name={name || id}
        value={selectedColor}
        readOnly
      />

      {colors.map((color) => (
        <WrapItem key={color}>
          <Box
            boxShadow="dark-lg"
            bg={color}
            border={selectedColor === color ? "2px solid teal" : "1px solid gray"}
            onClick={() => onColorSelect(color)}
            borderRadius="full"
            boxSize="2rem"
            title={`Select ${color}`}
            cursor="pointer" // Add cursor for better UX
          />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default ColorPicker;