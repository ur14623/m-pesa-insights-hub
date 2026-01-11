import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, LogIn, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId.trim()) {
      toast.error('Please enter a User ID');
      return;
    }

    if (isRegistering) {
      const success = register(userId.trim());
      if (success) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        toast.error('User ID already exists');
      }
    } else {
      const success = login(userId.trim());
      if (success) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error('User not found. Please register first.');
        setIsRegistering(true);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-24 pb-12 px-6 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">
                {isRegistering ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-muted-foreground">
                {isRegistering 
                  ? 'Choose a unique User ID to get started' 
                  : 'Enter your User ID to continue'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your unique ID"
                  className="h-12"
                  autoFocus
                />
              </div>
              
              <Button type="submit" className="w-full h-12 glow-primary gap-2">
                {isRegistering ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Login
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isRegistering 
                  ? 'Already have an account? Login' 
                  : "Don't have an account? Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
