import React from 'react'
import RegisterForm from '@/components/ui/authUI/RegisterForm'
import AuthLayout from '@/components/ui/authUI/AuthLayout'

export default function Register() {
 return <AuthLayout
      title="Create your account" 
      subtitle="Start tracking applications and organize your job search today."
    >
     <RegisterForm />
    </AuthLayout>
}
