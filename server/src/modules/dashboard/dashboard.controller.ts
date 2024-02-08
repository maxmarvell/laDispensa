import { FastifyReply, FastifyRequest } from "fastify";
import { getDashboard, getDashboardUsers } from "./dashboard.service";


export async function getDashboardHandler(
  request: FastifyRequest<{
    Querystring: {
      lastCursor: string,
      take: string
    }
  }>,
  reply: FastifyReply
) {
  let { lastCursor, take } = request.query;
  // let { id: userId } = request.user;

  try {
    let data = await getDashboard({ lastCursor, take });
    return reply.code(200).send(data);
  } catch (error) {
    console.log(error);
    return reply.code(404);
  };
};


export async function getDashboardUsersHandler(
  request: FastifyRequest<{
    Querystring: {
      take: string
      username: string
    }
  }>,
  reply: FastifyReply
) {
  let { take, username } = request.query;
  let { id: userId } = request.user;

  try {
    let data = await getDashboardUsers({ take, username, userId });
    return reply.code(200).send(data);
  } catch (error) {
    console.log(error);
    return reply.code(404);
  };
};