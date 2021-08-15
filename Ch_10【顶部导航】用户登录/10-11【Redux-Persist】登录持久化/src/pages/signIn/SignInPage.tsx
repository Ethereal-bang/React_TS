import React from "react"
import { UserLayout } from "../../layouts/userLayout"
import { SignInForm } from "./SignInForm"

export const SignInpage: React.FC = () => {
    return (
        <UserLayout>
            <SignInForm />
        </UserLayout>
    )
}