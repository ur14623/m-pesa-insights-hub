import { useState, useEffect } from 'react';
import { useNavigate, Navigate, Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/Header';
import { CodeEditor } from '@/components/CodeEditor';
import { useAuth } from '@/contexts/AuthContext';
import { useCodeStorage } from '@/hooks/useCodeStorage';
import { ArrowLeft, Save, X } from 'lucide-react';
import { toast } from 'sonner';

export default function EditCode() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const { user } = useAuth();
  const { getCodeById, updateCode } = useCodeStorage();
  const navigate = useNavigate();

  const existingCode = id ? getCodeById(id) : null;

  useEffect(() => {
    if (existingCode) {
      setTitle(existingCode.title);
      setCode(existingCode.code);
    }
  }, [existingCode]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!existingCode) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleUpdate = () => {
    if (!title.trim()) {
      toast.error('Please enter a title for your code');
      return;
    }
    if (!code.trim()) {
      toast.error('Please write some code before saving');
      return;
    }

    updateCode(existingCode.id, title.trim(), code);
    toast.success('Code updated successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back Link */}
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Code</h1>
            <div className="flex gap-3">
              <Link to="/dashboard">
                <Button variant="outline" className="gap-2">
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </Link>
              <Button onClick={handleUpdate} className="gap-2 glow-primary">
                <Save className="w-4 h-4" />
                Update Code
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Login Test with TypeScript"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Code</Label>
              <CodeEditor value={code} onChange={setCode} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
