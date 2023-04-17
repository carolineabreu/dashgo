import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    // sempre que for em string o número, é em formato de espaçamento
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      dashgo
      <Text as="span" ml="1" color="pink.500">
        .
      </Text>
    </Text>
  );
}
