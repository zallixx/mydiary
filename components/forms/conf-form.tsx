import { OTPFormOnSubmit, OTPFormSchema } from "@/components/zod-schemas/forms/otp-schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ConfForm() {
    const DefinedOTPForm = useForm<z.infer<typeof OTPFormSchema>>({
        resolver: zodResolver(OTPFormSchema),
        defaultValues: {
            otp: '',
        },
    });

    async function handleOtpChange(value: string) {
        DefinedOTPForm.setValue('otp', value);
        if (value.length === 6) {
            await OTPFormOnSubmit(value, DefinedOTPForm);
        }
    }

    return (
        <div>
            <Form {...DefinedOTPForm}>
                <form>
                    <div>
                        <FormField
                            name={'otp'}
                            control={DefinedOTPForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Код</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS} onChange={(value) => {
                                            handleOtpChange(value)
                                        }}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
}