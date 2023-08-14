
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getrecognitions = async (_: Request, res: Response) => {
  try {
    const recognitions = await prisma.recognitions.findMany();
    res.status(200).json({ success: true, data: recognitions });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

export const getrecognitionsByTeamId = async (req: Request, res: Response) => {
  const teamId = req.params.team_id;

  try {
    const recognitions = await prisma.recognitions.findMany({
      where: {
        team_id: teamId,
      },
    });
    res.status(200).json({ success: true, data: recognitions});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};
