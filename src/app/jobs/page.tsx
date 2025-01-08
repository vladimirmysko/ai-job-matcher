import { prisma } from '@/lib/prisma';

export default async function StudentsPage() {
  const jobs = await prisma.job.findMany();

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-6">
      <h2 className="text-xl font-semibold">Вакансии</h2>
      <ul className="flex flex-col items-stretch divide-y divide-neutral-200">
        {jobs.map((job) => (
          <li className="flex flex-col items-stretch py-4" key={job.id}>
            <dl className="grid grid-cols-2">
              <dt className="py-2 text-sm text-neutral-600">Вакансия</dt>
              <dd className="py-2 text-sm">{job.title}</dd>
              <dt className="py-2 text-sm text-neutral-600">Компания</dt>
              <dd className="py-2 text-sm">{job.company}</dd>
              <dt className="py-2 text-sm text-neutral-600">Навыки</dt>
              <dd className="py-2 text-sm">{job.skills}</dd>
              <dt className="py-2 text-sm text-neutral-600">Описание</dt>
              <dd className="py-2 text-sm">{job.description}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
