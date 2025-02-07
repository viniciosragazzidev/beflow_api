import { Profile } from "@prisma/client";
import { FastifyTypeInstance } from "../types";
import {
  listProfileByUserId,
  listProfileByUsername,
  listProfiles,
  registerProfile,
} from "../usecases/profile.usecases";

export default async function profileRoutes(fastify: FastifyTypeInstance) {
  fastify.get(
    "/profiles",
    {
      schema: {
        description: "List all profiles",
        tags: ["profiles"],
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                username: { type: "string" },
                email: { type: "string" },
                userId: { type: "string" },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const profiles = await listProfiles();
        reply.send(profiles);
      } catch (error) {
        console.log(error);
        reply.status(500).send({ error: "Internal server error" });
      }
    }
  );

  fastify.get(
    "/profiles/:userId",

    async (request, reply) => {
      try {
        const { userId } = request.params as { userId: string };
        const profile = await listProfileByUserId(userId);
        reply.send(profile);
      } catch (error) {
        console.log(error);
        reply.status(500).send({ error: "Internal server error" });
      }
    }
  );

  fastify.get("/profile/:username", async (request, reply) => {
    try {
      const { username } = request.params as { username: string };
      const profile = await listProfileByUsername(username);
      reply.send(profile);
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error: "Internal server error" });
    }
  });

  fastify.post(
    "/profile",

    async (request, reply) => {
      try {
        const data = request.body as Omit<Profile, "id">;
        const profile = await registerProfile({ data });
        reply.status(201).send(profile);
      } catch (error) {
        console.log(error);
        reply.status(500).send({ error: "Internal server error" });
      }
    }
  );
}
