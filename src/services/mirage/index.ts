import { ActiveModelSerializer, Factory, Model, Response, createServer } from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({}),
      /* *para usar o user, sem ter que informar todos os campos. quando for salvar no banco, precisa ter os dados do type User, mas nem todos os campos */
    },
    factories: {
      user: Factory.extend({
        name(i) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },
    seeds(server) {
      server.createList("user", 200);
    },
    routes() {
      this.namespace = "api";
      this.timing = 750; // para que toda chamada demore 750 milisegundos para acontecer (bom pra testar os loadings)

      this.get("/users", function (this: any, schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user")).users.slice(pageStart, pageEnd);

        return new Response(200, { "x-total-count": String(total) }, { users });
      });

      this.post("/users");
      this.get("/users/:id");

      this.namespace = "";
      /* *resetar o namespace pra depois que o mirage terminar de consumir/definir ele volta o namespace para como estava originalmente para não prejudicar as rotas de api que tem dentro do next */
      this.passthrough();
      /* *todas as chamadas que sejam enviadas para "api" passem pelo mirage e se não forem um das rotas que definimos, elas vão passar adiante para a rota original */
    },
  });

  return server;
}
