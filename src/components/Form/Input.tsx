import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";

interface InputProps extends ChakraInputProps {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <FormControl>
        {!!label && <FormLabel htmlFor={props.name}>{label}</FormLabel>}

        <ChakraInput
          {...props}
          id={props.name}
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: "gray.900",
          }}
          size="lg"
          ref={ref}
        />
      </FormControl>
    );
  }
);
