import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { prisma } from '@/lib/prisma';
import { Student, Job } from '@prisma/client';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
});

async function matchJobs(student: Student, jobs: Job[]) {
  const jobDescriptions = jobs
    .map((job) => `${job.id} - ${job.title} - ${job.skills}`)
    .join('\n');

  const prompt = `
    Given a student with the following skills: ${student.skills}
    And the following job listings:
    ${jobDescriptions}

    Provide the IDs of the top 2 job matches for this student, separated by commas.
    Only return the job IDs, nothing else.
  `;

  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: prompt,
    });

    const matchedJobIds = text.split(',').map((id) => parseInt(id.trim()));
    return jobs.filter((job) => matchedJobIds.includes(job.id));
  } catch (error) {
    console.error('Error in AI matching:', error);
    return jobs
      .filter((job) => student.skills.includes(job.skills))
      .slice(0, 2);
  }
}

export default async function MatchesPage({
  params,
}: Readonly<{
  params: Promise<{ studentId: string }>;
}>) {
  const { studentId } = await params;

  const [student, jobs] = await Promise.all([
    prisma.student.findUnique({ where: { id: Number(studentId) } }),
    prisma.job.findMany(),
  ]);

  if (!student) {
    return <div>Студент не найден</div>;
  }

  const matchedJobs = await matchJobs(student, jobs);

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-6">
      <h2 className="text-xl font-semibold">Подходящие вакансии</h2>
      <div className="flex flex-col items-stretch gap-2">
        <h3 className="text-base font-semibold">Студент</h3>
        <dl className="grid grid-cols-2">
          <dt className="py-2 text-sm text-neutral-600">ID</dt>
          <dd className="py-2 text-sm">{student.id}</dd>
          <dt className="py-2 text-sm text-neutral-600">Ф.И.О.</dt>
          <dd className="py-2 text-sm">{student.fullName}</dd>
          <dt className="py-2 text-sm text-neutral-600">Навыки</dt>
          <dd className="py-2 text-sm">{student.skills}</dd>
          <dt className="py-2 text-sm text-neutral-600">Опыт работы</dt>
          <dd className="py-2 text-sm">{student.experience}</dd>
        </dl>
      </div>

      <div className="flex flex-col items-stretch gap-2">
        <h3 className="text-base font-semibold">Вакансии</h3>
        <ul className="flex flex-col items-stretch divide-y divide-neutral-200">
          {matchedJobs.map((job) => (
            <li className="flex flex-col items-stretch py-4" key={job.id}>
              <dl className="grid grid-cols-2">
                <dt className="py-2 text-sm text-neutral-600">Название</dt>
                <dd className="py-2 text-sm">{job.title}</dd>
                <dt className="py-2 text-sm text-neutral-600">Навыки</dt>
                <dd className="py-2 text-sm">{job.skills}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
