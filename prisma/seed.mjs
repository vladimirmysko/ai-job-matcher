import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const students = [
    {
      fullName: 'Роман Петров',
      skills: 'JavaScript, React, Node.js, TypeScript',
      education: 'Бакалавр компьютерных наук',
      experience: '2 года опыта разработки фронтенда',
    },
    {
      fullName: 'Айжан Нурланова',
      skills: 'Python, Django, SQL, AWS',
      education: 'Магистр программной инженерии',
      experience: '3 года в качестве full-stack разработчика',
    },
    {
      fullName: 'Алексей Иванов',
      skills: 'Java, Spring Boot, PostgreSQL, Docker',
      education: 'Бакалавр программной инженерии',
      experience: '1 год стажировки по разработке бэкенда',
    },
  ];

  const jobs = [
    {
      title: 'Фронтенд разработчик',
      company: 'Tech Solutions Inc.',
      description: 'Ищем разработчика React для присоединения к нашей команде',
      skills: 'React, TypeScript, HTML, CSS',
    },
    {
      title: 'Full Stack инженер',
      company: 'Digital Innovations',
      description: 'Роль full stack с акцентом на Python backend',
      skills: 'Python, Django, JavaScript, AWS',
    },
    {
      title: 'Бэкенд разработчик',
      company: 'Enterprise Systems',
      description: 'Требуется Java разработчик для корпоративных приложений',
      skills: 'Java, Spring Boot, PostgreSQL, Микросервисы',
    },
    {
      title: 'DevOps инженер',
      company: 'Cloud Services Ltd.',
      description:
        'Ищем DevOps инженера для управления облачной инфраструктурой',
      skills: 'AWS, Docker, Kubernetes, Terraform',
    },
    {
      title: 'Data Scientist',
      company: 'Analytics Corp.',
      description: 'Требуется Data Scientist для анализа больших данных',
      skills: 'Python, R, SQL, Machine Learning',
    },
    {
      title: 'Mobile разработчик',
      company: 'App Creators',
      description: 'Ищем разработчика для создания мобильных приложений',
      skills: 'Kotlin, Swift, React Native, Flutter',
    },
    {
      title: 'Системный администратор',
      company: 'IT Solutions',
      description:
        'Требуется системный администратор для поддержки IT инфраструктуры',
      skills: 'Linux, Windows Server, Networking, Scripting',
    },
  ];

  await Promise.all([prisma.student.deleteMany(), prisma.job.deleteMany()]);

  await Promise.all([
    prisma.student.createMany({ data: students }),
    prisma.job.createMany({ data: jobs }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
