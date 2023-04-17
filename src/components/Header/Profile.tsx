import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Caroline Abreu</Text>
          <Text color="gray.300" fontSize="small">
            carols_a@live.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Caroline Abreu" />
    </Flex>
  );
}
