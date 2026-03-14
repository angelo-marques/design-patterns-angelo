import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function FileManager() {
  const { data: files, isLoading: filesLoading } = trpc.files.list.useQuery();
  const { data: patterns, isLoading: patternsLoading } = trpc.patterns.list.useQuery();

  const utils = trpc.useUtils();
  const deleteFileMutation = trpc.files.delete.useMutation({
    onSuccess: () => {
      toast.success("Arquivo deletado");
      utils.files.list.invalidate();
    },
  });

  const togglePublicMutation = trpc.files.togglePublic.useMutation({
    onSuccess: () => {
      utils.files.list.invalidate();
    },
  });

  const deletePatternMutation = trpc.patterns.delete.useMutation({
    onSuccess: () => {
      toast.success("Padrão deletado");
      utils.patterns.list.invalidate();
    },
  });

  const togglePatternPublicMutation = trpc.patterns.togglePublic.useMutation({
    onSuccess: () => {
      utils.patterns.list.invalidate();
    },
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gerenciador de Arquivos</h1>
          <FileUpload />
        </div>

        <Tabs defaultValue="files" className="w-full">
          <TabsList>
            <TabsTrigger value="files">Arquivos ({files?.length || 0})</TabsTrigger>
            <TabsTrigger value="patterns">Padrões ({patterns?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="space-y-4">
            {filesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : files && files.length > 0 ? (
              <div className="grid gap-4">
                {files.map((file) => (
                  <Card key={file.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{file.fileName}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {file.category} • {file.fileSize ? `${(file.fileSize / 1024).toFixed(2)} KB` : ""}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${file.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {file.isPublic ? 'Público' : 'Privado'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {file.description && (
                        <p className="text-sm text-muted-foreground mb-4">{file.description}</p>
                      )}
                      <div className="flex gap-2">
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                        </a>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2"
                          onClick={() => togglePublicMutation.mutate({ fileId: file.id, isPublic: !file.isPublic })}
                          disabled={togglePublicMutation.isPending}
                        >
                          {file.isPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          {file.isPublic ? 'Tornar Privado' : 'Tornar Público'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-2"
                          onClick={() => deleteFileMutation.mutate({ fileId: file.id })}
                          disabled={deleteFileMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                          Deletar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum arquivo enviado ainda</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            {patternsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : patterns && patterns.length > 0 ? (
              <div className="grid gap-4">
                {patterns.map((pattern) => (
                  <Card key={pattern.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{pattern.name}</CardTitle>
                          {pattern.tags && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {pattern.tags}
                            </p>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${pattern.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {pattern.isPublic ? 'Público' : 'Privado'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {pattern.description && (
                        <p className="text-sm text-muted-foreground mb-4">{pattern.description}</p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2"
                          onClick={() => togglePatternPublicMutation.mutate({ patternId: pattern.id, isPublic: !pattern.isPublic })}
                          disabled={togglePatternPublicMutation.isPending}
                        >
                          {pattern.isPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          {pattern.isPublic ? 'Tornar Privado' : 'Tornar Público'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-2"
                          onClick={() => deletePatternMutation.mutate({ patternId: pattern.id })}
                          disabled={deletePatternMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                          Deletar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum padrão criado ainda</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
