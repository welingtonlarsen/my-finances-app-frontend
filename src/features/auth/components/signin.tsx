import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card.tsx';
import { AlertTitle, AlertDescription, Alert } from '@/components/ui/alert.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { authenticate } from '@/features/auth/slice/auth-thunks.ts';
import { Credentials } from '@/features/auth/types/auth-types.ts';
import { useAppDispatch, useAppSelector } from '@/app/redux/store.ts';
import { getError, isLoading } from '../slice/auth-selectors';
// import { authUser } from "@/app/authSlice"
// import globalRouter from "@/config/globalRouter"

function AlertTriangleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function SignIn() {
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const isAuthenticating = useAppSelector(isLoading);
  const { errorMessage } = useAppSelector(getError);

  const dispatch = useAppDispatch();
  // const { errorMessage } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(authenticate(credentials));
  };

  return (
    <>
      <Card className="max-w-md w-full mx-auto">
        <form onSubmit={onSubmit}>
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your credentials below to login to your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!!errorMessage && (
              <Alert className="bg-red-50 dark:bg-red-900 border-red-500 dark:border-red-200" variant="destructive">
                <AlertTriangleIcon className="h-4 w-4" />
                <AlertTitle>Authentication error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <Button
                  className="absolute right-2 top-1 h-7 w-7"
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button className="w-full" type="submit" disabled={isAuthenticating}>
              Login
            </Button>
          </CardContent>
          {/* <CardFooter className="text-sm text-center"> */}
          {/* Don't have an account? */}
          {/* <button className="underline ml-1" onClick={() => globalRouter.navigate('/signup')}> */}
          {/* <button className="underline ml-1">Sign up</button> */}
          {/* </CardFooter> */}
        </form>
      </Card>
    </>
  );
}
