import { Navigate, Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { CodeEditor } from '@/components/CodeEditor';
import { useAuth } from '@/contexts/AuthContext';
import { useCodeStorage } from '@/hooks/useCodeStorage';
import { ArrowLeft, Pencil, Calendar, Clock } from 'lucide-react';

export default function ViewCode() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getCodeById } = useCodeStorage();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const code = id ? getCodeById(id) : null;

  if (!code) {
    return <Navigate to="/dashboard" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">{code.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Created: {formatDate(code.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>Updated: {formatDate(code.updatedAt)}</span>
                </div>
              </div>
            </div>
            <Link to={`/edit/${code.id}`}>
              <Button variant="outline" className="gap-2 shrink-0">
                <Pencil className="w-4 h-4" />
                Edit Code
              </Button>
            </Link>
          </div>

          {/* Code Display */}
          <div className="space-y-2">
            <CodeEditor value={code.code} onChange={() => {}} readOnly />
          </div>
        </div>
      </main>
    </div>
  );
}
