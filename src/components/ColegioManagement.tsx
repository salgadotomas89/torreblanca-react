import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  useColegios, 
  usePrimaryColegio, 
  useCreateColegio, 
  useUpdateColegio, 
  useDeleteColegio 
} from '@/hooks/useColegio';
import type { Colegio } from '@/services/ColegioService';
import {
  School,
  Phone,
  Mail,
  MapPin,
  Globe,
  Loader2,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

const ColegioManagement: React.FC = () => {
  const { colegios, loading, error, refetch } = useColegios();
  const { colegio: primaryColegio } = usePrimaryColegio();
  const { createColegio, loading: createLoading, error: createError, success: createSuccess } = useCreateColegio();
  const { updateColegio, loading: updateLoading, error: updateError, success: updateSuccess } = useUpdateColegio();
  const { deleteColegio, loading: deleteLoading, success: deleteSuccess } = useDeleteColegio();

  const [selectedColegio, setSelectedColegio] = useState<Colegio | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Colegio>>({});

  const handleCreateNew = () => {
    setFormData({
      nombre: '',
      direccion: '',
      email: '',
      telefono: '',
      pais: 'Chile',
      logo: '',
      logo_url: ''
    });
    setIsEditing(true);
    setSelectedColegio(null);
  };

  const handleEdit = (colegio: Colegio) => {
    setFormData(colegio);
    setSelectedColegio(colegio);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (selectedColegio) {
      // Update existing
      const success = await updateColegio(selectedColegio.id, formData);
      if (success) {
        setIsEditing(false);
        refetch();
      }
    } else {
      // Create new
      const success = await createColegio(formData as Omit<Colegio, 'id'>);
      if (success) {
        setIsEditing(false);
        setFormData({});
        refetch();
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este colegio?')) {
      const success = await deleteColegio(id);
      if (success) {
        refetch();
      }
    }
  };

  const handleInputChange = (field: keyof Colegio, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Cargando colegios...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestión de Colegios</h1>
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Colegio
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Success Messages */}
        {(createSuccess || updateSuccess || deleteSuccess) && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-700">
              {createSuccess && 'Colegio creado exitosamente'}
              {updateSuccess && 'Colegio actualizado exitosamente'}
              {deleteSuccess && 'Colegio eliminado exitosamente'}
            </span>
          </div>
        )}

        {/* Primary School Highlight */}
        {primaryColegio && (
          <Card className="mb-6 border-primary">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <School className="w-5 h-5" />
                    {primaryColegio.nombre}
                    <Badge variant="default">Principal</Badge>
                  </CardTitle>
                  <CardDescription>{primaryColegio.direccion}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(primaryColegio)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{primaryColegio.telefono}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{primaryColegio.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span>{primaryColegio.pais}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colegios.map((colegio) => (
            <Card key={colegio.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{colegio.nombre}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {colegio.direccion}
                    </CardDescription>
                  </div>
                  {colegio.logo_url && (
                    <img 
                      src={colegio.logo_url} 
                      alt={`Logo ${colegio.nombre}`}
                      className="w-12 h-12 object-contain rounded"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{colegio.telefono}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">{colegio.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span>{colegio.pais}</span>
                    {colegio.region && <span className="text-muted-foreground">• {colegio.region}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(colegio)}
                    disabled={updateLoading}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(colegio.id)}
                    disabled={deleteLoading}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {colegios.length === 0 && !loading && (
          <div className="text-center py-12">
            <School className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No hay colegios registrados</h3>
            <p className="text-muted-foreground mb-4">Comienza agregando tu primer colegio</p>
            <Button onClick={handleCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Colegio
            </Button>
          </div>
        )}
      </div>

      {/* Edit/Create Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {selectedColegio ? 'Editar Colegio' : 'Nuevo Colegio'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre || ''}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Nombre del colegio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dirección</label>
                <input
                  type="text"
                  value={formData.direccion || ''}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Dirección del colegio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="email@colegio.cl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono || ''}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="+56 9 1234 5678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">País</label>
                <input
                  type="text"
                  value={formData.pais || ''}
                  onChange={(e) => handleInputChange('pais', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Chile"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Región</label>
                <input
                  type="text"
                  value={formData.region || ''}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Región (opcional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL del Logo</label>
                <input
                  type="url"
                  value={formData.logo_url || ''}
                  onChange={(e) => handleInputChange('logo_url', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              {(createError || updateError) && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-700 text-sm">
                    {createError || updateError}
                  </span>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSave}
                  disabled={createLoading || updateLoading}
                  className="flex-1"
                >
                  {(createLoading || updateLoading) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {selectedColegio ? 'Actualizar' : 'Crear'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({});
                    setSelectedColegio(null);
                  }}
                  disabled={createLoading || updateLoading}
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ColegioManagement;
