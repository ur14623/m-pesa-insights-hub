import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useCodeStorage } from '@/hooks/useCodeStorage';
import { Plus, Eye, Pencil, Trash2, Code2, FileCode } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Dashboard() {
  const { user } = useAuth();
  const { codes, deleteCode } = useCodeStorage();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleDelete = (id: string, title: string) => {
    deleteCode(id);
    toast.success(`"${title}" deleted successfully`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">My Code Library</h1>
              <p className="text-muted-foreground">
                {codes.length} {codes.length === 1 ? 'script' : 'scripts'} saved
              </p>
            </div>
            <Link to="/write">
              <Button className="gap-2 glow-primary">
                <Plus className="w-4 h-4" />
                Write New Code
              </Button>
            </Link>
          </div>

          {/* Code List */}
          {codes.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileCode className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No code saved yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by writing your first Playwright test script
              </p>
              <Link to="/write">
                <Button className="gap-2 glow-primary">
                  <Plus className="w-4 h-4" />
                  Write Your First Code
                </Button>
              </Link>
            </div>
          ) : (
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codes.map((code) => (
                      <tr key={code.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Code2 className="w-5 h-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium truncate">{code.title}</p>
                              <p className="text-sm text-muted-foreground sm:hidden">
                                {formatDate(code.updatedAt)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground hidden sm:table-cell">
                          {formatDate(code.updatedAt)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/view/${code.id}`}>
                              <Button variant="ghost" size="sm" className="gap-1.5">
                                <Eye className="w-4 h-4" />
                                <span className="hidden sm:inline">View</span>
                              </Button>
                            </Link>
                            <Link to={`/edit/${code.id}`}>
                              <Button variant="ghost" size="sm" className="gap-1.5">
                                <Pencil className="w-4 h-4" />
                                <span className="hidden sm:inline">Edit</span>
                              </Button>
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                  <span className="hidden sm:inline">Delete</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete "{code.title}"?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your code.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDelete(code.id, code.title)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
