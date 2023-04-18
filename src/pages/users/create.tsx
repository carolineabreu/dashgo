import { Box, Button, Divider, Flex, HStack, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

import { Input } from "@/src/components/Form/Input";
import { Header } from "@/src/components/Header";
import { Sidebar } from "@/src/components/Sidebar";
import { useMutation } from "react-query";
import { api } from "@/src/services/api";
import { queryClient } from "@/src/services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória").min(6, "No minímo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf(["", yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("/users", {
        user: {
          ...user,
          created_at: new Date(), // campos do front pro back, envia com _ mesmo que no front seja camelCase
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors, isSubmitting } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values);

    router.push("/users"); // envia o usuário de voltar pra essa página. Seria o mesmo que o navigate do react?
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input label="Nome completo" error={errors.name} {...register("name")} />
              <Input type="email" label="E-mail" error={errors.email} {...register("email")} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="password"
                label="Nome completo"
                error={errors.password}
                {...register("password")}
              />
              <Input
                type="password"
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
