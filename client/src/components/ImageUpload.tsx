import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  onImageChange: (imageUrl: string) => void;
  currentImage?: string;
  label?: string;
}

export default function ImageUpload({ onImageChange, currentImage, label = "Foto do Atleta" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem válida');
      return;
    }

    // Validar tamanho (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Imagem muito grande (máximo 5MB)');
      return;
    }

    // Converter para Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setPreview(imageUrl);
      onImageChange(imageUrl);
      toast.success('Imagem carregada com sucesso!');
    };
    reader.onerror = () => {
      toast.error('Erro ao carregar imagem');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="block font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">
        {label}
      </label>

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-sm border border-border/50"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm flex items-center justify-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-sm bg-primary hover:bg-primary/80 transition-colors"
              title="Trocar imagem"
            >
              <Upload className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={clearImage}
              className="p-2 rounded-sm bg-red-600 hover:bg-red-700 transition-colors"
              title="Remover imagem"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-primary bg-primary/10'
              : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
          }`}
          style={{
            background: isDragging ? 'oklch(0.52 0.22 260 / 0.1)' : 'oklch(0.12 0.015 260)',
          }}
        >
          <ImageIcon className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="font-heading text-sm text-white mb-1">Arraste uma imagem aqui</p>
          <p className="text-xs text-muted-foreground">ou clique para selecionar</p>
          <p className="text-xs text-muted-foreground mt-2">Máximo 5MB · PNG, JPG, WebP</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
