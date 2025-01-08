'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

const createStudentSchema = z.object({
  fullName: z.string(),
  skills: z.string(),
  education: z.string(),
  experience: z.string(),
});

export async function createStudentAction(formData: FormData) {
  const { fullName, skills, education, experience } = createStudentSchema.parse(
    Object.fromEntries(formData),
  );

  const student = await prisma.student.create({
    data: {
      fullName,
      skills,
      education,
      experience,
    },
  });

  redirect(`/matches/${student.id}`);
}
