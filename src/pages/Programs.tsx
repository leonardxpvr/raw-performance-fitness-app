
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from "@/hooks/use-toast";
import { Tables } from '@/integrations/supabase/types';

interface Program extends Tables<'programs'> {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

const Programs = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Partial<Program>>({
    title: '',
    description: ''
  });

  // Check if user is an admin
  const isAdmin = user?.email === 'admin@example.com'; // Replace with proper admin check

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        setPrograms(data as Program[]);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load programs"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleSaveProgram = async () => {
    try {
      if (!currentProgram.title) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Program title is required"
        });
        return;
      }

      let response;
      if (currentProgram.id) {
        // Update existing program
        response = await supabase
          .from('programs')
          .update({ 
            title: currentProgram.title,
            description: currentProgram.description
          })
          .eq('id', currentProgram.id);
      } else {
        // Create new program
        response = await supabase
          .from('programs')
          .insert([{ 
            title: currentProgram.title,
            description: currentProgram.description
          }]);
      }

      if (response.error) throw response.error;
      
      setShowModal(false);
      setCurrentProgram({ title: '', description: '' });
      fetchPrograms();
      toast({
        title: "Success",
        description: currentProgram.id ? "Program updated successfully" : "Program created successfully"
      });
    } catch (error) {
      console.error('Error saving program:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save program"
      });
    }
  };

  const handleDeleteProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchPrograms();
      toast({
        title: "Success",
        description: "Program deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting program:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete program"
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="fitforge-container py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="fitforge-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-fitforge-black">Workout Programs</h1>
          <Button 
            onClick={() => {
              setCurrentProgram({ title: '', description: '' });
              setShowModal(true);
            }}
            className="flex items-center bg-fitforge-red text-white hover:bg-red-600"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Program
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <p>Loading programs...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="fitforge-card text-center py-16">
            <h3 className="text-xl font-semibold mt-4 text-gray-600">No Programs Yet</h3>
            <p className="text-gray-500 mt-2 mb-6">Create your first workout program</p>
            <Button
              onClick={() => {
                setCurrentProgram({ title: '', description: '' });
                setShowModal(true);
              }}
              className="bg-fitforge-red text-white hover:bg-red-600"
            >
              Create Program
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programs.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell className="font-medium">{program.title}</TableCell>
                    <TableCell>{program.description}</TableCell>
                    <TableCell>{new Date(program.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setCurrentProgram(program);
                            setShowModal(true);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteProgram(program.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-fitforge-black">
                  {currentProgram.id ? 'Edit Program' : 'New Program'}
                </h3>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Program Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                    value={currentProgram.title}
                    onChange={(e) => setCurrentProgram({...currentProgram, title: e.target.value})}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                    rows={4}
                    value={currentProgram.description || ''}
                    onChange={(e) => setCurrentProgram({...currentProgram, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveProgram}
                  className="bg-fitforge-red text-white hover:bg-red-600"
                >
                  {currentProgram.id ? 'Update' : 'Create'} Program
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
