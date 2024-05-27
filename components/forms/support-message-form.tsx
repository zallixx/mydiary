import { SupportMessageFormOnSubmit, SupportMessageSchema } from '@/components/forms/schemas/support-schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SupportMessageFormComponent() {
    const DefinedSupportForm = useForm<z.infer<typeof SupportMessageSchema>>({
    resolver: zodResolver(SupportMessageSchema),
    defaultValues: {
        city: "",
        topic: "",
        description: "",
    }
});

    return (
        <Form {...DefinedSupportForm}>
            <form onSubmit={DefinedSupportForm.handleSubmit(SupportMessageFormOnSubmit)}>
                <div>
                    <FormField name={"city"} control={DefinedSupportForm.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Город</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Введите ваш город" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <div>
                    <FormField name={"topic"} control={DefinedSupportForm.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Тема проблемы</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Введите тему проблемы" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <div>
                    <FormField name={"description"} control={DefinedSupportForm.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Описание проблемы</FormLabel>
                            <FormControl>
                                <Textarea {...field} className="max-h-[200px]" placeholder="Опишите вашу проблему" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <Button className="mt-3 ml-auto flex" type="submit">Отправить</Button>
            </form>
        </Form>
    );
}