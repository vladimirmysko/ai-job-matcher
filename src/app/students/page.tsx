import { prisma } from '@/lib/prisma';

export default async function StudentsPage() {
  const students = await prisma.student.findMany({ orderBy: { id: 'desc' } });

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-6">
      <h2 className="text-xl font-semibold">Студенты</h2>
      <ul className="flex flex-col items-stretch divide-y divide-neutral-200">
        {students.map((student) => (
          <li className="flex flex-col items-stretch py-4" key={student.id}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
