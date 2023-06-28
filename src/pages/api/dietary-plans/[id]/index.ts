import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { dietaryPlanValidationSchema } from 'validationSchema/dietary-plans';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.dietary_plan
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDietaryPlanById();
    case 'PUT':
      return updateDietaryPlanById();
    case 'DELETE':
      return deleteDietaryPlanById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDietaryPlanById() {
    const data = await prisma.dietary_plan.findFirst(convertQueryToPrismaUtil(req.query, 'dietary_plan'));
    return res.status(200).json(data);
  }

  async function updateDietaryPlanById() {
    await dietaryPlanValidationSchema.validate(req.body);
    const data = await prisma.dietary_plan.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDietaryPlanById() {
    const data = await prisma.dietary_plan.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
