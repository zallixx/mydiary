import { SupportMessageFormOnSubmit, SupportMessageSchema } from '@/components/zod-schemas/forms/support-schema';
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

interface SupportMessageFormComponentProps {
    handleChange: () => void;
}

export default function SupportMessageFormComponent({handleChange}: SupportMessageFormComponentProps) {
    const DefinedSupportForm = useForm<z.infer<typeof SupportMessageSchema>>({
        resolver: zodResolver(SupportMessageSchema),
        defaultValues: {
            city: "",
            problemName: "",
            problemDescription: "",
            handleChange: handleChange,
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
                    <FormField name={"problemName"} control={DefinedSupportForm.control}
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
                    <FormField name={"problemDescription"} control={DefinedSupportForm.control}
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
                <Button className="mt-3 ml-auto flex" type="submit" disabled={DefinedSupportForm.formState.isSubmitSuccessful || DefinedSupportForm.formState.isSubmitting}>Отправить</Button>
            </form>
        </Form>
    );
}