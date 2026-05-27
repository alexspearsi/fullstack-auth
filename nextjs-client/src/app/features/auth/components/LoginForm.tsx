'use client'

import { AuthWrapper } from './AuthWrapper';
import { LoginSchema, TypeLoginSchema } from '../schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/Form';
import { Button, Input } from '@/shared/components/ui';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { toast } from 'sonner';
import ReCAPTCHA from 'react-google-recaptcha';

export function LoginForm() {
  const { resolvedTheme } = useTheme()
  const [ recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit = (values: TypeLoginSchema) => {
    if (recaptchaValue) {
      console.log(values)
    } else {
      toast.error('Пожалуйста, завершите reCAPTCHA')
    }
  }

  return (
    <AuthWrapper
      heading='Войти'
      description='Чтобы войти на сайт введите ваш email и пароль'
      backButtonLabel='Еще нет аккаунта? Регистрация'
      backButtonHref='/auth/register'
      isShowSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-2"
        >
         <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Иван" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
         /> 
         <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ivan@example.com"
                    type="email" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
         /> 
         <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="******"
                    type="password" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
         />
          <div className='flex justify-center'>
            <ReCAPTCHA
              key={resolvedTheme}
              sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
              onChange={setRecaptchaValue}
              theme={resolvedTheme === 'light' ? 'light' : 'dark'}
            />
         </div>
         <Button type="submit">Войти в аккаунт</Button>
        </form>
      </Form>
    </AuthWrapper>
  )
}