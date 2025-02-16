import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEventFormOnSubmit, CreateEventFormSchema } from '@/components/zod-schemas/forms/create-event-schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Button } from '@/components/ui/button';

const daysOfWeek = [
    { label: "Пн", value: "mon" },
    { label: "Вт", value: "tue" },
    { label: "Ср", value: "wed" },
    { label: "Чт", value: "thu" },
    { label: "Пт", value: "fri" },
    { label: "Сб", value: "sat" },
    { label: "Вс", value: "sun" },
];

export default function CreateEventForm() {
    const DefinedCreateEventModal = useForm<z.infer<typeof CreateEventFormSchema>>({
        resolver: zodResolver(CreateEventFormSchema),
        defaultValues: {
            name: '',
            description: '',
            startTime: '',
            endTime: '',
            place: '',
            date: new Date(),
            recurrence: 'none',
            selectedDays: [],
        },
    });

    return (
        <>
            <Form {...DefinedCreateEventModal}>
                <form className="grid gap-4" onSubmit={DefinedCreateEventModal.handleSubmit((data) => CreateEventFormOnSubmit(data))}>
                    <div className="grid gap-2">
                        <FormField
                            control={DefinedCreateEventModal.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-white"
                                            placeholder={'Название мероприятия'}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={DefinedCreateEventModal.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Дата</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className="w-full justify-start text-left bg-white">
                                                    {format(field.value, "PPP", { locale: ru })}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                                weekStartsOn={1}
                                                fixedWeeks
                                                locale={ru}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                                <FormField
                                    control={DefinedCreateEventModal.control}
                                    name="startTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Время начала</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    className="bg-white"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="relative">
                                <FormField
                                    control={DefinedCreateEventModal.control}
                                    name="endTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Время конца</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    className="bg-white"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={DefinedCreateEventModal.control}
                            name="recurrence"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Периодичность</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="bg-white">
                                                <SelectValue placeholder="Выберите периодичность" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">Без повторения</SelectItem>
                                                <SelectItem value="daily">Ежедневно</SelectItem>
                                                <SelectItem value="weekly">Еженедельно</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={DefinedCreateEventModal.control}
                            name="selectedDays"
                            render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel>Выберите дни повторения:</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-wrap gap-2 bg-white">
                                            {daysOfWeek.map((day) => (
                                                <Button
                                                    key={day.value}
                                                    variant={field.value.includes(day.value) ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => field.onChange(
                                                        field.value.includes(day.value)
                                                            ? field.value.filter(d => d !== day.value)
                                                            : [...field.value, day.value]
                                                    )}
                                                    type="button"
                                                >
                                                    {day.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={DefinedCreateEventModal.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Описание</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className="bg-white"
                                            placeholder={'Описание мероприятия'}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={DefinedCreateEventModal.control}
                            name="place"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Местоположение</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-white"
                                            placeholder={'Местоположение мероприятия'}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Создать
                    </Button>
                </form>
            </Form>
        </>
    );
}