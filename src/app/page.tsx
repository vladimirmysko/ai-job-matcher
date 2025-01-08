import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

import { createStudentAction } from './actions';

export default function HomePage() {
  return (
    <div className="flex w-full max-w-lg flex-col items-stretch gap-6">
      <h2 className="text-xl font-semibold">Создать профиль студента</h2>
      <form
        action={createStudentAction}
        className="flex flex-col items-stretch gap-6"
      >
        <Input name="fullName" placeholder="Ф.И.О." required />
        <Input name="skills" placeholder="Навыки (через запятую)" required />
        <Input name="education" placeholder="Образование" required />
        <Textarea name="experience" placeholder="Опыт" rows={3} required />
        <Button type="submit" className="self-start">
          Создать
        </Button>
      </form>
    </div>
  );
}
