import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Caroline Abreu</Text>
        <Text color="gray.300" fontSize="small">
          carols_a@live.com
        </Text>
      </Box>

      <Avatar size="md" name="Caroline Abreu" />
    </Flex>
  );
}
