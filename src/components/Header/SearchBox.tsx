import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  // controlled components => const [search, setSearch] = useState("") e no input value={search} e onChange (declarativo)
  // uncontrolled components => cost searchInputRef = useRef<HTMLInputElement>(null), no input ref={searchInputRef},
  // para pegar os dados do input searchInputRef.current.value (imperativo)
  return (
    // foi feito o flex como label porque vai ter um icone e um input e se o usuário clicar no icone o input também recebe o foco
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: "gray.400" }}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
